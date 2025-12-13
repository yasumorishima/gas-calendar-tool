/**
 * ウェブアプリケーションのHTMLファイルを提供します。
 * この関数は、ユーザーがアプリにアクセスした際に自動的に呼び出されます。
 * @returns {GoogleAppsScript.HTML.HtmlOutput} HTMLファイルの内容
 */
function doGet() {
  // 'Index' HTMLファイルの名前で作成 (例: Index.html)
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 現在のウェブアプリユーザーのメール、イベントリスト。
 * ユーザー情報を取得していないイベント名リストを返します。
 * @returns {Object} ユーザーのメールアドレスとイベント名リストを含むオブジェクト
 */
function getCurrentUserEmailAndEventNames() {
  try {
    var userEmail = Session.getActiveUser().getEmail();
    var eventNames = []; // { name: "例1", isAllDay: true, startTime: "", endTime: "", eventColor: "" }]
    
    if (userEmail) {
      var userProperties = PropertiesService.getUserProperties();
      var storedNamesJson = userProperties.getProperty('savedEventNames');
      if (storedNamesJson) {
        eventNames = JSON.parse(storedNamesJson);
      }
    }
    
    return { userEmail: userEmail, eventNames: eventNames };
  } catch (e) {
    Logger.log('ユーザー情報とイベントリストの取得中にエラーが発生しました: ' + e.message);
    // エラーが発生した場合でも、部分的に情報を返す
    return { userEmail: Session.getActiveUser().getEmail() || "", eventNames: [] };
  }
}

/**
 * ユーザーのイベントリストに新しいイベント名を追加します。
 * @param {Object} newEventDetails 追加するイベントの詳細 { name: string, isAllDay: boolean, startTime: string, endTime: string, eventColor: string }
 * @returns {Object[]} 更新されたイベント名リスト
 */
function addEventNames(newEventDetails) {
  var userEmail = Session.getActiveUser().getEmail();
  if (!userEmail) {
    throw new Error('ユーザーが認証されていません。');
  }
  
  var userProperties = PropertiesService.getUserProperties();
  var storedNamesJson = userProperties.getProperty('savedEventNames');
  var eventNames = [];
  
  if (storedNamesJson) {
    eventNames = JSON.parse(storedNamesJson);
  }
  
  // 重複チェック（名前のみの場合をとりあえず確認）
  var nameExists = eventNames.some(function(item) {
    return item.name === newEventDetails.name;
  });
  
  if (!nameExists) {
    eventNames.push(newEventDetails);
    userProperties.setProperty('savedEventNames', JSON.stringify(eventNames));
  }
  
  return eventNames;
}

/**
 * ユーザーのイベントリストから指定されたイベントを検索します。
 * @param {string} nameToDelete 削除するイベント名（名前で確認）
 * @returns {Object[]} 更新されたイベント名リスト
 */
function deleteEventNameFromList(nameToDelete) {
  var userEmail = Session.getActiveUser().getEmail();
  if (!userEmail) {
    throw new Error('ユーザーが認証されていません。');
  }
  
  var userProperties = PropertiesService.getUserProperties();
  var storedNamesJson = userProperties.getProperty('savedEventNames');
  var currentNames = [];
  
  if (storedNamesJson) {
    currentNames = JSON.parse(storedNamesJson);
  }
  
  var updatedNames = currentNames.filter(function(item) {
    return item.name !== nameToDelete; // 名前でフィルタリング
  });
  
  userProperties.setProperty('savedEventNames', JSON.stringify(updatedNames));
  
  return updatedNames;
}

/**
 * ユーザーのイベントリストから該当するイベントを検索します。
 * @param {string} eventName 取得するイベント名
 * @returns {Object|null} 更新されたイベント詳細またはnull
 */
function getEventNameDetails(eventName) {
  var userEmail = Session.getActiveUser().getEmail();
  if (!userEmail) {
    throw new Error('ユーザーが認証されていません。');
  }
  
  var userProperties = PropertiesService.getUserProperties();
  var storedNamesJson = userProperties.getProperty('savedEventNames');
  
  if (storedNamesJson) {
    var currentNames = JSON.parse(storedNamesJson);
    var existingEvent = currentNames.find(function(item) {
      return item.name === eventName;
    });
    return existingEvent || null;
  }
  return null;
}

/**
 * ウェブアプリケーションの日付取得を行われ、Googleカレンダーにイベントを追加します。
 * @param {string} calendarId イベントを追加するカレンダーのID（メールアドレス形式）
 * @param {string} month イベントを追加する月（YYYY-MM形式）
 * @param {string} days イベントを追加する日付の配列（例: ['1', '5', '10']）
 * @param {string} eventTitle イベントのタイトル
 * @param {boolean} isAllDay 終日イベントかどうか
 * @param {string} startTimeStr 開始時間の文字列（HH:MM形式）
 * @param {string} endTimeStr 終了時間の文字列（HH:MM形式）
 * @param {string} eventColor イベントの色（例: 'BLUE', 'RED'）
 * @returns {string} 処理結果のメッセージ
 */
function addEventsToCalendarDirectly(calendarId, month, days, eventTitle, isAllDay, startTimeStr, endTimeStr, eventColor) {
  try {
    var calendar = CalendarApp.getCalendarById(calendarId);
    if (!calendar) {
      throw new Error('指定されたカレンダーID発見ができません: ' + calendarId + '。正しいメールアドレスを入力してください。');
    }
    
    var addedCount = 0;
    days.forEach(function(day) {
      // YYYY-MM-DD 形式の日付文字列を作成
      var dateString = month + '-' + String(day).padStart(2, '0');
      
      var baseDate = new Date(dateString); // 日付分の分
      
      var eventStart;
      var eventEnd;
      
      if (isAllDay) {
        // 終日イベントの場合
        eventStart = new Date(baseDate);
        eventStart.setHours(0, 0, 0, 0); // その日の00時00分00秒に設定
        eventEnd = new Date(baseDate);
        eventEnd.setHours(23, 59, 59, 999); // その日の23時59分59秒999ミリ秒に設定
      } else {
        // 時間指定イベントの場合
        var startTimeParts = startTimeStr.split(':');
        var endTimeParts = endTimeStr.split(':');
        var startHour = parseInt(startTimeParts[0]);
        var startMinute = parseInt(startTimeParts[1]);
        var endHour = parseInt(endTimeParts[0]);
        var endMinute = parseInt(endTimeParts[1]);
        
        eventStart = new Date(baseDate);
        eventStart.setHours(startHour, startMinute, 0, 0);
        
        eventEnd = new Date(baseDate);
        eventEnd.setHours(endHour, endMinute, 0, 0);
      }
      
      // 終了時間が開始時間より前の場合、翌日に設定する（例: 23:00 - 01:00）
      if (eventEnd.getTime() < eventStart.getTime()) {
        eventEnd.setDate(eventEnd.getDate() + 1);
      }
      
      // 既存のイベントを検索（部分一致）
      var searchStartTime = new Date(baseDate);
      searchStartTime.setHours(0, 0, 0, 0);
      var searchEndTime = new Date(baseDate);
      searchEndTime.setHours(23, 59, 59, 999);
      var events = calendar.getEvents(searchStartTime, searchEndTime, { search: eventTitle });
      
      // 完全一致するタイトルのイベントがあるか確認
      var eventExists = false;
      events.forEach(function(existingEvent) {
        if (existingEvent.getTitle() === eventTitle) {
          eventExists = true;
        }
      });
      
      // イベントが存在しないリスト仕込み
      if (!eventExists) {
        var newEvent;
        if (isAllDay) {
          newEvent = calendar.createAllDayEvent(eventTitle, baseDate);
        } else {
          newEvent = calendar.createEvent(eventTitle, eventStart, eventEnd);
        }
        
        // イベントの色を設定（修正版：対応色のみ処理）
        Logger.log('Received eventColor for setting: ' + eventColor);
        if (eventColor && isValidEventColor(eventColor)) {
          try {
            newEvent.setColor(CalendarApp.EventColor[eventColor]);
            Logger.log('Color set successfully to: ' + eventColor);
          } catch (colorError) {
            Logger.log('Color setting failed: ' + colorError.message + ', eventColor: ' + eventColor);
            // 色設定に失敗してもイベントは作成する
          }
        } else {
          Logger.log('Invalid or empty eventColor: "' + eventColor + '"');
        }
        
        addedCount++;
      }
    });
    
    return addedCount + '件のイベントをカレンダーに追加しました。';
  } catch (e) {
    Logger.log('イベント追加中にエラーが発生しました: ' + e.message);
    throw new Error('イベントの追加中にエラーが発生しました: ' + e.message);
  }
}

/**
 * 指定された色がGoogleカレンダーでサポートされているかチェックします。
 * レポートで定義された有効な色のみを許可します。
 * @param {string} eventColor 確認する色名
 * @returns {boolean} 有効な色かどうか
 */
function isValidEventColor(eventColor) {
  // レポートで定義された有効な色リスト（BROWN, LIGHT_BLUEなどの未対応色を除外）
  var validColors = [
    'LAVENDER',  // ID: 1, ラベンダー
    'SAGE',      // ID: 2, セージ
    'PURPLE',    // ID: 3, ブドウ(紫)
    'PINK',      // ID: 4, フラミンゴ(ピンク)
    'YELLOW',    // ID: 5, バナナ(黄)
    'ORANGE',    // ID: 6, ミカン(オレンジ)
    'CYAN',      // ID: 7, ピーコック(水色)
    'GREY',      // ID: 8, グラファイト(グレー)
    'BLUE',      // ID: 9, ブルーベリー(青)
    'GREEN',     // ID: 10, バジル(緑)
    'RED'        // ID: 11, トマト(赤)
  ];
  
  return validColors.indexOf(eventColor) !== -1;
}
