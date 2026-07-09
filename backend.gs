
// --- API Gateway for GitHub Pages ---
function doGet(e) {
  var action = e.parameter.action;
  var result = {};
  
  try {
    // เช็คสถานะการปิดปรับปรุง (เสาร์-อาทิตย์)
    var now = new Date();
    var bangkokTime = new Date(now.toLocaleString('en-US', {timeZone: 'Asia/Bangkok'}));
    var day = bangkokTime.getDay(); // 0=อาทิตย์, 6=เสาร์
    var isMaintenance = (day === 6 || day === 0);

    if (action === 'checkMaintenance') {
      result = { maintenance: isMaintenance, status: 'online', time: bangkokTime.toString() };
    } else if (isMaintenance && action !== 'checkAdminAuth') {
      // ถ้าอยู่ในช่วงปิดปรับปรุง และไม่ใช่การเช็คแอดมิน ให้บล็อก API อื่นๆ
      result = { maintenance: true, error: 'System is under weekly maintenance.' };
    } else if (action === 'getSheetNames') {
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
      result = { maintenance: isMaintenance, status: 'online' };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// หมายเหตุ: ฟังก์ชันอื่นๆ (getSheetNames, getSheetDataWithCashStatus, ฯลฯ) 
// ควรจะยังคงอยู่ในไฟล์ "รหัส.gs" หรือส่วนอื่นๆ ของโปรเจกต์ Apps Script ของคุณ
