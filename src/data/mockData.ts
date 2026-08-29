import { UserProfile, Achievement, Course, TestItem, RecentResult, LeaderboardUser, NotificationItem, TestHistoryRecord } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Talaba',
  email: '',
  phone: '',
  bio: '',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  rank: 'Yangi',
  xp: 0,
  coins: 0,
  inventory: [],
  rating: 0,
  studyTimeSeconds: 0,
  weeklyStudyHours: 0,
  overallMastery: 0,
  dailyGoalProgress: 0,
  isVerified: false,
  registeredAt: new Date().toISOString().split('T')[0],
};

export const initialNotifications: NotificationItem[] = [];

export const initialTestHistory: TestHistoryRecord[] = [];

export const initialLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'u1',
    name: 'Shaxzod Bekmuromov',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    xp: 3450,
    coins: 1200,
    mastery: 98,
    subject: 'IELTS & Math',
  },
  {
    rank: 2,
    id: 'u2',
    name: 'Madinabonu Rahimova',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7ZTYlRagBBDX27D5ueiEfrzVjYMMagXCqvk00Ez4O1eYQZd8bI3da5YUgSnccAsI4fSXjo4IpNdBIOPNBUknW-fMMMUOZAUbeemRyFGBrm3vcyiY0Bo8_JaUZJISv9If2fUw3h5UBAzoUg1fEvm8sLB2IMaG36CFw_iVwt8r5ctCdREjx5Z-PHLMp-u_QZf4LvffFN9UDTNGyP1eZ1B5gj6JonfN0dmIydnKNMUuqU3-IXD95X2O4RT-XEPD70wuaTemWbrFDS4',
    xp: 2890,
    coins: 980,
    mastery: 95,
    subject: 'English Core',
  },
  {
    rank: 3,
    id: 'u3',
    name: 'Sardorbek Olimov',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    xp: 2410,
    coins: 750,
    mastery: 92,
    subject: 'Mantiq & Algebra',
  },
  {
    rank: 4,
    id: 'u4',
    name: 'Jasurbek Alimov',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    xp: 1950,
    coins: 600,
    mastery: 89,
    subject: 'Matematika',
  },
  {
    rank: 5,
    id: 'current-user',
    name: 'Islom (Siz)',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVTCzYAM865oeC5wpqHnYOA5GOk0mL5ad4mLvg0uLh939EJ9WTVWwr8XUme4lqh1ZJOJXBQGOe8_CXv54bsgL76PrHjPx45js9ZtMRsPBMUaJJNv6gOZIWTbasz18x99HsWKVIBse1TE3dPD9K8C00pGQEnijDTXgxaROPyvwvNjUBTh1xBtmsnJHkt2taZAm_UY1v9jFRQLyji3fsCnmz07JsP-EG9BSIw7g_pANOlFNcv0CHn5tby6HiY-hdxM5_SZYzGfJIBA4',
    xp: 850,
    coins: 350,
    mastery: 84,
    subject: 'Aralash',
    isCurrentUser: true,
  },
  {
    rank: 6,
    id: 'u6',
    name: 'Nigora Karimova',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    xp: 820,
    coins: 310,
    mastery: 82,
    subject: 'IELTS Speaking',
  },
  {
    rank: 7,
    id: 'u7',
    name: 'Bekzod Qodirov',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    xp: 740,
    coins: 290,
    mastery: 80,
    subject: 'Mantiq',
  },
];


export const availableAvatars = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDVTCzYAM865oeC5wpqHnYOA5GOk0mL5ad4mLvg0uLh939EJ9WTVWwr8XUme4lqh1ZJOJXBQGOe8_CXv54bsgL76PrHjPx45js9ZtMRsPBMUaJJNv6gOZIWTbasz18x99HsWKVIBse1TE3dPD9K8C00pGQEnijDTXgxaROPyvwvNjUBTh1xBtmsnJHkt2taZAm_UY1v9jFRQLyji3fsCnmz07JsP-EG9BSIw7g_pANOlFNcv0CHn5tby6HiY-hdxM5_SZYzGfJIBA4',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7ZTYlRagBBDX27D5ueiEfrzVjYMMagXCqvk00Ez4O1eYQZd8bI3da5YUgSnccAsI4fSXjo4IpNdBIOPNBUknW-fMMMUOZAUbeemRyFGBrm3vcyiY0Bo8_JaUZJISv9If2fUw3h5UBAzoUg1fEvm8sLB2IMaG36CFw_iVwt8r5ctCdREjx5Z-PHLMp-u_QZf4LvffFN9UDTNGyP1eZ1B5gj6JonfN0dmIydnKNMUuqU3-IXD95X2O4RT-XEPD70wuaTemWbrFDS4',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
];

export const initialAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Ilk qadam',
    description: "Birinchi darsni muvaffaqiyatli yakunladingiz!",
    icon: 'star',
    unlocked: false,
  },
  {
    id: '2',
    title: '7 kunlik streak',
    description: "Ketma-ket 7 kun davomida darslarni bajardingiz.",
    icon: 'local_fire_department',
    unlocked: false,
  },
  {
    id: '3',
    title: 'Ekspert',
    description: "50 ta testni 90%+ ball bilan yeching.",
    icon: 'school',
    unlocked: false,
    progress: '0/50',
  },
  {
    id: '4',
    title: "G'olib",
    description: "Haftalik reytingda top-10 talikka kiring.",
    icon: 'emoji_events',
    unlocked: false,
    progress: 'Reytingda yo\'q',
  },
  {
    id: '5',
    title: 'Tezkor mantiq',
    description: "Mantiqiy masalalardan 10 tasini 5 daqiqada yeching.",
    icon: 'bolt',
    unlocked: false,
    progress: '0/10',
  },
  {
    id: '6',
    title: 'Lug\'at ustasi',
    description: "English Core fanidan 500 ta yangi so'z o'rganing.",
    icon: 'book',
    unlocked: false,
    progress: '0/500',
  },
];

export const initialRecentResults: RecentResult[] = [
  { day: 'Mon', percentage: 0 },
  { day: 'Tue', percentage: 0 },
  { day: 'Wed', percentage: 0 },
  { day: 'Thu', percentage: 0, isCurrent: true },
  { day: 'Fri', percentage: 0 },
];

