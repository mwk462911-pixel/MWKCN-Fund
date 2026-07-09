
// --- GitHub Pages API Setup ---
// วาง URL ของ Google Apps Script Web App ที่คุณ Deploy ใหม่ที่นี่
const API_URL = 'https://script.google.com/macros/s/AKfycbypqNNQf4-HBcetryp5Gubjq556LuxzYSM_aokjRI-ks9s-sDF2gDONO8mAe6pQg6ey/exec';

async function callApi(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.append('action', action);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// แทนที่ระบบเดิมด้วย callApi

const google = {
  script: {
    run: {
      withSuccessHandler: function(callback) {
        this._successHandler = callback;
        return this;
      },
      withFailureHandler: function(callback) {
        this._failureHandler = callback;
        return this;
      },
      _call: async function(action, ...args) {
        const params = { action };
        // Mapping args to params based on function name
        if (action === 'getSheetData') params.sheetName = args[0];
        if (action === 'confirmCashPayment') { params.sheetName = args[0]; params.studentId = args[1]; }
        if (action === 'cancelCashPayment') { params.sheetName = args[0]; params.studentId = args[1]; }
        if (action === 'saveAdminNote') { params.sheetName = args[0]; params.id = args[1]; params.note = args[2]; }
        if (action === 'toggleAttendance') { params.sheetName = args[0]; params.id = args[1]; }
        if (action === 'setBroadcast') params.msg = args[0];
        if (action === 'addExpense') { params.sheetName = args[0]; params.title = args[1]; params.amount = args[2]; }
        if (action === 'checkAdminAuth') params.password = args[0];
        if (action === 'saveRuleViolation') { 
          params.studentId = args[0]; params.studentName = args[1]; params.ruleType = args[2]; 
          params.count = args[3]; params.otherDetail = args[4]; 
        }

        try {
          const result = await callApi(action, params);
          if (this._successHandler) this._successHandler(result);
        } catch (err) {
          if (this._failureHandler) this._failureHandler(err);
        }
      },
      getPaymentDeadline: function() { this._call('getPaymentDeadline'); },
      getSheetNames: function() { this._call('getSheetNames'); },
      getSheetData: function(a) { this._call('getSheetData', a); },
      getRuleViolations: function() { this._call('getRuleViolations'); },
      confirmCashPayment: function(a, b) { this._call('confirmCashPayment', a, b); },
      cancelCashPayment: function(a, b) { this._call('cancelCashPayment', a, b); },
      saveAdminNote: function(a, b, c) { this._call('saveAdminNote', a, b, c); },
      toggleAttendance: function(a, b) { this._call('toggleAttendance', a, b); },
      setBroadcast: function(a) { this._call('setBroadcast', a); },
      addExpense: function(a, b, c) { this._call('addExpense', a, b, c); },
      checkAdminAuth: function(a) { this._call('checkAdminAuth', a); },
      saveRuleViolation: function(a, b, c, d, e) { this._call('saveRuleViolation', a, b, c, d, e); }
    }
  }
};
function updateCountdown(){




// google.script.run
  .withSuccessHandler(function(deadline){




    setInterval(function(){




      const diff = deadline - Date.now();




      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;




      document.getElementById("countdownBox")
        .innerHTML =
        `${d} วัน ${h} ชม ${m} นาที ${s} วิ`;




    },1000);




  })
  .getPaymentDeadline();




}




window.addEventListener("load", function(){
updateCountdown();
});










const PROMPTPAY_ID = "0908870278";




const REPORT_SLIP_LINK = "https://lin.ee/w6UjWRo/~732gwoku";




































const nameMasterList = {
 "1": "นายอินทัช ฐิติโชติตระกูล",
 "2": "น.ส.พัชลา บุญเลิศทรัพย์ทวี",
 "3": "นายคุณานนท์ สามัคคีก่อสกุล",
 "4": "นายชินกฤต โยธิยา",
 "5": "น.ส.จิตรา จือเต๊าะ",
 "6": "น.ส.นฤมล เยอะเบียง",
 "7": "น.ส.ปานตะวัน เพียงคำ",
 "8": "น.ส.ฐิตาพร มาเยอะ",
 "9": "น.ส.โนรา โหว่ยคือ",
 "10": "น.ส.มยุรี มาเยอะ",
 "11": "น.ส.ณัชชา หมื่อแล",
 "12": "น.ส.อพิญญา ศรีวิชัย",
 "13": "นายอนุรักษ์ แซ่ว่าง",
 "14": "น.ส.ดวงกมล มั่นคง",
 "15": "น.ส.มรกต ซางสุภาพ",
 "16": "น.ส.ติยนันท์ ฦาชา",
 "17": "น.ส.กนกภรณ์ โสภณสุนทรเลิศ",
 "18": "น.ส.ณนิดา แซ่เติ๋ง",
 "19": "นายวิโรจน์ เยอแจะ",
 "20": "น.ส.ทองดี เรือนเเก้ว",
 "21": "นายทักษ์ดนัย โชคชัยรัตนกุล",
 "22": "นวพล สว่างถาวรกุล",
 "23": "นายรัชชานนท์ เหวยเหยอกู่",
 "24": "นายศุภกิจ แซ่หู่",
 "25": "น.ส.กชกร เหลาเหยา",
 "26": "น.ส.กัญญาพร อามอ",
 "27": "น.ส.ณิชากร อายี",
 "28": "น.ส.ธิดารัตน์ ละเชกุ",
 "29": "น.ส.นาธาร์ แลเชอ",
 "30": "น.ส.เนาวรัตน์ เชอหมื่อ",
 "31": "น.ส.เพชรรดา สีไอ้",
 "32": "น.ส.ภัคจีรา แซ่เห่อ",
 "33": "น.ส.สุปวีณ์ ขันอุละ",
 "34": "น.ส.ภัทรมล สหพรสันติสุข",
 "35": "น.ส.ธัญญลักษณ์ ทาเกิด",
 "36": "น.ส.วราภรณ์ เชอกอง",
 "37": "น.ส.ณัชนันท์ คำปวน",
 "38": "น.ส.กนกรดา มูเซอ",
 "39": "น.ส.นิชดา อาซอ",
 "40": "นายสุรเชษฐ์ กัลยา" 
};




let fullData = []; let columnsToShow = [];




let loaderInterval;




































function startLoaderAnimation() {




const messages = ["กำลังดาวน์โหลดข้อมูล..."];




let index = 0; document.getElementById('loader-text').innerText = messages[0]; document.getElementById('loader').style.display = 'flex';




loaderInterval = setInterval(() => { index = (index + 1) % messages.length; document.getElementById('loader-text').innerText = messages[index]; }, 800);




}




function stopLoaderAnimation() { clearInterval(loaderInterval); document.getElementById('loader').style.display = 'none'; }




































function loadData() {




const loader = document.getElementById('loader');




if (loader) loader.style.display = 'flex';




































// ระบบปลดล็อกนิรภัย: บังคับปิดโหลดใน 6 วินาที ป้องกันหน้าจอค้างกดไม่ได้




const safetyTimeout = setTimeout(() => {




if (loader) loader.style.display = 'none';




}, 6000);




































// google.script.run
.withSuccessHandler(data => {
 clearTimeout(safetyTimeout); // ปิดระบบนิรภัยเมื่อโหลดเสร็จ
 if (loader) loader.style.display = 'none';
  if (data && data.length > 0) {
   fullData = data;
   processColumns(data[0]);
   document.getElementById('updateBadge').innerText = `ซิงค์ล่าสุด: ${new Date().toLocaleTimeString('th-TH')} น.`;
  
   // โหลดข้อมูลความผิดก่อน render
   // google.script.run.withSuccessHandler(vData => {
     allViolationsData = vData;
     const currentSheet = document.getElementById('sheetSelect').value;
     const autoShowSheets = ["ค่าห้องและปรับเงิน", "รวม"];
     if (autoShowSheets.includes(currentSheet)) {
       renderCards(data, false);
     } else {
       resetSearch();
     }
   }).getRuleViolations();
   return;




















       // การแสดงผลย้ายไปทำหลังจากโหลดข้อมูลความผิดเสร็จแล้วด้านบน




 }




})




