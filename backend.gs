
/**
 * MWKCN API Gateway v2.0 (Migration for GitHub Pages)
 * รองรับฟังก์ชัน: ดึงข้อมูล, บันทึกเงินสด, บันทึกโน้ต, เช็คชื่อ, จัดการรายจ่าย, ระบบระเบียบวินัย
 */

function doGet(e) {
  var action = e.parameter.action;
  var result = {};
  
  try {
    if (action === 'getSheetNames') {
      result = getSheetNames();
    } else if (action === 'getData' || action === 'getSheetDataWithCashStatus') {
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
    } else if (action === 'getScriptUrl') {
      result = ScriptApp.getService().getUrl();
    } else {
      // Default: เช็คสถานะการปิดปรับปรุง
      var now = new Date();
      var bangkokTime = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
      var day = bangkokTime.getDay();
      result = {
        maintenance: (day === 6 || day === 0),
        status: 'online',
        serverTime: bangkokTime.toString()
      };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// หมายเหตุ: ฟังก์ชันการทำงานหลัก (Logic) ทั้งหมดที่คุณมีในไฟล์เดิม 
// เช่น getSheetDataWithCashStatus, confirmCashPayment, saveRuleViolation ฯลฯ
// คุณต้องนำไปวางต่อท้ายในโปรเจกต์ Google Apps Script ของคุณเพื่อให้ API นี้เรียกใช้งานได้
