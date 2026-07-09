
// การตั้งค่าระบบ MWKCN Dashboard
const CONFIG = {
    // 1. วาง URL ของ Google Apps Script Web App ของคุณที่นี่
    API_URL: 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL',
    
    // 2. ตั้งค่าการปิดปรับปรุง (เสาร์-อาทิตย์)
    MAINTENANCE_DAYS: [0, 6], // 0 = วันอาทิตย์, 6 = วันเสาร์
    
    // 3. ข้อความแจ้งเตือน
    MAINTENANCE_MESSAGE: 'ระบบ Class Fund ปิดให้บริการทุกวันเสาร์และอาทิตย์',
    RETURN_TIME: 'วันจันทร์ เวลา 00:00 น.',
    
    // 4. ตั้งค่าเวลาประเทศไทย (GMT+7)
    TIMEZONE_OFFSET: 7
};
