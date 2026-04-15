export type Language = 'th' | 'en' | 'zh';

export const translations = {
  th: {
    title: 'THE SOUL CLOCK',
    subtitle: 'นาฬิกายมบาลที่จะเตือนใจว่า "คุณเหลือเวลาบนโลกนี้อีกเท่าไหร่"',
    inputLabel: 'โปรดระบุวันเกิดของคุณเพื่อเริ่มการคำนวณรหัสลับจากกาลเวลา',
    day: 'วัน (1-31)',
    month: 'เดือน (1-12)',
    year: 'พ.ศ. เกิด',
    calculateBtn: 'คำนวณเวลาชีวิต',
    backBtn: 'กลับไปแก้ไขข้อมูล',
    timeLeftTitle: 'เวลาชีวิตที่เหลืออยู่ (โดยประมาณ)',
    yearUnit: 'ปี',
    dayUnit: 'วัน',
    saveReport: 'รับ "The Soul Report" ฉบับเต็ม',
    supportCatTitle: 'ต่ออายุขัย (ฉบับ VIP) และ รับ Soul Report ฉบับเต็ม',
    supportCatTagline: '"สมทบทุนค่าอาหารน้องแมวจรที่บ้านผมรับดูแล และค่ากาแฟให้ผม"',
    supportCatSmall: 'สนับสนุนเพียง 49 บาท (ค่าอาหารเจ้าตัวเล็ก + กาแฟคนสร้าง 🐈☕)',
    reportTitle: 'THE SOUL REPORT',
    reportSubtitle: 'รายงานชะตาชีวิตและเวลาที่เหลืออยู่ของคุณ',
    deepStats: 'Deep Body Stats',
    heartbeatsLabel: 'หัวใจเต้นไปแล้ว',
    activeLabel: 'เวลาที่ตื่นมาใช้ชีวิตได้จริงๆ',
    sleepLabel: 'คุณเหลือเวลานอนได้อีก',
    nightsLabel: 'จำนวนคืนที่เหลืออยู่',
    beatsUnit: 'ครั้ง',
    amuletTitle: '⭐ ยันต์ดิจิทัลต่ออายุขัย',
    amuletSubtitle: 'ยันต์ที่ผ่านการคำนวณรหัสจากเส้นทางจักรวาลเพื่อส่งพลังงานให้กับคุณโดยเฉพาะ',
    amuletPhrases: ['อายุ', 'วัณโณ', 'สุขัง', 'พลัง'],
    amuletCenter: 'มรณัง',
    agreementTitle: '🛡️ วิธีการคำนวณและข้อตกลงสำคัญ',
    agreementLife: 'อายุขัย: อ้างอิงจากค่าเฉลี่ยสถิติโลกที่ 80 ปี',
    agreementHeart: 'หัวใจเต้น: ประมาณการที่ 100,000 ครั้ง/วัน',
    agreementSleep: 'การนอน: คำนวณที่ค่าเฉลี่ย 8 ชั่วโมง/วัน',
    agreementWarning: '⚠️ หมายเหตุ: ข้อความแนะนำเพื่อความสนุกสนานเท่านั้น อย่าจริงจังมากจนเกินไป!',
    saveImgBtn: 'Save Report Image',
    saveAmuletBtn: 'Save Digital Amulet',
    footer: 'Created by อัพสกิลกับฟุ้ย',
    generations: {
      boomer: {
        name: "Baby Boomer",
        years: "พ.ศ. 2489 – 2507",
        nickname: "สำนักข่าวสวัสดีวันจันทร์",
        fact: "เชื่อทุกอย่างใน LINE Group โดยเฉพาะมะนาวโซดา ขยันแชร์คลิปเทศนาตอนตี 5 และเล่าเรื่องซื้อที่ดินร้อยเดียวสมัยพ่อนุ่มฟู",
        definition: "เกษียณแล้วแต่ยังไม่ว่าง เพราะต้องส่งสติกเกอร์ดอกไม้ให้ครบ 7 สี 7 วัน"
      },
      genx: {
        name: "Gen X",
        years: "พ.ศ. 2508 – 2523",
        nickname: "CEO ผู้โดดเดี่ยว",
        fact: "โตมาแบบบุฟเฟต์ ดูแลตัวเองเก่ง อดทนทั้งกับบอส Boomer และลูกน้อง Gen Z อ่านแผนที่กระดาษเป็น และชอบพิมพ์ LINE แบบเว้นวรรคเยอะๆ",
        definition: "ทำงานงกๆ เพื่อซื้อความสุขให้คนในบ้าน แต่ตัวเองความสุขคือการได้อยู่นิ่งๆ"
      },
      geny: {
        name: "Gen Y / Millennials",
        years: "พ.ศ. 2524 – 2539",
        nickname: "สมาคมปวดหลังแห่งประเทศไทย",
        fact: "ทันทั้งยุคเป่าตลับเกมและคุยกับ AI แบกความคาดหวังจากข้างบนและต้องสอนเด็กข้างล่าง ลูกค้า VIP ร้านนวดและยาแก้กรดไหลย้อน",
        definition: "เป็นกำลังหลักของสังคม แต่สภาพร่างกายเหมือนผ่านสงครามโลกครั้งที่ 2 มา"
      },
      genz: {
        name: "Gen Z",
        years: "พ.ศ. 2540 – 2552",
        nickname: "แบกโลก แบกความเครียด แบกหลังที่ปวด",
        fact: "รักอิสระยิ่งชีพ ถ้า Vibe ออฟฟิศไม่ดีพร้อมลาออกไปขายของออนไลน์ หายตัวเก่ง (Ghost) และใช้ Meme เพื่อบำบัดความเศร้า",
        definition: "Work-Life Balance คือหัวใจ แต่ในบัญชีมีเงินเหลือแค่ใช้ถึงวันพุธ"
      },
      alpha: {
        name: "Gen Alpha",
        years: "พ.ศ. 2553 – 2567",
        nickname: "นิ้วล็อกมหัศจรรย์",
        fact: "พยายาม Zoom บนหนังสือกระดาษ สมาธิสั้นกว่าคลิป TikTok 15 วิ เกิดมาเพื่อปิดตำนานทีวี และสั่ง Grab ก่อนเรียกชื่อพ่อเป็น",
        definition: "สมาธิสั้นแต่ตัดต่อเทพ สั่งอาหารผ่านแอปเป็นก่อนเรียกชื่อพ่อ"
      },
      beta: {
        name: "Gen Beta",
        years: "พ.ศ. 2568 – 2582",
        nickname: "รุ่น Prompt สั่งโลก",
        fact: "เกิดมาก็เจอ AI เป็นพี่เลี้ยงเด็ก ชีวิตนี้อาจไม่เคยเห็นหญ้าจริงหรือฝนที่ไม่ปนฝุ่น PM 2.5 หัดเขียน Prompt เป็นอย่างแรกก่อนพูด",
        definition: "พระอาทิตย์คืออะไร? ใช่ฟิลเตอร์ในแว่น VR หรือเปล่าพี่?"
      },
      legend: {
        name: "Legendary Gen",
        years: "เหนือกาลเวลา",
        nickname: "ผู้พิทักษ์ตำนาน",
        fact: "คุณคือผู้กุมความลับของกาลเวลา ทุกรอยยิ้มของคุณคือประวัติศาสตร์ที่ยังมีลมหายใจ",
        definition: "อายุเป็นเพียงตัวเลข แต่ความเก๋าคือของจริง"
      }
    }
  },
  en: {
    title: 'THE SOUL CLOCK',
    subtitle: 'A reminder of mortality: "How much time do you have left on this Earth?"',
    inputLabel: 'Please enter your birth date to calculate your cosmic code',
    day: 'Day (1-31)',
    month: 'Month (1-12)',
    year: 'Year (A.D.)',
    calculateBtn: 'Calculate Lifespan',
    backBtn: 'Edit Info',
    timeLeftTitle: 'Estimated Remaining Time',
    yearUnit: 'Years',
    dayUnit: 'Days',
    saveReport: 'Get Full "The Soul Report"',
    supportCatTitle: 'Extend Life (VIP) & Get Full Soul Report',
    supportCatTagline: '"Fund for stray cats I care for and caffeine for my soul"',
    supportCatSmall: 'Support for only 49 THB (Food for them + Coffee for me 🐈☕)',
    reportTitle: 'THE SOUL REPORT',
    reportSubtitle: 'A personalized analysis of your fate and remaining time',
    deepStats: 'Deep Body Stats',
    heartbeatsLabel: 'Estimated Total Heartbeats',
    activeLabel: 'Years of Active Life Left',
    sleepLabel: 'Remaining Sleep Quota',
    nightsLabel: 'Nights Remaining',
    beatsUnit: 'beats',
    amuletTitle: '⭐ Digital Amulet of Longevity',
    amuletSubtitle: 'A cosmic energy shield calculated specifically for your essence',
    amuletPhrases: ['Long Life', 'Beauty', 'Happiness', 'Strength'],
    amuletCenter: 'Memento',
    agreementTitle: '🛡️ Calculation Methodology & Terms',
    agreementLife: 'Lifespan: Based on 80-year global average',
    agreementHeart: 'Heart Rate: Estimated at 100,000 beats/day',
    agreementSleep: 'Sleep: Calculated at 8 hours/day average',
    agreementWarning: '⚠️ Note: For entertainment purposes only. Don\'t take it too seriously!',
    saveImgBtn: 'Save Report Image',
    saveAmuletBtn: 'Save Digital Amulet',
    footer: 'Created by Upskill with Fuii',
    generations: {
      boomer: {
        name: "Baby Boomer",
        years: "1946 – 1964",
        nickname: "Monday News Anchor",
        fact: "Believes everything in WhatsApp/LINE groups. Shares 'Blessed Monday' stickers daily and remembers when land cost $10.",
        definition: "Retired but busier than ever sending flower stickers for all 7 days."
      },
      genx: {
        name: "Gen X",
        years: "1965 – 1980",
        nickname: "The Lonely CEO",
        fact: "Raised on microwave dinners and independence. Balancing Boomer bosses and Gen Z interns. Can still read a paper map.",
        definition: "Working hard to provide for the home, but their true happiness is just being left alone."
      },
      geny: {
        name: "Gen Y / Millennials",
        years: "1981 – 1996",
        nickname: "The Back Pain Association",
        fact: "Witnessed both floppy disks and AI. Carrying expectations from above while teaching the youth. VIP at massage parlors.",
        definition: "The backbone of society, but has the body of someone who survived a world war."
      },
      genz: {
        name: "Gen Z",
        years: "1997 – 2009",
        nickname: "Chronic Stress Holder",
        fact: "Values freedom above all. Will resign if the office vibe is off. Masters of ghosting and using memes as therapy.",
        definition: "Work-Life Balance is life, but bank account balance only lasts until Wednesday."
      },
      alpha: {
        name: "Gen Alpha",
        years: "2010 – 2024",
        nickname: "Magic Locked Fingers",
        fact: "Tries to 'zoom' on physical books. Shorter attention span than a 15s TikTok. UberEats is their primary language.",
        definition: "Short attention span but pro video editors. Can order food before learning their father's name."
      },
      beta: {
        name: "Gen Beta",
        years: "2025 – 2039",
        nickname: "Prompt Masters",
        fact: "AI was their babysitter. May never see real grass or rain without smog. First words were likely a ChatGPT prompt.",
        definition: "What is the sun? Is it a VR headset filter?"
      },
      legend: {
        name: "Legendary Gen",
        years: "Beyond Time",
        nickname: "Guardian of Legends",
        fact: "Keeper of timeless secrets. Your smile is living history.",
        definition: "Age is just a number, but your wisdom is legendary."
      }
    }
  },
  zh: {
    title: '灵魂时钟',
    subtitle: '死亡提醒：“你在地球上还剩下多少时间？”',
    inputLabel: '请输入您的出生日期以开启时空密码',
    day: '日 (1-31)',
    month: '月 (1-12)',
    year: '年 (公元)',
    calculateBtn: '计算生命时间',
    backBtn: '修改信息',
    timeLeftTitle: '预计剩余时间',
    yearUnit: '年',
    dayUnit: '天',
    saveReport: '获取完整的“灵魂报告”',
    supportCatTitle: '延续生命（VIP版）并获得完整报告',
    supportCatTagline: '“为我照顾的流浪猫筹集伙食费，也为我的灵魂续杯咖啡”',
    supportCatSmall: '仅需 49 泰铢（给猫加餐 + 给作者续命咖啡 🐈☕）',
    reportTitle: '灵魂报告',
    reportSubtitle: '您的命运与剩余时间的深度分析报告',
    deepStats: '深度生命数据',
    heartbeatsLabel: '预计心跳总数',
    activeLabel: '剩余有效清醒年限',
    sleepLabel: '剩余睡眠配额',
    nightsLabel: '剩余夜晚天数',
    beatsUnit: '次',
    amuletTitle: '⭐ 延年益寿数字护身符',
    amuletSubtitle: '根据您的生命能量计算而出的专属时空护盾',
    amuletPhrases: ['长寿', '美丽', '幸福', '力量'],
    amuletCenter: '死生',
    agreementTitle: '🛡️ 计算说明与重要协议',
    agreementLife: '寿命：参考全球平均寿命 80 岁',
    agreementHeart: '心率：估计为每天 100,000 次',
    agreementSleep: '睡眠：按照每天平均 8 小时计算',
    agreementWarning: '⚠️ 备注：内容纯属娱乐，请勿过度纠结！',
    saveImgBtn: '保存报告图片',
    saveAmuletBtn: '保存数字护身符',
    footer: '由 Upskill with Fuii 创建',
    generations: {
      boomer: {
        name: "婴儿潮一代",
        years: "1946 – 1964",
        nickname: "周一早晨新闻播报员",
        fact: "深信社交群里的一切。每天发送‘早安祝福’。还记得土地只要10块钱的时代。",
        definition: "退休了但比以前更忙，忙着给朋友圈每一个动态点赞。"
      },
      genx: {
        name: "X世代",
        years: "1965 – 1980",
        nickname: "孤独的CEO",
        fact: "吃着微波炉晚餐长大，非常独立。忍受着婴儿潮老板，管理着Z世代员工。",
        definition: "为了家庭拼命工作，但真正的幸福是一个人静静呆着。"
      },
      geny: {
        name: "Y世代 / 千禧一代",
        years: "1981 – 1996",
        nickname: "腰酸背痛协会",
        fact: "见证了软盘也体验了AI。背负着长辈的期待，教导着晚辈。按摩店的钻石会员。",
        definition: "社会的顶梁柱，但身体像刚参加过两次世界大战一样疲惫。"
      },
      genz: {
        name: "Z世代",
        years: "1997 – 2009",
        nickname: "抗压专业户",
        fact: "视自由如生命。如果办公室氛围不好，随时准备离职。擅长‘失踪’和用表情包疗伤。",
        definition: "追求工作生活平衡，但银行存款通常只能维持到周三。"
      },
      alpha: {
        name: "阿尔法世代",
        years: "2010 – 2024",
        nickname: "神奇锁定手指",
        fact: "尝试在纸质书上‘两指缩放’。专注力比15秒的短视频还短。外卖软件是其主要语言。",
        definition: "专注力短但剪辑技术超群。学会叫爸爸之前先学会了叫外卖。"
      },
      beta: {
        name: "贝塔世代",
        years: "2025 – 2039",
        nickname: "提示词大师",
        fact: "AI是他们的保姆。可能从未见过真实的草地或不含烟雾的降雨。",
        definition: "太阳是什么？是VR眼镜里的滤镜吗？"
      },
      legend: {
        name: "传说世代",
        years: "穿越时空",
        nickname: "传奇守护者",
        fact: "穿越时空的秘密守护者。您的微笑就是流动的历史。",
        definition: "年龄只是数字，您的智慧才是永恒的财富。"
      }
    }
  }
};