.withFailureHandler(err => {




 clearTimeout(safetyTimeout);




 if (loader) loader.style.display = 'none';




 alert("เกิดข้อผิดพลาด: " + err);




})




.getSheetData(document.getElementById('sheetSelect').value);




}




































function processColumns(headers) { columnsToShow = []; headers.forEach((h, i) => { if (h.trim() !== "") columnsToShow.push(i); }); }




































function handleSearchInput(input) {




let val = input.value.trim().toLowerCase();




const btn = document.getElementById('searchBtn');




const suggestBox = document.getElementById('suggestBox');




if (val !== "") { btn.classList.add('has-val'); } else { btn.classList.remove('has-val'); suggestBox.style.display = 'none'; return; }




let matches = [];




for (let id in nameMasterList) {




let name = nameMasterList[id];




if (id.startsWith(val) || name.toLowerCase().includes(val)) {




 matches.push({ id: id, name: name });




}




}




if(matches.length > 0) {




suggestBox.innerHTML = matches.map(m => `




 <div class="suggest-item" onclick="selectSuggestion('${m.id}')">




   <span>${m.name}</span>




   <span class="badge">เลขที่ ${m.id}</span>




 </div>




`).join('');




suggestBox.style.display = 'block';




} else {




suggestBox.style.display = 'none';




}




}




































function selectSuggestion(id) {




document.getElementById('searchId').value = id;




document.getElementById('suggestBox').style.display = 'none';




applySearch();




}




































function renderCards(rows, isSearch = false) {




let container = document.getElementById('cardContainer');




container.innerHTML = "";




if(rows.length <= 1) {




container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-circle-exclamation mb-2"></i><br>ไม่พบข้อมูลของนักเรียนคนนี้</div>`;




return;




}




let cardCount = 0;




let activeSheetName = document.getElementById('sheetSelect').value || "ห้องเรียน";








































for (let i = 1; i < rows.length; i++) {
  let row = rows[i]; if (row.join("").trim() === "") continue;
  cardCount++;
  let card = document.createElement('div');
  card.id = "card-index-" + i;
  card.className = isSearch ? "student-card pop-search-animation" : "student-card";
  let studentNo = row[0].toString().trim();
  let studentName = (row[2] || "") + (row[3] || "") + " " + (row[4] || "");
  if(!row[3]) studentName = nameMasterList[studentNo] || "ไม่ทราบชื่อ";
  let cardHtmlInner = "";
  let studentNameHtml = "";
  let codableDebtAmount = 0;
  let isPaidComplete = false;
   let studentViolationCount = 0;
  if (allViolationsData && allViolationsData.length > 0) {
    const filtered = allViolationsData.filter(v => v.id.toString() === studentNo);
    filtered.forEach(v => studentViolationCount += parseInt(v.count));
  }


  columnsToShow.forEach((colIdx, order) => {




 let label = rows[0][colIdx].trim();




 let value = row[colIdx] != null ? row[colIdx].toString().trim() : "-";




 let isLast = (order === columnsToShow.length - 1);




  if (order === 0) {




   cardHtmlInner += `<div class="mb-2" style="padding-right: 10px;"><span class="badge-no">เลขที่: ${value}</span></div>`;




 } else {




   if (label.includes("ชื่อ")) {




     value = nameMasterList[row[0].toString().trim()] || value;




     studentName = value;




     studentNameHtml = `<div class="card-title-name">${value}</div>`;




     return;




   }








   let isMoney = /^[0-9,.-]+$/.test(value) || label.includes("เงิน") || label.includes("ยอด") || label.includes("บาท");




   let valueClass = isMoney ? "data-value money-value" : "data-value";








   if (isLast) {




     let cleanValue = value.replace(/,/g, '').trim();




     let parsedValue = parseFloat(cleanValue);




     if (cleanValue === "0" || cleanValue === "0.00" || cleanValue === "-" || cleanValue === "จ่ายแล้ว" || cleanValue === "ครบแล้ว" || parsedValue === 0) {




       isPaidComplete = true;




     } else if (!isNaN(parsedValue) && parsedValue > 0) {




       codableDebtAmount = parsedValue;




     }




     let highlightClass = isPaidComplete ? "last-row-success" : "last-row-warning";




     cardHtmlInner += `<div class="data-row ${highlightClass}"><span class="data-label">${label}</span><span class="${valueClass}">${value}</span></div>`;




   } else {




     cardHtmlInner += `<div class="data-row"><span class="data-label">${label}</span><span class="${valueClass}">${value}</span></div>`;




   }




 }




});




// เอาปุ่มแชร์ขวาบนออกแล้ว เหลือเฉพาะตัว Watermark ลายน้ำพรีเมียม




let finalHtml = `<div class="card-watermark">MWKCN</div>`;




let insertIndex = cardHtmlInner.indexOf('</div>') + 6;




cardHtmlInner = cardHtmlInner.slice(0, insertIndex) + studentNameHtml + cardHtmlInner.slice(insertIndex);




// โซนปุ่มเอกสาร/จ่ายเงิน ด้านล่างการ์ด




cardHtmlInner += `<div class="card-actions-area">`;




   let isCashPaid = cashPaidIds[studentNo];
  if (isPaidComplete || isCashPaid) {
    let cashLabel = isCashPaid ? '<div class="cash-status-label mb-2"><i class="fa-solid fa-check-circle me-2"></i>ชำระเงินสดเรียบร้อยแล้ว</div>' : '';
    cardHtmlInner += cashLabel;
  }
 
  if (studentViolationCount > 0) {
    let isDanger = studentViolationCount >= 5;
    let violationClass = isDanger ? 'violation-status-label danger' : 'violation-status-label';
    let violationIcon = isDanger ? 'fa-triangle-exclamation' : 'fa-circle-exclamation';
    cardHtmlInner += `<div class="${violationClass} mb-2"><i class="fa-solid ${violationIcon} me-2"></i>ทำผิดกฎรวม: ${studentViolationCount} ครั้ง</div>`;
  }
   if (isPaidComplete || isCashPaid) {




 // ชำระเงินครบถ้วน -> ออกใบเสร็จรับเงินสีเขียวพรีเมียม พร้อมปุ่มส่ง LINE




 cardHtmlInner += `




   <div style="display: flex; flex-direction: column; gap: 8px;">




     <button class="btn-doc-premium type-receipt" onclick="generateDocument('${studentName}', '${studentNo}', '${activeSheetName}', 0, 'RECEIPT')">




       <i class="fa-solid fa-receipt"></i> ออกใบเสร็จดิจิทัล (Paid)




     </button>




  




     <a href="${REPORT_SLIP_LINK}" target="_blank" class="btn-send-slip" style="margin-top: 0;">




       <i class="fa-brands fa-line"></i> ส่งใบเสร็จให้เหรัญญิกทาง LINE




     </a>




   </div>




 `;




} else {




 // ยังชำระไม่ครบ -> ออกแถวคู่: ปุ่มทวงหนี้สีแดง และปุ่มสแกนคิวอาร์เดิม




 cardHtmlInner += `




   <div class="action-split-row">




     <button class="btn-doc-premium type-invoice" onclick="generateDocument('${studentName}', '${studentNo}', '${activeSheetName}', ${codableDebtAmount}, 'INVOICE')">




       <i class="fa-solid fa-file-invoice-dollar"></i> ใบแจ้งหนี้ (ใบเตือน)




     </button>




     <button class="btn-pay-qr" onclick="toggleQrCode('${card.id}')">




       <i class="fa-solid fa-qrcode"></i> สแกนจ่าย QR




     </button>




   </div>








   <div class="qr-container" id="qr-box-${card.id}">




     <p class="small text-muted mb-2">สแกนจ่ายผ่านแอปธนาคารยอด <b>${codableDebtAmount} บาท</b></p>




     <img src="https://promptpay.io/${PROMPTPAY_ID}/${codableDebtAmount}.png" alt="PromptPay QR">




  




     <div class="mt-3 mb-2 text-center">




       <a href="https://promptpay.io/${PROMPTPAY_ID}/${codableDebtAmount}.png" download="QR_${studentNo}_${codableDebtAmount}THB.png" target="_blank" class="btn-download-qr">




         <i class="fa-solid fa-download"></i> บันทึก QR Code




       </a>




     </div>




     <p class="small text-muted mt-2 mb-0"><i class="fa-solid fa-shield-halved"></i> ตรวจสอบชื่อบัญชีก่อนกดยืนยัน</p>




     <div class="slip-notice-box">




        <i class="fa-solid fa-triangle-exclamation text-danger"></i> <b>ทำธุรกรรมเสร็จเรียบร้อยแล้ว</b><br>




        กรุณาส่งรูปภาพสลิปให้เหรัญญิกเพื่ออัปเดตระบบตาราง




        <a href="${REPORT_SLIP_LINK}" target="_blank" class="btn-send-slip">




          <i class="fa-brands fa-line"></i> กดเพื่อส่งสลิปให้เหรัญญิกที่นี่




        </a>




     </div>




   </div>




 `;




}




cardHtmlInner += `</div>`; // ปิด Action Area




finalHtml += cardHtmlInner; card.innerHTML = finalHtml; container.appendChild(card);




initParallaxTilt(card);




if (!isSearch) {




 setTimeout(() => { card.classList.add('show-animate'); }, cardCount * 45);




}




}




}




































