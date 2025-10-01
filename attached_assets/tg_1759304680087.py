from telegram import Bot
from telegram.constants import ParseMode
import asyncio
import os

async def send_copyable_markdown():
    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    if not bot_token:
        print("Error: TELEGRAM_BOT_TOKEN environment variable is not set")
        return
        
    bot = Bot(token=bot_token)
    chat_id = "USER_CHAT_ID"  # Replace with actual chat ID when needed
    
    # Note the backticks around the promo code
    text = "Here is your exclusive promo code\. Tap to copy:\n\n`SUMMER25OFF`"
    
    await bot.send_message(
        chat_id=chat_id,
        text=text,
        parse_mode=ParseMode.MARKDOWN_V2
    )

if __name__ == '__main__':
    asyncio.run(send_copyable_markdown())