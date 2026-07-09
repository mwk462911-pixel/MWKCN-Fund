// =========================================================================
// [ส่วนที่แก้ไขใหม่] API Gateway สำหรับเชื่อมต่อกับ GitHub Pages
// =========================================================================

function doGet(e) {
  var action = e.parameter.action;
  var result = {};
  
  try {
    if (action === 'getSheetNames') {
      result = getSheetNames();
    } else if (action === 'getData') {
      result = getSheetDataWithCashStatus(e.parameter.sheetName);
    } else if (action === 'confirmCashPayment') {
      result = confirmCashPayment(e.parameter.sheetName, e.parameter.studentId);
    } else if (action === 'cancelCashPayment') {
      result = cancelCashPayment(e.parameter.sheetName, e.parameter.studentId);
    } else if (action === 'saveAdminNote') {
      result = saveAdminNote(e.parameter.sheetName, e.parameter.id, e.parameter.note);
    } else if (action === 'toggleAttendance') {
      result = toggleAttendance(e.parameter.sheetName, e.parameter.id);
    } else if (action === 'setBroadcast') {
      result = setBroadcast(e.parameter.msg);
    } else if (action === 'addExpense') {
      result = addExpense(e.parameter.sheetName, e.parameter.title, e.parameter.amount);
    } else if (action === 'checkAdminAuth') {
      result = checkAdminAuth(e.parameter.password);
    } else if (action === 'getPaymentDeadline') {
      result = getPaymentDeadline();
    } else if (action === 'saveRuleViolation') {
      result = saveRuleViolation(e.parameter.studentId, e.parameter.studentName, e.parameter.ruleType, e.parameter.count, e.parameter.otherDetail);
    } else if (action === 'getRuleViolations') {
      result = getRuleViolations();
    } else {
      var now = new Date();
      var bangkokTime = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
      var day = bangkokTime.getDay();
      result = { 
        maintenance: (day === 6 || day === 0), 
        status: 'online',
        message: 'MWKCN API is ready' 
      };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// -------------------------------------------------------------------------
// [ส่วนเดิม] ฟังก์ชันดั้งเดิมของระบบ
// -------------------------------------------------------------------------
// ส่วนที่ 1: ระบบควบคุม Interface & Web App Gateway (แกนหลักหลังบ้านของแก)
// =========================================================================


function doGet_original(e) {
// -----------------------------------------------------------------------
// [ระบบเพิ่มใหม่] ตรวจสอบปิดปรับปรุงอัตโนมัติ (หลังศุกร์ 23:59:59 - จันทร์ 00:00:00)
// -----------------------------------------------------------------------
var now = new Date();
// แปลงให้เป็นเวลาฝั่งประเทศไทยอย่างแม่นยำ ไม่ว่า Server จะอยู่ที่ไหน
var bangkokTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Bangkok"}));
var day = bangkokTime.getDay();  // 0 = วันอาทิตย์, 1 = วันจันทร์, 6 = วันเสาร์
 // ถ้าเป็นวันเสาร์ (6) หรือ วันอาทิตย์ (0) ให้ตัดเข้าหน้าปิดปรับปรุงทันที
if (day === 6 || day === 0) {
 return HtmlService.createHtmlOutput(
   '<!DOCTYPE html>' +
   '<html lang="th">' +
   '<head>' +
   '<meta charset="UTF-8">' +
   '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
    '<title>ระบบปิดปรับปรุงชั่วคราว</title>'  +
   '<style>' +
   '  body { background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%); color: white; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; padding: 20px; box-sizing: border-box; overflow: hidden; }' +
   '  /* ========== MINIMAL SVG HOURGLASS ANIMATION (ลูกเล่นวิดีโอมินิมัล) ========== */'  +
   '  .video-icon-wrapper { display: flex; justify-content: center; align-items: center; margin-bottom: 25px; }' +
   '  .hourglass-svg { width: 85px; height: 85px; animation: svgRotate 4s cubic-bezier(0.77, 0, 0.175, 1) infinite; }' +
   '  .hourglass-frame { fill: none; stroke: #ffffff; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }' +
   '  .hourglass-sand-top { fill: rgba(255, 255, 255, 0.85); animation: sandTopHide 4s linear infinite; transform-origin: 40px 40px; }' +
   '  .hourglass-sand-bottom { fill: rgba(255, 255, 255, 0.85); animation: sandBottomShow 4s linear infinite; transform-origin: 40px 40px; }' +
   '  .hourglass-line { stroke: rgba(255, 255, 255, 0.65); stroke-width: 2.5; stroke-dasharray: 4 4; animation: sandLineFlow 4s linear infinite; }' +
   '  @keyframes svgRotate { 0%, 85% { transform: rotate(0deg); } 100% { transform: rotate(180deg); } }' +
   '  @keyframes sandTopHide { 0% { transform: scaleY(1); opacity: 1; } 40%, 100% { transform: scaleY(0); opacity: 0; } }' +
   '  @keyframes sandBottomShow { 0%, 5% { transform: scaleY(0); } 45%, 85% { transform: scaleY(1); } 100% { transform: scaleY(1); } }' +
   '  @keyframes sandLineFlow { 0% { stroke-dashoffset: 0; opacity: 1; } 40% { stroke-dashoffset: -20; opacity: 1; } 42%, 100% { opacity: 0; } }' +
   '  /* ========================================================================= */' +
   '  h1 { font-weight: 900; letter-spacing: -1px; background: linear-gradient(135deg, #ffffff 30%, #888888 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 10px 0; font-size: 2.2rem; }' +
   '  p { color: #8e8e93; font-size: 1.1rem; max-width: 450px; line-height: 1.6; font-weight: 300; margin: 0; }' +
   '  .highlight { color: #007AFF; font-weight: 700; }' +
   '</style>' +
   '</head>' +
   '<body>' +
   '  ' +
   '  <div class="video-icon-wrapper">' +
   '      <svg class="hourglass-svg" viewBox="0 0 80 80">' +
   '          <path class="hourglass-frame" d="M25,15 L55,15 L55,20 C55,32 46,38 41,40 C46,42 55,48 55,60 L55,65 L25,65 L25,60 C25,48 34,42 39,40 C34,38 25,32 25,20 Z" />' +
   '          <path class="hourglass-sand-top" d="M27,20 L53,20 C53,30 46,36 40,39 C34,36 27,30 27,20 Z" />' +
   '          <path class="hourglass-sand-bottom" d="M27,60 L53,60 C53,62 53,64 53,64 L27,64 C27,64 27,62 27,60 Z" />' +
   '          <line class="hourglass-line" x1="40" y1="39" x2="40" y2="61" />' +
   '      </svg>' +
   '  </div>' +
    '  <h1>ระบบปิดปรับปรุงชั่วคราวประจำสัปดาห์</h1>' +
    '  <p>ระบบ Class Fund ปิดให้บริการทุกวันเสาร์และอาทิตย์<br>และจะกลับมาเปิดใช้งานอีกครั้งใน <span class="highlight">วันจันทร์ เวลา 00:00 น.</span></p>' +
   '</body>' +
   '</html>'
 )
 .setTitle( 'ระบบปิดปรับปรุง - MWKCN' )
 .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
 .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}


// -----------------------------------------------------------------------
// โครงสร้างการทำงานปกติเมื่ออยู่ในวันจันทร์ - วันศุกร์
// -----------------------------------------------------------------------
var page = e.parameter.page || 'Index';
if (page === 'admin') {
 return HtmlService.createTemplateFromFile('Admin').evaluate()
   .setTitle('MWKCN Admin Portal')
   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
   .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
if (page === 'violation') {
 return HtmlService.createTemplateFromFile('Violation').evaluate()
   .setTitle( 'บันทึกทำผิดกฎ - MWKCN' )
   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
   .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
return HtmlService.createTemplateFromFile('Index').evaluate()
 .setTitle('MWKCN Class Fund Dashboard')
 .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
 .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}


function getScriptUrl() { return ScriptApp.getService().getUrl(); }


function getSheetNames() {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheets = ss.getSheets();
var names = [];
var allowedSheets = [ "ค่าห้อง + ค่าปรับ" ,  "คนที่ค้างชำระ ค่าห้อง + ค่าปรับ" ,  "ค่าห้อง" ,  "ปรับเงิน" ];
for (var i = 0; i < sheets.length; i++) {
 var name = sheets[i].getName();
 if (allowedSheets.indexOf(name) !== -1) names.push(name);
}
return names;
}


function getSheetDataWithCashStatus(sheetName) {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName(sheetName);
if (!sheet) return {values: [], cashPaidIds: {}, adminNotes: {}, attendance: {}, broadcast: "", expenses: []};
var data = sheet.getDataRange().getValues();
var props = PropertiesService.getScriptProperties();
return {
 values: data,
 cashPaidIds: JSON.parse(props.getProperty('CASH_PAYMENTS_' + sheetName) || '{}'),
 adminNotes: JSON.parse(props.getProperty('ADMIN_NOTES_' + sheetName) || '{}'),
 attendance: JSON.parse(props.getProperty('ATTENDANCE_' + sheetName) || '{}'),
 broadcast: props.getProperty('BROADCAST_MSG') || "",
 expenses: JSON.parse(props.getProperty('EXPENSES_' + sheetName) || '[]')
};
}


function confirmCashPayment(sheetName, studentId) {
var props = PropertiesService.getScriptProperties();
var key = 'CASH_PAYMENTS_' + sheetName;
var paidList = JSON.parse(props.getProperty(key) || '{}');
paidList[studentId] = true;
props.setProperty(key, JSON.stringify(paidList));
return {success: true};
}


function cancelCashPayment(sheetName, studentId) {
var props = PropertiesService.getScriptProperties();
var key = 'CASH_PAYMENTS_' + sheetName;
var paidList = JSON.parse(props.getProperty(key) || '{}');
delete paidList[studentId];
props.setProperty(key, JSON.stringify(paidList));
return {success: true};
}


function saveAdminNote(sheetName, id, note) {
var props = PropertiesService.getScriptProperties();
var key = 'ADMIN_NOTES_' + sheetName;
var notes = JSON.parse(props.getProperty(key) || '{}');
notes[id] = note;
props.setProperty(key, JSON.stringify(notes));
return true;
}


function toggleAttendance(sheetName, id) {
var props = PropertiesService.getScriptProperties();
var key = 'ATTENDANCE_' + sheetName;
var att = JSON.parse(props.getProperty(key) || '{}');
att[id] = !att[id];
props.setProperty(key, JSON.stringify(att));
return att[id];
}


function setBroadcast(msg) {
PropertiesService.getScriptProperties().setProperty('BROADCAST_MSG', msg);
return true;
}


function addExpense(sheetName, title, amount) {
var props = PropertiesService.getScriptProperties();
var key = 'EXPENSES_' + sheetName;
var expenses = JSON.parse(props.getProperty(key) || '[]');
expenses.push({title: title, amount: amount, date: new Date().toLocaleDateString('th-TH')});
props.setProperty(key, JSON.stringify(expenses));
return true;
}


function updateAdminPass(newPass) {
PropertiesService.getScriptProperties().setProperty('ADMIN_PASS', newPass);
return true;
}


function checkAdminAuth(password) {
var props = PropertiesService.getScriptProperties();
var savedPass = props.getProperty('ADMIN_PASS') || "0000";
return password === savedPass;
}


function cancelAllCashPayments(sheetName) {
var props = PropertiesService.getScriptProperties();
var key = 'CASH_PAYMENTS_' + sheetName;
props.setProperty(key, '{}');
return {success: true};
}


function runWeeklyAutomaticRebalance() {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var roomSheet = ss.getSheetByName( "ค่าห้อง" );


// =========================================================================
// ส่วนลูปจัดการย้ายเลข 0 ค้างชำระเดิมเข้าคอลัมน์สัปดาห์ก่อนหน้า (H:Q) อัตโนมัติ
// =========================================================================
if (roomSheet) {
 var currentRange = roomSheet.getRange("S2:AQ42");
 var currentValues = currentRange.getValues();
 var historyRange = roomSheet.getRange("H2:Q42");
 var historyValues = historyRange.getValues();
  for (var r = 0; r < currentValues.length; r++) {
   for (var c = 0; c < currentValues[r].length; c++) {
     var cellValue = currentValues[r][c];
  
     if (cellValue === 0 && cellValue !== "") {
       for (var h = 0; h < historyValues[r].length; h++) {
         if (historyValues[r][h] === "" || historyValues[r][h] === null) {
           roomSheet.getRange(2 + r, 8 + h).setValue(0);
           roomSheet.getRange(2 + r, 19 + c).clearContent();
           break;
         }
       }
     }
   }
 }
 Logger.log( "ทำการย้ายเลข 0 ค้างชำระเดิมเข้าคอลัมน์สัปดาห์ก่อนหน้าเรียบร้อยแล้วค่ะแก!" );
}
}


// =========================================================================
// ฟังก์ชันสำหรับส่งค่าเวลา Countdown วันศุกร์ 23:59:59 ไปแสดงผลที่หน้าจอ
// =========================================================================
function getPaymentDeadline() {
const now = new Date();
const dayOfWeek = now.getDay();
let friday = new Date(now);


if (dayOfWeek === 6) {
 friday.setDate(now.getDate() + 6);
} else if (dayOfWeek === 0) {
 friday.setDate(now.getDate() + 5);
} else {
 friday.setDate(now.getDate() + ((5 - dayOfWeek + 7) % 7));
}


friday.setHours(23);
friday.setMinutes(59);
friday.setSeconds(59);


return friday.getTime();
}


// =========================================================================
// ฟีเจอร์ที่ 10: ระบบบันทึกการทำผิดกฎ (แก้ไขเรื่องบันทึก Date Object แทน String พ.ศ.)
// =========================================================================
function saveRuleViolation(studentId, studentName, ruleType, count, otherDetail) {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheetName =  "ระบบบันทึกการทำผิดกฎ" ;
var sheet = ss.getSheetByName(sheetName);
 if (!sheet) {
  sheet = ss.insertSheet(sheetName);
  sheet.appendRow([ "วันที่บันทึก" ,  "เลขที่" ,  "ชื่อ-นามสกุล" ,  "รายการทำผิด" ,  "รายละเอียดเพิ่มเติม" ,  "จำนวนครั้ง (รวม)" ]);
  sheet.getRange("A1:F1").setFontWeight("bold").setBackground("#f3f3f3");
}
// 🌟 แก้จุดที่ 1: ใช้ Date Object จริงๆ แทน String พ.ศ. เพื่อป้องกันชีตตีความ ค.ศ. เพี้ยนในภายหลัง
var dateObj = new Date();
var finalRule = ruleType ===  "อื่นๆ"  ?  "อื่นๆ: "  + otherDetail : ruleType;
  // ตรวจสอบว่ามีข้อมูลของนักเรียนคนนี้ในรายการความผิดประเภทเดียวกันหรือไม่
var data = sheet.getDataRange().getValues();
var found = false;
var totalCount = parseInt(count);
 for (var i = 1; i < data.length; i++) {
   // ตรวจสอบเลขที่ และ รายการทำผิด (ถ้าเป็น "อื่นๆ" จะตรวจสอบชื่อเต็มของกฎ)
  if (data[i][1].toString() === studentId.toString() && data[i][3] === finalRule) {
    totalCount = parseInt(data[i][5]) + parseInt(count);
    sheet.getRange(i + 1, 6).setValue(totalCount);
    sheet.getRange(i + 1, 1).setValue(dateObj);  // อัปเดตวันที่ล่าสุดเป็น Date Object
    found = true;
    break;
  }
}
 if (!found) {
  sheet.appendRow([dateObj, studentId, studentName, finalRule, otherDetail || "-", totalCount]);
}
  // เรียงลำดับข้อมูลตามเลขที่
if (sheet.getLastRow() > 1) {
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6);
  range.sort([{column: 2, ascending: true}]);
}
 return {success: true, message:  "บันทึกข้อมูลเรียบร้อยแล้ว" , totalCount: totalCount};
}


// =========================================================================
// ดึงประวัติทำผิดกฎ (แก้ไขตรวจสอบเพื่อลดบั๊ก 3112 ที่มาจาก 2569+543 ของชีต)
// =========================================================================
function getRuleViolations() {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName( "ระบบบันทึกการทำผิดกฎ" );
if (!sheet) return [];
var data = sheet.getDataRange().getValues();
var headers = data.shift();  // เอาแถวหัวตารางออก
  // สร้าง array ของ object สำหรับการแสดงผล
var violations = [];
for (var i = 0; i < data.length; i++) {
  var rawDate = data[i][0];
  var dateStr = "-";
 
  // 🌟 แก้จุดที่ 2: ดักจับและซ่อมแซมประวัติวันที่ที่เพี้ยนปี 3112 ให้กลับมาเป็นปีปกติ
  if (rawDate instanceof Date) {
    var yr = rawDate.getFullYear();
    // ป้องกันกรณีระบบบันทึกเก่ามอง พ.ศ. 2569 เป็น ค.ศ. 2569 ทับซ้อน
    if (yr > 2400) {
      rawDate.setFullYear(yr - 543);
    }
    // ฟอร์แมตออกรายงานให้เป็นระบบ ว/ด/พ.ศ. (บวกปีไทยในขั้นตอนสุดท้ายอย่างถูกต้อง)
    dateStr = Utilities.formatDate(rawDate, "Asia/Bangkok", "d/M/") + (rawDate.getFullYear() + 543);
  } else if (typeof rawDate === 'string' && rawDate.trim() !== "") {
    var parts = rawDate.split('/');
    if (parts.length === 3) {
      var d = parseInt(parts[0], 10);
      var m = parseInt(parts[1], 10);
      var y = parseInt(parts[2], 10);
      // แก้ปัญหาซ้ำซ้อน 3112 -> 2569
      if (y > 3000) {
        y -= 543;
      }
      dateStr = d + "/" + m + "/" + y;
    } else {
      dateStr = rawDate;
    }
  } else {
    dateStr = String(rawDate || "-");
  }


  violations.push({
    date: dateStr,
    id: data[i][1],
    name: data[i][2],
    rule: data[i][3],
    detail: data[i][4],
    count: data[i][5]
  });
}
return violations;
}