function toggleQrCode(cardId) {




const qrBox = document.getElementById(`qr-box-${cardId}`);




qrBox.style.display = (qrBox.style.display === "block") ? "none" : "block";




}




























// ฟังก์ชันแปลงและแสดงผลเอกสาร PDF/Print/Save Image Ready Window




function generateDocument(name, no, sheetName, amount, type) {




const isReceipt = (type === 'RECEIPT');




const mainColor = isReceipt ? '#34C759' : '#ff3b30';




const docTitle = isReceipt ? 'ใบเสร็จรับเงินอิเล็กทรอนิกส์' : 'ใบแจ้งหนี้ / ใบเตือนยอดค้างชำระ';




const subTitle = isReceipt ? 'ELECTRONIC RECEIPT' : 'PAYMENT INVOICE & NOTICE';




const statusText = isReceipt ? 'ชำระเงินเสร็จสิ้น (PAID COMPLETE)' : 'ค้างชำระ (PENDING PAYMENT)';




const formattedDate = new Date().toLocaleDateString('th-TH', {




 year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'




}) + ' น.';




const docWindow = window.open('', '_blank', 'width=550,height=800');




docWindow.document.write(`




 <!DOCTYPE html>




 <html>




 <head>




   <meta charset="UTF-8">




   <title>${docTitle} - เลขที่ ${no}</title>




   <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&display=swap" rel="stylesheet">




   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">




   <!-- เรียกใช้งาน html2canvas เพื่อใช้แปลง HTML เป็นรูปภาพ -->




   <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>








   <style>




     body { font-family: 'Sarabun', sans-serif; background: #f4f4f7; color: #1c1c1e; padding: 30px 20px; margin: 0; display: flex; flex-direction: column; align-items: center; }




     .receipt-box { background: #fff; width: 100%; max-width: 460px; border-radius: 24px; padding: 35px; box-shadow: 0 20px 40px rgba(0,0,0,0.06); border: 2px solid ${mainColor}; position: relative; box-sizing: border-box; }




     .receipt-box::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 10px; background: ${mainColor}; border-radius: 22px 22px 0 0; }




     .header { text-align: center; margin-bottom: 30px; border-bottom: 2px dashed #e5e5ea; padding-bottom: 20px; }




     .header h1 { margin: 0; font-size: 1.6rem; font-weight: 800; color: #1c1c1e; }




     .header p { margin: 4px 0 0; font-size: 0.8rem; font-weight: 700; color: #8e8e93; letter-spacing: 2px; }




     .info-row { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 0.95rem; }




     .info-label { color: #8e8e93; font-weight: 500; }




     .info-value { color: #1c1c1e; font-weight: 700; text-align: right; }




     .amount-container { background: ${isReceipt ? 'rgba(52, 199, 89, 0.06)' : 'rgba(255, 59, 48, 0.06)'}; border: 1px solid ${mainColor}40; border-radius: 16px; padding: 20px; text-align: center; margin: 25px 0; }




     .amount-label { font-size: 0.85rem; font-weight: 700; color: ${mainColor}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }




     .amount-val { font-size: 2rem; font-weight: 800; color: ${mainColor}; margin: 0; }




     .status-badge { display: inline-block; background: ${mainColor}; color: white; padding: 6px 16px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; margin-top: 10px; box-shadow: 0 4px 10px ${mainColor}30; }




     .footer-note { text-align: center; font-size: 0.75rem; color: #a2a2a7; margin-top: 30px; line-height: 1.4; border-top: 1px solid #f2f2f7; padding-top: 15px; }




  




     .action-buttons { width: 100%; max-width: 460px; display: flex; gap: 10px; margin-top: 20px; }




     .btn-action { flex: 1; border: none; padding: 14px; border-radius: 14px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; gap: 8px; }




     .btn-print { background: #000; color: #fff; }




     .btn-print:hover { background: #222; }




     .btn-save-img { background: ${mainColor}; color: #fff; }




     .btn-save-img:hover { opacity: 0.9; transform: translateY(-1px); }




  




     @media print { .action-buttons { display: none; } body { background: none; padding: 0; } .receipt-box { box-shadow: none; border: 2px solid ${mainColor}; } }




 
/* --- Admin Link Button --- */
.admin-link-btn {
position: fixed; bottom: 30px; right: 30px; z-index: 9999;
width: 60px; height: 60px; background: #000; color: #fff;
border-radius: 50%; display: flex; justify-content: center; align-items: center;
box-shadow: 0 15px 35px rgba(0,0,0,0.3); cursor: pointer; transition: all 0.4s;
border: 2px solid rgba(255,255,255,0.1); text-decoration: none;
}
.admin-link-btn:hover { transform: scale(1.1) rotate(15deg); background: #007AFF; color: #fff; }
.violation-status-label {
background: linear-gradient(135deg, #FF9500 0%, #E58600 100%);
color: white; padding: 14px; border-radius: 20px; text-align: center;
margin-top: 15px; font-weight: 800; font-size: 0.95rem;
box-shadow: 0 8px 20px rgba(255, 149, 0, 0.25);
}
.violation-status-label.danger {
background: linear-gradient(135deg, #FF3B30 0%, #C93429 100%);
box-shadow: 0 8px 20px rgba(255, 59, 48, 0.25);
}
.cash-status-label {
background: linear-gradient(135deg, #34C759 0%, #248A3D 100%);
color: white; padding: 14px; border-radius: 20px; text-align: center;
margin-top: 15px; font-weight: 800; font-size: 0.95rem;
box-shadow: 0 8px 20px rgba(52, 199, 89, 0.25);
}




</style>




 </head>




 <body>
<!-- ปุ่มลิงก์ไปหน้าแอดมินใหม่ -->
<a id="adminLink" href="#" class="admin-link-btn">
<i class="fa-solid fa-user-gear fa-xl"></i>
</a>








   <div class="receipt-box" id="capture-target">




     <div class="header">




       <h1>${docTitle}</h1>




       <p>${subTitle}</p>




       <div class="status-badge">${statusText}</div>




     </div>








     <div class="info-row"><span class="info-label">บัญชี</span><span class="info-value">กองทุนห้องเรียน MWKCN</span></div>




     <div class="info-row"><span class="info-label">หมวดหมู่</span><span class="info-value">${sheetName}</span></div>




     <div class="info-row"><span class="info-label">ชื่อ-นามสกุล</span><span class="info-value">${name}</span></div>




     <div class="info-row"><span class="info-label">เลขที่</span><span class="info-value">เลขที่ ${no}</span></div>




     <div class="info-row"><span class="info-label">วันที่ออกเอกสาร</span><span class="info-value">${formattedDate}</span></div>








     <div class="amount-container">




       <div class="amount-label">${isReceipt ? 'จำนวนเงินที่ชำระแล้ว' : 'ยอดเงินคงค้างที่ต้องชำระ'}</div>




       <div class="amount-val">${isReceipt ? 'ชำระครบถ้วน' : amount + ' บาท'}</div>




     </div>








     <div class="footer-note">




       เอกสารดิจิทัลฉบับนี้ออกโดยระบบอัตโนมัติ<br>




       <b>MWKCN Class Fund System</b> • ข้อมูลซิงค์ความปลอดภัยคลาวด์แบบเรียลไทม์




     </div>




   </div>








   <div class="action-buttons">




     <button class="btn-action btn-print" onclick="window.print()">




       <i class="fa-solid fa-print"></i> พิมพ์ / PDF




     </button>




     <button class="btn-action btn-save-img" onclick="saveAsImage('${type}_เลขที่_${no}')">




       <i class="fa-solid fa-image"></i> บันทึกเป็นรูปภาพ




     </button>




   </div>












   <script>




     function saveAsImage(filename) {




       const target = document.getElementById('capture-target');




       // ตั้งค่าสเกลเป็น 2 เพื่อเพิ่มความคมชัดของรูปภาพตัวอักษร




       html2canvas(target, { scale: 2, useCORS: true }).then(canvas => {




         const link = document.createElement('a');




         link.download = filename + '.png';




         link.href = canvas.toDataURL('image/png');




         link.click();




       }).catch(err => {




         alert('ไม่สามารถบันทึกรูปภาพได้ กรุณาใช้การแคปหน้าจอแทน');




       });




     }




   <\/script>




 </body>




 </html>




`);




docWindow.document.close();




}




















