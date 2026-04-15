// lib/dateUtils.ts

export const beToCe = (yearBE: number): number => {
  return yearBE - 543;
};

// คำนวณวันหมดอายุวัยรุ่น (25 ปี)
export const calculateYouthEndDate = (birthDate: Date): Date => {
  const youthDate = new Date(birthDate);
  youthDate.setFullYear(youthDate.getFullYear() + 25);
  return youthDate;
};

// ข้อมูลแซวแต่ละ Generation
export const getGenerationRoast = (birthYearCE: number) => {
  if (birthYearCE >= 2013) {
    return {
      nickname: 'Gen Alpha ตัวจิ๋ว',
      color: '#ff00ff', // สี Neon Pink
      roast: 'โตมาพร้อม iPad และคุยกับ AI รู้เรื่องกว่าคุยกับคน'
    };
  }
  if (birthYearCE >= 1997) {
    return {
      nickname: 'Gen Z ตัวตึง',
      color: '#00f2ff', // สี Cyan
      roast: 'วัยรุ่นเทสดี ที่มีพลังงานล้นเหลือ (ถ้าได้นอนครบ 8 ชั่วโมง)'
    };
  }
  if (birthYearCE >= 1981) {
    return {
      nickname: 'Gen Y เดอะแบก',
      color: '#ff4e50', // สี Red Orange
      roast: 'วัยรุ่นปวดหลัง ผู้ผ่านวิกฤตมานับไม่ถ้วน แต่ก็ยังสู้งาน'
    };
  }
  if (birthYearCE >= 1965) {
    return {
      nickname: 'Gen X วัยเก๋า',
      color: '#f9d423', // สี Gold
      roast: 'รุ่นใหญ่ใจนิ่ง ผ่านยุคอนาล็อกสู่ดิจิทัลมาได้อย่างสวยงาม'
    };
  }
  return {
    nickname: 'Legendary Boomer',
    color: '#ffffff',
    roast: 'ระดับตำนานที่ยังมีลมหายใจ เคารพครับจารย์!'
  };
};

// คำนวณสถิติขำๆ (ใช้ในหน้ารายงานเต็ม)
export const getViralStats = (diffMs: number) => {
  const absMs = Math.abs(diffMs);
  const totalDays = Math.floor(absMs / (1000 * 60 * 60 * 24));
  
  return {
    coffees: totalDays * 2, // สมมติว่ากินกาแฟวันละ 2 แก้ว
    sleepLost: totalDays * 3, // ชั่วโมงนอนที่หายไป
    backaches: Math.floor(totalDays * 0.5), // จำนวนวันที่ปวดหลัง
  };
};