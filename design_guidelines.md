# Design Guidelines: Telegram Mini App Bingo Game

## Design Approach
**Reference-Based Approach**: Inspired by modern gaming interfaces and Telegram Mini Apps, with a focus on vibrant, engaging visual design that prioritizes user experience and real-time interaction.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background: Dark textured base with subtle radial grid pattern
- Primary Accent: Vibrant glowing orange (#FF6B35 or similar warm orange)
- Secondary Accent: Bright cyan/turquoise for contrasting elements
- Success/Player Pick: Deep green for selected states
- Other Player Pick: Bright orange for live multiplayer feedback
- Neutral: Cool gray for unpicked/inactive states

**Bingo Card Colors**
- B Column: Blue header
- I Column: Red header  
- N Column: Green header
- G Column: Yellow header
- O Column: Purple header

**Wallet Display**
- Withdrawable: Green text
- Non-Withdrawable: White text

### B. Typography
- **Font Family**: Poppins (primary font for all text)
- **Hierarchy**: Bold weights for headings, regular for body text
- **Readability**: Bright, readable numbers on game boards with crisp digital font for stats

### C. Layout System
- **Spacing**: Consistent padding and margins using Tailwind's spacing scale (p-4, p-6, p-8)
- **Grid System**: Use of grid layouts for navigation (4-item grid), number selection (multi-column grid), and bingo cards (5×5 grid)
- **Container**: Centered layouts with max-width constraints for optimal mobile viewing

### D. Component Library

**Cards & Panels**
- Glossy rounded rectangular boxes with soft shadows
- Rounded corners on all elements (border-radius consistently applied)
- Glossy highlights on interactive elements
- Inner shadows for depth on cards

**Buttons**
- Primary: Glowing orange circular "Play Now" button (fixed bottom center on dashboard)
- Action Buttons: Glossy finish with vibrant colors
- BINGO Button: Large, prominent, rounded rectangular with exciting glow effect
- Copy Buttons: Small, functional buttons next to bank account info

**Input Fields**
- Dark backgrounds with light borders
- Rounded corners matching overall design
- Clear placeholder text
- Textarea for SMS paste functionality

**Navigation**
- Grid-based navigation (Deposit, Withdraw, Transfer, Support)
- SVG icons for each navigation item
- Glossy card appearance for nav items

**Game Elements**
- Number tiles: Rounded squares with state-based colors (gray/orange/green)
- Bingo cards: 5×5 grid with colored column headers and glossy finish
- Stat boxes: Horizontal glossy rectangular displays for game info
- Scrollable panels with slim vertical scrollbars

**Status Indicators**
- Countdown timer: Bold glowing orange display
- Wallet balances: Color-coded text (green/white)
- Game phase indicators: Bright yellow "Started" box
- Current call display: Large rounded box with number
- Recent calls: Horizontal row of circular boxes

**Pop-ups & Overlays**
- Winner declaration: Large centered pop-up with dark textured background
- Bold "BINGO!" header in glossy box
- Winner name highlighted in green
- Winning card display with full bingo card visualization

### E. Animations & Interactions
- **Minimize animations**: Use sparingly, only for key moments
- Glow effects on primary buttons and accents
- Smooth transitions for state changes (picked/unpicked numbers)
- Real-time updates for multiplayer number picking (no reload needed)
- Visual feedback on button interactions

## Page-Specific Design Notes

**Dashboard**: Header with glowing "Dm Bingo" logo, profile card with greeting, wallet display, navigation grid, fixed Play button at bottom

**Deposit/Withdraw/Transfer Pages**: Clean form layouts with clear field labels, bank-specific validation feedback, prominent action buttons

**Game Picking Page**: Top stats bar (countdown, wallet, picked count), tall scrollable number grid (1-400), bottom bingo card preview showing selected numbers

**Game Playing Page**: Top stats (Prize, Players, Bet, Call), two-column layout (master calling sheet 1-75 on left, player card on right), current call display, recent calls row, prominent BINGO button at bottom

**Winner Pop-up**: Centered overlay, bold BINGO header, winner announcement with highlighted names, winning card display, countdown to next game

## Visual Hierarchy
1. Primary actions (Play, BINGO button) - largest, most prominent
2. Game state information (countdown, current call) - bold, glowing
3. Navigation and wallet info - clear, accessible
4. Supporting info (bank details, recent calls) - organized, readable

## Quality Standards
- Polished, professional Telegram Mini App aesthetic
- High contrast for readability in dark mode
- Vibrant colors that "pop" against dark textured background
- Glossy, modern finish on all interactive elements
- Responsive design optimized for mobile devices
- Clean UI/UX with clear visual feedback for all user actions