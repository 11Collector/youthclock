import { ImageResponse } from '@vercel/og';
import { getGenerationRoast } from '@/lib/dateUtils';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const d = searchParams.get('d');
    const type = searchParams.get('type');

    // Fetch local font for maximum reliability
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const fontUrl = `${protocol}://${host}/fonts/Kanit-Bold.ttf`;
    
    const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

    // Safe date parsing
    const birthDate = d ? new Date(d) : new Date();
    const deathDate = new Date(birthDate);
    deathDate.setFullYear(birthDate.getFullYear() + 80);

    const now = new Date();
    const msLeft = Math.max(0, deathDate.getTime() - now.getTime());
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    const yearsLeft = Math.floor(daysLeft / 365);
    const remainingDays = daysLeft % 365;

    if (type === 'amulet') {
      // (Keep amulet logic as is)
      return new ImageResponse(
        (
          <div style={{
            background: '#050505',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            fontFamily: 'Kanit',
          }}>
            {/* Red Aura Glow */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(230,57,70,0.2) 0%, transparent 70%)', display: 'flex' }} />
            
            <div style={{ 
              width: 500, 
              height: 750, 
              background: 'linear-gradient(135deg, #ffd700 0%, #d4af37 50%, #aa8000 100%)', 
              borderRadius: 20, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              boxShadow: '0 0 100px rgba(255,215,0,0.4)', 
              border: '6px solid #fdfbd4', 
              color: '#8b0000', 
              padding: 20,
              position: 'relative'
            }}>
               <div style={{ position: 'absolute', top: 12, left: 12, right: 12, bottom: 12, border: '2px solid rgba(139,0,0,0.4)', borderRadius: 10, display: 'flex' }}></div>
               <svg viewBox="0 0 100 100" width="220" height="220" style={{ marginBottom: 40 }}>
                 <circle cx="50" cy="50" r="45" stroke="#8b0000" strokeWidth="2" fill="none" />
                 <circle cx="50" cy="50" r="35" stroke="#8b0000" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                 <path d="M 50 5 L 50 95 M 5 50 L 95 50" stroke="#8b0000" strokeWidth="2" />
                 <path d="M 18 18 L 82 82 M 18 82 L 82 18" stroke="#8b0000" strokeWidth="1.5" />
                 <circle cx="50" cy="50" r="20" fill="#8b0000" />
                 <text x="50" y="55" fontSize="11" textAnchor="middle" fill="#ffd700" fontWeight="bold">มรณัง</text>
               </svg>
               <div style={{ fontSize: 55, fontWeight: 'bold', textAlign: 'center', letterSpacing: 10, lineHeight: 1.4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <span>อายุ</span>
                 <span>วัณโณ</span>
                 <span>สุขัง</span>
                 <span>พลัง</span>
               </div>
            </div>
            <div style={{ marginTop: 40, color: '#444', fontSize: 28, letterSpacing: 8 }}>THE SOUL CLOCK × อัพสกิลกับฟุ้ย</div>
          </div>
        ), { 
          width: 1080, height: 1080,
          fonts: [
            {
              name: 'Kanit',
              data: fontData,
              style: 'normal',
            },
          ],
        }
      );
    }

    const livedMs = now.getTime() - birthDate.getTime();
    const daysLived = Math.floor(livedMs / (1000 * 60 * 60 * 24));
    const activeYears = ((daysLeft / 365.25) * (2 / 3)).toFixed(1);
    const sleepYears = ((daysLeft / 365.25) * (1 / 3)).toFixed(1);
    const totalBeatsLived = daysLived * 100000;
// ... (ส่วนบนเหมือนเดิมจนถึงบรรทัดที่เรียกใช้ generationInfo)

    const generationInfo = getGenerationRoast(birthDate.getFullYear());

    return new ImageResponse(
      (
        <div
          style={{
            background: '#050505',
            color: '#fff',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Kanit',
            position: 'relative',
            padding: '40px'
          }}
        >
          {/* Background Glow */}
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle at center, rgba(139,0,0,0.15) 0%, transparent 70%)', display: 'flex' }} />

          {/* Header Area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
            <div style={{ display: 'flex', fontSize: 20, letterSpacing: '8px', color: '#888', marginBottom: 5 }}>MEMENTO MORI</div>
            <div style={{ display: 'flex', fontSize: 40, fontWeight: 'bold', letterSpacing: '4px', color: '#e63946' }}>THE SOUL REPORT</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', gap: 20 }}>
              {/* Main Stats Frame */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: 25,
                padding: '25px 40px',
                background: 'rgba(20, 20, 20, 0.8)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                width: 480
              }}>
                <div style={{ display: 'flex', fontSize: 22, color: '#aaa', marginBottom: 10 }}>คุณเหลือเวลาบนโลกนี้อีก</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', fontSize: 80, fontWeight: 'bold', color: '#fff', lineHeight: 1 }}>{yearsLeft}</div>
                    <div style={{ display: 'flex', fontSize: 24, color: '#e63946', paddingTop: 20 }}>YEARS</div>
                    <div style={{ display: 'flex', fontSize: 50, fontWeight: 'bold', color: '#fff', marginLeft: 10 }}>{remainingDays}</div>
                    <div style={{ display: 'flex', fontSize: 20, color: '#e63946', paddingTop: 15 }}>DAYS</div>
                </div>
              </div>

              {/* Deep Body Stats Frame */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: 480,
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                borderRadius: 25,
                padding: 25,
                background: 'rgba(255, 255, 255, 0.03)',
              }}>
                <div style={{ display: 'flex', fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 15, letterSpacing: 2 }}>DEEP BODY STATS</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 18, color: '#aaa' }}>หัวใจเต้นไปแล้ว</span>
                  <span style={{ fontSize: 18, fontWeight: 'bold' }}>{totalBeatsLived.toLocaleString()} ครั้ง</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 18, color: '#aaa' }}>เวลาที่ตื่นจริงๆ</span>
                  <span style={{ fontSize: 18, fontWeight: 'bold', color: '#4ade80' }}>{activeYears} ปี</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18, color: '#aaa' }}>คืนที่เหลืออยู่</span>
                  <span style={{ fontSize: 18, fontWeight: 'bold', color: '#e63946' }}>{daysLeft.toLocaleString()} คืน</span>
                </div>
              </div>
            </div>

            {/* Generation Insight Card - แก้ไขจุดที่ Property ไม่มีอยู่จริงตรงนี้ครับ 👇 */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              width: 980,
              background: 'rgba(255,255,255,0.03)', 
              border: `1px solid ${generationInfo.color}44`, 
              borderRadius: '25px', 
              textAlign: 'left',
              overflow: 'hidden',
              padding: '30px',
              position: 'relative'
            }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', fontSize: '2rem', fontWeight: 'bold', color: generationInfo.color, textShadow: `0 0 10px ${generationInfo.color}44` }}>
                      GENERATION INSIGHT
                    </div>
                    <div style={{ display: 'flex', fontSize: '1rem', color: '#888' }}>Analysis by AI</div>
                  </div>
                </div>

                {/* Nickname Box */}
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  background: `${generationInfo.color}22`,
                  padding: '15px 20px',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${generationInfo.color}`,
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', fontSize: '0.9rem', color: generationInfo.color, fontWeight: 'bold', marginBottom: 5 }}>ฉายา</div>
                  <div style={{ display: 'flex', fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>"{generationInfo.nickname}"</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
                   <div style={{ display: 'flex', fontSize: '0.9rem', color: '#888', fontWeight: 'bold', marginBottom: 5 }}>ความจริงที่กวน</div>
                   <div style={{ display: 'flex', fontSize: '1.1rem', color: '#bbb', fontStyle: 'italic', lineHeight: 1.5 }}>{generationInfo.roast}</div>
                </div>

                <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 15 }}>
                   <div style={{ display: 'flex', fontSize: '1.2rem', fontWeight: 'bold', color: generationInfo.color }}>#วัยรุ่นยังไหว</div>
                </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div style={{ position: 'absolute', bottom: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 18, color: '#666' }}>Created by อัพสกิลกับฟุ้ย</div>
          </div>
        </div>
      ),
// ... (ส่วนล่างเหมือนเดิม)
      {
        width: 1080,
        height: 1080,
        fonts: [
          {
            name: 'Kanit',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', color: 'red' }}>
          Failed to generate image
        </div>
      ), { width: 1080, height: 1080 }
    );
  }
}
