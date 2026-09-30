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
- **Event Templates ("よく使う予定"):** Save frequently used event configurations and fill the form with one tap
  - (よく使う予定を保存し、ワンタップで入力欄に反映)
- **Registration Summary:** Shows exactly what will be added (name, time, dates, count) before registering
  - (登録前に「何を・いつ・何日分」登録するかを表示)
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

### Auto deploy (自動デプロイ)

Pushing changes to `Code.gs` / `Index.html` / `appsscript.json` on `main` triggers
`.github/workflows/deploy-gas.yml`, which runs `clasp push` and updates the existing
web app deployment to a new version (the URL stays the same).
(`main` に反映すると GitHub Actions が clasp で自動デプロイし、同じURLのまま新バージョンになります)

- Required secret: `CLASPRC_JSON` — contents of `~/.clasprc.json` after `clasp login`
  (リポジトリの Settings → Secrets and variables → Actions に登録)
- Script ID is in `.clasp.json`, deployment ID in the workflow file
- Can also be run manually from the Actions tab ("Run workflow")
- ⚠️ Do not edit code directly in the Apps Script editor — it will be overwritten by the next auto deploy. Edit on GitHub instead.
  (GASエディタで直接編集した内容は次の自動デプロイで上書きされます。修正は GitHub 側で行ってください)
- If the deploy fails with an auth error, run `clasp login` again and update the `CLASPRC_JSON` secret.
  (認証エラーで失敗したら `clasp login` し直して Secret を更新)

### Usage

The screen is a single flow of three steps. (画面は ①→②→③ の一本の流れになっています)

1. **① 予定の内容 (Event details)**
   - Tap a "よく使う予定" (saved template) to fill in the form, or type name / time / color yourself.
   - (「よく使う予定」をタップすると入力欄に反映されます。手入力も可能)
   - "⭐ この内容を「よく使う予定」に保存" saves the current form as a template. **This does NOT add anything to the calendar.** Saving with an existing name overwrites it.
   - (保存ボタンはテンプレートとして保存するだけで、カレンダーには登録されません。同じ名前で保存すると上書きされます)
2. **② 日付を選ぶ (Pick dates)** — choose the month and tap one or more dates (月を選び、日付を複数タップ)
3. **③ カレンダーに登録 (Register)** — check the summary ("「早番」を 9月 3日・10日 の 2日分 登録します") and press "📅 カレンダーに登録する".
   - (内容の確認文を見てから登録ボタンを押します。登録先カレンダーは通常変更不要です)
4. Templates can be deleted from "⚙️ よく使う予定の管理" at the bottom (一番下の管理欄から削除できます)

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
├── Code.gs                          # Google Apps Script backend
├── Index.html                       # Frontend UI
├── appsscript.json                  # Apps Script manifest (timezone, web app settings)
├── .clasp.json                      # clasp project config (script ID)
├── .claspignore                     # Only the 3 files above are pushed
├── .github/workflows/deploy-gas.yml # Auto deploy on merge to main
└── CLAUDE.md                        # Notes for Claude Code sessions
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
