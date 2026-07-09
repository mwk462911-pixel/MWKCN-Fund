
// --- API Gateway for GitHub Pages ---
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
    } else {
      // Default: Return maintenance check or basic info
      var now = new Date();
      var bangkokTime = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
      var day = bangkokTime.getDay();
      result = { maintenance: (day === 6 || day === 0), status: 'online' };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// --- Original Functions ---
﻿รหัส.gs
// ส่วนที่ 1: ระบบควบคุม Interface & Web App Gateway (แกนหลักหลังบ้านของแก)
// =========================================================================




function doGet(e) {
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