export const initialCourses: Course[] = [
  {
    id: 'english-core',
    title: 'English Core',
    category: 'Core',
    subtitle: '24 ta yangi mavzu',
    description: 'Grammatika, so\'z boyligi va o\'qib tushunish ko\'nikmalarini mustahkamlang.',
    progress: 65,
    topicsCount: 24,
    icon: 'book_2',
    colorScheme: 'primary',
    modules: [
      {
        id: 'ec-1',
        title: 'Present Simple vs Present Continuous',
        duration: '15 daqiqa',
        completed: true,
        content: "Present Simple odatiy, takrorlanuvchi harakatlar uchun (har kuni, har hafta) ishlatiladi. Present Continuous esa ayni damda sodir bo'layotgan harakatlarni ifodalaydi.",
        theoryRules: [
          "📌 Present Simple: Odat tusiga kirgan harakatlar. Formulasi: Subject + Verb(s/es). Kalit so'zlar: always, usually, every day.",
          "📌 Present Continuous: Ayni nutq momentida davom etayotgan harakatlar. Formulasi: Subject + am/is/are + Verb-ing. Kalit so'zlar: now, at the moment, currently.",
          "📌 State Verbs (know, understand, love, believe) faqat Present Simple da qo'llaniladi."
        ],
        workedExample: {
          problem: "'She (study) English right now, but she usually (prefer) French.' gapidagi fe'llarni to'g'ri qo'ying.",
          solution: "'right now' bo'lgani uchun 'is studying' (Continuous), 'usually' bo'lgani uchun 'prefers' (Simple) bo'ladi. To'g'ri gap: 'She is studying English right now, but she usually prefers French.'"
        },
        quiz: {
          question: "Qaysi gapda Present Continuous to'g'ri ishlatilgan?",
          options: [
            "Listen! The birds are singing outside.",
            "I am knowing the answer right now.",
            "He is go to school every morning.",
            "They works on the project today."
          ],
          correctAnswer: 0,
          explanation: "'Listen!' buyrug'i harakat ayni damda bo'layotganini bildiradi. 'are singing' to'g'ri shakl."
        }
      },
      {
        id: 'ec-2',
        title: 'Academic Vocabulary Level B2',
        duration: '20 daqiqa',
        completed: true,
        content: "Analiz va akademik muloqot uchun muhim so'zlar to'plami va ularning qo'llanilishi.",
        theoryRules: [
          "📌 Analyze (fe'l) - Tahlil qilmoq. Analysis (ot) - Tahlil. Analytical (sifat) - Tahliliy.",
          "📌 Demonstrate - Amalda isbotlamoq, ko'rsatib bermoq.",
          "📌 Significant - Muhim, sezilarli darajadagi ta'sirga ega.",
          "📌 Substantial & Framework - Tizimli tuzilma va salmoqli natijalarni ifodalash so'zlari."
        ],
        workedExample: {
          problem: "'The research ___ that regular exercise improves mental health.' bo'sh joyni to'ldiring.",
          solution: "Isbotlab bermoq/ko'rsatmoq ma'nosi uchun 'demonstrates' yoki 'indicates' so'zi to'g'ri keladi."
        },
        quiz: {
          question: "'Evaluate' so'zining eng yaqin sinonimini toping:",
          options: ["Assess / Judge", "Ignore", "Destroy", "Create"],
          correctAnswer: 0,
          explanation: "'Evaluate' baholamoq, baho bermoq degani bo'lib, 'Assess' sinonimidir."
        }
      },
      {
        id: 'ec-3',
        title: 'Reading Comprehension: Scanning & Skimming',
        duration: '25 daqiqa',
        completed: false,
        content: "Matn bilan ishlashning 2 ta asosiy akademik strategiyasi.",
        theoryRules: [
          "📌 Skimming: Matnning umumiy g'oyasi (Main Idea) ni topish uchun har bir paragrafning birinchi va oxirgi gaplarini tez o'qib chiqish.",
          "📌 Scanning: Matndan aniq sanalar, ismlar, raqamlar yoki kalit so'zlarni ko'z yugurtirib qidirib topish.",
          "📌 IELTS Reading da avval savoldagi kalit so'zni aniqlang, so'ng matndan scanning orqali qidiring."
        ],
        workedExample: {
          problem: "Aholining o'sish dinamikasi haqida 1995-yilgi raqamni topish uchun qaysi texnika ishlatiladi?",
          solution: "1995 raqami va 'population' so'zini qidirish uchun Scanning texnikasi qo'llaniladi."
        },
        quiz: {
          question: "Matn sarlavhasini tanlash (Matching Headings) uchun qaysi texnika eng samarali?",
          options: ["Skimming", "Scanning", "Word-by-word translation", "Proofreading"],
          correctAnswer: 0,
          explanation: "Paragraf sarlavhasi umumiy mazmunni aks ettirgani uchun Skimming texnikasi ishlatiladi."
        }
      },
      {
        id: 'ec-4',
        title: 'Complex Sentence Structures & Connectors',
        duration: '30 daqiqa',
        completed: false,
        content: "Furthermore, Moreover, Consequently, On the contrary bog'lovchilari.",
        theoryRules: [
          "📌 Fikrni davom ettirish: Furthermore, Moreover, In addition.",
          "📌 Natijani ko'rsatish: Consequently, Therefore, As a result.",
          "📌 Zidlash: However, Nevertheless, On the other hand."
        ],
        workedExample: {
          problem: "'He studied hard. ___, he passed the exam with top marks.' bo'sh joyni to me'yorda to'ldiring.",
          solution: "Natija kelayotgani uchun 'Consequently' yoki 'Therefore' bog'lovchisi mos."
        },
        quiz: {
          question: "Qaysi bog'lovchi zidlikni (contrast) ifodalaydi?",
          options: ["However", "Furthermore", "In addition", "Therefore"],
          correctAnswer: 0,
          explanation: "'However' - Biroq/shunday bo'lsa-da degani bo'lib, zid fikrlarni bog'laydi."
        }
      }
    ]
  },
  {
    id: 'matematika',
    title: 'Matematika',
    category: 'Algebra & Geometriya',
    subtitle: 'Algebraik hisoblar va masalalar',
    description: 'Murakkab masalalarni yechish va algebraik hisob-kitoblar bo\'yicha intensiv kurs.',
    progress: 40,
    topicsCount: 18,
    icon: 'calculate',
    colorScheme: 'accent',
    modules: [
      {
        id: 'math-1',
        title: 'Chiziqli va Kvadrat Tenglamalar',
        duration: '25 daqiqa',
        completed: true,
        content: "Kvadrat tenglamani Viyet teoremasi va Diskriminant (D = b² - 4ac) formulasi orqali yechish usullari.",
        theoryRules: [
          "📌 Kvadrat tenglama umumiy ko'rinishi: ax² + bx + c = 0 (a ≠ 0).",
          "📌 Diskriminant formulasi: D = b² - 4ac. Agar D > 0 bo'lsa 2 ta ildiz, D = 0 bo'lsa 1 ta ildiz, D < 0 bo'lsa haqiqiy ildiz yo'q.",
          "📌 Viyet teoremasi (keltirilgan tenglama x² + px + q = 0 uchun): x₁ + x₂ = -p va x₁ * x₂ = q."
        ],
        workedExample: {
          problem: "x² - 5x + 6 = 0 tenglama ildizlarini Viyet teoremasi bilan toping.",
          solution: "Ildizlar yig'indisi x₁ + x₂ = 5, ko'paytmasi x₁ * x₂ = 6. Bu sonlar 2 va 3 dir."
        },
        quiz: {
          question: "x² - 8x + 16 = 0 tenglamaning nechta haqiqiy ildizi bor?",
          options: ["1 ta (x = 4)", "2 ta (x = 2, 8)", "Ildizi yo'q", "3 ta"],
          correctAnswer: 0,
          explanation: "D = 64 - 4*1*16 = 0. Diskriminant 0 bo'lgani uchun 1 ta takroriy ildiz x = 4 bo'ladi."
        }
      },
      {
        id: 'math-2',
        title: 'Tengsizliklar va Tizimlar',
        duration: '30 daqiqa',
        completed: false,
        content: "Intervallar usuli va ildiz ostidagi ifodalarning aniqlanish sohasini topish.",
        theoryRules: [
          "📌 Intervallar usulida ko'paytuvchilarning nollari sonlar o'qida belgilanadi va ishoralar almashtirib chiqiladi.",
          "📌 Juft darajali ildiz ostidagi ifoda har doim noldan katta yoki teng bo'lishi shart: f(x) ≥ 0.",
          "📌 Tengsizlikni manfiy songa ko'paytirganda yoki bo'lganda tengsizlik ishorasi qarama-qarshisiga o'zgaradi."
        ],
        workedExample: {
          problem: "(x - 2)(x + 3) > 0 tengsizlikni yeching.",
          solution: "Nollar: x = 2 va x = -3. Sonlar o'qida intervallar: (-∞; -3) U (2; +∞)."
        },
        quiz: {
          question: "√(x - 5) ifoda x ning qanday qiymatlarida ma'noga ega?",
          options: ["x ≥ 5", "x > 5", "x ≤ 5", "Barcha x larda"],
          correctAnswer: 0,
          explanation: "Ildiz osti ifoda x - 5 ≥ 0 => x ≥ 5 bo'lishi kerak."
        }
      },
      {
        id: 'math-3',
        title: 'Geometriya: Uchburchaklar va Pifagor Teoremasi',
        duration: '35 daqiqa',
        completed: false,
        content: "To'g'ri burchakli uchburchakda katetlar va gipotenuza o'rtasidagi bog'liqlik.",
        theoryRules: [
          "📌 Pifagor Teoremasi: c² = a² + b² (c - gipotenuza, a va b - katetlar).",
          "📌 Misr uchburchagi katetlari: 3, 4, 5 va ularning karralilari (6, 8, 10 va 5, 12, 13).",
          "📌 Uchburchak yuzi: S = 1/2 * a * h_a."
        ],
        workedExample: {
          problem: "Katetlari 9 cm va 12 cm bo'lgan to'g'ri burchakli uchburchak gipotenuzasini toping.",
          solution: "c² = 9² + 12² = 81 + 144 = 225. c = √225 = 15 cm."
        },
        quiz: {
          question: "Gipotenuzasi 10 cm va bir kateti 6 cm bo'lsa, ikkinchi katet uzunligi qancha?",
          options: ["8 cm", "7 cm", "9 cm", "5 cm"],
          correctAnswer: 0,
          explanation: "b² = c² - a² = 100 - 36 = 64 => b = 8 cm."
        }
      }
    ]
  },
  {
    id: 'mantiq',
    title: 'Mantiq',
    category: 'Intellekt',
    subtitle: '15 ta masala yechildi',
    description: 'Kritik fikrlash va mantiqiy testlarni yechish strategiyalarini o\'rganing.',
    progress: 85,
    topicsCount: 20,
    solvedCount: 15,
    icon: 'psychology',
    colorScheme: 'tertiary',
    modules: [
      {
        id: 'log-1',
        title: 'Sillogizmlar va Deduptiv Mantiq',
        duration: '15 daqiqa',
        completed: true,
        content: "Klassik mantiqiy xulosalar chiqarish qoidalari va mantiqiy zanjirlar.",
        theoryRules: [
          "📌 Sillogizm - ikkita asosiy mulohaza (premissa) dan mantiqiy xulosa chiqarish san'ati.",
          "📌 1-Premissa: Barcha insonlar foniydir. 2-Premissa: Arastu - inson. Xulosa: Demak, Arastu foniydir.",
          "📌 Qoida: Xulosa premissalar doirasidan tashqariga chiqib ketmasligi lozim."
        ],
        workedExample: {
          problem: "1-Premissa: Barcha professorlar olim. 2-Premissa: Nodir - professor. Qaysi xulosa to'g'ri?",
          solution: "Xulosa: Nodir - olimdir. (Deduptiv mantiq bo'yicha to'liq to'g'ri)."
        },
        quiz: {
          question: "1-Premissa: Barcha qushlarning qanoti bor. 2-Premissa: Tovuq - qush. Qaysi xulosa 100% to'g'ri?",
          options: [
            "Tovuqning qanoti bor",
            "Tovuq uchib ketadi",
            "Barcha qanotlilar tovuqdir",
            "Tovuq - eng tez qushdir"
          ],
          correctAnswer: 0,
          explanation: "Premissalarga tayanganda faqat 'Tovuqning qanoti bor' xulosasiga kelish mantiqan to'g'ri."
        }
      },
      {
        id: 'log-2',
        title: 'Ketma-ketliklar va Qonuniyatlar',
        duration: '20 daqiqa',
        completed: true,
        content: "Raqamli va shaklli ketma-ketliklarda matematik-mantiqiy qonuniyatni topish.",
        theoryRules: [
          "📌 Arifmetik va geometrik ortish: +n, *n, n² yoki Fibonacci zanjirlari.",
          "📌 Qo'shaloq qonuniyatlar: toq o'rindagi va juft o'rindagi sonlar alohida qonuniyatga ega bo'lishi mumkin.",
          "📌 Alifbo tartibidagi harflar ketma-ketligi (+2, +3 qadamlar)."
        ],
        workedExample: {
          problem: "2, 5, 10, 17, 26, ? ketma-ketlikdagi keyingi sonni toping.",
          solution: "Airmalar: +3, +5, +7, +9, keyingisi +11 bo'ladi. 26 + 11 = 37 (Yoki n² + 1 qonuniyati: 1²+1=2, 2²+1=5... 6²+1=37)."
        },
        quiz: {
          question: "Ketma-ketlik: 1, 1, 2, 3, 5, 8, 13, ?",
          options: ["21", "20", "18", "15"],
          correctAnswer: 0,
          explanation: "Fibonacci ketma-ketligi: har bir son o'zidan oldingi ikkita son yig'indisiga teng (8 + 13 = 21)."
        }
      },
      {
        id: 'log-3',
        title: 'Venn Diagrammalari va To\'plamlar',
        duration: '20 daqiqa',
        completed: true,
        content: "Ko'p to'plamli masalalarni doiralar yordamida ko'rgazmali yechish.",
        theoryRules: [
          "📌 Venn diagrammasida doiralarning kesishmasi (A ∩ B) har ikkala xususiyatga ega obyektlarni bildiradi.",
          "📌 Birlashtirish (A U B) - kamida bitta xususiyatga ega bo'lganlar.",
          "📌 N(A U B) = N(A) + N(B) - N(A ∩ B) formulasi orqali qayta sanalib ketishning oldi olinadi."
        ],
        workedExample: {
          problem: "30 ta talabadan 20 tasi ingiliz tilini, 15 tasi nemis tilini va 8 tasi har ikkala tilni biladi. Necha kishi hech bir tilni bilmaydi?",
          solution: "Til biladiganlar: 20 + 15 - 8 = 27 kishi. Hech bir tilni bilmaydiganlar: 30 - 27 = 3 kishi."
        },
        quiz: {
          question: "40 kishilik guruhda 25 kishi shaxmat, 20 kishi shashka o'ynaydi. 10 kishi ikkalasini ham o'ynaydi. Necha kishi faqat shaxmat o'ynaydi?",
          options: ["15 kishi", "25 kishi", "10 kishi", "20 kishi"],
          correctAnswer: 0,
          explanation: "Faqat shaxmat o'ynaydiganlar = Shaxmat oynaydiganlar (25) - Ikkalasini oynaydiganlar (10) = 15 kishi."
        }
      }
    ]
  }
];

