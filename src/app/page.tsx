'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // <-- 1. Import useRouter กลับมา
import { beToCe } from '../lib/dateUtils';

export default function Home() {
  const YOUTH_LIMIT_AGE = 25;
  const router = useRouter(); // <-- 2. เรียกใช้งาน Router

  const [step, setStep] = useState<1 | 2>(1);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [yearBE, setYearBE] = useState('');

  const [diffMs, setDiffMs] = useState<number>(0);
  const [roast, setRoast] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getGenData = (beYear: number) => {
    if (beYear >= 2568 && beYear <= 2582) return {
      gen: "Gen Beta", nickname: "รุ่น Prompt สั่งโลก", icon: "🍼",
      fact: "เกิดมาก็เจอ AI เป็นพี่เลี้ยงเด็ก ไม่ต้องหัดพูดแต่หัดเขียน Prompt เป็นอย่างแรก ชีวิตนี้อาจไม่เคยเห็น 'หญ้าจริง' หรือ 'ฝนที่ไม่ปนฝุ่น PM 2.5'",
      quote: "พระอาทิตย์คืออะไร? ใช่ฟิลเตอร์ในแว่น VR หรือเปล่าพี่?",
      stats: [{ icon: '🤖', label: 'เพื่อนสนิท AI' }, { icon: '🥽', label: 'อยู่แต่โลก VR' }, { icon: '🍼', label: 'ดื่มนมสลับโค้ด' }]
    };
    if (beYear >= 2553 && beYear <= 2567) return {
      gen: "Gen Alpha", nickname: "นิ้วล็อกมหัศจรรย์", icon: "🎮",
      fact: "กลุ่มที่พยายามจะ 'ถ่างนิ้ว (Zoom)' บนหนังสือกระดาษ สมาธิสั้นกว่าคลิป TikTok 15 วิ แต่ความเร็วในการไถฟีดระดับเทพเจ้า",
      quote: "สมาธิสั้นแต่ตัดต่อเทพ สั่งอาหารผ่านแอปเป็นก่อนเรียกชื่อพ่อ",
      stats: [{ icon: '⚡️', label: 'สมาธิ 3 วิ' }, { icon: '📱', label: 'ไถจอมือหงิก' }, { icon: '🧋', label: 'น้ำตาลเข้าเส้น' }]
    };
    if (beYear >= 2540 && beYear <= 2552) return {
      gen: "Gen Z", nickname: "แบกโลก แบกความเครียด แบกหลังที่ปวด", icon: "🫠",
      fact: "รักอิสระยิ่งชีพ ถ้า Vibe ออฟฟิศไม่ดี ขอยอมลาออกไปขายของออนไลน์แทน เชี่ยวชาญการใช้ 'Meme' เพื่อบำบัดอาการซึมเศร้า",
      quote: "Work-Life Balance คือหัวใจ แต่ในบัญชีมีเงินเหลือแค่ใช้ถึงวันพุธ",
      stats: [{ icon: '🫠', label: 'ซึมเศร้าเกรด A' }, { icon: '💸', label: 'F ของบำบัด' }, { icon: '🎢', label: 'อารมณ์สวิง' }]
    };
    if (beYear >= 2524 && beYear <= 2539) return {
      gen: "Gen Y / Millennials", nickname: "สมาคมปวดหลังแห่งประเทศไทย", icon: "😫",
      fact: "ซวยที่สุดเพราะทันทั้งยุค 'เป่าตลับเกม' และ 'คุยกับ AI' ปัจจุบันเป็นลูกค้า VIP ของร้านนวดแผนไทยและยาแก้กรดไหลย้อน",
      quote: "เป็นกำลังหลักของสังคม แต่สภาพร่างกายเหมือนผ่านสงครามโลกครั้งที่ 2 มา",
      stats: [{ icon: '💊', label: 'ยาพาราคือเพื่อน' }, { icon: '🩹', label: 'วันกายภาพ' }, { icon: '☕️', label: 'กาแฟต่อสายยาง' }]
    };
    if (beYear >= 2508 && beYear <= 2523) return {
      gen: "Gen X", nickname: "CEO ผู้โดดเดี่ยว", icon: "💼",
      fact: "โตมาแบบบุฟเฟต์ อดทนสูงมากทั้งกับบอส Boomer และลูกน้อง Gen Z อ่านแผนที่กระดาษเป็น และพิมพ์ LINE แบบมีเว้นวรรคเยอะๆ",
      quote: "ทำงานงกๆ เพื่อซื้อความสุขให้คนในบ้าน แต่ตัวเองความสุขคือการได้อยู่นิ่งๆ",
      stats: [{ icon: '📈', label: 'แบกความหวัง' }, { icon: '🧘', label: 'เน้นปล่อยวาง' }, { icon: '🏡', label: 'อยากอยู่เงียบๆ' }]
    };
    if (beYear >= 2489 && beYear <= 2507) return {
      gen: "Baby Boomer", nickname: "สำนักข่าวสวัสดีวันจันทร์", icon: "👵",
      fact: "เชื่อทุกอย่างที่ส่งมาใน LINE Group โดยเฉพาะเรื่องมะนาวโซดา ขยันแชร์คลิปเทศนาตอนตี 5 และเล่าเรื่องซื้อที่ดินด้วยเงิน 200 บาท",
      quote: "เกษียณแล้วแต่ยังไม่ว่าง เพราะต้องคอยส่งสติกเกอร์ดอกไม้ให้ครบ 7 สี 7 วัน",
      stats: [{ icon: '🌻', label: 'สวัสดีวันจันทร์' }, { icon: '📢', label: 'ส่งต่อ Fake News' }, { icon: '🍵', label: 'จิบชาดูหลาน' }]
    };
    return {
      gen: "The Ancient", nickname: "ผู้พิทักษ์กาลเวลา", icon: "🏛️",
      fact: "ประวัติศาสตร์เดินได้", quote: "อาบน้ำร้อนมาก่อน",
      stats: [{ icon: '📜', label: 'จารึกแผ่นหิน' }, { icon: '🏺', label: 'ของโบราณ' }, { icon: '⏳', label: 'เวลาเหลือเฟือ' }]
    };
  };

  const handleCalculate = () => {
    if (!day || !month || !yearBE) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนเข้าสู่โหมดวัยรุ่น!');
      return;
    }
    const beYearInt = parseInt(yearBE);
    const yearCE = beToCe(beYearInt);
    const birthDateStr = `${yearCE}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;
    const birthDate = new Date(birthDateStr);

    if (isNaN(birthDate.getTime())) {
      alert('ดูเหมือนวันที่เกิดจะผิดพลาด ลองเช็คอีกทีนะครับ');
      return;
    }

    // --- แก้ไขอาการกระตุก: คำนวณเวลาเริ่มต้นไว้เลยก่อนที่จะสลับไป Step 2 ---
    const youthEndDate = new Date(birthDate);
    youthEndDate.setFullYear(youthEndDate.getFullYear() + YOUTH_LIMIT_AGE);
    setDiffMs(youthEndDate.getTime() - new Date().getTime());

    setRoast(getGenData(beYearInt));
    setStep(2); // สลับปุ๊บ ตัวเลขมีค่าพร้อมโชว์ทันที
  };

  // --- 3. ฟังก์ชันพากลับหน้า Report (ระบบคนซื่อสัตย์) ---
  const handleConfirmPayment = () => {
    setIsRedirecting(true); // เปลี่ยนปุ่มเป็นสถานะกำลังโหลด

    try {
      const yearCE = beToCe(parseInt(yearBE));
      const birthDateStr = `${yearCE}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;
      const dummySessionId = `dummy_session_123_birth_${encodeURIComponent(birthDateStr)}`;

      // บังคับเปลี่ยนหน้าด้วยท่ามาตรฐานของ Browser (หน่วงเวลา 100ms ให้ปุ่มหมุนก่อน)
      setTimeout(() => {
        window.location.assign(`/report?session_id=${dummySessionId}`);
      }, 100);

    } catch (error) {
      console.error("เกิดข้อผิดพลาดตอนคำนวณวันเกิด:", error);
      setIsRedirecting(false);
    }
  };

  useEffect(() => {
    if (step !== 2) return;
    const yearCE = beToCe(parseInt(yearBE));
    const birthDateStr = `${yearCE}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;
    const birthDate = new Date(birthDateStr);
    const youthEndDate = new Date(birthDate);
    youthEndDate.setFullYear(youthEndDate.getFullYear() + YOUTH_LIMIT_AGE);

    const updateTimer = () => {
      const now = new Date();
      setDiffMs(youthEndDate.getTime() - now.getTime());
    };
    // ให้มันอัปเดตทุกๆ 50ms (ให้มิลลิวินาทีวิ่งสมูท)
    const intervalId = setInterval(updateTimer, 50);
    return () => clearInterval(intervalId);
  }, [step, day, month, yearBE]);

  const formatCountdown = (ms: number) => {
    const absMs = Math.abs(ms);
    const totalSeconds = Math.floor(absMs / 1000);
    const years = Math.floor(totalSeconds / (3600 * 24 * 365.25));
    const days = Math.floor((totalSeconds % (3600 * 24 * 365.25)) / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((absMs % 1000) / 10);
    return { years, days, hours, minutes, seconds, milliseconds };
  };

  const cd = formatCountdown(diffMs);
  const isPastYouth = diffMs < 0;

  if (!isClient) return null;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0c 100%)', color: '#fff', fontFamily: "'Kanit', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,600;0,800;0,900;1,400&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; }
        .glass-card { backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .input-glow:focus { outline: none; border-color: #00f2ff !important; box-shadow: 0 0 10px rgba(0, 242, 255, 0.3); }
        .input-glow::placeholder { font-family: 'Kanit', sans-serif; color: #666; }
      `}</style>

      {/* Modal QR Code */}
      {showQR && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="animate-in" style={{ background: '#fff', padding: '40px', borderRadius: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', color: '#1a1a1a' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🐱</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>ช่วยค่าขนมเด็กๆ</h3>
            <p style={{ fontSize: '1.05rem', color: '#666', marginBottom: '25px', fontWeight: '400' }}>โอนเพื่อรับ "ยันต์กันแก่" <br /> และผลวิเคราะห์</p>

            <img src="/qr.png" alt="QR Code" style={{ width: '100%', borderRadius: '20px', marginBottom: '25px', border: '1px solid #eee' }} />

            {/* ปุ่มระบบคนซื่อสัตย์ */}
            <button
              onClick={handleConfirmPayment}
              disabled={isRedirecting}
              style={{ width: '100%', padding: '16px', borderRadius: '16px', background: isRedirecting ? '#aaa' : 'linear-gradient(45deg, #00f2ff, #0061ff)', color: '#fff', border: 'none', fontWeight: '800', cursor: isRedirecting ? 'not-allowed' : 'pointer', fontSize: '1.1rem', fontFamily: "'Kanit', sans-serif", marginBottom: '12px', transition: 'all 0.3s' }}
            >
              {isRedirecting ? 'กำลังสร้าง Report...' : 'ฉันโอนเงินแล้ว (ดู Report)'}
            </button>

            <button
              onClick={() => setShowQR(false)}
              disabled={isRedirecting}
              style={{ width: '100%', padding: '12px', borderRadius: '16px', background: 'transparent', color: '#888', border: '1px solid #ddd', fontWeight: '600', cursor: isRedirecting ? 'not-allowed' : 'pointer', fontSize: '1rem', fontFamily: "'Kanit', sans-serif", opacity: isRedirecting ? 0.5 : 1 }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {step === 1 ? (
        <div className="glass-card animate-in" style={{ padding: '50px 40px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '4.5rem', marginBottom: '20px', filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))' }}>⌛</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '10px', background: 'linear-gradient(to right, #00f2ff, #784BA0, #FF3CAC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YOUTH CLOCK</h1>
          <p style={{ color: '#888', marginBottom: '40px', fontSize: '1.15rem', lineHeight: '1.6', fontWeight: '300' }}>
            ป้อนวันเกิดของคุณเพื่อเช็คว่า <br /> เหลือเวลาใช้ชีวิตแบบ <b style={{ fontWeight: '600', color: '#fff' }}>"วัยรุ่น"</b> อีกเท่าไหร่?
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '12px', marginBottom: '30px' }}>
            {[{ label: 'วัน', val: day, set: setDay }, { label: 'เดือน', val: month, set: setMonth }, { label: 'พ.ศ. เกิด', val: yearBE, set: setYearBE }].map((item, idx) => (
              <div key={idx}>
                <input
                  type="number"
                  placeholder={item.label}
                  value={item.val}
                  onChange={e => item.set(e.target.value)}
                  className="input-glow"
                  style={{ width: '100%', padding: '18px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', fontSize: '1.1rem', fontFamily: "'Kanit', sans-serif", fontWeight: '600' }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleCalculate}
            style={{ width: '100%', padding: '20px', borderRadius: '20px', background: '#fff', color: '#000', fontWeight: '900', fontSize: '1.3rem', cursor: 'pointer', border: 'none', transition: 'all 0.2s', fontFamily: "'Kanit', sans-serif" }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            VIBE CHECK! ⚡️
          </button>
        </div>
      ) : (
        <div className="animate-in" style={{ maxWidth: '800px', width: '100%' }}>
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', marginBottom: '24px', border: isPastYouth ? '1px solid rgba(0,242,255,0.3)' : '1px solid rgba(255,78,80,0.3)' }}>
            <p style={{ letterSpacing: '2px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: isPastYouth ? '#00f2ff' : '#ff4e50' }}>
              {isPastYouth ? '⚡️ คุณย้ายออกจากวัยรุ่นมาแล้ว' : '🔥 เวลาวัยรุ่นที่เหลืออยู่'}
            </p>

            <div style={{ fontSize: '4.5rem', fontWeight: '900', lineHeight: '1', marginBottom: '10px', fontVariantNumeric: 'tabular-nums' }}>
              {cd.years > 0 && <span style={{ fontSize: '3.5rem' }}>{cd.years}<span style={{ fontSize: '2rem', fontWeight: '400' }}>ปี </span></span>}{cd.days}<span style={{ fontSize: '2rem', fontWeight: '400' }}>วัน</span> <br />
              <span style={{ color: isPastYouth ? '#00f2ff' : '#ff4e50' }}>
                {String(cd.hours).padStart(2, '0')}:{String(cd.minutes).padStart(2, '0')}:{String(cd.seconds).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '1.8rem', opacity: 0.4, fontWeight: '600' }}>.{String(cd.milliseconds).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '35px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-20px', top: '-20px', fontSize: '8rem', opacity: 0.05 }}>{roast?.icon}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <span style={{ fontSize: '3rem' }}>{roast?.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1rem', color: isPastYouth ? '#00f2ff' : '#ff4e50', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{roast?.gen} : {roast?.nickname}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '600', marginTop: '4px' }}>"{roast?.quote}"</div>
              </div>
            </div>
            <div style={{ fontSize: '1.05rem', color: '#ccc', lineHeight: '1.6', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '16px', textAlign: 'left', fontWeight: '300' }}>
              <b style={{ color: '#fff', fontWeight: '600' }}>ความจริงที่กวน:</b> {roast?.fact}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            {roast?.stats?.map((stat: any, idx: number) => (
              <div key={idx} className="glass-card" style={{ padding: '25px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{stat.icon}</div>
                <div style={{ fontSize: '0.95rem', color: '#999', fontWeight: '600' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="/cat.png"
                  alt="Cat"
                  crossOrigin="anonymous"
                  style={{ width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #ffd700', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#ffd700', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #000', fontSize: '10px' }}>🐾</div>
              </div>
              <p style={{ fontSize: '1rem', color: '#ffd700', textAlign: 'left', margin: 0, fontWeight: '400' }}>
                "สมทบทุนค่าขนมแมวและค่ากาแฟของผม <br /> เพื่อรับยันต์กันแก่กับ Report กัน"
              </p>
            </div>

            <button
              onClick={() => setShowQR(true)}
              style={{ width: '100%', padding: '22px', borderRadius: '24px', background: 'linear-gradient(45deg, #00f2ff, #0061ff)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '1.3rem', boxShadow: '0 10px 30px rgba(0, 97, 255, 0.4)', transition: 'transform 0.2s', fontFamily: "'Kanit', sans-serif" }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              รับบทวิเคราะห์เชิงลึก & ยันต์กันแก่ (49.-)
            </button>

            <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: '#777', marginTop: '30px', textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem', fontFamily: "'Kanit', sans-serif", fontWeight: '300' }}>
              คำนวณใหม่เพื่อความบันเทิง
            </button>
          </div>
        </div>
      )}

      <footer style={{ marginTop: '50px', fontSize: '0.85rem', color: '#555', textAlign: 'center', letterSpacing: '1px', fontWeight: '300' }}>
        * วัยรุ่นไม่มีที่สิ้นสุด ถ้าใจเรายังไหว | CREATED BY อัพสกิลกับฟุ้ย
        ไม่มีการเก็บข้อมูลส่วนตัวใดๆทั้งสิ้น เล่นเพื่อความสนุก
      </footer>
    </main>
  );
}