function initParallaxTilt(card) {




const maxTiltDegrees = 12;




function handleMove(e) {




card.classList.add('is-tilting');




const rect = card.getBoundingClientRect();




let clientX = e.touches ? e.touches[0].clientX : e.clientX;




let clientY = e.touches ? e.touches[0].clientY : e.clientY;




const x = clientX - rect.left; const y = clientY - rect.top;




card.style.setProperty('--light-x', `${(x / rect.width) * 100}%`); card.style.setProperty('--light-y', `${(y / rect.height) * 100}%`);




card.style.transform = `rotateX((((${y / rect.height}) - 0.5) * -maxTiltDegrees)}deg) rotateY((((${x / rect.width}) - 0.5) * maxTiltDegrees)}deg) scale(1.015)`;




}




function handleLeave() {




card.classList.remove('is-tilting'); card.style.setProperty('--light-x', '50%'); card.style.setProperty('--light-y', '50%');




card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;




}




card.addEventListener('mousemove', handleMove); card.addEventListener('mouseleave', handleLeave);




card.addEventListener('touchmove', handleMove, { passive: true }); card.addEventListener('touchend', handleLeave);




}




































function activateGlobalGyroscope() {




if (window.DeviceOrientationEvent) {




window.addEventListener('deviceorientation', (e) => {




 let gamma = e.gamma; let beta = e.beta;




 if (gamma !== null && beta !== null) {




   let boundedGamma = Math.max(Math.min(gamma, 15), -15);




   let boundedBeta = Math.max(Math.min(beta - 45, 15), -15);




   document.querySelectorAll('.student-card').forEach(card => {




     if((card.classList.contains('show-animate') || card.classList.contains('pop-search-animation')) && !card.classList.contains('is-tilting')) {




       card.style.setProperty('--light-x', `${50 + (boundedGamma * 2.5)}%`);




       card.style.setProperty('--light-y', `${50 + (boundedBeta * 2.5)}%`);




       card.style.transform = `rotateX(${boundedBeta * -0.4}deg) rotateY(${boundedGamma * 0.4}deg)`;




     }




   });




 }




}, true);




}




}




































function requestGyroPermission() {




if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {




DeviceOrientationEvent.requestPermission().then(state => { if (state === 'granted') { activateGlobalGyroscope(); updateGyroButtonStatus(true); } }).catch(console.error);




} else { activateGlobalGyroscope(); }




}




function updateGyroButtonStatus(isActivated) {




const btn = document.getElementById('gyroButton');




if(isActivated) { btn.className = "btn-gyro-lock activated"; btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> เอฟเฟกต์ 3D พร้อมใช้งาน`; setTimeout(() => { document.getElementById('gyroWrapper').style.display = 'none'; }, 1500); }




}




function checkDeviceAndInitGyro() {




if (/iPad|iPhone|iPod/.test(navigator.userAgent) && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') { document.getElementById('gyroWrapper').style.display = 'block'; }




else { activateGlobalGyroscope(); }




}




































function applySearch() {




let val = document.getElementById('searchId').value.trim();




document.getElementById('suggestBox').style.display = 'none';




const existingCards = document.querySelectorAll('.student-card');




if (existingCards.length > 0) {




existingCards.forEach(c => c.classList.add('fade-out-dynamic'));




setTimeout(() => { executeSearchRender(val); }, 350);




} else { executeSearchRender(val); }




}




































function executeSearchRender(val) {




if (val === "") {




document.getElementById('cardContainer').innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass mb-2"></i><br>พิมพ์เลขที่หรือชื่อของคุณด้านบน เพื่อตรวจสอบยอดเงินค้างชำระ</div>`;




return;




}




let filtered = [fullData[0]];




for(let i=1; i<fullData.length; i++) {




let currentId = fullData[i][0].toString().trim();




let currentName = nameMasterList[currentId] || "";




if(currentId === val || currentName.toLowerCase().includes(val.toLowerCase())) {




 filtered.push(fullData[i]);




}




}




renderCards(filtered, true);




}




































function showAllCards() {




const existingCards = document.querySelectorAll('.student-card');




if (existingCards.length > 0) { existingCards.forEach(c => c.classList.add('fade-out-dynamic')); setTimeout(() => { renderCards(fullData, false); }, 350); }




else { renderCards(fullData, false); }




}




































function resetSearch() {




document.getElementById('searchId').value = "";




document.getElementById('suggestBox').style.display = 'none';




document.getElementById('searchBtn').classList.remove('has-val');




document.getElementById('cardContainer').innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass mb-2"></i><br>พิมพ์เลขที่หรือชื่อของคุณด้านบน เพื่อตรวจสอบยอดเงินค้างชำระ</div>`;




}




































document.addEventListener('click', function(e) {




if(!e.target.closest('.search-container')) { document.getElementById('suggestBox').style.display = 'none'; }




});




































window.onload = () => {




// google.script.run.withSuccessHandler(names => {




names.forEach(n => document.getElementById('sheetSelect').options.add(new Option(n, n)));




loadData(); checkDeviceAndInitGyro();




}).getSheetNames();




};








let cashPaidIds = {};
let scriptUrl = "";
let allViolationsData = [];




// ฟังก์ชันโหลดข้อมูลใหม่ที่รองรับเงินสด
function refreshData() {
const currentSheet = document.getElementById('sheetSelect').value;
if(!currentSheet) return;
startLoaderAnimation();
// google.script.run.withSuccessHandler(res => {
  fullData = res.values;
  cashPaidIds = res.cashPaidIds;
  processColumns(fullData[0]);
 
  // google.script.run.withSuccessHandler(vData => {
    allViolationsData = vData;
    stopLoaderAnimation();
    const searchVal = document.getElementById('searchId').value.trim();
    if (searchVal) applySearch();
    else if (["ค่าห้อง + ค่าปรับ", "รวม"].includes(currentSheet)) renderCards(fullData, false);
  }).getRuleViolations();
}).getSheetDataWithCashStatus(currentSheet);
}




// อัปเดต window.onload
const oldOnload = window.onload;
window.onload = () => {
// google.script.run.withSuccessHandler(url => {
  scriptUrl = url;
  document.getElementById('adminLink').href = url + "?page=admin";
}).getScriptUrl();
 // google.script.run.withSuccessHandler(names => {
  names.forEach(n => document.getElementById('sheetSelect').options.add(new Option(n, n)));
  refreshData();
  checkDeviceAndInitGyro();
}).getSheetNames();


};








