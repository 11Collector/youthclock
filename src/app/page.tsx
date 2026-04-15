'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
  
  const [previewImg, setPreviewImg] = useState<string | null>(null);
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
      fact: "ประวัติศาสตร์เดินได้ อายุเป็นเพียงตัวเลข", quote: "อาบน้ำร้อนมาก่อน",
      stats: [{ icon: '📜', label: 'จารึกแผ่นหิน' }, { icon: '🏺', label: 'ของโบราณ' }, { icon: '⏳', label: 'เวลาเหลือเฟือ' }]
    };
  };

  const handleCalculate = () => {
    if (!day || !month || !yearBE) {
      alert('กรุณากรอกข้อมูลให้ครบก่อนนะวัยรุ่น!');
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
      setIsRedirecting(false);
    }
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    setIsSaving(true);
    try {
      await document.fonts.ready;
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#0a0a0c',
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Blob creation failed');
        const file = new File([blob], `YouthClock-${Date.now()}.png`, { type: 'image/png' });
        
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: 'Youth Clock', text: 'เช็คเวลาวัยรุ่นของฉัน' });
          } catch (err) {
            setPreviewImg(dataUrl);
          }
        } else {
          setPreviewImg(dataUrl);
        }
      }, 'image/png');

    } catch (error) {
      alert('เซฟรูปไม่สำเร็จ ลองแคปหน้าจอแทนนะครับ');
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
    <main style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: step === 1 ? 'center' : 'flex-start', padding: '16px', background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0c 100%)', color: '#fff', fontFamily: "'Kanit', sans-serif", width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,600;0,800;0,900;1,400&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.5s ease-out forwards; }
        .glass-card { backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 28px; width: 100%; box-sizing: border-box; }
        .input-glow:focus { border-color: #00f2ff; box-shadow: 0 0 15px rgba(0, 242, 255, 0.3); outline: none; }
        
        .tabular-nums { font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
        
        .exporting .glass-card { backdrop-filter: none !important; background: rgba(30, 30, 40, 0.95) !important; }
        .exporting .hide-on-export { display: none !important; }

        @media (max-width: 480px) {
          .countdown-text { font-size: 2.8rem !important; }
          .main-title { font-size: 2.5rem !important; }
          .glass-card { padding: 24px 20px !important; }
          .stats-label { font-size: 0.7rem !important; }
        }
      `}</style>

      {/* Preview Modal */}
      {previewImg && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <p style={{ marginBottom: '15px', color: '#00f2ff', fontWeight: 600, textAlign: 'center' }}>📱 กดค้างที่รูปด้านล่าง <br /> เพื่อเลือก "Save Image / บันทึกรูปภาพ"</p>
          <img src={previewImg} alt="Preview" style={{ width: '100%', maxWidth: '380px', borderRadius: '20px', boxShadow: '0 0 40px rgba(0,242,255,0.2)' }} />
          <button onClick={() => setPreviewImg(null)} style={{ marginTop: '25px', padding: '12px 40px', borderRadius: '14px', background: '#fff', color: '#000', border: 'none', fontWeight: 800 }}>ปิด</button>
        </div>
      )}

      {/* Popup QR */}
      {showQR && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="animate-in" style={{ background: '#fff', padding: '24px', borderRadius: '32px', maxWidth: '380px', width: '100%', textAlign: 'center', color: '#1a1a1a', maxHeight: '85dvh', overflowY: 'auto' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🐱</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>ช่วยค่าขนมเด็กๆ</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px' }}>โอนเพื่อรับ "ยันต์กันแก่" และบทวิเคราะห์</p>
            <img src="/qr.png" alt="QR" style={{ width: '100%', maxWidth: '200px', borderRadius: '12px', marginBottom: '16px', border: '1px solid #eee' }} />
            <button onClick={handleConfirmPayment} disabled={isRedirecting} style={{ width: '100%', padding: '14px', borderRadius: '16px', background: isRedirecting ? '#ccc' : 'linear-gradient(45deg, #00f2ff, #0061ff)', color: '#fff', border: 'none', fontWeight: '800', fontSize: '1rem', marginBottom: '8px' }}>
              {isRedirecting ? 'กำลังสร้าง...' : 'ฉันโอนแล้ว (ดู Report)'}
            </button>
            <button onClick={() => setShowQR(false)} style={{ background: 'transparent', color: '#888', border: 'none', fontSize: '0.9rem' }}>ยกเลิก</button>
          </div>
        </div>
      )}

      {step === 1 ? (
        <div className="glass-card animate-in" style={{ padding: '40px', maxWidth: '450px', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>⌛</div>
          <h1 className="main-title" style={{ fontSize: '3.2rem', fontWeight: '900', letterSpacing: '-1.5px', background: 'linear-gradient(to right, #00f2ff, #FF3CAC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>YOUTH CLOCK</h1>
          <p style={{ color: '#aaa', marginBottom: '32px', fontSize: '0.95rem', fontWeight: 300 }}>ป้อนวันเกิดเพื่อเช็คว่าเหลือเวลาใช้ชีวิต <br/> แบบ <b style={{ color: '#fff', fontWeight: 600 }}>"วัยรุ่น"</b> อีกเท่าไหร่?</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.3fr', gap: '12px', marginBottom: '24px' }}>
            {[{ label: 'วัน', val: day, set: setDay }, { label: 'เดือน', val: month, set: setMonth }, { label: 'พ.ศ.', val: yearBE, set: setYearBE }].map((item, idx) => (
              <input key={idx} type="number" inputMode="numeric" placeholder={item.label} value={item.val} onChange={e => item.set(e.target.value)} className="input-glow" style={{ width: '100%', padding: '16px 0', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', fontSize: '1.3rem', fontWeight: '800', fontFamily: 'Kanit' }} />
            ))}
          </div>

          <button onClick={handleCalculate} style={{ width: '100%', padding: '18px', borderRadius: '20px', background: '#fff', color: '#000', fontWeight: '900', fontSize: '1.2rem', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>VIBE CHECK! ⚡️</button>
          
          <div style={{ marginTop: '24px', fontSize: '0.75rem', color: '#666', fontWeight: 300, lineHeight: '1.5', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            🔒 <b style={{color: '#999', fontWeight: 600}}>ไม่มีการเก็บข้อมูลส่วนตัวใดๆ</b> <br/>
            ระบบคำนวณผ่านเบราว์เซอร์ของคุณเท่านั้น <br/> 
            สร้างขึ้นเพื่อ <b style={{color: '#999', fontWeight: 400}}>"ความตื่นรู้ในการใช้ชีวิต"</b> ล้วนๆ
          </div>
        </div>
      ) : (
        <div className="animate-in" style={{ maxWidth: '600px', width: '100%', paddingTop: '10px' }}>
          
          <div ref={resultRef} className={isSaving ? 'exporting' : ''} style={{ padding: isSaving ? '24px' : '0', background: isSaving ? '#0a0a0c' : 'transparent', borderRadius: '24px' }}>
<div className="glass-card" style={{ padding: '40px 20px', textAlign: 'center', marginBottom: '12px' }}>
  <p style={{ letterSpacing: '1.5px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '24px', color: isPastYouth ? '#00f2ff' : '#ff4e50', textTransform: 'uppercase' }}>
    {isPastYouth ? '⚡️ เกินลิมิตวัยรุ่นมาแล้ว' : '🔥 เวลาวัยรุ่นที่เหลืออยู่'}
  </p>
  
<div className="countdown-text tabular-nums" style={{ lineHeight: '1.2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
  
  {/* แถวที่ 1: ปี และ วัน */}
  <div>
    {cd.years > 0 && (
      <span style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '2px' }}>
        {cd.years}
        <span style={{ fontSize: '1.2rem', fontWeight: '400', color: '#888', marginLeft: '8px', marginRight: '20px' }}>ปี</span>
      </span>
    )}
    <span style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '2px' }}>
      {cd.days}
      <span style={{ fontSize: '1.2rem', fontWeight: '400', color: '#888', marginLeft: '8px' }}>วัน</span>
    </span>
  </div>

  {/* แถวที่ 2: ชม. นาที วินาที (แยกหน่วยชัดเจน ไม่เบียด) */}
  <div style={{ color: isPastYouth ? '#00f2ff' : '#ff4e50' }}>
    <span style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '2px' }}>
      {String(cd.hours).padStart(2, '0')}
      <span style={{ fontSize: '1rem', fontWeight: '400', color: '#888', opacity: 0.7, marginLeft: '4px', marginRight: '12px' }}>ชม.</span>
    </span>
    <span style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '2px' }}>
      {String(cd.minutes).padStart(2, '0')}
      <span style={{ fontSize: '1rem', fontWeight: '400', color: '#888', opacity: 0.7, marginLeft: '4px', marginRight: '12px' }}>นาที</span>
    </span>
    <span style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '2px' }}>
      {String(cd.seconds).padStart(2, '0')}
      <span style={{ fontSize: '1rem', fontWeight: '400', color: '#888', opacity: 0.7, marginLeft: '4px' }}>วิ</span>
    </span>
  </div>

</div>
</div>

            {/* Gen Roast Card */}
            <div className="glass-card" style={{ padding: '28px 24px', marginBottom: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '3.2rem', display: 'block', marginBottom: '10px' }}>{roast?.icon}</span>
              <div style={{ fontSize: '0.8rem', color: isPastYouth ? '#00f2ff' : '#ff4e50', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{roast?.gen} : {roast?.nickname}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', lineHeight: '1.3', marginBottom: '15px', color: '#fff' }}>"{roast?.quote}"</div>
              <div style={{ fontSize: '0.95rem', color: '#bbb', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '20px', lineHeight: 1.6, fontWeight: 300, textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)' }}>
                <b style={{ color: isPastYouth ? '#00f2ff' : '#ff4e50', fontWeight: '600' }}>Fact Check : </b> {roast?.fact}
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {roast?.stats?.map((stat: any, idx: number) => (
                <div key={idx} className="glass-card" style={{ padding: '20px 10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
                  <div className="stats-label" style={{ fontSize: '0.8rem', color: '#999', fontWeight: '600', letterSpacing: '0.5px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            {isSaving && <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#555', marginTop: '10px', letterSpacing: '2px' }}>CREATED BY อัพสกิลกับฟุ้ย</div>}
          </div>

          {/* Action Buttons */}
          <div className="hide-on-export" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 8px' }}>
            <button onClick={handleSaveImage} disabled={isSaving} style={{ width: '100%', padding: '16px', borderRadius: '24px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {isSaving ? '⏳ กำลังแชะภาพ...' : '📸 เซฟรูปไว้อวดเพื่อน'}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '8px 0' }}>
              <img src="/cat.png" alt="Cat" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #ffd700', objectFit: 'cover' }} />
              <p style={{ fontSize: '0.85rem', color: '#ffd700', textAlign: 'left', margin: 0, lineHeight: '1.4' }}>สมทบทุนค่าขนมแมว <br/> เพื่อรับบทวิเคราะห์เชิงลึก</p>
            </div>

            <button onClick={() => setShowQR(true)} style={{ width: '100%', padding: '18px', borderRadius: '24px', background: 'linear-gradient(45deg, #00f2ff, #0061ff)', color: '#fff', border: 'none', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0, 97, 255, 0.3)' }}>รับบทวิเคราะห์เชิงลึก & ยันต์พลังวัยรุ่น (49.-)</button>
            
            <button onClick={() => { setStep(1); window.scrollTo(0, 0); }} style={{ background: 'transparent', border: 'none', color: '#555', textDecoration: 'underline', fontSize: '0.9rem', cursor: 'pointer', marginTop: '8px' }}>คำนวณใหม่</button>
          </div>
        </div>
      )}

      <footer className="hide-on-export" style={{ marginTop: '40px', fontSize: '0.7rem', color: '#444', textAlign: 'center', letterSpacing: '1px' }}>CREATED BY อัพสกิลกับฟุ้ย</footer>
    </main>
  );
}