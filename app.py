from flask import Flask, request, jsonify, send_file
import requests
import os
from html.parser import HTMLParser
import psycopg2
from psycopg2.extras import RealDictCursor
import time
import asyncio
from concurrent.futures import ThreadPoolExecutor
import json

app = Flask(__name__)

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', 'dummy_token')
TELEGRAM_API_URL = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}'

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/telegram')

def get_db_connection():
    try:
        return psycopg2.connect(DATABASE_URL)
    except psycopg2.OperationalError:
        print(f"Could not connect to database with URL: {DATABASE_URL}")
        print("Using in-memory data instead")
        return None


class HTMLToTelegramParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.telegram_text = ''
        self.tag_stack = []
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag == 'b' or tag == 'strong':
            self.telegram_text += '<b>'
            self.tag_stack.append('b')
        elif tag == 'i' or tag == 'em':
            self.telegram_text += '<i>'
            self.tag_stack.append('i')
        elif tag == 'u':
            self.telegram_text += '<u>'
            self.tag_stack.append('u')
        elif tag == 's' or tag == 'strike' or tag == 'del':
            self.telegram_text += '<s>'
            self.tag_stack.append('s')
        elif tag == 'code':
            self.telegram_text += '<code>'
            self.tag_stack.append('code')
        elif tag == 'pre':
            self.telegram_text += '<pre>'
            self.tag_stack.append('pre')
        elif tag == 'a':
            href = attrs_dict.get('href', '')
            self.telegram_text += f'<a href="{href}">'
            self.tag_stack.append('a')
        elif tag == 'span':
            self.tag_stack.append(None)
        elif tag == 'div':
            class_name = attrs_dict.get('class', '')
            if class_name and 'telegram-quote' in class_name:
                self.telegram_text += '<blockquote>'
                self.tag_stack.append('blockquote')
            else:
                self.tag_stack.append(None)
        elif tag == 'br':
            self.telegram_text += '\n'
        elif tag == 'li':
            self.telegram_text += '• '
        else:
            self.tag_stack.append(None)
    
    def handle_endtag(self, tag):
        if self.tag_stack:
            close_tag = self.tag_stack.pop()
            if close_tag:
                self.telegram_text += f'</{close_tag}>'
        
        if tag in ['p', 'div', 'li']:
            self.telegram_text += '\n'
    
    def handle_data(self, data):
        self.telegram_text += data
    
    def get_telegram_text(self):
        return self.telegram_text.strip()


def html_to_telegram(html_content):
    parser = HTMLToTelegramParser()
    parser.feed(html_content)
    return parser.get_telegram_text()


@app.route('/')
def index():
    return send_file('index.html')