let fullData = [];
let cashPaidIds = {};
let serverExpenses = [];
let adminLogs = [];
let scriptUrl = "";
let currentTab = 'unpaid';
let bsModal;
 // ข้อมูลรายชื่อนักเรียนสำหรับฟอร์มทำผิดกฎ
const nameMasterList = {
 "1": "นายอินทัช ฐิติโชติตระกูล",
 "2": "น.ส.พัชลา บุญเลิศทรัพย์ทวี",
 "3": "นายคุณานนท์ สามัคคีก่อสกุล",
 "4": "นายชินกฤต โยธิยา",
 "5": "น.ส.จิตรา จือเต๊าะ",
 "6": "น.ส.นฤมล เยอะเบียง",
 "7": "น.ส.ปานตะวัน เพียงคำ",
 "8": "น.ส.ฐิตาพร มาเยอะ",
 "9": "น.ส.โนรา โหว่ยคือ",
 "10": "น.ส.มยุรี มาเยอะ",
 "11": "น.ส.ณัชชา หมื่อแล",
 "12": "น.ส.อพิญญา ศรีวิชัย",
 "13": "นายอนุรักษ์ แซ่ว่าง",
 "14": "น.ส.ดวงกมล มั่นคง",
 "15": "น.ส.มรกต ซางสุภาพ",
 "16": "น.ส.ติยนันท์ ฦาชา",
 "17": "น.ส.กนกภรณ์ โสภณสุนทรเลิศ",
 "18": "น.ส.ณนิดา แซ่เติ๋ง",
 "19": "นายวิโรจน์ เยอแจะ",
 "20": "น.ส.ทองดี เรือนเเก้ว",
 "21": "นายทักษ์ดนัย โชคชัยรัตนกุล",
 "22": "นวพล สว่างถาวรกุล",
 "23": "นายรัชชานนท์ เหวยเหยอกู่",
 "24": "นายศุภกิจ แซ่หู่",
 "25": "น.ส.กชกร เหลาเหยา",
 "26": "น.ส.กัญญาพร อามอ",
 "27": "น.ส.ณิชากร อายี",
 "28": "น.ส.ธิดารัตน์ ละเชกุ",
 "29": "น.ส.นาธาร์ แลเชอ",
 "30": "น.ส.เนาวรัตน์ เชอหมื่อ",
 "31": "น.ส.เพชรรดา สีไอ้",
 "32": "น.ส.ภัคจีรา แซ่เห่อ",
 "33": "น.ส.สุปวีณ์ ขันอุละ",
 "34": "น.ส.ภัทรมล สหพรสันติสุข",
 "35": "น.ส.ธัญญลักษณ์ ทาเกิด",
 "36": "น.ส.วราภรณ์ เชอกอง",
 "37": "น.ส.ณัชนันท์ คำปวน",
 "38": "น.ส.กนกรดา มูเซอ",
 "39": "น.ส.นิชดา อาซอ",
 "40": "นายสุรเชษฐ์ กัลยา" 
};


window.onload = () => {
  bsModal = new bootstrap.Modal(document.getElementById('featureModal'));
   if (typeof google !== 'undefined') {
    // google.script.run.withSuccessHandler(url => { scriptUrl = url; }).getScriptUrl();
    // google.script.run.withSuccessHandler(names => {
      const select = document.getElementById('sheetSelect');
      names.forEach(n => select.options.add(new Option(n, n)));
    }).getSheetNames();
  }
   gsap.from(".login-box", { duration: 1.2, y: 60, opacity: 0, ease: "power4.out" });
};




function triggerIslandAlert(message, type = 'success') {
  const island = document.getElementById('dynamicIsland');
  const icon = document.getElementById('islandIcon');
  const text = document.getElementById('islandText');




  if (type === 'success') {
    icon.className = "fa-solid fa-circle-check text-success";
  } else if (type === 'danger') {
    icon.className = "fa-solid fa-triangle-exclamation text-danger";
  } else {
    icon.className = "fa-solid fa-circle-info text-info";
  }
  text.innerText = message;




  let tl = gsap.timeline();
  tl.to(island, { scaleX: 1.2, scaleY: 0.8, duration: 0.15, ease: "power2.out" })
    .to(island, { scaleX: 0.95, scaleY: 1.1, duration: 0.2, ease: "power2.out" })
    .to(island, { scaleX: 1, scaleY: 1, paddingLeft: "35px", paddingRight: "35px", backgroundColor: "#1c1c1e", duration: 0.25, ease: "elastic.out(1, 0.6)" })
    .to(island, { scale: 1, paddingLeft: "22px", paddingRight: "22px", backgroundColor: "#000000", delay: 2.5, duration: 0.4, ease: "power4.inOut" });
}




function toggleMenu(open) {
  const sidebar = document.getElementById('sidebarMenu');
  const overlay = document.getElementById('sidebarOverlay');




  if (open) {
    overlay.style.display = 'block';
    gsap.to(overlay, { opacity: 1, duration: 0.3 });
    gsap.to(sidebar, { left: "0px", duration: 0.5, ease: "power4.out" });
    gsap.fromTo(".menu-item",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: "power2.out", delay: 0.1 }
    );
  } else {
    gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => overlay.style.display = 'none' });
    gsap.to(sidebar, { left: "-340px", duration: 0.4, ease: "power3.in" });
  }
}




function login() {
  const pass = document.getElementById('adminPass').value;
  showLoader(true);
   if (typeof google !== 'undefined') {
    // google.script.run.withSuccessHandler(isValid => {
      showLoader(false);
      if(isValid) {
        triggerIslandAlert("🔓 ยินดีต้อนรับ", "success");
      
        gsap.to("#login-screen", { opacity: 0, duration: 0.5, onComplete: () => {
          document.getElementById('login-screen').style.display = 'none';
          document.getElementById('admin-content').style.display = 'block';
          gsap.to("#admin-content", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
          loadData(false);
        }});
      } else {
        triggerIslandAlert("❌ รหัสผ่านผิดพลาดค่ะ", "danger");
      }
    }).checkAdminAuth(pass);
  } else {
    showLoader(false);
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    gsap.to("#admin-content", { opacity: 1, duration: 0.5 });
    triggerIslandAlert("🔓 เดโมโหมดผ่านฉลุย", "info");
  }
}




function loadData(isSilent = false) {
  const sheet = document.getElementById('sheetSelect').value;
  if(!sheet) return;
  if (!isSilent) showLoader(true);




  if (typeof google !== 'undefined') {
    // google.script.run.withSuccessHandler(res => {
      if (!isSilent) showLoader(false);
      fullData = res.values;
      cashPaidIds = res.cashPaidIds;
      serverExpenses = res.expenses || [];
      renderList();
    }).getSheetDataWithCashStatus(sheet);
  }
}




function switchTab(tab) {
  currentTab = tab;
  document.getElementById('tab-unpaid').classList.toggle('active', tab === 'unpaid');
  document.getElementById('tab-paid').classList.toggle('active', tab === 'paid');
  renderList();
}




function renderList() {
  const container = document.getElementById('student-list');
  const searchTerm = document.getElementById('adminSearch').value.toLowerCase();
  const bulkArea = document.getElementById('bulk-action-area');
  let html = '';
  const lastColIdx = fullData[0] ? fullData[0].length - 1 : 0;
  let countPaid = 0;




  for(let i=1; i<fullData.length; i++) {
    let row = fullData[i];
    let id = row[0].toString().trim();
    let name = (row[2] || "") + (row[3] || "") + " " + (row[4] || "");
    let debt = row[lastColIdx];
  
    if (searchTerm && !id.includes(searchTerm) && !name.toLowerCase().includes(searchTerm)) continue;
    let isPaidInSheet = (parseFloat(debt.toString().replace(/,/g, '')) === 0 || debt === "จ่ายแล้ว" || debt === "ครบแล้ว");
    let isCashPaid = cashPaidIds[id];




    if (currentTab === 'unpaid' && !isPaidInSheet && !isCashPaid) {
      html += createItem(id, name, debt, 'pay');
    } else if (currentTab === 'paid' && isCashPaid) {
      html += createItem(id, name, debt, 'cancel');
      countPaid++;
    }
  }
   container.innerHTML = html || `<div class="text-center py-5 text-muted"><i class="fa-solid fa-folder-open fa-3xl mb-3 d-block opacity-25"></i>ไม่พบยอดค้างรายงานย่อย</div>`;
  if (bulkArea) bulkArea.style.display = (currentTab === 'paid' && countPaid > 0) ? 'block' : 'none';




  gsap.from(".student-item", {
    y: 40,
    opacity: 0,
    stagger: 0.03,
    duration: 0.6,
    ease: "power4.out",
    clearProps: "all"
  });
}




