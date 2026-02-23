import { WILDCARD_TYPES } from '../constants';

export const numericalQuestions = [
  { id: 'num1', question: 'How many Grand Slam titles has Serena Williams won?', answer: 23, used: false },
  { id: 'num2', question: 'How many minutes are in a standard tennis match set?', answer: 90, used: false },
  { id: 'num3', question: 'How many makeup brushes are typically in a professional set?', answer: 12, used: false },
  { id: 'num4', question: 'How many dog breeds are recognized by the AKC?', answer: 200, used: false },
  { id: 'num5', question: 'How many watts does a typical microwave use?', answer: 1000, used: false },
  { id: 'num6', question: 'How many octaves can a professional singer typically reach?', answer: 3, used: false },
  { id: 'num7', question: 'How many types of pasta shapes exist worldwide?', answer: 350, used: false },
  { id: 'num8', question: 'How many tennis balls fit in a standard can?', answer: 3, used: false },
  { id: 'num9', question: 'How many shades are in a typical foundation range?', answer: 40, used: false },
  { id: 'num10', question: 'How many years is the average dog lifespan?', answer: 13, used: false },
];

export const orderingQuestions = [
  {
    id: 'ord1',
    question: 'Order these tennis tournaments by prestige (most to least prestigious)',
    items: ['Wimbledon', 'US Open', 'French Open', 'Australian Open'],
    correctOrder: ['Wimbledon', 'US Open', 'French Open', 'Australian Open'],
    used: false,
  },
  {
    id: 'ord2',
    question: 'Order these makeup steps chronologically',
    items: ['Foundation', 'Mascara', 'Primer', 'Lipstick'],
    correctOrder: ['Primer', 'Foundation', 'Mascara', 'Lipstick'],
    used: false,
  },
  {
    id: 'ord3',
    question: 'Order these dog sizes from smallest to largest',
    items: ['Great Dane', 'Chihuahua', 'Golden Retriever', 'Beagle'],
    correctOrder: ['Chihuahua', 'Beagle', 'Golden Retriever', 'Great Dane'],
    used: false,
  },
  {
    id: 'ord4',
    question: 'Order these cooking appliances by cooking temperature (lowest to highest)',
    items: ['Microwave', 'Oven', 'Stovetop', 'Toaster'],
    correctOrder: ['Microwave', 'Toaster', 'Oven', 'Stovetop'],
    used: false,
  },
  {
    id: 'ord5',
    question: 'Order these vocal ranges from lowest to highest',
    items: ['Soprano', 'Bass', 'Tenor', 'Alto'],
    correctOrder: ['Bass', 'Tenor', 'Alto', 'Soprano'],
    used: false,
  },
  {
    id: 'ord6',
    question: 'Order these pasta shapes by cooking time (shortest to longest)',
    items: ['Linguine', 'Lasagna', 'Angel Hair', 'Rigatoni'],
    correctOrder: ['Angel Hair', 'Linguine', 'Rigatoni', 'Lasagna'],
    used: false,
  },
  {
    id: 'ord7',
    question: 'Order these tennis shots by power (weakest to strongest)',
    items: ['Serve', 'Volley', 'Forehand', 'Backhand'],
    correctOrder: ['Volley', 'Backhand', 'Forehand', 'Serve'],
    used: false,
  },
  {
    id: 'ord8',
    question: 'Order these makeup products by coverage (lightest to fullest)',
    items: ['Concealer', 'Tinted Moisturizer', 'Foundation', 'BB Cream'],
    correctOrder: ['Tinted Moisturizer', 'BB Cream', 'Foundation', 'Concealer'],
    used: false,
  },
  {
    id: 'ord9',
    question: 'Order these dog breeds by intelligence (least to most intelligent)',
    items: ['Border Collie', 'Bulldog', 'Poodle', 'German Shepherd'],
    correctOrder: ['Bulldog', 'German Shepherd', 'Poodle', 'Border Collie'],
    used: false,
  },
  {
    id: 'ord10',
    question: 'Order these appliances by energy consumption (lowest to highest)',
    items: ['Blender', 'Dishwasher', 'Refrigerator', 'Coffee Maker'],
    correctOrder: ['Coffee Maker', 'Blender', 'Dishwasher', 'Refrigerator'],
    used: false,
  },
  {
    id: 'ord11',
    question: 'Order these singing techniques by difficulty (easiest to hardest)',
    items: ['Vibrato', 'Breathing', 'Falsetto', 'Belting'],
    correctOrder: ['Breathing', 'Vibrato', 'Falsetto', 'Belting'],
    used: false,
  },
  {
    id: 'ord12',
    question: 'Order these pasta sauces by richness (lightest to richest)',
    items: ['Alfredo', 'Marinara', 'Carbonara', 'Pesto'],
    correctOrder: ['Marinara', 'Pesto', 'Carbonara', 'Alfredo'],
    used: false,
  },
  {
    id: 'ord13',
    question: 'Order these tennis surfaces by speed (slowest to fastest)',
    items: ['Grass', 'Clay', 'Hard Court', 'Carpet'],
    correctOrder: ['Clay', 'Hard Court', 'Grass', 'Carpet'],
    used: false,
  },
  {
    id: 'ord14',
    question: 'Order these makeup finishes by shine (matte to glossy)',
    items: ['Satin', 'Matte', 'Dewy', 'Glossy'],
    correctOrder: ['Matte', 'Satin', 'Dewy', 'Glossy'],
    used: false,
  },
  {
    id: 'ord15',
    question: 'Order these dog activities by energy level (lowest to highest)',
    items: ['Sleeping', 'Walking', 'Playing Fetch', 'Running'],
    correctOrder: ['Sleeping', 'Walking', 'Playing Fetch', 'Running'],
    used: false,
  },
  {
    id: 'ord16',
    question: 'Order these kitchen appliances by invention date (oldest to newest)',
    items: ['Microwave', 'Refrigerator', 'Dishwasher', 'Blender'],
    correctOrder: ['Refrigerator', 'Dishwasher', 'Blender', 'Microwave'],
    used: false,
  },
  {
    id: 'ord17',
    question: 'Order these singing styles by vocal range required (narrowest to widest)',
    items: ['Opera', 'Pop', 'Jazz', 'Rock'],
    correctOrder: ['Pop', 'Rock', 'Jazz', 'Opera'],
    used: false,
  },
  {
    id: 'ord18',
    question: 'Order these pasta dishes by calories (lowest to highest)',
    items: ['Spaghetti Carbonara', 'Penne Arrabbiata', 'Fettuccine Alfredo', 'Linguine Aglio'],
    correctOrder: ['Linguine Aglio', 'Penne Arrabbiata', 'Spaghetti Carbonara', 'Fettuccine Alfredo'],
    used: false,
  },
  {
    id: 'ord19',
    question: 'Order these tennis equipment by price (cheapest to most expensive)',
    items: ['Tennis Balls', 'Racket', 'Shoes', 'Strings'],
    correctOrder: ['Tennis Balls', 'Strings', 'Shoes', 'Racket'],
    used: false,
  },
  {
    id: 'ord20',
    question: 'Order these makeup tools by usage frequency (least to most used)',
    items: ['Eyelash Curler', 'Foundation Brush', 'Beauty Blender', 'Mascara Wand'],
    correctOrder: ['Eyelash Curler', 'Foundation Brush', 'Beauty Blender', 'Mascara Wand'],
    used: false,
  },
];

