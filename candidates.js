const TRANSLATION = {
  CONSERVATIVE: "שמור",
  CONSERVATIVE_AND_OPEN_MIND: "שמור וראש פתוח",
  VERY_CONSERVATIVE: "שמור מאד",
  OPEN: "פתוח",
  MODERN: "מודרני",
  VERY_MODERN: "מודרני מאד",


  FEMALE_CONSERVATIVE: "שמורה",
  FEMALE_CONSERVATIVE_AND_OPEN_MIND: "שמורה וראש פתוח",
  FEMALE_VERY_CONSERVATIVE: "שמורה מאד",
  FEMALE_OPEN: "פתוחה",
  FEMALE_MODERN: "מודרנית",
  FEMALE_VERY_MODERN: "מודרנית מאד",

  openMinded: "פתיחות",
  sector: "מגזר",
  age: "גיל",
  HASIDIC: "חסידי",
  LITHUANIAN: "ליטאי",
  SFARADI: "ספרדי",
  YEMEN: "תימני",
  CHABAD: "חבד",
  HALF_HALF: "חצי חצי",
}

const SUPPORTED_PROPS = ['age', 'sector', 'openMinded'];

const maleCandidates = [
  {
    id: 1,
    name: 'אריה לייב',
    avatar: 'MALE_PROFILE_2',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'LITHUANIAN', age: 28},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE'],
      sector: ['LITHUANIAN'],
      age: {min: 24, max: 27},
    },
  },
  {
    id: 2,
    name: 'שמעון דובער',
    avatar: 'MALE_PROFILE_9',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'HASIDIC', age: 17},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'VERY_CONSERVATIVE'],
      sector: ['HASIDIC'],
      age: {min: 17, max: 20},
    },
  },
  {
    id: 3,
    name: 'רחמים',
    avatar: 'MALE_PROFILE_6',
    properties: {openMinded: 'OPEN', sector: 'SFARADI', age: 32},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'OPEN', 'MODERN'],
      sector: ['SFARADI'],
      age: {min: 25, max: 32},
    },
  },
  {
    id: 4,
    name: 'מנחם מענדל',
    avatar: 'MALE_PROFILE_3',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'CHABAD', age: 23},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'OPEN'],
      sector: ['CHABAD', 'HASIDIC'],
      age: {min: 19, max: 23},
    },
  },
  {
    id: 5,
    name: 'שלום',
    avatar: 'MALE_PROFILE_7',
    properties: {openMinded: 'CONSERVATIVE', sector: 'YEMEN', age: 24},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['YEMEN', 'SFARADI'],
      age: {min: 20, max: 25},
    },
  },
  {
    id: 6,
    name: 'נתי',
    avatar: 'MALE_PROFILE_12',
    properties: {openMinded: 'MODERN', sector: 'HALF_HALF', age: 27},
    lookingFor: {
      openMinded: ['MODERN', 'VERY_MODERN', 'OPEN'],
      sector: ['HALF_HALF', 'CHABAD'],
      age: {min: 19, max: 29},
    },
  },
  {
    id: 7,
    name: 'יוסף',
    avatar: 'MALE_PROFILE_11',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'SFARADI', age: 22},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE', 'CONSERVATIVE'],
      sector: ['SFARADI'],
      age: {min: 20, max: 21},
    },
  },
  {
    id: 8,
    name: 'צבי אלימלך',
    avatar: 'MALE_PROFILE_9',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'HASIDIC', age: 22},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND', 'OPEN', 'MODERN'],
      sector: ['HASIDIC'],
      age: {min: 18, max: 24},
    },
  },
  {
    id: 9,
    name: 'יוסי',
    avatar: 'MALE_PROFILE_13',
    properties: {openMinded: 'MODERN', sector: 'LITHUANIAN', age: 24},
    lookingFor: {
      openMinded: ['OPEN', 'MODERN', 'VERY_MODERN'],
      sector: ['LITHUANIAN'],
      age: {min: 19, max: 24},
    },
  },
  {
    id: 10,
    name: 'שמואל',
    avatar: 'MALE_PROFILE_10',
    properties: {openMinded: 'VERY_MODERN', sector: 'LITHUANIAN', age: 49},
    lookingFor: {
      openMinded: ['VERY_MODERN'],
      sector: ['LITHUANIAN', 'CHABAD', 'SFARADI', 'HALF_HALF'],
      age: {min: 35, max: 44},
    },
  },
  {
    id: 11,
    name: 'סעדיה',
    avatar: 'MALE_PROFILE_6',
    properties: {openMinded: 'CONSERVATIVE', sector: 'YEMEN', age: 48},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['SFARADI', 'YEMEN', 'LITHUANIAN'],
      age: {min: 41, max: 50},
    },
  },
  {
    id: 12,
    name: 'יוריאל',
    avatar: 'MALE_PROFILE_6',
    properties: {openMinded: 'MODERN', sector: 'LITHUANIAN', age: 31},
    lookingFor: {
      openMinded: ['MODERN', 'OPEN'],
      sector: ['LITHUANIAN', 'HALF_HALF', 'SFARADI'],
      age: {min: 26, max: 31},
    },
  },
  {
    id: 13,
    name: 'אריאל',
    avatar: 'MALE_PROFILE_13',
    properties: {openMinded: 'MODERN', sector: 'LITHUANIAN', age: 27},
    lookingFor: {
      openMinded: ['MODERN', 'VERY_MODERN'],
      sector: ['LITHUANIAN'],
      age: {min: 20, max: 27},
    },
  },
  {
    id: 14,
    name: 'ישראל מאיר',
    avatar: 'MALE_PROFILE_2',
    properties: {openMinded: 'CONSERVATIVE', sector: 'LITHUANIAN', age: 23},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE', 'CONSERVATIVE'],
      sector: ['LITHUANIAN'],
      age: {min: 19, max: 23},
    },
  },
  {
    id: 15,
    name: 'שאול',
    avatar: 'MALE_PROFILE_12',
    properties: {openMinded: 'OPEN', sector: 'SFARADI', age: 32},
    lookingFor: {
      openMinded: ['MODERN', 'VERY_MODERN'],
      sector: ['SFARADI', 'HALF_HALF'],
      age: {min: 24, max: 30},
    },
  },
  {
    id: 16,
    name: 'יוני',
    avatar: 'MALE_PROFILE_14',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'SFARADI', age: 22},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['SFARADI'],
      age: {min: 19, max: 22},
    },
  },
  {
    id: 17,
    name: 'שימען',
    avatar: 'MALE_PROFILE_9',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'HASIDIC', age: 22},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['HASIDIC'],
      age: {min: 18, max: 24},
    },
  },
  {
    id: 18,
    name: 'שרוליק',
    avatar: 'MALE_PROFILE_7',
    properties: {openMinded: 'VERY_MODERN', sector: 'HASIDIC', age: 19},
    lookingFor: {
      openMinded: ['VERY_MODERN'],
      sector: ['HASIDIC'],
      age: {min: 18, max: 19},
    },
  },
  {
    id: 19,
    name: 'יוסי',
    avatar: 'MALE_PROFILE_13',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'SFARADI', age: 25},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'OPEN'],
      sector: ['SFARADI', 'HALF_HALF'],
      age: {min: 20, max: 24},
    },
  },
  {
    id: 20,
    name: 'יוסף',
    avatar: 'MALE_PROFILE_15',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'HASIDIC', age: 37},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['HASIDIC', 'SFARADI', 'LITHUANIAN'],
      age: {min: 30, max: 38},
    },
  },
];
const femaleCandidates = [
  {
    id: 1,
    name: 'הניה',
    avatar: 'FEMALE_PROFILE_11',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'LITHUANIAN', age: 27},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE'],
      sector: ['LITHUANIAN', 'HALF_HALF'],
      age: {min: 26, max: 31},
    },
  },
  {
    id: 2,
    name: 'פעסיא חנה',
    avatar: 'FEMALE_PROFILE_4',
    properties: {openMinded: 'CONSERVATIVE', sector: 'HASIDIC', age: 18},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'VERY_CONSERVATIVE'],
      sector: ['HASIDIC'],
      age: {min: 17, max: 18},
    },
  },
  {
    id: 3,
    name: 'סימה',
    avatar: 'FEMALE_PROFILE_13',
    properties: {openMinded: 'MODERN', sector: 'SFARADI', age: 29},
    lookingFor: {
      openMinded: ['OPEN', 'MODERN', 'VERY_MODERN'],
      sector: ['SFARADI', 'YEMEN', 'HALF_HALF'],
      age: {min: 28, max: 34},
    },
  },
  {
    id: 4,
    name: 'חיה מושקא',
    avatar: 'FEMALE_PROFILE_7',
    properties: {openMinded: 'OPEN', sector: 'CHABAD', age: 22},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'OPEN'],
      sector: ['CHABAD'],
      age: {min: 22, max: 24},
    },
  },
  {
    id: 5,
    name: 'יפה',
    avatar: 'FEMALE_PROFILE_1',
    properties: {openMinded: 'CONSERVATIVE', sector: 'YEMEN', age: 20},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE', 'CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['YEMEN'],
      age: {min: 21, max: 25},
    },
  },
  {
    id: 6,
    name: 'עדי',
    avatar: 'FEMALE_PROFILE_12',
    properties: {openMinded: 'VERY_MODERN', sector: 'HALF_HALF', age: 19},
    lookingFor: {
      openMinded: ['MODERN', 'VERY_MODERN'],
      sector: ['HALF_HALF', 'LITHUANIAN'],
      age: {min: 23, max: 27},
    },
  },
  {
    id: 7,
    name: 'אסתר',
    avatar: 'FEMALE_PROFILE_9',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'SFARADI', age: 20},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE'],
      sector: ['SFARADI'],
      age: {min: 21, max: 23},
    },
  },
  {
    id: 8,
    name: 'ליבי',
    avatar: 'FEMALE_PROFILE_8',
    properties: {openMinded: 'MODERN', sector: 'HASIDIC', age: 23},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'OPEN', 'MODERN'],
      sector: ['HASIDIC'],
      age: {min: 22, max: 25},
    },
  },
  {
    id: 9,
    name: 'ליבי',
    avatar: 'FEMALE_PROFILE_7',
    properties: {openMinded: 'OPEN', sector: 'LITHUANIAN', age: 20},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'OPEN', 'MODERN'],
      sector: ['LITHUANIAN'],
      age: {min: 21, max: 24},
    },
  },
  {
    id: 10,
    name: 'חנה',
    avatar: 'FEMALE_PROFILE_15',
    properties: {openMinded: 'VERY_MODERN', sector: 'CHABAD', age: 44},
    lookingFor: {
      openMinded: ['MODERN', 'VERY_MODERN'],
      sector: ['CHABAD', 'LITHUANIAN', 'HALF_HALF'],
      age: {min: 40, max: 50},
    },
  },
  {
    id: 11,
    name: 'רחל',
    avatar: 'FEMALE_PROFILE_14',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'LITHUANIAN', age: 41},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'CONSERVATIVE'],
      sector: ['LITHUANIAN', 'YEMEN'],
      age: {min: 35, max: 48},
    },
  },
  {
    id: 12,
    name: 'שושי',
    avatar: 'FEMALE_PROFILE_10',
    properties: {openMinded: 'OPEN', sector: 'LITHUANIAN', age: 30},
    lookingFor: {
      openMinded: ['OPEN', 'MODERN'],
      sector: ['LITHUANIAN', 'HALF_HALF'],
      age: {min: 28, max: 34},
    },
  },
  {
    id: 13,
    name: 'נועה',
    avatar: 'FEMALE_PROFILE_5',
    properties: {openMinded: 'VERY_MODERN', sector: 'LITHUANIAN', age: 27},
    lookingFor: {
      openMinded: ['OPEN', 'MODERN', 'VERY_MODERN'],
      sector: ['LITHUANIAN', 'HALF_HALF'],
      age: {min: 26, max: 30},
    },
  },
  {
    id: 14,
    name: 'מנוחי',
    avatar: 'FEMALE_PROFILE_4',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'LITHUANIAN', age: 20},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE', 'CONSERVATIVE'],
      sector: ['LITHUANIAN'],
      age: {min: 21, max: 23},
    },
  },
  {
    id: 15,
    name: 'מיכל',
    avatar: 'FEMALE_PROFILE_3',
    properties: {openMinded: 'MODERN', sector: 'SFARADI', age: 26},
    lookingFor: {
      openMinded: ['MODERN', 'VERY_MODERN', 'OPEN'],
      sector: ['SFARADI', 'HALF_HALF', 'LITHUANIAN'],
      age: {min: 25, max: 33},
    },
  },
  {
    id: 16,
    name: 'אילה',
    avatar: 'FEMALE_PROFILE_6',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'SFARADI', age: 19},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND', 'OPEN'],
      sector: ['SFARADI'],
      age: {min: 21, max: 22},
    },
  },
  {
    id: 17,
    name: 'בלומא רייזל',
    avatar: 'FEMALE_PROFILE_9',
    properties: {openMinded: 'CONSERVATIVE', sector: 'HASIDIC', age: 23},
    lookingFor: {
      openMinded: ['CONSERVATIVE', 'VERY_CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['HASIDIC'],
      age: {min: 20, max: 24},
    },
  },
  {
    id: 18,
    name: 'שיינדי',
    avatar: 'FEMALE_PROFILE_10',
    properties: {openMinded: 'VERY_MODERN', sector: 'HASIDIC', age: 19},
    lookingFor: {
      openMinded: ['MODERN', 'VERY_MODERN'],
      sector: ['HASIDIC'],
      age: {min: 18, max: 19},
    },
  },
  {
    id: 19,
    name: 'תמר',
    avatar: 'FEMALE_PROFILE_13',
    properties: {openMinded: 'CONSERVATIVE_AND_OPEN_MIND', sector: 'HALF_HALF', age: 22},
    lookingFor: {
      openMinded: ['CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['SFARADI', 'HALF_HALF'],
      age: {min: 22, max: 26},
    },
  },
  {
    id: 20,
    name: 'אורית',
    avatar: 'FEMALE_PROFILE_2',
    properties: {openMinded: 'VERY_CONSERVATIVE', sector: 'SFARADI', age: 37},
    lookingFor: {
      openMinded: ['VERY_CONSERVATIVE', 'CONSERVATIVE_AND_OPEN_MIND'],
      sector: ['SFARADI', 'HASIDIC', 'LITHUANIAN', 'CHABAD'],
      age: {min: 33, max: 46},
    },
  },
];