function createItem(id, name, debt, mode) {
  let cleanDebt = parseFloat(debt.toString().replace(/,/g, '')) || 0;
  if (mode === 'pay') {
    return `
      <div class="student-item" id="student-${id}">
        <div>
          <div class="fw-bold fs-5"><a href="#" onclick="openViolationPage('${id}')" class="text-decoration-none text-dark">${name}</a>
            <i class="fa-solid fa-comment-dots quick-icon" title="ก๊อปปี้คำทวงเงิน" onclick="copyAlert('${name}', ${cleanDebt})"></i>
            <i class="fa-solid fa-qrcode quick-icon text-dark" title="เปิด QR Code" onclick="generateQR(${cleanDebt})"></i>
          </div>
          <div class="text-muted small">เลขที่ ${id} • <span class="text-danger fw-bold">ค้าง ${debt} บาท</span></div>
        </div>
        <button class="btn-action btn-pay shadow-sm" onclick="payCash('${id}', '${name}', '${debt}')"><i class="fa-solid fa-hand-holding-dollar me-2"></i>รับเงินสด</button>
      </div>
    `;
  } else {
    return `
      <div class="student-item" id="student-${id}">
        <div>
          <div class="fw-bold fs-5"><a href="#" onclick="openViolationPage('${id}')" class="text-decoration-none text-dark">${name}</a> <span class="badge-paid ms-2"><i class="fa-solid fa-check me-1"></i>ชำระแล้ว</span></div>
          <div class="text-muted small">เลขที่ ${id} • ยอดเงินสดที่รับมา ${debt} บาท</div>
        </div>
        <button class="btn-action btn-cancel shadow-sm" onclick="cancelPay('${id}', '${name}')"><i class="fa-solid fa-rotate-left me-2"></i>ยกเลิก</button>
      </div>
    `;
  }
}




function payCash(id, name, amount) {
  gsap.to(`#student-${id}`, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.inOut", onComplete: () => {
    cashPaidIds[id] = true;
    adminLogs.unshift(`[${new Date().toLocaleTimeString('th-TH')}] รับเงินสดจาก ${name} จำนวน ${amount} บาท`);
    triggerIslandAlert(`💵 รับเงินสด ${name} เรียบร้อย!`, 'success');
    renderList();
  }});




  if (typeof google !== 'undefined') {
    // google.script.run.withSuccessHandler(() => { loadData(true); }).confirmCashPayment(document.getElementById('sheetSelect').value, id);
  }
}




function cancelPay(id, name) {
  gsap.to(`#student-${id}`, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.inOut", onComplete: () => {
    delete cashPaidIds[id];
    adminLogs.unshift(`[${new Date().toLocaleTimeString('th-TH')}] ยกเลิกเงินสดของ ${name}`);
    triggerIslandAlert(`↩️ ยกเลิกรายการของ ${name} แล้ว`, 'info');
    renderList();
  }});




  if (typeof google !== 'undefined') {
    // google.script.run.withSuccessHandler(() => { loadData(true); }).cancelCashPayment(document.getElementById('sheetSelect').value, id);
  }
}




function cancelAllCash() {
  const sheet = document.getElementById('sheetSelect').value;
  if(confirm(`⚠️ ยืนยันการ "ยกเลิก" การรับเงินสดทั้งหมดใช่หรือไม่?`)) {
    showLoader(true);
    if (typeof google !== 'undefined') {
      // google.script.run.withSuccessHandler(() => {
        showLoader(false);
        triggerIslandAlert("🔄 รีเซ็ตล้างยอดเงินสดทั้งหมดแล้วค่ะ", "info");
        loadData(true);
      }).cancelAllCashPayments(sheet);
    }
  }
}




function showDashboardModal() {
  toggleMenu(false);
  let totalExpenses = serverExpenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
   document.getElementById('modalTitle').innerText = "📊 Live Dashboard";
  document.getElementById('modalBody').innerHTML = `
    <div class="row g-3 text-center my-1">
      <div class="col-6"><div class="p-4 bg-white rounded-4 shadow-sm border"><h6>รับเงินสดมาแล้ว</h6><h2 class="text-success fw-bold">${Object.keys(cashPaidIds).length} คน</h2></div></div>
      <div class="col-6"><div class="p-4 bg-white rounded-4 shadow-sm border"><h6>บันทึกจ่ายออก</h6><h2 class="text-danger fw-bold">${totalExpenses} ฿</h2></div></div>
    </div>
  `;
  bsModal.show();
  gsap.from(".modal-content", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(1.5)" });
}




function showExpenseModal() {
  toggleMenu(false);
  document.getElementById('modalTitle').innerText = "💵 บันทึกรายจ่ายห้อง";
  document.getElementById('modalBody').innerHTML = `
    <div class="p-1">
      <input type="text" id="expTitle" class="form-control mb-2 rounded-3 p-3 border-0 bg-light" placeholder="รายการ เช่น ค่าไม้กวาด">
      <input type="number" id="expAmount" class="form-control mb-3 rounded-3 p-3 border-0 bg-light" placeholder="จำนวนเงิน (บาท)">
      <button class="btn btn-dark w-100 rounded-4 py-3 fw-bold" onclick="submitExpense()">บันทึกรายจ่ายลงระบบคลาวด์</button>
    </div>
  `;
  bsModal.show();
  gsap.from(".modal-content", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(1.5)" });
}




function submitExpense() {
  const sheet = document.getElementById('sheetSelect').value;
  const title = document.getElementById('expTitle').value;
  const amount = document.getElementById('expAmount').value;
  if(!title || !amount) return triggerIslandAlert("⚠️ กรอกข้อมูลไม่ครบถ้วนค่ะ!", "danger");
   if (typeof google !== 'undefined') {
    // google.script.run.withSuccessHandler(() => {
      triggerIslandAlert("✅ บันทึกรายจ่ายสำเร็จสะสมลงชีต!", "success");
      bsModal.hide();
      loadData(true);
    }).addExpense(sheet, title, amount);
  }
}




function copyAlert(name, debt) {
  let text = `📢 ประกาศจากกองทุนห้อง: แจ้งเตือนคุณ ${name} มียอดค้างชำระอยู่จำนวน ${debt} บาท รบกวนชำระเงินให้เรียบร้อยภายในวันนี้นะคะ`;
  navigator.clipboard.writeText(text).then(() => {
    triggerIslandAlert("💬 ก๊อปคำทวงลงคลิปบอร์ดแล้ว!", "success");
  });
}




