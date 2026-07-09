
/**
 * MWKCN Main Script v2.0 - GitHub Pages Version
 * รวมฟังก์ชันเดิมทั้งหมด 100%: Parallax, Gyro, API Connection, Document Generation
 */

// --- API Connection ---
async function callApi(action, params = {}) {
    if (!CONFIG.API_URL || CONFIG.API_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
        console.error('กรุณาตั้งค่า API_URL ใน config.js');
        return null;
    }
    const url = new URL(CONFIG.API_URL);
    url.searchParams.append('action', action);
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// --- Maintenance & Init ---
function checkMaintenance() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const bangkokTime = new Date(utc + (3600000 * CONFIG.TIMEZONE_OFFSET));
    const day = bangkokTime.getDay();
    
    if (CONFIG.MAINTENANCE_DAYS.includes(day)) {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('maintenance-screen').style.display = 'block';
    } else {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-dashboard').style.display = 'block';
        initDashboard();
    }
}

function initDashboard() {
    updateCountdown();
    loadSheetNames();
}

// --- Core Functions (Converted from GAS) ---
let fullData = [];
let cashPaidIds = {};
let columnsToShow = [];

async function loadSheetNames() {
    const names = await callApi('getSheetNames');
    const select = document.getElementById('sheetSelect');
    names.forEach(n => select.options.add(new Option(n, n)));
    if (names.length > 0) {
        select.value = names[0];
        refreshData();
    }
}

async function refreshData() {
    const sheet = document.getElementById('sheetSelect').value;
    if(!sheet) return;
    startLoaderAnimation();
    const res = await callApi('getSheetDataWithCashStatus', { sheetName: sheet });
    fullData = res.values;
    cashPaidIds = res.cashPaidIds || {};
    processColumns(fullData[0]);
    renderCards(fullData);
    stopLoaderAnimation();
}

function processColumns(headers) {
    columnsToShow = [];
    headers.forEach((h, i) => {
        if (h.trim() !== "") columnsToShow.push(i);
    });
}

function renderCards(rows) {
    const container = document.getElementById('data-container');
    container.innerHTML = "";
    let cardCount = 0;
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.join("").trim() === "") continue;
        cardCount++;
        
        const id = row[0].toString().trim();
        const name = CONFIG.NAME_MASTER_LIST[id] || (row[2] || "") + (row[3] || "") + " " + (row[4] || "");
        const isCashPaid = cashPaidIds[id];
        
        const card = document.createElement('div');
        card.className = "student-card";
        
        let html = `<div class="card-watermark">MWKCN</div>`;
        html += `<div class="mb-2"><span class="badge-no">เลขที่: ${id}</span></div>`;
        html += `<div class="card-title-name">${name}</div>`;
        
        columnsToShow.forEach((colIdx, order) => {
            if (order === 0) return;
            const label = rows[0][colIdx];
            const value = row[colIdx] || "-";
            const isLast = (order === columnsToShow.length - 1);
            
            if (isLast) {
                const isPaid = (value == "0" || value == "0.00" || value == "จ่ายแล้ว" || isCashPaid);
                const hClass = isPaid ? "last-row-success" : "last-row-warning";
                html += `<div class="data-row ${hClass}"><span class="data-label">${label}</span><span class="data-value">${value}</span></div>`;
            } else {
                html += `<div class="data-row"><span class="data-label">${label}</span><span class="data-value">${value}</span></div>`;
            }
        });
        
        // Actions
        html += `<div class="card-actions-area">`;
        if (isCashPaid) {
            html += `<button class="btn-doc-premium type-receipt" onclick="generateDocument('${name}', '${id}', 'RECEIPT')">ใบเสร็จดิจิทัล</button>`;
        } else {
            html += `<button class="btn-doc-premium type-invoice" onclick="generateDocument('${name}', '${id}', 'INVOICE')">ใบแจ้งหนี้</button>`;
            html += `<button class="btn-pay-qr" onclick="showQr('${id}', '${row[row.length-1]}')">สแกนจ่าย QR</button>`;
        }
        html += `</div>`;
        
        card.innerHTML = html;
        container.appendChild(card);
        
        setTimeout(() => card.classList.add('show-animate'), cardCount * 50);
        initParallax(card);
    }
}

// --- Extra Features ---
function initParallax(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;
        card.style.transform = `rotateY(${dx/10}deg) rotateX(${-dy/10}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    });
}

function showQr(id, amount) {
    const cleanAmount = amount.replace(/,/g, '');
    const qrUrl = `https://promptpay.io/${CONFIG.PROMPTPAY_ID}/${cleanAmount}.png`;
    window.open(qrUrl, '_blank');
}

function generateDocument(name, id, type) {
    const isReceipt = type === 'RECEIPT';
    const color = isReceipt ? '#34C759' : '#ff3b30';
    const title = isReceipt ? 'ใบเสร็จรับเงิน' : 'ใบแจ้งหนี้';
    
    const doc = window.open('', '_blank', 'width=500,height=700');
    doc.document.write(`
        <html><head><title>${title}</title><style>
            body { font-family: Sarabun; text-align: center; padding: 40px; }
            .box { border: 5px solid ${color}; padding: 30px; border-radius: 20px; }
            h1 { color: ${color}; }
        </style></head>
        <body><div class="box"><h1>${title}</h1><p>ชื่อ: ${name}</p><p>เลขที่: ${id}</p><p>สถานะ: ${isReceipt ? 'ชำระแล้ว' : 'ค้างชำระ'}</p></div></body></html>
    `);
}

function updateCountdown() {
    callApi('getPaymentDeadline').then(deadline => {
        if (!deadline) return;
        setInterval(() => {
            const diff = deadline - Date.now();
            const d = Math.floor(diff / 86400000);
            const h = Math.floor(diff / 3600000) % 24;
            const m = Math.floor(diff / 60000) % 60;
            const s = Math.floor(diff / 1000) % 60;
            document.getElementById("countdownBox").innerHTML = `เหลือเวลา: ${d}ว ${h}ช ${m}น ${s}ว`;
        }, 1000);
    });
}

function startLoaderAnimation() { document.getElementById('loader').style.display = 'flex'; }
function stopLoaderAnimation() { document.getElementById('loader').style.display = 'none'; }
function applySearch() {
    const term = document.getElementById('searchId').value.toLowerCase();
    const cards = document.querySelectorAll('.student-card');
    cards.forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(term) ? 'block' : 'none';
    });
}

window.addEventListener("load", checkMaintenance);
