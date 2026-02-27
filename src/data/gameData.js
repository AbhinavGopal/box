import { WILDCARD_TYPES } from '../constants';

export const numericalQuestions = [
  { id: 'num1', question: 'How many countries are there in the world?', answer: 195, used: false },
  { id: 'num2', question: 'How many bones are in the adult human body?', answer: 206, used: false },
  { id: 'num3', question: 'In what year did the Titanic sink?', answer: 1912, used: false },
  { id: 'num4', question: 'How many feet tall is the Statue of Liberty (including the pedestal)?', answer: 305, used: false },
  { id: 'num5', question: 'How many keys are on a standard piano?', answer: 88, used: false },
  { id: 'num6', question: 'How many episodes of Friends were there?', answer: 236, used: false },
  { id: 'num7', question: 'How many miles is the Earth from the Sun (in millions)?', answer: 93, used: false },
  { id: 'num8', question: 'How many teeth does an adult human have?', answer: 32, used: false },
  { id: 'num9', question: 'In what year was the first iPhone released?', answer: 2007, used: false },
  { id: 'num10', question: 'How many elements are on the periodic table?', answer: 118, used: false },
  { id: 'num11', question: 'How many stars are on the American flag?', answer: 50, used: false },
  { id: 'num12', question: 'How many chromosomes do humans have?', answer: 46, used: false },
  { id: 'num13', question: 'In what year did World War II end?', answer: 1945, used: false },
  { id: 'num14', question: 'How many meters tall is Mount Everest?', answer: 8849, used: false },
  { id: 'num15', question: 'How many minutes are in a week?', answer: 10080, used: false },
  { id: 'num16', question: 'How many plays did Shakespeare write?', answer: 37, used: false },
  { id: 'num17', question: 'How many floors does the Empire State Building have?', answer: 102, used: false },
  { id: 'num18', question: 'In what year did humans first land on the Moon?', answer: 1969, used: false },
  { id: 'num19', question: 'How many muscles are in the human body?', answer: 600, used: false },
  { id: 'num20', question: 'How many seconds are in a day?', answer: 86400, used: false },
  { id: 'num21', question: 'How many Grand Slam titles did Roger Federer win?', answer: 20, used: false },
  { id: 'num22', question: 'In what year did the Berlin Wall fall?', answer: 1989, used: false },
  { id: 'num23', question: 'How many hours are in a year?', answer: 8760, used: false },
  { id: 'num24', question: 'How many sides does a hexagon have?', answer: 6, used: false },
  { id: 'num25', question: 'In what year was Wikipedia founded?', answer: 2001, used: false },
  { id: 'num26', question: 'How many ribs does an adult human have?', answer: 24, used: false },
  { id: 'num27', question: 'How many weeks are in a year?', answer: 52, used: false },
  { id: 'num28', question: 'In what year did Christopher Columbus reach the Americas?', answer: 1492, used: false },
  { id: 'num29', question: 'How many letters are in the Hawaiian alphabet?', answer: 12, used: false },
  { id: 'num30', question: 'How many Oscar nominations did Meryl Streep receive?', answer: 21, used: false },
];

