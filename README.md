# GAS Calendar Event Registration Tool

Google Apps Script-based web application for batch calendar event registration with mobile-optimized UI.
(Google Apps ScriptベースのWebアプリ。モバイルに最適化されたUIでカレンダーイベントの一括登録を実現)

## 🎯 Overview

This tool simplifies recurring event scheduling by allowing batch calendar event creation with a mobile-friendly interface. Designed with accessibility in mind, featuring large touch targets and clear typography suitable for all users.

(定期的な予定の登録を簡素化するツールです。モバイルフレンドリーなインターフェースで複数のイベントを一括作成できます。大きなタッチターゲットと見やすいタイポグラフィで、すべてのユーザーに使いやすい設計です。)

## ✨ Key Features

### Event Management
- **Batch Event Creation:** Select multiple dates and create events in one operation
  - (複数日程の一括登録)
- **Event Templates:** Save frequently used event configurations for quick reuse
  - (よく使うイベント設定をテンプレートとして保存)
- **Flexible Scheduling:** Support for both all-day and timed events
  - (終日イベントと時刻指定イベントの両方に対応)
- **Color Coding:** Assign colors to events for easy visual identification
  - (色分けによる視覚的な識別)

### User Experience
- **Mobile-First Design:** Optimized for smartphone and tablet use
  - (スマートフォン・タブレット最適化)
- **Accessibility:** Large font sizes (28px) and touch targets (80px+)
  - (28pxの大きなフォント、80px以上のタッチターゲット)
- **Responsive Layout:** Adapts seamlessly between mobile and desktop
  - (モバイルとデスクトップでシームレスに適応)
- **Senior-Friendly:** Clear interface with minimal complexity
  - (シニア層にも使いやすいシンプルなインターフェース)

## 🛠️ Technical Stack

- **Google Apps Script:** Backend logic and Calendar API integration
- **HTML5/CSS3/JavaScript:** Frontend without external frameworks
- **PropertiesService:** User-specific data storage
- **Google Calendar API:** Event creation and management

## 📋 Use Cases

- **Shift Scheduling:** Quick entry of work shift patterns (シフト管理)
- **Medication Reminders:** Regular medication schedule tracking (服薬リマインダー)
- **Recurring Meetings:** Batch scheduling of regular meetings (定例会議の一括登録)
- **Event Planning:** Multi-day event coordination (複数日にわたるイベント管理)

## 🚀 Getting Started

### Prerequisites
- Google account with Calendar access (カレンダーアクセス権限のあるGoogleアカウント)
- Google Apps Script project (Google Apps Scriptプロジェクト)

### Installation

1. Create a new Google Apps Script project
   - (新しいGoogle Apps Scriptプロジェクトを作成)
2. Copy `Code.gs` content to the script editor
   - (`Code.gs`の内容をスクリプトエディタにコピー)
3. Create a new HTML file named `Index.html`
   - (`Index.html`という名前の新しいHTMLファイルを作成)
4. Copy the HTML content to the file
   - (HTMLコンテンツをファイルにコピー)
5. Deploy as web app (Webアプリとしてデプロイ):
   - Click "Deploy" > "New deployment"
   - Select type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone with Google account"
   - Click "Deploy"

### Usage

1. Open the deployed web app URL (デプロイされたWebアプリのURLを開く)
2. Enter your calendar ID (usually your Gmail address)
   - (カレンダーIDを入力 - 通常はGmailアドレス)
3. Select month and dates for events (月と日付を選択)
4. Enter event details (name, type, time, color)
   - (イベントの詳細を入力 - 名前、種類、時刻、色)
5. Click "登録" (Register) to create events (「登録」をクリックしてイベントを作成)
6. Save frequently used events for quick reuse
   - (よく使うイベントを保存して次回から簡単に再利用)

## 📱 Mobile Optimization

### Design Principles
- Minimum touch target: 80px × 80px (最小タッチターゲット)
- Font size: 28px for main content (メインコンテンツのフォントサイズ)
- Left/right padding: 16px for comfortable viewing (快適な閲覧のための左右パディング)
- Rounded corners (12px) for modern look (モダンな見た目のための角丸)
- No horizontal scrolling (横スクロールなし)

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
  - (ピュアなバニラJavaScript - jQueryやフレームワーク不要)
- CSS Grid for responsive layout
- Media queries for adaptive design
- Event delegation for dynamic elements

### Data Storage
- User Properties for individual event templates
  - (個別のイベントテンプレート用のユーザープロパティ)
- JSON serialization for complex data structures
- No external database required (外部データベース不要)

## 🎨 Design Features

### Color Palette
- Primary: Purple gradient (#667eea → #764ba2)
- Success: Green (#26de81 → #20bf6b)
- Danger: Red (#ff4757)
- Neutral: Grays (#f8f9fa, #e5e5e5)

### Typography
- System fonts for better performance
- Large, clear text for readability (可読性の高い大きく明瞭なテキスト)
- Bold weights for important elements

## 📝 Code Structure

```
gas-calendar-tool/
├── Code.gs          # Google Apps Script backend
└── Index.html       # Frontend UI
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
(貢献、問題報告、機能リクエストを歓迎します！)

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
> 
> (すべての人にとってシンプルでアクセスしやすいカレンダー管理を)
