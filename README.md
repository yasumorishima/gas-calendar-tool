# GAS Calendar Event Registration Tool

Google Apps Script-based web application for batch calendar event registration with mobile-optimized UI.

## 🎯 Overview

This tool simplifies recurring event scheduling by allowing batch calendar event creation with a mobile-friendly interface. Designed with accessibility in mind, featuring large touch targets and clear typography suitable for all users.

## ✨ Key Features

### Event Management
- **Batch Event Creation:** Select multiple dates and create events in one operation
- **Event Templates:** Save frequently used event configurations for quick reuse
- **Flexible Scheduling:** Support for both all-day and timed events
- **Color Coding:** Assign colors to events for easy visual identification

### User Experience
- **Mobile-First Design:** Optimized for smartphone and tablet use
- **Accessibility:** Large font sizes (28px) and touch targets (80px+)
- **Responsive Layout:** Adapts seamlessly between mobile and desktop
- **Senior-Friendly:** Clear interface with minimal complexity

## 🛠️ Technical Stack

- **Google Apps Script:** Backend logic and Calendar API integration
- **HTML5/CSS3/JavaScript:** Frontend without external frameworks
- **PropertiesService:** User-specific data storage
- **Google Calendar API:** Event creation and management

## 📋 Use Cases

- **Shift Scheduling:** Quick entry of work shift patterns
- **Medication Reminders:** Regular medication schedule tracking
- **Recurring Meetings:** Batch scheduling of regular meetings
- **Event Planning:** Multi-day event coordination

## 🚀 Getting Started

### Prerequisites
- Google account with Calendar access
- Google Apps Script project

### Installation

1. Create a new Google Apps Script project
2. Copy `Code.gs` content to the script editor
3. Create a new HTML file named `Index.html`
4. Copy the HTML content to the file
5. Deploy as web app:
   - Click "Deploy" > "New deployment"
   - Select type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone with Google account"
   - Click "Deploy"

### Usage

1. Open the deployed web app URL
2. Enter your calendar ID (usually your Gmail address)
3. Select month and dates for events
4. Enter event details (name, type, time, color)
5. Click "登録" (Register) to create events
6. Save frequently used events for quick reuse

## 📱 Mobile Optimization

### Design Principles
- Minimum touch target: 80px × 80px
- Font size: 28px for main content
- Left/right padding: 16px for comfortable viewing
- Rounded corners (12px) for modern look
- No horizontal scrolling

### Responsive Breakpoint
- Mobile/Tablet: ≤ 1024px (full-width layout)
- Desktop: ≥ 1025px (centered layout with gradient background)

## 🔧 Technical Highlights

### Backend (Google Apps Script)
```javascript
// User authentication and event storage
function getCurrentUserEmailAndEventNames()
function addEventNames(newEventDetails)
function deleteEventNameFromList(nameToDelete)
function getEventNameDetails(eventName)
function addEventsToCalendarDirectly(calendarId, month, days, eventTitle, ...)
```

### Frontend Features
- Pure vanilla JavaScript (no jQuery or frameworks)
- CSS Grid for responsive layout
- Media queries for adaptive design
- Event delegation for dynamic elements

### Data Storage
- User Properties for individual event templates
- JSON serialization for complex data structures
- No external database required

## 🎨 Design Features

### Color Palette
- Primary: Purple gradient (#667eea → #764ba2)
- Success: Green (#26de81 → #20bf6b)
- Danger: Red (#ff4757)
- Neutral: Grays (#f8f9fa, #e5e5e5)

### Typography
- System fonts for better performance
- Large, clear text for readability
- Bold weights for important elements

## 📝 Code Structure

```
gas-calendar-tool/
├── Code.gs          # Google Apps Script backend
└── Index.html       # Frontend UI
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Yasunori Morishima (盛島康徳)**
- Kaggle: [@yasunorim](https://www.kaggle.com/yasunorim)
- LinkedIn: [Yasunori Morishima](https://www.linkedin.com/in/yasunori-morishima-b70229241/)
- GitHub: [@yasumorishima](https://github.com/yasumorishima)

## 🙏 Acknowledgments

- Built with Google Apps Script platform
- UI/UX design inspired by modern mobile-first principles
- Accessibility considerations from WCAG guidelines

---

> 💡 *Making calendar management simple and accessible for everyone*