// Generate wildcards for a box (9 total: 3 WHO'S NEXT, 1 each of others)
// If includePrizeWildcards is false, replace the prize-related types with safe alternates.
function generateWildcards({ includePrizeWildcards = true } = {}) {
  const baseTypes = [
    WILDCARD_TYPES.WHOS_NEXT,
    WILDCARD_TYPES.WHOS_NEXT,
    WILDCARD_TYPES.WHOS_NEXT,
    WILDCARD_TYPES.EXTRA_TURN,
    WILDCARD_TYPES.REMOVE_DECOY,
    WILDCARD_TYPES.FREEZE_OUT,
  ];
  const prizeTypes = [
    WILDCARD_TYPES.STEAL,
    WILDCARD_TYPES.PRIZE_PASS,
    WILDCARD_TYPES.PRIZE_FIGHT,
  ];
  const safeFallbackTypes = [
    WILDCARD_TYPES.EXTRA_TURN,
    WILDCARD_TYPES.WHOS_NEXT,
    WILDCARD_TYPES.FREEZE_OUT,
  ];
  const types = [...baseTypes, ...(includePrizeWildcards ? prizeTypes : safeFallbackTypes)];
  
  // Fisher-Yates shuffle to assign numbers 1-15
  const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return types.map((type, idx) => ({
    number: shuffled[idx],
    type,
  }));
}

export const boxes = [
  {
    category: 'Tennis',
    phrase: ['Serena', 'Williams', 'Ace'],
    realWords: ['Serena', 'Williams', 'Ace'],
    decoys: ['Racket', 'Court', 'Match'],
    wildcards: generateWildcards({ includePrizeWildcards: false }),
  },
  {
    category: 'Makeup',
    phrase: ['Red', 'Lipstick', 'Gloss'],
    realWords: ['Red', 'Lipstick', 'Gloss'],
    decoys: ['Brush', 'Palette', 'Foundation'],
    wildcards: generateWildcards(),
  },
  {
    category: 'Dogs',
    phrase: ['Golden', 'Retriever', 'Puppy'],
    realWords: ['Golden', 'Retriever', 'Puppy'],
    decoys: ['Bone', 'Leash', 'Collar'],
    wildcards: generateWildcards(),
  },
  {
    category: 'Cooking Appliances',
    phrase: ['Microwave', 'Oven', 'Stove'],
    realWords: ['Microwave', 'Oven', 'Stove'],
    decoys: ['Fork', 'Spoon', 'Knife'],
    wildcards: generateWildcards(),
  },
  {
    category: 'Singing',
    phrase: ['Opera', 'Singer', 'Aria'],
    realWords: ['Opera', 'Singer', 'Aria'],
    decoys: ['Microphone', 'Stage', 'Audience'],
    wildcards: generateWildcards(),
  },
];

export const superbox = {
  category: 'Pasta',
  phrase: ['Spaghetti', 'Carbonara', 'Italian'],
  realWords: ['Spaghetti', 'Carbonara', 'Italian'],
  decoys: ['Sauce', 'Noodles', 'Garlic'],
  wildcards: generateWildcards(),
};

export const gameData = {
  numericalQuestions,
  orderingQuestions,
  boxes,
  superbox,
};