export const initialTests: TestItem[] = [
  {
    id: 'test-1',
    title: 'Haftalik Test #1',
    subject: 'Aralash (English & Logic)',
    questionsCount: 5,
    durationMinutes: 15,
    isLocked: false,
    icon: 'calendar_today',
    questions: [
      {
        id: 1,
        question: "Which sentence uses the Present Perfect tense correctly?",
        options: [
          "I have finished my homework yesterday.",
          "She has lived in Tashkent since 2020.",
          "They was going to the school.",
          "He had finish his test right now."
        ],
        correctAnswer: 1,
        explanation: "'Since 2020' vaqt ko'rsatkichi bilan Present Perfect (has lived) grammatik jihatdan to'g'ri ishlatilgan."
      },
      {
        id: 2,
        question: "Ushbu ketma-ketlikdagi keyingi sonni toping: 2, 4, 8, 16, 32, ?",
        options: ["48", "64", "50", "60"],
        correctAnswer: 1,
        explanation: "Har bir son o'zidan oldingi sonni 2 ga ko'paytirish orqali hosil bo'ladi (32 * 2 = 64)."
      },
      {
        id: 3,
        question: "Choose the synonym for the word 'Demonstrate':",
        options: ["Hide", "Show", "Ignore", "Destroy"],
        correctAnswer: 1,
        explanation: "'Demonstrate' so'zining ma'nosi 'ko'rsatmoq' bo'lib, 'Show' so'ziga sinonimdir."
      },
      {
        id: 4,
        question: "Agar barcha kitoblar qog'ozdan va barcha qog'ozlar yog'ochdan tayyorlansa, qaysi xulosa ABSOLUT TO'G'RI?",
        options: [
          "Barcha yog'ochlar kitobdir",
          "Barcha kitoblar yog'ochdan tayyorlangan",
          "Ba'zi kitoblar metalldan tayyorlangan",
          "Qog'ozlar kitob emas"
        ],
        correctAnswer: 1,
        explanation: "Kitob -> Qog'oz -> Yog'och zanjiri bo'yicha barcha kitoblar dolzarb ravishda yog'ochdan tayyorlangan."
      },
      {
        id: 5,
        question: "What is the correct antonym of 'Substantial'?",
        options: ["Significant", "Large", "Insignificant / Small", "Solid"],
        correctAnswer: 2,
        explanation: "'Substantial' (katta, sezilarli) so'ziga qarama-qarshi ma'nodagi so'z 'Insignificant' (ahamiyatsiz/kichik) hisoblanadi."
      }
    ]
  },
  {
    id: 'test-2',
    title: 'Mantiq va Tanqidiy Fikr',
    subject: 'Mantiq va Tanqidiy Fikr',
    questionsCount: 5,
    durationMinutes: 15,
    isLocked: false,
    icon: 'psychology',
    questions: [
      {
        id: 1,
        question: "Ota o'z o'g'lidan 24 yosh katta. 5 yildan so'ng ularning yoshlari yig'indisi 54 bo'ladi. Hozir o'g'il necha yoshda?",
        options: ["8 yosh", "10 yosh", "12 yosh", "14 yosh"],
        correctAnswer: 1,
        explanation: "5 yildan so'ng yoshlar yig'indisi 54 bo'lsa, hozirgi yig'indi 54 - 10 = 44. Ota (x+24) va o'g'il (x). 2x + 24 = 44 => 2x = 20 => x = 10."
      },
      {
        id: 2,
        question: "To'rtta do'st poygada qatnashdi. Ali Validan tezroq, lekin Hasan dan sekinroq yugurdi. Sotvoldiy eng oxirgi keldi. Kim 1-o'rinni egalladi?",
        options: ["Ali", "Vali", "Hasan", "Sotvoldiy"],
        correctAnswer: 2,
        explanation: "Tartib: Hasan > Ali > Vali > Sotvoldiy. Birinchi o'rin Hasan."
      },
      {
        id: 3,
        question: "Qaysi so'z ortiqcha: Olma, Nok, Shaftoli, Sabzi, Uzum?",
        options: ["Olma", "Nok", "Sabzi", "Shaftoli"],
        correctAnswer: 2,
        explanation: "Sabzi - sabzavot, qolgan barchasi mevalardir."
      },
      {
        id: 4,
        question: "Agar 3 ta ishchi 3 ta stulni 3 soatda yasasa, 6 ta ishchi 6 ta stulni necha soatda yasaydi?",
        options: ["3 soatda", "6 soatda", "1.5 soatda", "1 soatda"],
        correctAnswer: 0,
        explanation: "Har bir ishchi 1 ta stulni yasash uchun 3 soat sarflaydi. Shuning uchun 6 ta ishchi 6 ta stulni ham 3 soatda yasaydi."
      },
      {
        id: 5,
        question: "Barcha shifokorlar oliy ma'lumotli. Sardor - shifokor. Qaysi xulosa to'g'ri?",
        options: [
          "Sardor oliy ma'lumotli",
          "Sardor muhandis",
          "Sardor talaba",
          "Barcha oliy ma'lumotlilar shifokor"
        ],
        correctAnswer: 0,
        explanation: "Deduptiv mantiq bo'yicha Sardor shifokor bo'lgani uchun albatta oliy ma'lumotli hisoblanadi."
      }
    ]
  },
  {
    id: 'test-3',
    title: 'English Core Quiz',
    subject: 'English Vocabulary & Reading',
    questionsCount: 5,
    durationMinutes: 15,
    isLocked: false,
    icon: 'language',
    questions: [
      {
        id: 1,
        question: "Select the correct sentence with condition:",
        options: [
          "If it rains tomorrow, we will stay at home.",
          "If it will rain tomorrow, we stay at home.",
          "If it rain, we would stayed.",
          "If it is rain, we will home."
        ],
        correctAnswer: 0,
        explanation: "First Conditional strukturasi: If + Present Simple, Will + Verb."
      },
      {
        id: 2,
        question: "Meaning of 'Hypothesis':",
        options: [
          "A proven fact",
          "A proposed explanation made on the basis of limited evidence",
          "A mathematical formula",
          "A historical story"
        ],
        correctAnswer: 1,
        explanation: "Gipoteza (Hypothesis) - bu hali to'liq isbotlanmagan taklif qilingan ilmiy taxmin."
      },
      {
        id: 3,
        question: "Choose the correct preposition: 'He excels ___ mathematics.'",
        options: ["in", "at", "on", "with"],
        correctAnswer: 0,
        explanation: "'Excel in something' yoki 'excel at something' birikmasida akademik fanlar bilan 'in' to'g'ri keladi."
      },
      {
        id: 4,
        question: "Identify the noun form of the verb 'Analyze':",
        options: ["Analytic", "Analysis", "Analyzing", "Analyzable"],
        correctAnswer: 1,
        explanation: "'Analyze' (fe'l) ning ot shakli 'Analysis' (tahlil) dir."
      },
      {
        id: 5,
        question: "Complete the sentence: 'She has been studying for three hours, ___ she needs a short break.'",
        options: ["so", "because", "although", "unless"],
        correctAnswer: 0,
        explanation: "Natijani ko'rsatish uchun 'so' (shuning uchun) mantiqan to'g'ri keladi."
      }
    ]
  },
  {
    id: 'test-mock-exam',
    title: 'Prezent Real Mock Exam 2026',
    subject: 'Aralash Imtihon (Math, Logic, English)',
    questionsCount: 8,
    durationMinutes: 30,
    isLocked: false,
    icon: 'school',
    questions: [
      {
        id: 1,
        question: "[Matematika] Kvadrat tenglama x² - 7x + 12 = 0 ildizlari yig'indisi va ko'paytmasi nechaga teng?",
        options: [
          "Yig'indi = 7, Ko'paytma = 12",
          "Yig'indi = -7, Ko'paytma = 12",
          "Yig'indi = 12, Ko'paytma = 7",
          "Yig'indi = 5, Ko'paytma = 6"
        ],
        correctAnswer: 0,
        explanation: "Viyet teoremasiga ko'ra: x₁ + x₂ = -b/a = 7, x₁ * x₂ = c/a = 12."
      },
      {
        id: 2,
        question: "[Mantiq] Ketma-ketlikda tushirib qoldirilgan harfni toping: A, C, E, G, ?",
        options: ["H", "I", "J", "K"],
        correctAnswer: 1,
        explanation: "Harflar alifboda bitta o'tkazib kelmoqda: A(+2)C(+2)E(+2)G(+2)I."
      },
      {
        id: 3,
        question: "[English Core] Choose the sentence with the correct passive voice of 'They built a new school last year.'",
        options: [
          "A new school was built last year.",
          "A new school is built last year.",
          "A new school had built last year.",
          "A new school built last year."
        ],
        correctAnswer: 0,
        explanation: "Past Simple Passive shakli: Object + was/were + V3."
      },
      {
        id: 4,
        question: "[Matematika] To'g'ri burchakli uchburchakning katetlari 6 cm va 8 cm bo'lsa, gipotenuza uzunligi qancha?",
        options: ["10 cm", "12 cm", "14 cm", "9 cm"],
        correctAnswer: 0,
        explanation: "Pifagor teoremasi: c² = 6² + 8² = 36 + 64 = 100 => c = 10 cm."
      },
      {
        id: 5,
        question: "[Mantiq] Barcha qushlarning qanoti bor. Tovuq - qush. Qaysi xulosa to'g'ri?",
        options: [
          "Tovuqning qanoti bor",
          "Tovuq ucha oladi",
          "Tovuq tuxum qo'ymaydi",
          "Barcha qanotlilar tovuqdir"
        ],
        correctAnswer: 0,
        explanation: "Faqat berilgan mantiqiy faktga tayanilsa: Tovuq qush bo'lgani uchun qanoti bor."
      },
      {
        id: 6,
        question: "[English Core] Select the correct idiom meaning 'very rare or unique':",
        options: [
          "Once in a blue moon",
          "Piece of cake",
          "Break a leg",
          "Under the weather"
        ],
        correctAnswer: 0,
        explanation: "'Once in a blue moon' - juda kamdan-kam bo'ladigan hodisaga nisbatan ishlatiladi."
      },
      {
        id: 7,
        question: "[Matematika] f(x) = 2x + 5 bo'lsa, f(3) ni hisoblang:",
        options: ["11", "10", "15", "8"],
        correctAnswer: 0,
        explanation: "f(3) = 2*(3) + 5 = 6 + 5 = 11."
      },
      {
        id: 8,
        question: "[Mantiq] Agar bugun dushanba bo'lsa, 100 kundan so'ng haftaning qaysi kuni bo'ladi?",
        options: ["Shorshanba", "Chorshanba", "Payshanba", "Juma"],
        correctAnswer: 1,
        explanation: "100 mod 7 = 2. Dushanba + 2 kun = Chorshanba."
      }
    ]
  },
  {
    id: 'test-5',
    title: 'Matematika & Algebra Testi',
    subject: 'Algebra va Tenglamalar',
    questionsCount: 5,
    durationMinutes: 20,
    isLocked: false,
    icon: 'calculate',
    questions: [
      {
        id: 1,
        question: "3x - 12 = 0 tenglamaning ildizini toping:",
        options: ["4", "3", "-4", "12"],
        correctAnswer: 0,
        explanation: "3x = 12 => x = 4."
      },
      {
        id: 2,
        question: "(a + b)² formulasining to'g'ri yoyilmasi qaysi?",
        options: [
          "a² + 2ab + b²",
          "a² - 2ab + b²",
          "a² + b²",
          "a² + ab + b²"
        ],
        correctAnswer: 0,
        explanation: "Yig'indining kvadrati formulasi: a² + 2ab + b²."
      },
      {
        id: 3,
        question: "Ildiz ostida 144 ning qiymati qancha?",
        options: ["12", "14", "16", "11"],
        correctAnswer: 0,
        explanation: "12 * 12 = 144."
      },
      {
        id: 4,
        question: "Sonning 25% i 50 ga teng bo'lsa, shu sonning o'zini toping:",
        options: ["200", "150", "250", "100"],
        correctAnswer: 0,
        explanation: "X * 0.25 = 50 => X = 50 / 0.25 = 200."
      },
      {
        id: 5,
        question: "Proportsiyada x ni toping: 2 / 5 = x / 20",
        options: ["8", "10", "6", "12"],
        correctAnswer: 0,
        explanation: "x = (2 * 20) / 5 = 40 / 5 = 8."
      }
    ]
  },
  {
    id: 'test-6',
    title: 'Tezkor Mantiq va Ketma-ketliklar',
    subject: 'Mantiq va Tezkor Hisob',
    questionsCount: 5,
    durationMinutes: 12,
    isLocked: false,
    icon: 'psychology',
    questions: [
      {
        id: 1,
        question: "Ketma-ketlik: 1, 4, 9, 16, 25, ?",
        options: ["36", "30", "49", "32"],
        correctAnswer: 0,
        explanation: "Ketma-ketlik ketma-ket natural sonlarning kvadratlaridir: 1², 2², 3², 4², 5², 6² = 36."
      },
      {
        id: 2,
        question: "Qaysi so'z 'KO'Z' va 'KO'ZOYNAK' o'rtasidagi mantiqiy bog'liqlikka ega: 'QULAN' - ?",
        options: ["QULOQ - ESHITISH VOSITASI", "BURUN - NAFAS", "QO'L - QO'LQPQ", "OYoQ - PAYPOQ"],
        correctAnswer: 0,
        explanation: "Ko'zga ko'zoynak taqilgani kabi quloqqa eshitish apparati/moslamasi to'g'ri keladi."
      },
      {
        id: 3,
        question: "Anvarning 3 ta opasi va 2 ta ukasi bor. Oilada necha nafar farzand bor?",
        options: ["6 nafar", "5 nafar", "7 nafar", "4 nafar"],
        correctAnswer: 0,
        explanation: "3 ta opa + Anvarning o'zi + 2 ta uka = 6 nafar farzand."
      },
      {
        id: 4,
        question: "Barcha avtomobillar dvigatelga ega. Samolyotlar ham dvigatelga ega. Demak:",
        options: [
          "Barcha samolyotlar va avtomobillar dvigatelga ega",
          "Avtomobil - samolyotdir",
          "Dvigatellar faqat uchadi",
          "Hech qanday xulosa chiqmaydi"
        ],
        correctAnswer: 0,
        explanation: "Mantiqan har ikki turdagi transport vositasi dvigatelga ega ekanligi tasdiqlanadi."
      },
      {
        id: 5,
        question: "Soat 03:15 da soat va daqiqa millari orasidagi burchak qancha bo'ladi (taxminan)?",
        options: ["7.5 daraja", "0 daraja", "15 daraja", "30 daraja"],
        correctAnswer: 0,
        explanation: "15 daqiqa o'tgach soat mili 3 raqamidan 0.5 * 15 = 7.5 darajaga suriladi."
      }
    ]
  },
  {
    id: 'test-7',
    title: 'Grammar & Academic Vocabulary Special',
    subject: 'English Core',
    questionsCount: 5,
    durationMinutes: 15,
    isLocked: false,
    icon: 'language',
    questions: [
      {
        id: 1,
        question: "Find the correct sentence with reported speech: 'She said, \"I am learning English.\"'",
        options: [
          "She said that she was learning English.",
          "She said that I am learning English.",
          "She said she is learning English.",
          "She told that she learn English."
        ],
        correctAnswer: 0,
        explanation: "Reported speech bo'yicha Present Continuous -> Past Continuous ga o'zgaradi."
      },
      {
        id: 2,
        question: "Select the word that means 'to make something clearer or easier to understand':",
        options: ["Clarify", "Complicate", "Obscure", "Debate"],
        correctAnswer: 0,
        explanation: "'Clarify' so'zi aniqlik kiritmoq, oydinlashtirmoq ma'nosini beradi."
      },
      {
        id: 3,
        question: "Fill in the blank: 'Had I known about the meeting, I ___ attended.'",
        options: ["would have", "will have", "would", "had"],
        correctAnswer: 0,
        explanation: "Inverted Third Conditional: Had I known..., I would have attended."
      },
      {
        id: 4,
        question: "Which connector shows contrast?",
        options: ["However", "Furthermore", "Therefore", "In addition"],
        correctAnswer: 0,
        explanation: "'However' zidlovchi bog'lovchidir."
      },
      {
        id: 5,
        question: "Choose the correct spelling:",
        options: ["Accommodation", "Acommodation", "Accomodation", "Acomodation"],
        correctAnswer: 0,
        explanation: "To'g'ri yozilishi 'Accommodation' (ikkita c va ikkita m)."
      }
    ]
  },
  {
    id: 'test-8',
    title: 'Prezent Hub Grand Final Test',
    subject: 'Olimpiada & Imtihon',
    questionsCount: 20,
    durationMinutes: 45,
    isLocked: true,
    lockedReason: 'Oltin darajaga erishilgach ochiq bo\'ladi',
    icon: 'lock',
    questions: []
  }
];

