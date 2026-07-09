
// ฟังก์ชันจัดการ API
async function callApi(action, params = {}) {
    if (!CONFIG.API_URL || CONFIG.API_URL === 'https://script.google.com/macros/s/AKfycbypqNNQf4-HBcetryp5Gubjq556LuxzYSM_aokjRI-ks9s-sDF2gDONO8mAe6pQg6ey/exec') {
        console.error('กรุณาตั้งค่า API_URL ในไฟล์ config.js');
        return null;
    }

    const url = new URL(CONFIG.API_URL);
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

// ระบบตรวจสอบเวลาประเทศไทยและสถานะการปิดปรับปรุง
function checkMaintenance() {
    // คำนวณเวลาประเทศไทย (GMT+7)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const bangkokTime = new Date(utc + (3600000 * CONFIG.TIMEZONE_OFFSET));
    
    const day = bangkokTime.getDay(); // 0 = อาทิตย์, 6 = เสาร์
    const isMaintenance = CONFIG.MAINTENANCE_DAYS.includes(day);

    const loading = document.getElementById('loading-screen');
    const maintenance = document.getElementById('maintenance-screen');
    const dashboard = document.getElementById('main-dashboard');

    loading.style.display = 'none';

    if (isMaintenance) {
        document.getElementById('maintenance-desc').innerText = CONFIG.MAINTENANCE_MESSAGE;
        document.getElementById('return-time').innerText = CONFIG.RETURN_TIME;
        maintenance.style.display = 'block';
        dashboard.style.display = 'none';
    } else {
        maintenance.style.display = 'none';
        dashboard.style.display = 'block';
        initDashboard();
    }
}

// เริ่มต้น Dashboard
function initDashboard() {
    updateCountdown();
    loadSheetNames();
}

async function loadSheetNames() {
    try {
        const names = await callApi('getSheetNames');
        if (!names) return;
        
        const select = document.getElementById('sheetSelect');
        names.forEach(n => select.options.add(new Option(n, n)));
        
        if (names.length > 0) {
            select.value = names[0];
            refreshData();
        }
    } catch (error) {
        console.error('Failed to load sheet names');
    }
}

let fullData = [];
let cashPaidIds = {};

async function refreshData() {
    const currentSheet = document.getElementById('sheetSelect').value;
    if(!currentSheet) return;
    
    startLoaderAnimation();
    try {
        const res = await callApi('getSheetDataWithCashStatus', { sheetName: currentSheet });
        if (res) {
            fullData = res.values;
            cashPaidIds = res.cashPaidIds || {};
            renderCards(fullData);
        }
        stopLoaderAnimation();
    } catch (error) {
        stopLoaderAnimation();
        console.error('Refresh data error:', error);
    }
}

function renderCards(data) {
    const container = document.getElementById('data-container');
    if (!data || data.length <= 1) {
        container.innerHTML = '<div class="col-12 text-center py-5 text-muted">ไม่พบข้อมูลในเดือนนี้</div>';
        return;
    }

    let html = '';
    const headers = data[0];
    const lastColIdx = headers.length - 1;

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const id = row[0];
        const name = (row[2] || "") + (row[3] || "") + " " + (row[4] || "");
        const debt = row[lastColIdx];
        const isCashPaid = cashPaidIds[id];

        html += `
            <div class="col-md-4 col-sm-6 student-card-item">
                <div class="card h-100 border-0 shadow-sm hover-shadow transition">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="badge bg-secondary">เลขที่ ${id}</span>
                            ${isCashPaid ? '<span class="badge bg-success"><i class="fa-solid fa-check me-1"></i>รับเงินสดแล้ว</span>' : ''}
                        </div>
                        <h5 class="card-title mb-3">${name}</h5>
                        <div class="pt-2 border-top">
                            <span class="text-muted small">ยอดค้างชำระ:</span>
                            <h4 class="${isCashPaid ? 'text-success' : 'text-danger'} mb-0">
                                ${isCashPaid ? '0.00' : debt} <small class="fs-6">บาท</small>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
    
    gsap.from(".student-card-item", {
        y: 30,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out"
    });
}

function applySearch() {
    const term = document.getElementById('searchId').value.toLowerCase();
    const items = document.querySelectorAll('.student-card-item');
    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(term) ? 'block' : 'none';
    });
}

function updateCountdown() {
    callApi('getPaymentDeadline').then(deadline => {
        if (!deadline) return;
        const countdownEl = document.getElementById("countdownBox");
        
        const timer = setInterval(() => {
            const diff = deadline - Date.now();
            if (diff < 0) {
                countdownEl.innerHTML = '<i class="fa-solid fa-clock me-1"></i>หมดเวลาชำระเงิน';
                clearInterval(timer);
                return;
            }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor(diff / 3600000) % 24;
            const m = Math.floor(diff / 60000) % 60;
            const s = Math.floor(diff / 1000) % 60;
            countdownEl.innerHTML = `<i class="fa-solid fa-clock me-1"></i>เหลือเวลา: ${d}ว ${h}ช ${m}น ${s}ว`;
        }, 1000);
    });
}

function startLoaderAnimation() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('data-container').style.opacity = '0.5';
}

function stopLoaderAnimation() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('data-container').style.opacity = '1';
}

// เริ่มต้นทำงาน
window.addEventListener("load", checkMaintenance);