export const orderingQuestions = [
  {
    id: 'ord1',
    question: 'Order these planets by distance from the Sun (closest to farthest)',
    items: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
    correctOrder: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
    used: false,
  },
  {
    id: 'ord2',
    question: 'Order these U.S. presidents chronologically (earliest to latest)',
    items: ['Lincoln', 'Washington', 'Obama', 'Roosevelt'],
    correctOrder: ['Washington', 'Lincoln', 'Roosevelt', 'Obama'],
    used: false,
  },
  {
    id: 'ord3',
    question: 'Order these oceans by size (smallest to largest)',
    items: ['Pacific', 'Arctic', 'Indian', 'Atlantic'],
    correctOrder: ['Arctic', 'Indian', 'Atlantic', 'Pacific'],
    used: false,
  },
  {
    id: 'ord4',
    question: 'Order these inventions chronologically (oldest to newest)',
    items: ['Television', 'Telephone', 'Internet', 'Printing Press'],
    correctOrder: ['Printing Press', 'Telephone', 'Television', 'Internet'],
    used: false,
  },
  {
    id: 'ord5',
    question: 'Order these animals by average lifespan (shortest to longest)',
    items: ['Elephant', 'Hamster', 'Tortoise', 'Dog'],
    correctOrder: ['Hamster', 'Dog', 'Elephant', 'Tortoise'],
    used: false,
  },
  {
    id: 'ord6',
    question: 'Order these countries by population (smallest to largest)',
    items: ['India', 'Brazil', 'Australia', 'Nigeria'],
    correctOrder: ['Australia', 'Brazil', 'Nigeria', 'India'],
    used: false,
  },
  {
    id: 'ord7',
    question: 'Order these movies by release year (earliest to latest)',
    items: ['Titanic', 'Jaws', 'Avatar', 'The Godfather'],
    correctOrder: ['The Godfather', 'Jaws', 'Titanic', 'Avatar'],
    used: false,
  },
  {
    id: 'ord8',
    question: 'Order these sports by number of players on a team (fewest to most)',
    items: ['Soccer', 'Tennis', 'Basketball', 'Baseball'],
    correctOrder: ['Tennis', 'Basketball', 'Baseball', 'Soccer'],
    used: false,
  },
  {
    id: 'ord9',
    question: 'Order these buildings by height (shortest to tallest)',
    items: ['Eiffel Tower', 'Big Ben', 'Burj Khalifa', 'Empire State'],
    correctOrder: ['Big Ben', 'Eiffel Tower', 'Empire State', 'Burj Khalifa'],
    used: false,
  },
  {
    id: 'ord10',
    question: 'Order these languages by number of native speakers (fewest to most)',
    items: ['Spanish', 'Mandarin', 'English', 'Arabic'],
    correctOrder: ['Arabic', 'English', 'Spanish', 'Mandarin'],
    used: false,
  },
  {
    id: 'ord11',
    question: 'Order these decades by when these songs were #1: "Bohemian Rhapsody", "Thriller", "Shape of You", "Smells Like Teen Spirit"',
    items: ['Shape of You', 'Bohemian Rhapsody', 'Thriller', 'Smells Like Teen Spirit'],
    correctOrder: ['Bohemian Rhapsody', 'Thriller', 'Smells Like Teen Spirit', 'Shape of You'],
    used: false,
  },
  {
    id: 'ord12',
    question: 'Order these historical events chronologically (earliest to latest)',
    items: ['Moon Landing', 'World War I', 'Fall of Berlin Wall', 'French Revolution'],
    correctOrder: ['French Revolution', 'World War I', 'Moon Landing', 'Fall of Berlin Wall'],
    used: false,
  },
  {
    id: 'ord13',
    question: 'Order these continents by land area (smallest to largest)',
    items: ['Africa', 'Europe', 'Asia', 'Australia'],
    correctOrder: ['Australia', 'Europe', 'Africa', 'Asia'],
    used: false,
  },
  {
    id: 'ord14',
    question: 'Order these Olympic sports by when they were first included (earliest to latest)',
    items: ['Basketball', 'Athletics', 'Snowboarding', 'Swimming'],
    correctOrder: ['Athletics', 'Swimming', 'Basketball', 'Snowboarding'],
    used: false,
  },
  {
    id: 'ord15',
    question: 'Order these foods by calories per serving (lowest to highest)',
    items: ['Big Mac', 'Banana', 'Slice of Pizza', 'Salad (no dressing)'],
    correctOrder: ['Salad (no dressing)', 'Banana', 'Slice of Pizza', 'Big Mac'],
    used: false,
  },
  {
    id: 'ord16',
    question: 'Order these rivers by length (shortest to longest)',
    items: ['Nile', 'Amazon', 'Thames', 'Mississippi'],
    correctOrder: ['Thames', 'Mississippi', 'Amazon', 'Nile'],
    used: false,
  },
  {
    id: 'ord17',
    question: 'Order these social media platforms by launch year (earliest to latest)',
    items: ['Instagram', 'Facebook', 'TikTok', 'Twitter'],
    correctOrder: ['Facebook', 'Twitter', 'Instagram', 'TikTok'],
    used: false,
  },
  {
    id: 'ord18',
    question: 'Order these Disney movies by release year (earliest to latest)',
    items: ['The Lion King', 'Snow White', 'Frozen', 'The Little Mermaid'],
    correctOrder: ['Snow White', 'The Little Mermaid', 'The Lion King', 'Frozen'],
    used: false,
  },
  {
    id: 'ord19',
    question: 'Order these currencies by value against the US dollar (weakest to strongest)',
    items: ['British Pound', 'Japanese Yen', 'Euro', 'Indian Rupee'],
    correctOrder: ['Japanese Yen', 'Indian Rupee', 'Euro', 'British Pound'],
    used: false,
  },
  {
    id: 'ord20',
    question: 'Order these animals by top speed (slowest to fastest)',
    items: ['Cheetah', 'Horse', 'Elephant', 'Greyhound'],
    correctOrder: ['Elephant', 'Greyhound', 'Horse', 'Cheetah'],
    used: false,
  },
  {
    id: 'ord21',
    question: 'Order these wars chronologically (earliest to latest)',
    items: ['Vietnam War', 'American Civil War', 'World War I', 'Korean War'],
    correctOrder: ['American Civil War', 'World War I', 'Korean War', 'Vietnam War'],
    used: false,
  },
  {
    id: 'ord22',
    question: 'Order these tech companies by founding year (earliest to latest)',
    items: ['Google', 'Apple', 'Amazon', 'Microsoft'],
    correctOrder: ['Apple', 'Microsoft', 'Amazon', 'Google'],
    used: false,
  },
  {
    id: 'ord23',
    question: 'Order these deserts by size (smallest to largest)',
    items: ['Sahara', 'Gobi', 'Antarctic', 'Arabian'],
    correctOrder: ['Gobi', 'Arabian', 'Sahara', 'Antarctic'],
    used: false,
  },
  {
    id: 'ord24',
    question: 'Order these Marvel movies by release date (earliest to latest)',
    items: ['Avengers: Endgame', 'Iron Man', 'Black Panther', 'The Avengers'],
    correctOrder: ['Iron Man', 'The Avengers', 'Black Panther', 'Avengers: Endgame'],
    used: false,
  },
  {
    id: 'ord25',
    question: 'Order these body organs by average weight (lightest to heaviest)',
    items: ['Liver', 'Brain', 'Heart', 'Skin'],
    correctOrder: ['Heart', 'Brain', 'Liver', 'Skin'],
    used: false,
  },
  {
    id: 'ord26',
    question: 'Order these Summer Olympics host cities chronologically (earliest to latest)',
    items: ['Beijing', 'London', 'Athens', 'Tokyo'],
    correctOrder: ['Athens', 'Beijing', 'London', 'Tokyo'],
    used: false,
  },
  {
    id: 'ord27',
    question: 'Order these billionaires by net worth (lowest to highest, as of 2024)',
    items: ['Jeff Bezos', 'Mark Zuckerberg', 'Elon Musk', 'Bernard Arnault'],
    correctOrder: ['Mark Zuckerberg', 'Jeff Bezos', 'Bernard Arnault', 'Elon Musk'],
    used: false,
  },
  {
    id: 'ord28',
    question: 'Order these colors in a rainbow from top to bottom',
    items: ['Green', 'Red', 'Violet', 'Yellow'],
    correctOrder: ['Red', 'Yellow', 'Green', 'Violet'],
    used: false,
  },
  {
    id: 'ord29',
    question: 'Order these U.S. states by land area (smallest to largest)',
    items: ['Texas', 'Alaska', 'Rhode Island', 'California'],
    correctOrder: ['Rhode Island', 'California', 'Texas', 'Alaska'],
    used: false,
  },
  {
    id: 'ord30',
    question: 'Order these car brands by founding year (earliest to latest)',
    items: ['Toyota', 'Ford', 'Tesla', 'BMW'],
    correctOrder: ['Ford', 'BMW', 'Toyota', 'Tesla'],
    used: false,
  },
  {
    id: 'ord31',
    question: 'Order these video game consoles by release year (earliest to latest)',
    items: ['PlayStation', 'Nintendo 64', 'Xbox 360', 'Atari 2600'],
    correctOrder: ['Atari 2600', 'PlayStation', 'Nintendo 64', 'Xbox 360'],
    used: false,
  },
  {
    id: 'ord32',
    question: 'Order these world currencies by age (oldest to newest)',
    items: ['US Dollar', 'Euro', 'British Pound', 'Bitcoin'],
    correctOrder: ['British Pound', 'US Dollar', 'Euro', 'Bitcoin'],
    used: false,
  },
  {
    id: 'ord33',
    question: 'Order these space missions chronologically (earliest to latest)',
    items: ['Voyager 1', 'Sputnik', 'Mars Rover Curiosity', 'Apollo 11'],
    correctOrder: ['Sputnik', 'Apollo 11', 'Voyager 1', 'Mars Rover Curiosity'],
    used: false,
  },
  {
    id: 'ord34',
    question: 'Order these musical instruments by typical number of strings (fewest to most)',
    items: ['Guitar', 'Violin', 'Piano', 'Ukulele'],
    correctOrder: ['Ukulele', 'Violin', 'Guitar', 'Piano'],
    used: false,
  },
  {
    id: 'ord35',
    question: 'Order these world landmarks by year of completion (earliest to latest)',
    items: ['Eiffel Tower', 'Great Wall of China', 'Taj Mahal', 'Sydney Opera House'],
    correctOrder: ['Great Wall of China', 'Taj Mahal', 'Eiffel Tower', 'Sydney Opera House'],
    used: false,
  },
  {
    id: 'ord36',
    question: 'Order these dog breeds by average weight (lightest to heaviest)',
    items: ['Labrador', 'Chihuahua', 'St. Bernard', 'Beagle'],
    correctOrder: ['Chihuahua', 'Beagle', 'Labrador', 'St. Bernard'],
    used: false,
  },
  {
    id: 'ord37',
    question: 'Order these TV shows by number of seasons (fewest to most)',
    items: ['Game of Thrones', 'The Simpsons', 'Breaking Bad', 'The Office'],
    correctOrder: ['Breaking Bad', 'Game of Thrones', 'The Office', 'The Simpsons'],
    used: false,
  },
  {
    id: 'ord38',
    question: 'Order these sports balls by diameter (smallest to largest)',
    items: ['Basketball', 'Golf Ball', 'Tennis Ball', 'Soccer Ball'],
    correctOrder: ['Golf Ball', 'Tennis Ball', 'Soccer Ball', 'Basketball'],
    used: false,
  },
  {
    id: 'ord39',
    question: 'Order these cities by latitude (southernmost to northernmost)',
    items: ['Tokyo', 'Sydney', 'London', 'Cairo'],
    correctOrder: ['Sydney', 'Cairo', 'Tokyo', 'London'],
    used: false,
  },
  {
    id: 'ord40',
    question: 'Order these book series by total copies sold (fewest to most)',
    items: ['Harry Potter', 'Lord of the Rings', 'Hunger Games', 'Twilight'],
    correctOrder: ['Twilight', 'Hunger Games', 'Lord of the Rings', 'Harry Potter'],
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

function generateSuperboxWildcards() {
  const types = [
    WILDCARD_TYPES.WHOS_NEXT,
    WILDCARD_TYPES.WHOS_NEXT,
    WILDCARD_TYPES.WHOS_NEXT,
    WILDCARD_TYPES.EXTRA_TURN,
    WILDCARD_TYPES.REMOVE_DECOY,
    WILDCARD_TYPES.REMOVE_DECOY,
  ];
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

export const superbox = {
  category: 'Pasta',
  phrase: ['Spaghetti', 'Carbonara', 'Italian'],
  realWords: ['Spaghetti', 'Carbonara', 'Italian'],
  decoys: ['Sauce', 'Noodles', 'Garlic', 'Parmesan', 'Basil', 'Mozzarella'],
  wildcards: generateSuperboxWildcards(),
};

export const gameData = {
  numericalQuestions,
  orderingQuestions,
  boxes,
  superbox,
};