// N5: IELTS Listening Sections
export const initialIELTSListeningSections = [
  {
    id: 1,
    title: 'Section 1: University Student Accommodation Enquiry',
    description: 'A conversation between a prospective student and an accommodation officer discussing rental rooms and facilities.',
    audioDurationSeconds: 180,
    audioScript: `Officer: Good morning, Campus Living Services. How can I help you?
Student: Hello! I'm joining the engineering faculty next month and I need to book student housing.
Officer: Great. We have standard single en-suite rooms starting at £140 per week, including high-speed internet and all utilities.
Student: Does that include the campus gym membership as well?
Officer: Yes, gym access and bike storage are completely free for all resident students.
Student: Perfect. What is the address of the main residence hall?
Officer: It is located at 24 Greenhill Gardens, just 5 minutes walk from the central library.
Student: Excellent, I would like to reserve room B-12.`,
    questions: [
      {
        id: 1,
        question: "What is the weekly price of a standard single en-suite room?",
        type: 'multiple_choice' as const,
        options: ["£120 per week", "£140 per week", "£160 per week", "£180 per week"],
        correctAnswer: 1,
        explanation: "Officer mentions standard single en-suite rooms start at £140 per week."
      },
      {
        id: 2,
        question: "Which extra facility is included free of charge?",
        type: 'multiple_choice' as const,
        options: ["Car parking & laundry", "Campus gym & bike storage", "Cafeteria meals", "Personal tutor sessions"],
        correctAnswer: 1,
        explanation: "Gym access and bike storage are free for resident students."
      },
      {
        id: 3,
        question: "What is the address of the main residence hall?",
        type: 'multiple_choice' as const,
        options: ["14 Baker Street", "24 Greenhill Gardens", "5 Oxford Avenue", "32 Central Park"],
        correctAnswer: 1,
        explanation: "Located at 24 Greenhill Gardens."
      },
      {
        id: 4,
        question: "How far is the residence hall from the central library?",
        type: 'multiple_choice' as const,
        options: ["5 minutes walk", "15 minutes bus ride", "20 minutes walk", "Next door"],
        correctAnswer: 0,
        explanation: "Just 5 minutes walk from the central library."
      }
    ]
  },
  {
    id: 2,
    title: 'Section 2: City Botanical Garden Audio Guide',
    description: 'A solo talk guiding visitors through the rare tropical plants pavilion and conservation greenhouse.',
    audioDurationSeconds: 210,
    audioScript: `Welcome to the Royal Botanical Conservatory. As you step inside Pavilion A, notice the temperature is maintained at a steady 26 degrees Celsius to simulate tropical rainforest climates.
The massive Victoria Amazonica water lilies in the center pool can support weight up to 45 kilograms. On your left is the medicinal orchid collection, which contains species used for over three centuries in natural pharmacology.
Please ensure all photography uses natural light without flash, as bright strobe lights can interfere with nocturnal pollenating insects.`,
    questions: [
      {
        id: 1,
        question: "What temperature is Pavilion A maintained at?",
        type: 'multiple_choice' as const,
        options: ["20°C", "24°C", "26°C", "30°C"],
        correctAnswer: 2,
        explanation: "Maintained at a steady 26 degrees Celsius."
      },
      {
        id: 2,
        question: "How much weight can the Victoria Amazonica water lily support?",
        type: 'multiple_choice' as const,
        options: ["Up to 15 kg", "Up to 30 kg", "Up to 45 kg", "Over 100 kg"],
        correctAnswer: 2,
        explanation: "Water lilies can support weight up to 45 kilograms."
      },
      {
        id: 3,
        question: "Why is flash photography prohibited?",
        type: 'multiple_choice' as const,
        options: ["It damages glass roofs", "It disturbs nocturnal pollinating insects", "It alerts security sensors", "It dries out leaves"],
        correctAnswer: 1,
        explanation: "Bright strobe lights interfere with nocturnal pollinating insects."
      }
    ]
  }
];

