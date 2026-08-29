import { DuelQuestion, DuelOpponent } from '../types';

export const DUEL_OPPONENTS_POOL: DuelOpponent[] = [
  {
    id: 'opp_1',
    name: 'Madina Rahimova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    rank: 'Grand Master (Rank #1)',
    rating: 2450,
    accuracyRate: 0.90,
  },
  {
    id: 'opp_2',
    name: 'Shaxzod Bekmuromov',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rank: 'Master Scholar (Rank #2)',
    rating: 2280,
    accuracyRate: 0.85,
  },
  {
    id: 'opp_3',
    name: 'Dilnoza Aliyeva',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rank: 'Diamond Challenger',
    rating: 2150,
    accuracyRate: 0.80,
  },
  {
    id: 'opp_4',
    name: 'Jasurbek Omonov',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rank: 'Platinum Prep',
    rating: 1980,
    accuracyRate: 0.75,
  },
  {
    id: 'opp_5',
    name: 'Aziza Qosimova',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    rank: 'Gold Scholar',
    rating: 1850,
    accuracyRate: 0.70,
  }
];

export const DUEL_QUESTIONS_POOL: DuelQuestion[] = [
  {
    id: 1,
    category: 'English',
    question: "Which word is an antonym of 'MANDATORY'?",
    options: ['Optional', 'Compulsory', 'Crucial', 'Imperative'],
    correctAnswer: 0,
    explanation: "'Mandatory' majburiy degani, uning antonimi 'Optional' (ixtiyoriy) hisoblanadi.",
  },
  {
    id: 2,
    category: 'Matematika',
    question: "Agar 3x + 15 = 45 bo'lsa, x ning qiymati nechaga teng?",
    options: ['10', '15', '5', '8'],
    correctAnswer: 0,
    explanation: "3x = 45 - 15 = 30 => x = 10.",
  },
  {
    id: 3,
    category: 'Mantiq',
    question: "Barcha kitoblar qog'ozdan tayyorlanadi. Ushbu buyum qog'ozdan tayyorlangan. Demak...",
    options: ["Bu buyum kitob bo'lishi ham, bo'lmasligi ham mumkin", "Bu albatta kitob", "Bu kitob emas", "Qog'oz faqat kitob uchun ishlatiladi"],
    correctAnswer: 0,
    explanation: "Qog'ozdan boshqa narsalar ham tayyorlanishi mumkin (daftar, quti), shuning uchun qat'iy xulosa chiqarib bo'lmaydi.",
  },
  {
    id: 4,
    category: 'IELTS',
    question: "IELTS Writing Task 1 (Academic) inshosida minimal nechta so'z yozish talab qilinadi?",
    options: ['150 ta so\'z', '250 ta so\'z', '120 ta so\'z', '200 ta so\'z'],
    correctAnswer: 0,
    explanation: "Task 1 uchun kamida 150 ta so'z, Task 2 uchun esa 250 ta so'z talab etiladi.",
  },
  {
    id: 5,
    category: 'English',
    question: "Choose the correct sentence: 'Hardly ______ when the storm began.'",
    options: ['had we left', 'we had left', 'did we left', 'we were leaving'],
    correctAnswer: 0,
    explanation: "'Hardly / Scarcely' gap boshida kelganda inversiya qo'llanadi: Hardly had + subject + V3.",
  },
  {
    id: 6,
    category: 'Matematika',
    question: "Kvadratning yuzi 64 sm² ga teng. Uning perimetri necha sm?",
    options: ['32 sm', '16 sm', '64 sm', '24 sm'],
    correctAnswer: 0,
    explanation: "Tomoni a = √64 = 8 sm. Perimetr P = 4 * 8 = 32 sm.",
  },
  {
    id: 7,
    category: 'Mantiq',
    question: "Ketma-ketlikdagi qonuniyatni aniqlang: 2, 5, 10, 17, 26, ?",
    options: ['37', '35', '36', '38'],
    correctAnswer: 0,
    explanation: "+3, +5, +7, +9, +11. 26 + 11 = 37 (yoki n² + 1 qoidasi: 6² + 1 = 37).",
  },
  {
    id: 8,
    category: 'IELTS',
    question: "'Coherence and Cohesion' mezoni IELTS Writing baholashida nimani anglatadi?",
    options: ['Fikrlarning mantiqiy bog\'liqligi va paragraflar tuzilishi', 'Faqat grammatik to\'g\'rilik', 'Murakkab so\'zlar soni', 'So\'zlarning to\'g\'ri talaffuzi'],
    correctAnswer: 0,
    explanation: "Coherence & Cohesion - inshoning mantiqiy oqimi, bog'lovchilar va paragraflar uyg'unligi.",
  }
];
