
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
  '