// N6: IELTS Reading Passages
export const initialIELTSReadingPassages = [
  {
    id: 1,
    title: 'Passage 1: The Evolution of Renewable Geothermal Energy',
    wordCount: 380,
    passageText: `Geothermal energy is thermal energy generated and stored in the Earth. Thermal energy is the energy that determines the temperature of matter. Earth's geothermal energy originates from the original formation of the planet and from radioactive decay of minerals.

The geothermal gradient, which is the difference in temperature between the core of the planet and its surface, drives a continuous conduction of thermal energy in the form of heat from the core to the surface.

From hot springs, geothermal energy has been used for bathing since Paleolithic times and for space heating since ancient Roman times. More recently, geothermal power has become a viable and clean renewable source for generating electrical energy.

Unlike solar and wind power, which are intermittent and depend on weather conditions, geothermal plants provide baseload electricity with capacity factors often exceeding 90%. Recent advancements in Enhanced Geothermal Systems (EGS) allow energy extraction in areas without natural hydrothermal reservoirs by drilling deep into hot dry rock and injecting water to create artificial permeability.`,
    questions: [
      {
        id: 1,
        type: 'true_false_ng' as const,
        question: "Geothermal energy production is heavily dependent on sunny weather and wind velocity.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: 1, // FALSE
        explanation: "Passage states: 'Unlike solar and wind power... geothermal plants provide baseload electricity with capacity factors often exceeding 90%'."
      },
      {
        id: 2,
        type: 'true_false_ng' as const,
        question: "Ancient Romans utilized geothermal energy for indoor space heating.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: 0, // TRUE
        explanation: "Passage states: 'used for space heating since ancient Roman times'."
      },
      {
        id: 3,
        type: 'multiple_choice' as const,
        question: "What major advantage does Enhanced Geothermal Systems (EGS) provide?",
        options: [
          "It eliminates the need for water entirely",
          "It allows power generation in dry rock areas without natural reservoirs",
          "It costs less than coal mining",
          "It freezes underground magma"
        ],
        correctAnswer: 1,
        explanation: "EGS allows extraction in areas without natural hydrothermal reservoirs by creating artificial permeability in hot dry rock."
      }
    ]
  },
  {
    id: 2,
    title: 'Passage 2: Cognitive Psychology and the Architecture of Memory',
    wordCount: 420,
    passageText: `Human memory is not a single unitary system, but rather an intricate architecture of interconnected cognitive mechanisms. Broadly categorized into sensory memory, working memory, and long-term memory, each store possesses distinct capacities and decay characteristics.

Working memory, famously conceptualized by Baddeley and Hitch, operates as an active workspace capable of holding and manipulating approximately four to seven chunks of information for 15 to 30 seconds without active rehearsal.

Long-term memory is divided into declarative (explicit) memory—which includes episodic memories of personal events and semantic memories of general facts—and non-declarative (implicit) memory, such as procedural skills like riding a bicycle.

The spacing effect, first systematically studied by Hermann Ebbinghaus, demonstrates that learning is substantially more robust when study sessions are spaced out over time rather than crammed into a single intensive period. Modern spaced repetition algorithms leverage this principle to schedule reviews precisely at the moment when forgetting is about to occur, optimizing neural consolidation with minimal temporal investment.`,
    questions: [
      {
        id: 1,
        type: 'true_false_ng' as const,
        question: "Working memory can store an unlimited number of items indefinitely.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: 1, // FALSE
        explanation: "Working memory holds roughly 4 to 7 chunks for 15 to 30 seconds without rehearsal."
      },
      {
        id: 2,
        type: 'multiple_choice' as const,
        question: "Which type of memory handles factual knowledge and definitions?",
        options: ["Procedural memory", "Semantic memory", "Sensory buffer", "Episodic reflex"],
        correctAnswer: 1,
        explanation: "Semantic memory handles general facts and concepts within declarative memory."
      },
      {
        id: 3,
        type: 'multiple_choice' as const,
        question: "According to the passage, spaced repetition optimizes memory consolidation by:",
        options: [
          "Cramming all study into a single 10-hour marathon session",
          "Scheduling reviews right before forgetting occurs",
          "Replacing sleep with audio recordings",
          "Memorizing entire encyclopedias backwards"
        ],
        correctAnswer: 1,
        explanation: "Spaced repetition schedules reviews precisely at the moment when forgetting is about to occur."
      }
    ]
  }
];