function generateQR(amount) {
  const promptPayID = "0908870278";
  document.getElementById('modalTitle').innerText = "🔗 Dynamic QR Generator";
  document.getElementById('modalBody').innerHTML = `
    <div class="text-center py-2">
      <p class="small text-muted mb-3">สแกนจ่ายยอดค้างชำระเข้าพร้อมเพย์ห้อง</p>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent('https://promptpay.io/' + promptPayID + '/' + amount)}" class="img-fluid rounded-4 mb-3 shadow">
      <h3 class="fw-bold text-dark">${amount} บาท</h3>
    </div>
  `;
  bsModal.show();
  gsap.from(".modal-content", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(1.5)" });
}




function showTopPayers() {
  toggleMenu(false);
  document.getElementById('modalTitle').innerText = "🏆 อันดับคนจ่ายไว (Top Payers)";
  document.getElementById('modalBody').innerHTML = `
    <ol class="list-group list-group-numbered border-0 gap-2 my-2">
      <li class="list-group-item d-flex justify-content-between align-items-start border rounded-4 p-3 bg-white shadow-sm">⚡️ กลุ่มเลขที่ 01 - 10 <span class="badge bg-success rounded-pill p-2 px-3">แชมป์จ่ายไว</span></li>
      <li class="list-group-item d-flex justify-content-between align-items-start border rounded-4 p-3 bg-white shadow-sm">🔥 กลุ่มเลขที่ 11 - 20 <span class="badge bg-warning text-dark rounded-pill p-2 px-3">รองแชมป์</span></li>
    </ol>
  `;
  bsModal.show();
  gsap.from(".list-group-item", { x: 30, opacity: 0, stagger: 0.1, duration: 0.4, ease: "power3.out" });
}




function showAdminLogs() {
  toggleMenu(false);
  document.getElementById('modalTitle').innerText = "⏰ ประวัติเซสชั่นแอดมิน";
  let logHtml = adminLogs.map(log => `<div class="small py-2 border-bottom text-muted fw-medium"><i class="fa-regular fa-clock me-2 text-primary"></i>${log}</div>`).join('') || "ยังไม่มีประวัติการทำรายการเงินสดในหน้านี้";
  document.getElementById('modalBody').innerHTML = `<div style="max-height:280px; overflow-y:auto; padding: 5px;">${logHtml}</div>`;
  bsModal.show();
}




function openRosterManager() {
  toggleMenu(false);
  triggerIslandAlert("🔓 เปิดลิ้งค์ทางเข้า Google Sheets แล้ว!", "info");
  alert("แกสามารถก้าวเข้าไปจัดการเพิ่ม/ลดรายชื่อเพื่อนใน Google Sheets ได้เลยโดยตรงค่ะหลังบ้านซิงค์ออโต้!");
}




// ==========================================================
// ฟีเจอร์ที่ 10: ระบบบันทึกการทำผิดกฎ (แบบเปิดหน้าใหม่)
// ==========================================================
function openViolationPage(studentId = '') {
  toggleMenu(false);
  if (scriptUrl) {
    const targetUrl = scriptUrl + "?page=violation" + (studentId ? "&id=" + studentId : "");
    window.open(targetUrl, '_blank');
    triggerIslandAlert("🚀 กำลังเปิดหน้าบันทึกทำผิดกฎในแท็บใหม่...", "info");
  } else {
    alert("ไม่พบ URL ของสคริปต์ กรุณารีเฟรชหน้าจออีกครั้งค่ะ");
  }
}




function showLoader(show) {
  const loader = document.getElementById('loader');
  if (show) {
    loader.style.display = 'flex';
    gsap.fromTo(".loader-content", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" });
  } else {
    gsap.to(".loader-content", { scale: 0.8, opacity: 0, duration: 0.2, onComplete: () => loader.style.display = 'none' });
  }
}




function goBack() {
  if(scriptUrl) window.top.location.href = scriptUrl;
  else alert("ระบบจำลองการย้อนกลับหน้าหลัก");
}




const nameMasterList = {
 "1": "นายอินทัช ฐิติโชติตระกูล",
 "2": "น.ส.พัชลา บุญเลิศทรัพย์ทวี",
 "3": "นายคุณานนท์ สามัคคีก่อสกุล",
 "4": "นายชินกฤต โยธิยา",
 "5": "น.ส.จิตรา จือเต๊าะ",
 "6": "น.ส.นฤมล เยอะเบียง",
 "7": "น.ส.ปานตะวัน เพียงคำ",
 "8": "น.ส.ฐิตาพร มาเยอะ",
 "9": "น.ส.โนรา โหว่ยคือ",
 "10": "น.ส.มยุรี มาเยอะ",
 "11": "น.ส.ณัชชา หมื่อแล",
 "12": "น.ส.อพิญญา ศรีวิชัย",
 "13": "นายอนุรักษ์ แซ่ว่าง",
 "14": "น.ส.ดวงกมล มั่นคง",
 "15": "น.ส.มรกต ซางสุภาพ",
 "16": "น.ส.ติยนันท์ ฦาชา",
 "17": "น.ส.กนกภรณ์ โสภณสุนทรเลิศ",
 "18": "น.ส.ณนิดา แซ่เติ๋ง",
 "19": "นายวิโรจน์ เยอแจะ",
 "20": "น.ส.ทองดี เรือนเเก้ว",
 "21": "นายทักษ์ดนัย โชคชัยรัตนกุล",
 "22": "นวพล สว่างถาวรกุล",
 "23": "นายรัชชานนท์ เหวยเหยอกู่",
 "24": "นายศุภกิจ แซ่หู่",
 "25": "น.ส.กชกร เหลาเหยา",
 "26": "น.ส.กัญญาพร อามอ",
 "27": "น.ส.ณิชากร อายี",
 "28": "น.ส.ธิดารัตน์ ละเชกุ",
 "29": "น.ส.นาธาร์ แลเชอ",
 "30": "น.ส.เนาวรัตน์ เชอหมื่อ",
 "31": "น.ส.เพชรรดา สีไอ้",
 "32": "น.ส.ภัคจีรา แซ่เห่อ",
 "33": "น.ส.สุปวีณ์ ขันอุละ",
 "34": "น.ส.ภัทรมล สหพรสันติสุข",
 "35": "น.ส.ธัญญลักษณ์ ทาเกิด",
 "36": "น.ส.วราภรณ์ เชอกอง",
 "37": "น.ส.ณัชนันท์ คำปวน",
 "38": "น.ส.กนกรดา มูเซอ",
 "39": "น.ส.นิชดา อาซอ",
 "40": "นายสุรเชษฐ์ กัลยา" 
};




let allViolations = [];




window.onload = () => {
 gsap.from(".liquid-card", { y: 50, opacity: 0, duration: 1, ease: "power4.out" });
  const urlParams = new URLSearchParams(window.location.search);
 const preSelectedId = urlParams.get('id');
 if (preSelectedId && nameMasterList[preSelectedId]) {
   selectStudent(preSelectedId, nameMasterList[preSelectedId]);
 }
  const countSelect = document.getElementById('violationCount');
 for (let i = 1; i <= 20; i++) countSelect.add(new Option(i, i));
  loadAllData();
};




function loadAllData() {
 if (typeof google !== 'undefined') {
   // google.script.run.withSuccessHandler(data => {
     allViolations = data;
     const currentId = document.getElementById('selectedStudentId').value;
     if (currentId) renderIndividualReport(currentId);
   }).getRuleViolations();
 }
}




function handleSearch(input) {
 const val = input.value.trim().toLowerCase();
 const suggestBox = document.getElementById('suggestBox');
 if (!val) { suggestBox.style.display = 'none'; return; }
  let matches = [];
 for (let id in nameMasterList) {
   if (id.startsWith(val) || nameMasterList[id].toLowerCase().includes(val)) {
     matches.push({ id, name: nameMasterList[id] });
   }
 }
  if (matches.length > 0) {
   suggestBox.innerHTML = matches.map(m => `<div class="suggest-item" onclick="selectStudent('${m.id}', '${m.name} ')">เลขที่  ${m.id} - ${m.name}</div>`).join('');
   suggestBox.style.display = 'block';
   gsap.from(".suggest-item", { x: -10, opacity: 0, stagger: 0.05 });
 } else {
   suggestBox.style.display = 'none';
 }
}




function selectStudent(id, name) {
 document.getElementById('studentSearch').value =  `เลขที่  ${id} - ${name}`;
 document.getElementById('selectedStudentId').value = id;
 document.getElementById('suggestBox').style.display = 'none';
 renderIndividualReport(id);
}




function toggleOther(val) {
 const box = document.getElementById('otherBox');
 if (val ===  "อื่นๆ" ) {
   box.style.display = "block";
   gsap.from(box, { height: 0, opacity: 0, duration: 0.4 });
 } else {
   box.style.display = "none";
 }
}




