'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { beToCe } from '../lib/dateUtils';

export default function Home() {
  const YOUTH_LIMIT_AGE = 25;
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [yearBE, setYearBE] = useState('');

  const [diffMs, setDiffMs] = useState<number>(0);
  const [roast, setRoast] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // เพิ่ม State และ Ref สำหรับการ Save รูป
  const [isSaving, setIsSaving] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

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

    const youthEndDate = new Date(birthDate);
    youthEndDate.setFullYear(youthEndDate.getFullYear() + YOUTH_LIMIT_AGE);
    setDiffMs(youthEndDate.getTime() - new Date().getTime());

    setRoast(getGenData(beYearInt));
    
    window.scrollTo(0, 0); 
    setStep(2);
  };

  const handleConfirmPayment = () => {
    setIsRedirecting(true);
    try {
      const yearCE = beToCe(parseInt(yearBE));
      const birthDateStr = `${yearCE}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`;
      const dummySessionId = `dummy_session_123_birth_${encodeURIComponent(birthDateStr)}`;
      setTimeout(() => {
        window.location.assign(`/report?session_id=${dummySessionId}`);
      }, 100);
    } catch (error) {
      console.error("error:", error);
      setIsRedirecting(false);
    }
  };

  // ฟังก์ชัน Save รูปของหน้าแรก (Step 2)
  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    setIsSaving(true);

    try {
      await document.fonts.ready;
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 300)); // หน่วงให้ Render ทัน

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#0e0e16', // สีพื้นหลังอิงตาม Gradient ของหน้าเว็บ
        useCORS: true,
        logging: false,
      });

      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Youth-Vibe-Check-${Date.now()}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Save failed:", error);
      alert('เกิดข้อผิดพลาดในการบันทึกภาพครับ ลองอีกครั้งนะครับ');
    } finally {
      setIsSaving(false);
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
    <main 
      style={{ 
        minHeight: step === 1 ? '100dvh' : '100vh', 
        height: step === 1 ? '100dvh' : 'auto', 
        overflow: step === 1 ? 'hidden' : 'auto',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: step === 1 ? '16px' : '40px 16px', 
        background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0c 100%)', 
        color: '#fff', 
        fontFamily: "'Kanit', sans-serif" 
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,600;0,800;0,900;1,400&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; }
        .glass-card { backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); width: 100%; box-sizing: border-box; }
        .input-glow:focus { outline: none; border-color: #00f2ff !important; box-shadow: 0 0 10px rgba(0, 242, 255, 0.3); }
        
        .input-glow { font-family: 'Kanit', sans-serif !important; }
        .input-glow::placeholder { font-family: 'Kanit', sans-serif; color: #666; font-weight: 400; font-size: 1.1rem; }
        
        ${step === 1 ? `body { overflow: hidden; margin: 0; padding: 0; }` : `body { overflow-x: hidden; }`}
        
        @media (max-width: 600px) {
          h1 { font-size: 2.5rem !important; }
          .countdown-text { font-size: 2.8rem !important; }
          .countdown-unit { font-size: 1.2rem !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .glass-card { padding: 30px 20px !important; }
          .qr-modal-content { padding: 30px 20px !important; width: 95% !important; }
          .input-grid { gap: 8px !important; }
        }

        /* Class สำหรับซ่อนตอน Save รูป */
        .hide-on-export { display: flex; }
        .exporting .hide-on-export { display: none !important; }
      `}</style>

      {/* Modal QR Code */}
      {showQR && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
          <div className="animate-in qr-modal-content" style={{ background: '#fff', padding: '40px', borderRadius: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', color: '#1a1a1a', maxHeight: '95vh', overflowY: 'auto' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🐱</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>ช่วยค่าขนมเด็กๆ</h3>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '20px', fontWeight: '400' }}>โอนเพื่อรับ "ยันต์กันแก่" <br /> และผลวิเคราะห์</p>

            <img src="/qr.png" alt="QR Code" style={{ width: '100%', maxWidth: '280px', margin: '0 auto 20px', display: 'block', borderRadius: '15px', border: '1px solid #eee' }} />

            <button
              onClick={handleConfirmPayment}
              disabled={isRedirecting}
              style={{ width: '100%', padding: '16px', borderRadius: '16px', background: isRedirecting ? '#aaa' : 'linear-gradient(45deg, #00f2ff, #0061ff)', color: '#fff', border: 'none', fontWeight: '800', cursor: isRedirecting ? 'not-allowed' : 'pointer', fontSize: '1.1rem', fontFamily: "'Kanit', sans-serif", marginBottom: '12px' }}
            >
              {isRedirecting ? 'กำลังสร้าง Report...' : 'ฉันโอนเงินแล้ว (ดู Report)'}
            </button>

            <button
              onClick={() => setShowQR(false)}
              disabled={isRedirecting}
              style={{ width: '100%', padding: '12px', borderRadius: '16px', background: 'transparent', color: '#888', border: '1px solid #ddd', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', fontFamily: "'Kanit', sans-serif" }}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {step === 1 ? (
        <div className="glass-card animate-in" style={{ padding: '50px 40px', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>⌛</div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '10px', background: 'linear-gradient(to right, #00f2ff, #784BA0, #FF3CAC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YOUTH CLOCK</h1>
          <p style={{ color: '#888', marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.5' }}>
            ป้อนวันเกิดของคุณเพื่อเช็คว่าเหลือเวลา <br /> ใช้ชีวิตแบบ <b style={{ color: '#fff' }}>"วัยรุ่น"</b> อีกเท่าไหร่?
          </p>

          <div className="input-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '12px', marginBottom: '30px' }}>
            {[{ label: 'วัน', val: day, set: setDay }, { label: 'เดือน', val: month, set: setMonth }, { label: 'พ.ศ.', val: yearBE, set: setYearBE }].map((item, idx) => (
              <input
                key={idx}
                type="number"
                inputMode="numeric"
                placeholder={item.label}
                value={item.val}
                onChange={e => item.set(e.target.value)}
                className="input-glow"
                style={{ width: '100%', padding: '15px 5px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', fontSize: '1.5rem', fontWeight: '900', fontFamily: "'Kanit', sans-serif" }}
              />
            ))}
          </div>

          <button
            onClick={handleCalculate}
            style={{ width: '100%', padding: '20px', borderRadius: '20px', background: '#fff', color: '#000', fontWeight: '900', fontSize: '1.3rem', cursor: 'pointer', border: 'none', fontFamily: "'Kanit', sans-serif" }}
          >
            จัดไปวัยรุ่น ⚡️
          </button>

          <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#777', fontWeight: 300, lineHeight: '1.5' }}>
            🔒 <b style={{color: '#aaa', fontWeight: 600}}>ไม่มีการเก็บข้อมูลส่วนตัวใดๆ</b> <br/>
            ระบบคำนวณผ่านเบราว์เซอร์ของคุณเท่านั้น <br/> 
            แอปนี้สร้างขึ้นเพื่อ <b style={{color: '#aaa', fontWeight: 400}}>"ความตื่นรู้ในการใช้ชีวิต"</b> ล้วนๆ
          </div>

        </div>
      ) : (
        <div className="animate-in" style={{ maxWidth: '600px', width: '100%' }}>
          
          {/* 👇 ส่วนที่จะถูกแคปเจอร์เป็นรูปภาพ 👇 */}
          <div 
            ref={resultRef} 
            className={isSaving ? 'exporting' : ''} 
            style={{ padding: isSaving ? '20px' : '0', background: isSaving ? '#0e0e16' : 'transparent', borderRadius: '24px' }}
          >
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ letterSpacing: '2px', fontSize: '0.9rem', fontWeight: '800', marginBottom: '15px', color: isPastYouth ? '#00f2ff' : '#ff4e50' }}>
                {isPastYouth ? '⚡️ คุณย้ายออกจากวัยรุ่นมาแล้ว' : '🔥 เวลาวัยรุ่นที่เหลืออยู่'}
              </p>

              <div className="countdown-text" style={{ fontSize: '3.8rem', fontWeight: '900', lineHeight: '1.1', fontVariantNumeric: 'tabular-nums' }}>
                {cd.years > 0 && <span>{cd.years}<span className="countdown-unit" style={{ fontSize: '1.5rem', fontWeight: '400' }}>ปี </span></span>}
                {cd.days}<span className="countdown-unit" style={{ fontSize: '1.5rem', fontWeight: '400' }}>วัน</span> <br />
                <span style={{ color: isPastYouth ? '#00f2ff' : '#ff4e50' }}>
                  {String(cd.hours).padStart(2, '0')}:{String(cd.minutes).padStart(2, '0')}:{String(cd.seconds).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '1.5rem', opacity: 0.4 }}>.{String(cd.milliseconds).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '30px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
                <span style={{ fontSize: '3.5rem' }}>{roast?.icon}</span>
                <div>
                  <div style={{ fontSize: '0.9rem', color: isPastYouth ? '#00f2ff' : '#ff4e50', fontWeight: '800', letterSpacing: '1px' }}>{roast?.gen}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600', margin: '5px 0' }}>"{roast?.quote}"</div>
                </div>
                <div style={{ fontSize: '0.95rem', color: '#ccc', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '16px', fontWeight: '300', width: '100%' }}>
                  {roast?.fact}
                </div>
              </div>
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '25px' }}>
              {roast?.stats?.map((stat: any, idx: number) => (
                <div key={idx} className="glass-card" style={{ padding: '20px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '0.8rem', color: '#999', fontWeight: '600' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* ลายเซ็นที่จะแสดงเฉพาะตอนเซฟเป็นรูปภาพ */}
            {isSaving && (
              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: '10px', paddingBottom: '10px' }}>
                CREATED BY อัพสกิลกับฟุ้ย (YOUTH CLOCK)
              </div>
            )}
          </div>
          {/* 👆 สิ้นสุดส่วนที่ถูกแคปเจอร์ 👆 */}


          {/* ส่วนนี้คือปุ่ม Action ต่างๆ (จะถูกซ่อนถ้ามีการใส่ class hide-on-export) */}
          <div className="hide-on-export" style={{ textAlign: 'center', flexDirection: 'column', width: '100%' }}>
            
            {/* ปุ่มใหม่: เซฟรูปเฉพาะหน้านี้ */}
            <button
              onClick={handleSaveImage}
              disabled={isSaving}
              style={{ width: '100%', padding: '16px', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '20px', cursor: 'pointer', fontFamily: "'Kanit', sans-serif" }}
            >
              {isSaving ? '⏳ กำลังแชะภาพ...' : '📸 เซฟรูปหน้านี้ไว้อวดเพื่อน'}
            </button>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <img src="/cat.png" alt="Cat" style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #ffd700' }} />
              <p style={{ fontSize: '0.9rem', color: '#ffd700', textAlign: 'left', margin: 0 }}>
                "สมทบทุนค่าขนมแมวและค่ากาแฟ <br /> เพื่อรับบทวิเคราะห์เชิงลึก"
              </p>
            </div>

            {/* ปุ่มไป Report */}
            <button
              onClick={() => setShowQR(true)}
              style={{ width: '100%', padding: '20px', borderRadius: '24px', background: 'linear-gradient(45deg, #00f2ff, #0061ff)', color: '#fff', border: 'none', fontWeight: '800', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              รับบทวิเคราะห์เชิงลึก & ยันต์กันแก่ (49.-)
            </button>

            <button onClick={() => {
              setStep(1);
              window.scrollTo(0, 0); 
            }} style={{ background: 'transparent', border: 'none', color: '#777', marginTop: '20px', textDecoration: 'underline', fontSize: '0.9rem', cursor: 'pointer' }}>
              คำนวณใหม่
            </button>
          </div>

        </div>
      )}

      {step === 1 && (
        <div style={{ position: 'absolute', bottom: '20px', fontSize: '0.75rem', color: '#555', textAlign: 'center' }}>
          CREATED BY อัพสกิลกับฟุ้ย
        </div>
      )}
      
      {step === 2 && (
        <footer className="hide-on-export" style={{ marginTop: '40px', fontSize: '0.75rem', color: '#555', textAlign: 'center' }}>
          CREATED BY อัพสกิลกับฟุ้ย
        </footer>
      )}
    </main>
  );
}