// N7: Initial Spaced Repetition Flashcards
export const initialFlashcards = [
  {
    id: 'fc-1',
    front: 'Reported Speech: "I am working" -> ?',
    back: 'She said that she was working (Present Continuous -> Past Continuous).',
    subject: 'English Core',
    easeFactor: 2.5,
    intervalDays: 1,
    repetitions: 0,
    dueDate: new Date().toISOString().split('T')[0],
    state: 'learning' as const,
  },
  {
    id: 'fc-2',
    front: 'IELTS Vocabulary: "Exacerbate"',
    back: 'To make a problem, bad situation, or negative feeling worse (Kechikmoq, vaziyatni yanada og\'irlashtirmoq).',
    subject: 'IELTS Vocabulary',
    easeFactor: 2.5,
    intervalDays: 2,
    repetitions: 1,
    dueDate: new Date().toISOString().split('T')[0],
    state: 'review' as const,
  },
  {
    id: 'fc-3',
    front: 'Matematika: Diskriminant formulasi',
    back: 'D = b² - 4ac (Agar D > 0 bo\'lsa 2 ta haqiqiy ildiz, D = 0 bo\'lsa 1 ta ildiz, D < 0 bo\'lsa haqiqiy ildiz yo\'q).',
    subject: 'Matematika',
    easeFactor: 2.6,
    intervalDays: 4,
    repetitions: 2,
    dueDate: new Date().toISOString().split('T')[0],
    state: 'mastered' as const,
  },
  {
    id: 'fc-4',
    front: 'Mantiq: "Hamma A lar B, Ba\'zi B lar C" xulosasi qanday?',
    back: '"Ba\'zi A lar C" degan qat\'iy xulosa chiqmaydi! Venn diagrammasi orqali tekshirish shart.',
    subject: 'Mantiq',
    easeFactor: 2.5,
    intervalDays: 1,
    repetitions: 0,
    dueDate: new Date().toISOString().split('T')[0],
    state: 'learning' as const,
  },
];