@app.route('/register-user', methods=['POST'])
def register_user():
    try:
        data = request.json
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        chat_id = data.get('chat_id')
        first_name = data.get('first_name', '')
        
        conn = get_db_connection()
        if conn is None:
            return jsonify({'success': True, 'message': 'Using in-memory mode, user registered in memory'})
            
        cur = conn.cursor()
        
        cur.execute(
            'INSERT INTO users (chat_id, first_name) VALUES (%s, %s) ON CONFLICT (chat_id) DO UPDATE SET first_name = %s',
            (chat_id, first_name, first_name)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/get-users', methods=['GET'])
def get_users():
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({'success': True, 'users': [], 'message': 'Using in-memory mode'})
            
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('SELECT chat_id, first_name FROM users ORDER BY created_at DESC')
        users = cur.fetchall()
        
        cur.close()
        conn.close()
        
        return jsonify({'success': True, 'users': users})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/send', methods=['POST'])
def send_message():
    try:
        chat_id = request.form.get('chatId')
        message_html = request.form.get('message', '')
        image = request.files.get('image')
        inline_keyboard = request.form.get('inlineKeyboard', '')
        
        if not chat_id:
            return jsonify({'success': False, 'error': 'Chat ID is required'}), 400
        
        telegram_text = html_to_telegram(message_html) if message_html else ''
        
        reply_markup = None
        if inline_keyboard:
            try:
                keyboard_data = json.loads(inline_keyboard)
                if keyboard_data:
                    reply_markup = {'inline_keyboard': keyboard_data}
            except:
                pass
        
        conn = get_db_connection()
        user_name = ''
        if conn:
            cur = conn.cursor()
            cur.execute('SELECT first_name FROM users WHERE chat_id = %s', (chat_id,))
            user = cur.fetchone()
            cur.close()
            conn.close()
            if user:
                user_name = user[0] or ''
        
        telegram_text = telegram_text.replace('{name}', user_name)
        
        if image:
            files = {'photo': (image.filename, image.stream, image.mimetype)}
            data = {
                'chat_id': chat_id,
                'caption': telegram_text,
                'parse_mode': 'HTML'
            }
            
            if reply_markup:
                data['reply_markup'] = json.dumps(reply_markup)
            
            response = requests.post(
                f'{TELEGRAM_API_URL}/sendPhoto',
                data=data,
                files=files
            )
        else:
            if not telegram_text:
                return jsonify({'success': False, 'error': 'Message or image is required'}), 400
            
            data = {
                'chat_id': chat_id,
                'text': telegram_text,
                'parse_mode': 'HTML'
            }
            
            if reply_markup:
                data['reply_markup'] = reply_markup
            
            response = requests.post(
                f'{TELEGRAM_API_URL}/sendMessage',
                json=data
            )
        
        result = response.json()
        
        if result.get('ok'):
            return jsonify({'success': True, 'result': result})
        else:
            error_message = result.get('description', 'Unknown error')
            return jsonify({'success': False, 'error': error_message}), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/broadcast', methods=['POST'])
def broadcast_message():
    try:
        message_html = request.form.get('message', '')
        image = request.files.get('image')
        inline_keyboard = request.form.get('inlineKeyboard', '')
        
        telegram_text = html_to_telegram(message_html) if message_html else ''
        
        reply_markup = None
        if inline_keyboard:
            try:
                keyboard_data = json.loads(inline_keyboard)
                if keyboard_data:
                    reply_markup = {'inline_keyboard': keyboard_data}
            except:
                pass
        
        conn = get_db_connection()
        users = []
        if conn:
            cur = conn.cursor(cursor_factory=RealDictCursor)
            cur.execute('SELECT chat_id, first_name FROM users')
            users = cur.fetchall()
            cur.close()
            conn.close()
        
        if not users:
            return jsonify({'success': False, 'error': 'No registered users found'}), 400
        
        success_count = 0
        fail_count = 0
        
        for i, user in enumerate(users):
            try:
                personalized_text = telegram_text.replace('{name}', user['first_name'] or '')
                
                if image:
                    image.stream.seek(0)
                    files = {'photo': (image.filename, image.stream, image.mimetype)}
                    data = {
                        'chat_id': user['chat_id'],
                        'caption': personalized_text,
                        'parse_mode': 'HTML'
                    }
                    
                    if reply_markup:
                        data['reply_markup'] = json.dumps(reply_markup)
                    
                    response = requests.post(
                        f'{TELEGRAM_API_URL}/sendPhoto',
                        data=data,
                        files=files
                    )
                else:
                    data = {
                        'chat_id': user['chat_id'],
                        'text': personalized_text,
                        'parse_mode': 'HTML'
                    }
                    
                    if reply_markup:
                        data['reply_markup'] = reply_markup
                    
                    response = requests.post(
                        f'{TELEGRAM_API_URL}/sendMessage',
                        json=data
                    )
                
                if response.json().get('ok'):
                    success_count += 1
                else:
                    fail_count += 1
                
                if (i + 1) % 20 == 0:
                    time.sleep(1)
                    
            except Exception as e:
                fail_count += 1
                continue
        
        return jsonify({
            'success': True, 
            'message': f'Broadcast completed: {success_count} sent, {fail_count} failed',
            'success_count': success_count,
            'fail_count': fail_count
        })
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