function renderIndividualReport(studentId) {
 const container = document.getElementById('violationReportContent');
 const badge = document.getElementById('totalCountBadge');
  const filtered = allViolations.filter(v => v.id.toString() === studentId.toString());
  let totalCount = 0;
 filtered.forEach(v => totalCount += parseInt(v.count));
  badge.innerText =  `ทำผิดรวม:  ${totalCount}  ครั้ง` ;
 if (totalCount >= 5) {
   badge.classList.replace('bg-light', 'bg-danger');
   badge.classList.add('text-white');
 } else {
   badge.classList.replace('bg-danger', 'bg-light');
   badge.classList.remove('text-white');
 }




 if (filtered.length === 0) {
   container.innerHTML =  `<div class="text-center py-5 text-muted small">ไม่พบประวัติการทำผิดกฎของ  ${nameMasterList[studentId]}</div>`;
   return;
 }




 let html = '';
 filtered.forEach(v => {
   html += `
     <div class="report-card">
       <div>
         <div class="fw-bold">${v.rule}</div>
         <div class="small text-muted">${v.date} ${v.detail !== '-' ? '• '+v.detail : ''}</div>
       </div>
       <div class="fw-800 text-primary fs-5">${v.count}  ครั้ง</div>
     </div>
   `;
 });




 if (totalCount >= 5) {
   html = `
     <div class="alert alert-danger rounded-4 border-0 mb-4 d-flex justify-content-between align-items-center">
       <div class="small fw-bold"><i class="fa-solid fa-triangle-exclamation me-2"></i>ทำผิดรวมเกิน 5 ครั้งแล้ว!</div>
       <button class="btn btn-danger btn-sm rounded-pill px-3" onclick="preparePrint('${studentId}', ${totalCount} )">พิมพ์รายงานสรุป V2</button>
     </div>
   ` + html;
 }




 container.innerHTML = html;
 gsap.from(".report-card", { x: 20, opacity: 0, stagger: 0.1 });
}




function submitViolation() {
 const studentId = document.getElementById('selectedStudentId').value;
 const ruleType = document.getElementById('violationRule').value;
 const count = document.getElementById('violationCount').value;
 const otherDetail = document.getElementById('otherDetail').value;
  if (!studentId || !ruleType) return alert( "กรุณาเลือกข้อมูลให้ครบถ้วน" );
  document.getElementById('loader').style.display = 'flex';
 if (typeof google !== 'undefined') {
   // google.script.run.withSuccessHandler((res) => {
     document.getElementById('loader').style.display = 'none';
     showSuccessPopup( `บันทึกของ  ${nameMasterList[studentId]}  สำเร็จ!` );
     document.getElementById('otherDetail').value = "";
     document.getElementById('violationRule').value = "";
     loadAllData();
   }).saveRuleViolation(studentId, nameMasterList[studentId], ruleType, count, otherDetail);
 }
}




function showSuccessPopup(msg) {
 const popup = document.getElementById('success-popup');
 document.getElementById('success-msg').innerText = msg;
 popup.style.display = 'block';
 gsap.to(popup, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
 setTimeout(() => {
   gsap.to(popup, { opacity: 0, scale: 0.8, duration: 0.5, onComplete: () => popup.style.display = 'none' });
 }, 2500);
}




// =========================================================================
// 🌟 ส่วนที่แก้ไขป้องกันวันที่เพี้ยนในรายงานพิมพ์ V2 อย่างเด็ดขาด
// =========================================================================
function preparePrint(studentId, totalCount) {
 const name = nameMasterList[studentId];
 document.getElementById('print-name').innerText = name;
 document.getElementById('print-student-id').innerText = studentId;
 document.getElementById('print-total-count').innerText = totalCount;
 document.getElementById('print-threshold').innerText = totalCount;
 // ล็อกโซนเวลาของไทยอย่างแน่นอนสำหรับวันที่หัวรายงานเอกสาร
 document.getElementById('print-report-date').innerText = new Date().toLocaleDateString('th-TH', {
   timeZone: 'Asia/Bangkok',
   year: 'numeric',
   month: 'long',
   day: 'numeric'
 });




 const tbody = document.getElementById('print-table-body');
 tbody.innerHTML = '';
  const history = allViolations.filter(v => v.id.toString() === studentId.toString());
  let displayRows = 0;
 history.forEach(h => {
   for(let i = 0; i < parseInt(h.count); i++) {
     displayRows++;
     if(displayRows > 10) break;
  
     // ตรวจสอบข้อมูลวันที่และแปลงอย่างปลอดภัยก่อนแสดงผลบนตารางเอกสาร
     let finalDateToShow = '-';
     if (h.date) {
       if (typeof h.date === 'string' && h.date.includes('/')) {
         // กรณีเป็นฟอร์แมตข้อความ วัน/เดือน/ปี จากระบบหลังบ้าน (ซึ่งผ่านการตรวจทานแล้ว)
         const parts = h.date.split('/');
         if (parts.length === 3) {
           let day = parseInt(parts[0], 10);
           let month = parseInt(parts[1], 10);
           let year = parseInt(parts[2], 10);
         
           const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
           let monthStr = (month >= 1 && month <= 12) ? thaiMonths[month - 1] : month;
         
           if (year < 2500) year += 543; // แปลงปี ค.ศ. ให้เป็น พ.ศ.
           finalDateToShow = `${day} ${monthStr} ${year}`;
         } else {
           finalDateToShow = h.date;
         }
       } else {
         // กรณีหลุดมาเป็นรูปแบบอื่นๆ
         try {
           let rawDate = new Date(h.date);
           if (!isNaN(rawDate.getTime())) {
             var yr = rawDate.getFullYear();
             if (yr > 2400) yr -= 543; // ดักจับบั๊กปีเบิ้ล
             finalDateToShow = rawDate.toLocaleDateString('th-TH', {
               timeZone: 'Asia/Bangkok',
               year: 'numeric',
               month: 'short',
               day: 'numeric'
             });
           } else {
             finalDateToShow = h.date;
           }
         } catch(e) {
           finalDateToShow = h.date;
         }
       }
     }




     const isLast = (displayRows === totalCount);
     const tr = document.createElement('tr');
     tr.innerHTML = `
       <td style="border: 1.5px solid #000; padding: 10px; text-align: center;">${displayRows}</td>
       <td style="border: 1.5px solid #000; padding: 10px; text-align: center;">${finalDateToShow}</td>
       <td style="border: 1.5px solid #000; padding: 10px;">${h.rule} ${h.detail !== '-' ? '(' + h.detail + ')' : ''}</td>
       <td style="border: 1.5px solid #000; padding: 10px; text-align: center;">
         ${isLast ?  'ความผิดครั้งล่าสุด<br>(แจ้งครูที่ปรึกษา)'  :  'ตักเตือนด้วยวาจาในเบื้องต้น' }
       </td>
     `;
     tbody.appendChild(tr);
   }
 });




  // เติมแถวว่างถ้าไม่ครบ 5 แถว
 while (displayRows < 5) {
   displayRows++;
   const tr = document.createElement('tr');
   tr.innerHTML = `
     <td style="border: 1.5px solid #000; padding: 10px; text-align: center;">${displayRows}</td>
     <td style="border: 1.5px solid #000; padding: 10px; text-align: center;">&nbsp;</td>
     <td style="border: 1.5px solid #000; padding: 10px;">&nbsp;</td>
     <td style="border: 1.5px solid #000; padding: 10px; text-align: center;">&nbsp;</td>
   `;
   tbody.appendChild(tr);
 }




 document.querySelector('.liquid-card').style.display = 'none';
 document.getElementById('print-area').style.display = 'block';
 window.scrollTo(0, 0);
}




function closePrint() {
 document.getElementById('print-area').style.display = 'none';
 document.querySelector('.liquid-card').style.display = 'block';
}




function saveAsImage() {
 const target = document.getElementById('capture-target');
 const studentName = document.getElementById('print-name').innerText;
  document.getElementById('loader').style.display = 'flex';
 html2canvas(target, { scale: 2, backgroundColor: "#ffffff" }).then(canvas => {
   const link = document.createElement('a');
   link.download =  `รายงานสรุปพฤติกรรม_${studentName}.png`;
   link.href = canvas.toDataURL('image/png');
   link.click();
   document.getElementById('loader').style.display = 'none';
 });
}