// N9: Subscription Plans (Yangilangan hamyonbop narxlar: $3/oy, $24/yil)
export const initialSubscriptionPlans = [
  {
    id: 'free',
    name: 'Bepul Boshlang\'ich',
    priceUzs: 0,
    priceUsd: 0,
    durationMonths: 1,
    features: [
      'Barcha bazaviy darslar va modullar',
      'Kunlik 60 ta AI Tutor so\'rovlari',
      'Oddiy testlar va natijalar tarixi',
      'Do\'stlarni taklif qilib tanga yutish',
    ],
  },
  {
    id: 'monthly',
    name: 'Prep Hub PRO (1 Oylik)',
    priceUzs: 39000,
    priceUsd: 3,
    durationMonths: 1,
    isPopular: true,
    features: [
      '⚡ Cheksiz AI IELTS Speaking & Writing tekshiruvi',
      '🎧 To\'liq IELTS Listening & Reading amaliyoti',
      '🧠 SM-2 Spaced Repetition aqlli xato takrorlash',
      '📅 Moslashuvchan AI 4 haftalik shaxsiy reja',
      '👨‍🏫 Ustozlar bilan jonli chat va maslahat',
      '📊 PDF/Excel progress hisobotlarini yuklab olish',
    ],
  },
  {
    id: 'annual',
    name: 'Prep Hub VIP (Yillik - 40% Chegirma)',
    priceUzs: 280000,
    priceUsd: 22,
    durationMonths: 12,
    features: [
      '👑 Barcha PRO imtiyozlar 12 oy davomida ($1.8/oy)',
      '🏆 Rasmiy akkreditatsiyalangan sertifikatlar',
      '🎁 +5,000 Prep Coins bonus valyuta',
      '⚡ Prioritet 24/7 shaxsiy tyutor yordami',
      '🎯 Kafolatlangan IELTS 7.5+ strategik qo\'llanma',
    ],
  },
];

