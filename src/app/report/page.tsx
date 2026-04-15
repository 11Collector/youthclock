'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';

// ฟังก์ชันหาข้อมูล Gen และข้อความสรุป
function getGenerationSummary(beYear: number) {
  if (beYear >= 2568 && beYear <= 2582) return {
    gen: "Gen Beta", nickname: "รุ่น Prompt สั่งโลก", icon: "🍼",
    fact: "เกิดมาก็เจอ AI เป็นพี่เลี้ยงเด็ก ชีวิตนี้อาจไม่เคยเห็นหญ้าจริง หรือฝนที่ไม่มี PM 2.5",
    quote: "พระอาทิตย์คืออะไร? ใช่ฟิลเตอร์ในแว่น VR หรือเปล่าพี่?",
    yantraRows: [
      { icon: "🔮", text: "โชคดีมีชัย ไร้พ่ายทุก Prompt" },
      { icon: "📡", text: "เน็ตแรงแซงนรก ไม่ตกสมาธิ" },
      { icon: "💻", text: "งานลื่นไหล ไฟล์ไม่พัง" },
      { icon: "🥽", text: "โลก VR สดใส จิตใจไม่ขุ่นมัว" },
      { icon: "🔥", text: "Vibe ดีตลอดปี ไม่มีดราม่า" },
      { icon: "💰", text: "เงินเต็มบัญชี F ของได้ทุกวัน" },
      { icon: "✨", text: "เสน่ห์ล้นเหลือ ผิวพรรณผุดผ่อง" },
      { icon: "🤖", text: "AI เป็นเพื่อนแท้ ดูแลกันไป" },
      { icon: "✅", text: "สรุปสั้นๆ... วัยรุ่นยังไหว!" },
    ],
    quests: [
      { title: "สัมผัสหญ้าจริง", desc: "ถอดแว่น VR แล้วออกไปเดินเท้าเปล่าบนสนามหญ้าสัปดาห์ละครั้ง" },
      { title: "Digital Detox", desc: "ลองอยู่โดยไม่มี AI ช่วยคิดสัก 1 วันเต็มๆ" },
      { title: "เตรียมตัวกู้โลก", desc: "เพราะโลกในอนาคตต้องการคนที่แก้ปัญหาโลกร้อนได้จริงๆ" }
    ]
  };
  if (beYear >= 2553 && beYear <= 2567) return {
    gen: "Gen Alpha", nickname: "นิ้วล็อกมหัศจรรย์", icon: "🎮",
    fact: "พยายาม Zoom บนกระดาษ สมาธิสั้นกว่าคลิป TikTok แต่ตัดต่อเทพเจ้า",
    quote: "สมาธิสั้นแต่ตัดต่อเทพ สั่งอาหารผ่านแอปเป็นก่อนเรียกชื่อพ่อ",
    yantraRows: [
      { icon: "🎮", text: "เวลไม่ขึ้น ก็ได้ไอเทมเทพ" },
      { icon: "📱", text: "นิ้วล็อกมหัศจรรย์ ไถฟีดสมูท" },
      { icon: "💻", text: "งานลื่นไหล ไฟล์ไม่พัง" },
      { icon: "🧋", text: "น้ำตาลเข้าเส้น ไม่เป็นเบาหวาน" },
      { icon: "🔥", text: "Vibe ดีตลอดปี ไม่มีดราม่า" },
      { icon: "💰", text: "เงินเต็มบัญชี F ของได้ทุกวัน" },
      { icon: "✨", text: "เสน่ห์ล้นเหลือ ผิวพรรณผุดผ่อง" },
      { icon: "🚀", text: "ไอเดียบรรเจิด เกิดทุกโปรเจกต์" },
      { icon: "✅", text: "สรุปสั้นๆ... วัยรุ่นยังไหว!" },
    ],
    quests: [
      { title: "ยืดระยะสมาธิ", desc: "ฝึกดูคลิปที่ยาวกว่า 1 นาทีให้จบโดยไม่กดข้ามหรือเร่งความเร็ว" },
      { title: "คุยกับคนจริงๆ", desc: "วางหน้าจอแล้วลองทักทายคนรอบตัวแบบ Face-to-Face" },
      { title: "ค้นหาตัวเอง", desc: "หาทักษะที่ AI ทำแทนไม่ได้ แล้วอัปสกิลให้สุดทาง" }
    ]
  };
  if (beYear >= 2540 && beYear <= 2552) return {
    gen: "Gen Z", nickname: "แบกโลก แบกความเครียด แบกหลังที่ปวด", icon: "🫠",
    fact: "รักอิสระยิ่งชีพ ถ้า Vibe ออฟฟิศไม่ดีขอยอมลาออก เชี่ยวชาญการใช้ Meme บำบัดอาการซึมเศร้า",
    quote: "Work-Life Balance คือหัวใจ แต่ในบัญชีมีเงินเหลือถึงแค่วันพุธ",
    yantraRows: [
      { icon: "🫠", text: "จิตใจแข็งแกร่ง ไม่ Burnout" },
      { icon: "💸", text: "F ของได้ถูกดี มีเงินเหลือใช้" },
      { icon: "🎢", text: "อารมณ์คงที่ ไม่สวิง" },
      { icon: "🦴", text: "กระดูกเหล็ก เอวดีไม่มีทรุด" },
      { icon: "🔥", text: "Vibe ดีตลอดปี ไม่มีดราม่า" },
      { icon: "💰", text: "เงินเต็มบัญชี F ของได้ทุกวัน" },
      { icon: "✨", text: "เสน่ห์ล้นเหลือ ผิวพรรณผุดผ่อง" },
      { icon: "🛌", text: "หลับสนิทตลอดคืน ตื่นมาสดชื่น" },
      { icon: "✅", text: "สรุปสั้นๆ... วัยรุ่นยังไหว!" },
    ],
    quests: [
      { title: "สร้างท่อต่อน้ำ", desc: "อย่าพึ่งพารายได้ทางเดียว เริ่มหา Passive Income เล็กๆ นอกเวลางาน" },
      { title: "เลิก F ของแก้เครียด", desc: "โอนเงินเข้าพอร์ตลงทุนทุกครั้งที่รู้สึกอยากช้อปปิ้งบำบัด" },
      { title: "นอนให้พอ", desc: "ปิดแจ้งเตือนงาน ปิด TikTok แล้วนอนให้ครบ 7-8 ชั่วโมงจริงๆ" }
    ]
  };
  if (beYear >= 2524 && beYear <= 2539) return {
    gen: "Gen Y / Millennials", nickname: "สมาคมปวดหลังแห่งประเทศไทย", icon: "😫",
    fact: "ซวยที่สุดเพราะทันทั้งยุคเป่าตลับเกมและ AI ปัจจุบันเป็นลูกค้า VIP ร้านนวดและยาแก้กรดไหลย้อน",
    quote: "เป็นกำลังหลักของสังคม แต่สภาพร่างกายเหมือนผ่านสงครามโลกครั้งที่ 2",
    yantraRows: [
      { icon: "💊", text: "หายปวดหลัง ปราศจากโรคเวรโรคกรรม" },
      { icon: "🩹", text: "วันกายภาพ สุขภาพกลับมาปิ๊ง" },
      { icon: "☕️", text: "กาแฟดี ดื่มแล้วไฟลุก" },
      { icon: "💻", text: "งานลื่นไหล ไฟล์ไม่พัง" },
      { icon: "🔥", text: "Vibe ดีตลอดปี ไม่มีดราม่า" },
      { icon: "💰", text: "เงินเต็มบัญชี F ของได้ทุกวัน" },
      { icon: "✨", text: "เสน่ห์ล้นเหลือ ผิวพรรณผุดผ่อง" },
      { icon: "🩺", text: "ตรวจโรคไม่เจอ สุขภาพเลิศ" },
      { icon: "✅", text: "สรุปสั้นๆ... วัยรุ่นยังไหว!" },
    ],
    quests: [
      { title: "ลงทุนกับ Ergonomic", desc: "เก้าอี้ดี โต๊ะปรับระดับได้ คือการซื้ออายุขัยกระดูกสันหลังของคุณ" },
      { title: "เช็คพอร์ตเกษียณ", desc: "หยุดผลัดวันประกันพรุ่ง เอาเป้าหมายเกษียณ 60 ปีมากางแล้วคำนวณเงินเฟ้อเดี๋ยวนี้" },
      { title: "เลิกแบกโลก", desc: "กล้าปฏิเสธงานที่ไม่ใช่หน้าที่ และเลิกคาดหวังความสมบูรณ์แบบจากลูกน้อง/หัวหน้า" }
    ]
  };
  if (beYear >= 2508 && beYear <= 2523) return {
    gen: "Gen X", nickname: "CEO ผู้โดดเดี่ยว", icon: "💼",
    fact: "โตมาแบบบุฟเฟต์ ดูแลตัวเองมาแต่เด็ก อดทนเก่งทั้งกับเจ้านาย Boomer และลูกน้อง Gen Z",
    quote: "ทำงานงกๆ เพื่อซื้อความสุขให้คนในบ้าน แต่ตัวเองอยากอยู่นิ่งๆ",
    yantraRows: [
      { icon: "📈", text: "หุ้นขึ้นพอร์ตเขียว เคี้ยวกำไรเพลิน" },
      { icon: "🧘", text: "เน้นปล่อยวาง จิตใจเบิกบาน" },
      { icon: "🏡", text: "บ้านสงบสุข ลูกหลานเชื่อฟัง" },
      { icon: "💻", text: "งานลื่นไหล ไฟล์ไม่พัง" },
      { icon: "🔥", text: "Vibe ดีตลอดปี ไม่มีดราม่า" },
      { icon: "💰", text: "เงินเต็มบัญชี F ของได้ทุกวัน" },
      { icon: "✨", text: "เสน่ห์ล้นเหลือ ผิวพรรณผุดผ่อง" },
      { icon: "🏌️", text: "วงสวิงเป๊ะปัง พลังไม่ตก" },
      { icon: "✅", text: "สรุปสั้นๆ... วัยรุ่นยังไหว!" },
    ],
    quests: [
      { title: "เช็คอัพสุขภาพชุดใหญ่", desc: "ไม่ใช่แค่ตรวจพื้นฐาน แต่ตรวจความเสี่ยงโรคร้ายและมวลกระดูกประจำปี" },
      { title: "ทบทวนสินทรัพย์", desc: "จัดการพินัยกรรม ประกันชีวิต และหนี้สินให้เป็นระเบียบเพื่อคนข้างหลัง" },
      { title: "พาตัวเองไปพัก", desc: "เลิกเอาเงินไปปรนเปรอคนอื่น แล้วจองทริปดีๆ ให้ตัวเองสักครั้งโดยไม่รู้สึกผิด" }
    ]
  };
  if (beYear >= 2489 && beYear <= 2507) return {
    gen: "Baby Boomer", nickname: "สำนักข่าวสวัสดีวันจันทร์", icon: "👵",
    fact: "เชื่อทุกอย่างใน LINE Group ขยันแชร์คลิปเทศนาตอนตี 5 และสติกเกอร์ดอกไม้ 7 วัน 7 สี",
    quote: "เกษียณแล้วแต่ยังไม่ว่าง เพราะต้องคอยส่งสติกเกอร์ดอกไม้ให้ครบสี",
    yantraRows: [
      { icon: "🌻", text: "สวัสดีวันจันทร์ จิตใจเบิกบาน" },
      { icon: "📢", text: "แชร์แต่ข่าวจริง สิ่งดีมีประโยชน์" },
      { icon: "🍵", text: "จิบชาดูหลาน มีความสุขกายใจ" },
      { icon: "🙏", text: "แต้มบุญสูงส่ง ปลอดโรคปลอดภัย" },
      { icon: "🔥", text: "Vibe ดีตลอดปี ไม่มีดราม่า" },
      { icon: "💰", text: "เงินเต็มบัญชี F ของได้ทุกวัน" },
      { icon: "✨", text: "เสน่ห์ล้นเหลือ ผิวพรรณผุดผ่อง" },
      { icon: "📱", text: "พิมพ์ไลน์คล่องแคล่ว แว่นไม่ต้อง" },
      { icon: "✅", text: "สรุปสั้นๆ... วัยรุ่นยังไหว!" },
    ],
    quests: [
      { title: "ชัวร์ก่อนแชร์", desc: "ตั้งกฎกับตัวเองให้เช็คข้อมูลจากสำนักข่าวหลักก่อนส่งต่อลงกรุ๊ปไลน์" },
      { title: "ใช้เงินซะ!", desc: "เงินที่อุตส่าห์หามาทั้งชีวิต เอามาซื้อความสุขให้ตัวเองบ้าง ไม่ต้องเก็บให้ลูกหลานหมด" },
      { title: "ปล่อยวาง", desc: "ลูกหลานโตแล้ว ให้เขาล้มลุกคลุกคลานเองบ้าง เรามีหน้าที่ให้กำลังใจอยู่ห่างๆ" }
    ]
  };
  return {
    gen: "The Ancient", nickname: "ผู้พิทักษ์กาลเวลา", icon: "🏛️",
    fact: "ประวัติศาสตร์เดินได้ อายุเป็นเพียงตัวเลข", quote: "อาบน้ำร้อนมาก่อน",
    yantraRows: [
      { icon: "⏳", text: "เวลาเหลือเฟือ สุขเหลือหลาย" },
      { icon: "✅", text: "สรุปสั้นๆ... วัยรุ่นยังไหว!" },
    ],
    quests: [
      { title: "บันทึกความทรงจำ", desc: "เขียนหรืออัดเสียงเล่าเรื่องราวในอดีตให้คนรุ่นหลังฟัง" },
      { title: "รักษาสุขภาพ", desc: "เคลื่อนไหวร่างกายเบาๆ รับแดดอ่อนๆ ยามเช้า" },
      { title: "ใช้ชีวิตให้คุ้ม", desc: "ทำสิ่งที่อยากทำมาตลอดชีวิต" }
    ]
  };
}

