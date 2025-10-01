# Telegram Message Sender

## Overview

This is a Flask-based web application that provides a rich text editor interface for sending formatted messages to Telegram. The application features an HTML-based message composer with formatting tools (bold, italic, underline, strikethrough, code blocks, and quotes) that converts HTML to Telegram-compatible formatting. It includes PostgreSQL database integration for persistence (with fallback to in-memory storage) and communicates with the Telegram Bot API to send messages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Problem:** Need a user-friendly interface for composing rich-text messages for Telegram.

**Solution:** Single-page HTML application with contenteditable div and toolbar buttons for text formatting.

- Uses TailwindCSS for styling via CDN
- Custom CSS animations for UI feedback (hover effects, notifications)
- JavaScript-based toolbar that applies HTML formatting tags
- Special handling for Telegram-specific features like quote blocks with custom styling

**Rationale:** Keeping the frontend as a simple static HTML file makes deployment straightforward and reduces complexity. The contenteditable approach provides a familiar text editing experience.

### Backend Architecture

**Problem:** Convert HTML formatting to Telegram-compatible markup and handle message sending.

**Solution:** Flask REST API with custom HTML parser.

- Flask web framework for HTTP handling
- Custom `HTMLToTelegramParser` class (extends `HTMLParser`) that converts HTML tags to Telegram formatting
- Asynchronous message sending capability using `ThreadPoolExecutor` and `asyncio`
- RESTful endpoints for message operations

**Rationale:** Flask provides a lightweight framework suitable for this use case. The custom parser ensures proper conversion between HTML (from the editor) and Telegram's formatting syntax, handling tags like `<b>`, `<i>`, `<u>`, `<s>`, and `<code>`.

### Data Storage

**Problem:** Need to persist message history and configuration.

**Solution:** PostgreSQL database with graceful degradation.

- Primary storage: PostgreSQL accessed via `psycopg2`
- Connection string from environment variable `DATABASE_URL`
- Fallback mechanism: In-memory storage when database connection fails
- Uses `RealDictCursor` for JSON-friendly query results

**Rationale:** PostgreSQL provides robust relational data storage with JSON support. The fallback mechanism ensures the application remains functional during development or when database is unavailable.

### Authentication & Authorization

**Problem:** Secure communication with Telegram Bot API.

**Solution:** Environment variable-based bot token authentication.

- Bot token stored in `TELEGRAM_BOT_TOKEN` environment variable
- Default dummy token for development/testing
- Token used in all Telegram API requests

**Rationale:** Environment variables keep sensitive credentials out of source code and allow easy configuration across different environments.

## External Dependencies

### Third-Party Services

1. **Telegram Bot API**
   - Purpose: Send formatted messages to Telegram chats/channels
   - Integration: HTTP requests to `https://api.telegram.org/bot{token}`
   - Authentication: Bot token-based
   - Features used: Message sending with HTML/Markdown formatting

2. **TailwindCSS CDN**
   - Purpose: Frontend styling framework
   - Integration: CDN script tag in HTML
   - Version: Latest (via `cdn.tailwindcss.com`)

### Database

- **PostgreSQL**
  - Connection library: `psycopg2`
  - Default connection: `postgresql://postgres:postgres@localhost:5432/telegram`
  - Used for: Message persistence and application state

### Python Libraries

- `flask`: Web framework and routing
- `requests`: HTTP client for Telegram API calls
- `psycopg2`: PostgreSQL database adapter
- `html.parser`: HTML parsing (standard library)
- `asyncio`: Asynchronous operations support
- `concurrent.futures.ThreadPoolExecutor`: Thread-based async execution

### Environment Variables

- `TELEGRAM_BOT_TOKEN`: Bot authentication token (required for production)
- `DATABASE_URL`: PostgreSQL connection string (optional, has default)