// N17: Teacher Profiles for Mentorship
export const initialTeacherProfiles = [
  {
    id: 'teacher-1',
    name: 'Ustoz Alisher Qodirov',
    title: 'Senior IELTS Trainer (Band 8.5)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    subject: 'IELTS Speaking & Writing',
    rating: 4.95,
    studentsCount: 320,
    isOnline: true,
  },
  {
    id: 'teacher-2',
    name: 'Nilufar Karimova',
    title: 'Cambridge CELTA Certified Instructor',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    subject: 'English Core & Academic Grammar',
    rating: 4.9,
    studentsCount: 280,
    isOnline: true,
  },
  {
    id: 'teacher-3',
    name: 'Bobur Mirzayev',
    title: 'Matematika va Tanqidiy Fikr Mutaxassisi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    subject: 'Matematika & Mantiq',
    rating: 4.88,
    studentsCount: 190,
    isOnline: false,
  },
];

// N19: Initial Completed Test Records for Progress Export
export const initialCompletedTestRecords = [
  {
    id: 'rec-1',
    testId: 'ielts-mock-diag',
    testTitle: 'IELTS Comprehensive Diagnostic Test',
    subject: 'English (IELTS)',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    timeSpentMinutes: 12,
    completedAt: '2026-08-10T14:30:00.000Z',
    answers: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 1, 5: 0, 6: 1, 7: 2, 8: 1, 9: 0 },
  },
  {
    id: 'rec-2',
    testId: 'ielts-read-1',
    testTitle: 'IELTS Reading Academic Passage 1',
    subject: 'IELTS Reading',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    timeSpentMinutes: 18,
    completedAt: '2026-08-12T10:15:00.000Z',
    answers: { 0: 0, 1: 0, 2: 1, 3: 1, 4: 0, 5: 2, 6: 0, 7: 1, 8: 0, 9: 0 },
  },
  {
    id: 'rec-3',
    testId: 'mantiq-test-1',
    testTitle: 'Kritik Fikr & Sillogizmlar Testi',
    subject: 'Mantiq',
    score: 10,
    totalQuestions: 10,
    percentage: 100,
    timeSpentMinutes: 8,
    completedAt: '2026-08-14T09:00:00.000Z',
    answers: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  },
];