export default function ReportPage() {
  const [birthDateStr, setBirthDateStr] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const yantraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (sessionId && sessionId.startsWith('dummy_session_123_birth_')) {
      setBirthDateStr(decodeURIComponent(sessionId.replace('dummy_session_123_birth_', '')));
    }
  }, []);

  // ฟังก์ชันถ่ายรูปเฉพาะยันต์ (ปรับแก้ให้ html2canvas วาดภาพได้เป๊ะ 100%)
  const handleSaveYantra = async () => {
    if (!yantraRef.current) return;
    setIsSaving(true);

    try {
      await document.fonts.ready;

      // บังคับเลื่อนจอขึ้นบนสุดก่อนถ่าย ป้องกันภาพแหว่ง (Bug ยอดฮิตของ html2canvas)
      window.scrollTo(0, 0);

      const canvas = await html2canvas(yantraRef.current, {
        scale: 3,
        backgroundColor: null, // ให้พื้นหลังใส (ไม่เอาขอบดำๆ ติดมา)
        useCORS: true,
        logging: false
      });

      const image = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Yantra-9-Rows-${Date.now()}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Save failed:", error);
      alert('เกิดข้อผิดพลาดในการบันทึกภาพยันต์ครับ ลองอัปเดตเบราว์เซอร์ดูนะครับ');
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) return null;

  if (!birthDateStr) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c', color: '#fff', fontFamily: "'Kanit', sans-serif" }}>
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>ไม่พบข้อมูลวันเกิด หรือลิงก์ไม่ถูกต้อง</p>
          <Link href="/" style={{ color: '#00f2ff', textDecoration: 'none', fontWeight: 'bold' }}>กลับหน้าแรกเพื่อคำนวณใหม่</Link>
        </div>
      </main>
    );
  }

  const birthDate = new Date(birthDateStr);
  const now = new Date();
  const beYearInt = birthDate.getFullYear() + 543;
  const age = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  const targetAge = 60;
  const daysLeftToTarget = Math.max(0, (targetAge - age) * 365.25);

  const weekendsLeft = Math.floor((daysLeftToTarget / 7) * 2);
  const paychecksLeft = Math.floor(daysLeftToTarget / 30.44);
  const activeDaysLeft = Math.floor(daysLeftToTarget * (2 / 3));
  const energyLevel = Math.max(10, Math.floor(age <= 30 ? 100 : 100 - (age - 30) * 2.5));
  const themeColor = age > 25 ? '#00f2ff' : '#ff4e50';

  const genSummary = getGenerationSummary(beYearInt);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#0a0a0c', color: '#fff', fontFamily: "'Kanit', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,600;0,800;0,900;1,400&display=swap');
        .glass-panel { backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 32px; }
        .big-number { font-weight: 900; line-height: 1; background: linear-gradient(to bottom, #fff 60%, ${themeColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-variant-numeric: tabular-nums; }
        
        /* 🔴 แก้ไขสไตล์ยันต์แผ่นทองให้ html2canvas รองรับ 100% 🔴 */
        .yantra-outer {
          background: linear-gradient(135deg, #e6c27a 0%, #ffe599 25%, #c59b3c 50%, #ffe599 75%, #996515 100%);
          border: 4px solid #8b0000;
          padding: 8px; /* เว้นระยะให้กรอบใน */
          position: relative;
          color: #3b1e00;
        }
        .yantra-inner {
          border: 2px solid #e6c27a;
          padding: 24px;
          height: 100%;
          position: relative;
        }
        
        /* ลายน้ำยันต์ ใช้ Class แทน Pseudo-element เพราะ html2canvas วาด ::before ไม่ค่อยติด */
        .watermark {
          position: absolute; font-size: 2.5rem; opacity: 0.15; color: #8b0000; font-family: serif;
        }
        .watermark-top { top: 5px; left: 10px; }
        .watermark-bottom { bottom: 5px; right: 10px; }
        
        .yantra-row { border-bottom: 2px dotted rgba(139, 0, 0, 0.3); display: flex; align-items: center; padding: 12px 0; font-weight: 600; }
        .yantra-row:last-child { border-bottom: none; }
        
        .save-btn { transition: all 0.2s; cursor: pointer; }
        .save-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(255,255,255,0.2); }
        .save-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        
        .quest-box {
          background: rgba(255,255,255,0.05); border-left: 4px solid ${themeColor}; padding: 15px 20px;
          margin-bottom: 12px; border-radius: 0 12px 12px 0; transition: transform 0.2s;
        }
        .quest-box:hover { transform: translateX(5px); background: rgba(255,255,255,0.08); }
      `}</style>

      <div style={{ maxWidth: '600px', width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ← คำนวณใหม่
        </Link>
      </div>

      <div style={{ maxWidth: '600px', width: '100%', padding: '0px 20px', background: '#0a0a0c', borderRadius: '16px' }}>

        {/* --- Report สรุป Progress ตัวเลข --- */}
        <div className="glass-panel" style={{ padding: '40px 30px', marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '0.9rem', color: themeColor, letterSpacing: '2px', fontWeight: 800 }}>TIME INSIGHT REPORT</h1>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '30px' }}>เจาะลึก Progress ชีวิต</h2>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '30px', borderRadius: '24px', marginBottom: '20px' }}>
            <p style={{ color: '#ccc', marginBottom: '10px' }}>คุณเหลือ "วันเสาร์-อาทิตย์" ให้ใช้ชีวิตอีก</p>
            <div className="big-number" style={{ fontSize: '5rem' }}>{weekendsLeft.toLocaleString()}</div>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>วัน</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '20px' }}>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>งวดเงินเดือนที่เหลือ</p>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{paychecksLeft}</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '20px' }}>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>วันเวลาที่ตื่นจริง</p>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{activeDaysLeft.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ marginBottom: '30px', textAlign: 'left', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>💪</span>
                <span style={{ fontSize: '0.9rem', color: '#ccc', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>ENERGY LEVEL</span>
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: themeColor, fontVariantNumeric: 'tabular-nums' }}>{energyLevel}%</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{
                width: `${energyLevel}%`,
                height: '100%',
                background: `linear-gradient(to right, ${themeColor}aa, ${themeColor})`,
                borderRadius: '10px',
                boxShadow: `0 0 20px ${themeColor}aa`,
              }}></div>
            </div>
            <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '10px', fontWeight: 300, margin: '10px 0 0 0' }}>* สมรรถนะร่างกายเฉลี่ยตามอายุ พีคสุดที่ 30 และค่อยๆ ลดลง</p>
          </div>

          <div style={{ textAlign: 'left', padding: '25px', borderRadius: '20px', background: 'rgba(0,0,0,0.3)', border: `1px solid rgba(255,255,255,0.05)`, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '20px', background: '#0a0a0c', padding: '0 10px', fontSize: '1.2rem' }}>💡</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '10px', color: '#fff' }}>บทวิเคราะห์การใช้เวลา</h3>
            <p style={{ color: '#bbb', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
              ข้อมูล Progress ชี้ให้เห็นว่า <b style={{ color: themeColor, fontWeight: 600 }}>"เวลาส่วนตัว"</b> มีจำกัดกว่าที่เราคิด การบริหารเวลาและรายได้ในช่วงที่ <b style={{ color: '#fff', fontWeight: 600 }}>Energy Level</b> ยังสูงอยู่ คือกลยุทธ์สำคัญที่จะช่วยให้บรรลุเป้าหมายในชีวิตได้รวดเร็วขึ้น
            </p>
          </div>
        </div>

        {/* --- บทสรุป GEN --- */}
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
            <span style={{ fontSize: '2.5rem' }}>{genSummary.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.9rem', color: themeColor, fontWeight: 800 }}>{genSummary.gen}</p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>"{genSummary.nickname}"</h3>
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '16px', textAlign: 'left', marginBottom: '15px' }}>
            <p style={{ lineHeight: 1.6, fontSize: '0.95rem' }}><b style={{ color: themeColor }}>ความจริงที่กวน:</b> {genSummary.fact}</p>
          </div>
          <p style={{ textAlign: 'left', fontStyle: 'italic', borderLeft: `4px solid ${themeColor}`, paddingLeft: '15px', fontSize: '1rem' }}>"{genSummary.quote}"</p>
        </div>

        {/* --- The Youth Roadmap --- */}
        <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🗺️ THE YOUTH ROADMAP
          </h2>
          <p style={{ color: '#ccc', fontSize: '0.95rem', marginBottom: '20px' }}>
            แผนที่ภารกิจด่วน 3 ข้อ ที่ชาว <b style={{ color: themeColor }}>{genSummary.gen}</b> ควรเริ่มทำตั้งแต่วันนี้ เพื่อคุณภาพชีวิตที่ดีก่อนหมดโควต้าวัยรุ่น/วัยทำงาน:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {genSummary.quests.map((quest, idx) => (
              <div key={idx} className="quest-box">
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '0 0 5px 0' }}>
                  {idx + 1}. {quest.title}
                </h4>
                <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                  {quest.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🟡 ยันต์แผ่นทอง 9 แถว (ครอบด้วย yantraRef เพื่อเซฟเฉพาะส่วนนี้) 🟡 */}
        {/* ปรับโครงสร้าง CSS ให้เข้ากับ html2canvas (ใช้ Real DOM แทน) */}
        <div ref={yantraRef} className="yantra-outer" style={{ borderRadius: '24px', marginBottom: '20px' }}>
          <div className="yantra-inner" style={{ borderRadius: '16px' }}>

            {/* ลายน้ำอักขระ (ใช้ Div ของจริง) */}
            <div className="watermark watermark-top">ॐ</div>
            <div className="watermark watermark-bottom">ॐ</div>

            <div style={{ textAlign: 'center', marginBottom: '25px', position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#8b0000', textShadow: '1px 1px 0px #ffe599', margin: 0 }}>
                ๏ ยันต์แผ่นทอง ๙ แถว ๚
              </h2>
              <p style={{ color: '#8b0000', fontWeight: '800', fontSize: '1.2rem', marginTop: '5px' }}>
                #วัยรุ่นยังไหว (ชาว {genSummary.gen}) ๛
              </p>
            </div>

            <div style={{ textAlign: 'left', borderTop: '2px solid rgba(139, 0, 0, 0.4)', position: 'relative', zIndex: 10 }}>
              {genSummary.yantraRows.map((row, idx) => (
                <div key={idx} className="yantra-row">
                  <div style={{ width: '40px', fontSize: '1.3rem', textAlign: 'center' }}>{row.icon}</div>
                  <div style={{ fontSize: '1.05rem', color: '#8b0000' }}>
                    <span style={{ fontWeight: '800' }}>๏</span> {row.text} <span style={{ fontWeight: '800' }}>๚</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem', color: '#8b0000', opacity: 0.8, fontWeight: 600, position: 'relative', zIndex: 10 }}>
              ปลุกเสกด้วยพลังวัยรุ่น • อัพสกิลกับฟุ้ย
            </div>

          </div>
        </div>

      </div>

      {/* ปุ่ม SAVE (เซฟเฉพาะยันต์) */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px', marginTop: '10px' }}>
        <button
          onClick={handleSaveYantra}
          disabled={isSaving}
          className="save-btn"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '22px 40px', fontSize: '1.2rem', fontWeight: 900,
            background: isSaving ? '#aaa' : '#fff', color: '#000', borderRadius: '24px', border: 'none', width: '100%',
            fontFamily: "'Kanit', sans-serif"
          }}
        >
          {isSaving ? '⏳ กำลังสวดคาถาบันทึกยันต์...' : '💾 บันทึกรูป "ยันต์ 9 แถว" ไว้อวดเพื่อน'}
        </button>
        <p style={{ color: '#555', marginTop: '15px', fontSize: '0.85rem' }}>* กดเพื่อบันทึกรูปยันต์แผ่นทองลงเครื่อง สำหรับตั้งเป็นวอลเปเปอร์ได้เลย</p>
      </div>

    </main>
  );
}