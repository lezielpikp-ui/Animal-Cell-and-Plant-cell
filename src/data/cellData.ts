import { Organelle, QuizQuestion, MatchPair } from '../types/cell';

export const ORGANELLES: Organelle[] = [
  {
    id: 'nucleus',
    name: 'Nucleus',
    pronunciation: 'NOO-klee-us',
    nickname: 'The Control Centre',
    shortFunction: 'Controls all cell activities and holds the DNA instructions.',
    fullDescription: 'The Nucleus is like the brain or the boss of the cell! It gives orders to every other part and stores the special recipe book of life called DNA.',
    foundIn: 'both',
    color: '#8b5cf6', // purple
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-300 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    emoji: '🧠',
    funFact: 'Without the nucleus, the cell would not know what proteins to make or when to divide!',
    iconName: 'Crown'
  },
  {
    id: 'cell-membrane',
    name: 'Cell Membrane',
    pronunciation: 'MEM-brayn',
    nickname: 'The Gatekeeper',
    shortFunction: 'Controls what enters and leaves the cell.',
    fullDescription: 'Like a friendly security guard, the Cell Membrane lets healthy food and oxygen inside while kicking out waste and blocking harmful germs.',
    foundIn: 'both',
    color: '#0ea5e9', // sky blue
    badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
    badgeBorder: 'border-sky-300 dark:border-sky-800',
    badgeText: 'text-sky-700 dark:text-sky-300',
    emoji: '🛡️',
    funFact: 'The cell membrane is super flexible, like a soft water balloon skin holding everything inside!',
    iconName: 'ShieldCheck'
  },
  {
    id: 'cytoplasm',
    name: 'Cytoplasm',
    pronunciation: 'SY-toh-plaz-um',
    nickname: 'The Jelly',
    shortFunction: 'Jelly-like fluid that fills the cell and cushions all parts.',
    fullDescription: 'Cytoplasm is the squishy, clear jelly that fills the entire inside of the cell. It holds all the organelles in place and gives them room to work and float safely.',
    foundIn: 'both',
    color: '#06b6d4', // cyan
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-300 dark:border-cyan-800',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    emoji: '🍮',
    funFact: 'Cytoplasm is made of mostly water, with a sprinkle of salts and proteins!',
    iconName: 'Droplets'
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    pronunciation: 'my-toh-KON-dree-uh',
    nickname: 'The Powerhouse',
    shortFunction: 'Breaks down food to release energy for the cell to live and grow.',
    fullDescription: 'The Mitochondria is the energetic powerhouse of the cell! It turns the food you eat into pure cellular power so you can run, jump, think, and play.',
    foundIn: 'both',
    color: '#f97316', // orange
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-300 dark:border-orange-800',
    badgeText: 'text-orange-700 dark:text-orange-300',
    emoji: '⚡',
    funFact: 'Muscle cells have thousands of mitochondria because your muscles need tons of energy to move!',
    iconName: 'Zap'
  },
  {
    id: 'ribosomes',
    name: 'Ribosomes',
    pronunciation: 'RY-buh-sohms',
    nickname: 'The Protein Factories',
    shortFunction: 'Tiny builders that build proteins to repair and grow the cell.',
    fullDescription: 'Ribosomes are tiny dots scattered around the cell. Even though they are super small, they have a giant job: making strong proteins to build cell parts!',
    foundIn: 'both',
    color: '#ec4899', // pink
    badgeBg: 'bg-pink-100 dark:bg-pink-950/60',
    badgeBorder: 'border-pink-300 dark:border-pink-800',
    badgeText: 'text-pink-700 dark:text-pink-300',
    emoji: '🧱',
    funFact: 'A single healthy cell can contain several million ribosomes building proteins 24/7!',
    iconName: 'Boxes'
  },
  {
    id: 'vacuole',
    name: 'Vacuole',
    pronunciation: 'VAK-yoo-ohl',
    nickname: 'The Storage Tank',
    shortFunction: 'Stores water, nutrients, and waste for the cell.',
    fullDescription: 'The Vacuole acts like the cell pantry and trash can! Plant cells have one giant central vacuole full of water that keeps the plant standing upright; animal cells have tiny ones.',
    foundIn: 'both',
    color: '#3b82f6', // blue
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-300 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    emoji: '💧',
    funFact: 'When a plant does not get enough water, its central vacuole shrinks, which makes the plant droop!',
    iconName: 'PackageOpen'
  },
  {
    id: 'cell-wall',
    name: 'Cell Wall',
    pronunciation: 'SEL WAWL',
    nickname: 'The Protective Armour',
    shortFunction: 'A tough, stiff outer layer that supports and protects the plant cell.',
    fullDescription: '🌿 ONLY FOUND IN PLANT CELLS! The Cell Wall is a rigid, tough outer coat made of cellulose. It gives plant cells a boxy, sturdy shape so tall trees can stand straight without bones!',
    foundIn: 'plant-only',
    color: '#16a34a', // green
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-400 dark:border-emerald-700',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    emoji: '🏰',
    funFact: 'Animal cells do NOT have a cell wall. That is why animal and human bodies are soft and flexible!',
    iconName: 'BrickWall'
  },
  {
    id: 'chloroplast',
    name: 'Chloroplast',
    pronunciation: 'KLOR-uh-plast',
    nickname: 'The Solar Panel / Food Factory',
    shortFunction: 'Traps sunlight to make sweet sugar food through photosynthesis.',
    fullDescription: '🌿 ONLY FOUND IN PLANT CELLS! Chloroplasts are packed with green chlorophyll pigments. They absorb sunlight, water, and air to make delicious sugar food for the plant!',
    foundIn: 'plant-only',
    color: '#10b981', // emerald
    badgeBg: 'bg-green-100 dark:bg-green-950/60',
    badgeBorder: 'border-green-400 dark:border-green-700',
    badgeText: 'text-green-700 dark:text-green-300',
    emoji: '☀️',
    funFact: 'Chloroplasts give leaves their beautiful bright green colour. Animals cannot make their own food!',
    iconName: 'SunMedium'
  },
  {
    id: 'endoplasmic-reticulum',
    name: 'Endoplasmic Reticulum (ER)',
    pronunciation: 'en-doh-PLAZ-mik reh-TIK-yuh-lum',
    nickname: 'The Highway System',
    shortFunction: 'Folded tubes that process and transport materials around the cell.',
    fullDescription: 'The ER is a folded maze of membranes right next to the nucleus. It transports proteins and other materials like busy highway tunnels.',
    foundIn: 'both',
    color: '#d97706', // amber
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-300 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    emoji: '🛣️',
    funFact: 'There are two types: Rough ER (covered in ribosome dots) and Smooth ER (silky tubes)!',
    iconName: 'Network'
  },
  {
    id: 'golgi-body',
    name: 'Golgi Body',
    pronunciation: 'GOHL-jee BAH-dee',
    nickname: 'The Post Office',
    shortFunction: 'Sorts, packages, and ships materials out to where they are needed.',
    fullDescription: 'The Golgi Body looks like a stack of pancakes. It receives newly made proteins, packs them neatly into tiny delivery packages, and ships them away!',
    foundIn: 'both',
    color: '#e11d48', // rose
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-300 dark:border-rose-800',
    badgeText: 'text-rose-700 dark:text-rose-300',
    emoji: '📦',
    funFact: 'It was discovered by an Italian doctor named Camillo Golgi using a silver microscope stain!',
    iconName: 'Truck'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which cell part is the POWERHOUSE that gives energy to the cell?',
    organelleId: 'mitochondria',
    options: ['Nucleus', 'Mitochondria', 'Vacuole', 'Cytoplasm'],
    correctAnswer: 'Mitochondria',
    hint: 'Think of cellular batteries and electric power plants! ⚡',
    explanation: 'The Mitochondria is known as "The Powerhouse" because it breaks down food to release energy!'
  },
  {
    id: 2,
    question: 'Which part is the CONTROL CENTRE that acts like the brain or boss of the cell?',
    organelleId: 'nucleus',
    options: ['Cell Membrane', 'Chloroplast', 'Nucleus', 'Ribosomes'],
    correctAnswer: 'Nucleus',
    hint: 'It holds the DNA instructions and gives orders to the cell! 🧠',
    explanation: 'The Nucleus is "The Control Centre" — it directs all activities and contains DNA.'
  },
  {
    id: 3,
    question: 'Which of these protective parts is found ONLY in plant cells (never in animal cells)?',
    organelleId: 'cell-wall',
    options: ['Cell Membrane', 'Cell Wall', 'Mitochondria', 'Nucleus'],
    correctAnswer: 'Cell Wall',
    hint: 'It is a tough, stiff outer box that keeps trees upright! 🏰',
    explanation: 'The Cell Wall is found ONLY in plant cells! It provides a tough outer skeleton so plants stand tall.'
  },
  {
    id: 4,
    question: 'Which green organelle acts as a SOLAR PANEL to catch sunlight and make plant food?',
    organelleId: 'chloroplast',
    options: ['Chloroplast', 'Cytoplasm', 'Ribosomes', 'Golgi Body'],
    correctAnswer: 'Chloroplast',
    hint: 'It contains green chlorophyll and does photosynthesis! ☀️',
    explanation: 'Chloroplasts are the "Solar Panels" found ONLY in plant cells to turn sunlight into food.'
  },
  {
    id: 5,
    question: 'Which part is the GATEKEEPER that controls what enters and exits the cell?',
    organelleId: 'cell-membrane',
    options: ['Cell Wall', 'Cell Membrane', 'Vacuole', 'Nucleus'],
    correctAnswer: 'Cell Membrane',
    hint: 'Both animals and plants have this flexible boundary layer! 🛡️',
    explanation: 'The Cell Membrane is "The Gatekeeper" — it decides who enters and who leaves.'
  },
  {
    id: 6,
    question: 'What is the JELLY-LIKE fluid that fills the cell and cushions all the parts?',
    organelleId: 'cytoplasm',
    options: ['Cytoplasm', 'Vacuole', 'Chloroplast', 'Mitochondria'],
    correctAnswer: 'Cytoplasm',
    hint: 'Think of squishy jelly or pudding where parts float! 🍮',
    explanation: 'Cytoplasm is "The Jelly" — a clear fluid that cushions and supports all the organelles.'
  },
  {
    id: 7,
    question: 'Which parts are the PROTEIN FACTORIES that build strong materials for the cell?',
    organelleId: 'ribosomes',
    options: ['Ribosomes', 'Vacuole', 'Cell Wall', 'Nucleus'],
    correctAnswer: 'Ribosomes',
    hint: 'They are tiny dots that build proteins like bricklayers! 🧱',
    explanation: 'Ribosomes are "The Protein Factories" — small but mighty builders of essential proteins.'
  },
  {
    id: 8,
    question: 'Which organelle is THE STORAGE TANK for storing water, nutrients, and waste?',
    organelleId: 'vacuole',
    options: ['Mitochondria', 'Vacuole', 'Cell Membrane', 'Chloroplast'],
    correctAnswer: 'Vacuole',
    hint: 'Plant cells have one huge central one filled with water! 💧',
    explanation: 'The Vacuole is "The Storage Tank" — storing water and nutrients. It is giant in plant cells!'
  },
  {
    id: 9,
    question: 'Look closely at Animal Cells: which feature do animal cells LACK (do NOT have)?',
    organelleId: 'cell-wall',
    options: ['Mitochondria', 'Cell Membrane', 'Cell Wall & Chloroplasts', 'Nucleus'],
    correctAnswer: 'Cell Wall & Chloroplasts',
    hint: 'Animals can move around flexibly and eat food instead of making it from sunshine! 🌿',
    explanation: 'Animal cells do NOT have a Cell Wall or Chloroplasts — those are plant-only superpowers!'
  },
  {
    id: 10,
    question: 'Which organelle acts like the POST OFFICE, packing and shipping proteins?',
    organelleId: 'golgi-body',
    options: ['Golgi Body', 'Cytoplasm', 'Vacuole', 'Cell Wall'],
    correctAnswer: 'Golgi Body',
    hint: 'It packages materials into vesicles just like wrapping parcels! 📦',
    explanation: 'The Golgi Body is "The Post Office" — sorting, packaging, and sending proteins wherever needed.'
  }
];

export const MATCH_ITEMS: MatchPair[] = [
  {
    id: 'm-nucleus',
    organelleId: 'nucleus',
    organelleName: 'Nucleus',
    nickname: 'The Control Centre',
    functionText: 'Controls all cell activities and holds DNA instructions',
    isPlantOnly: false,
    emoji: '🧠',
    color: '#8b5cf6'
  },
  {
    id: 'm-mitochondria',
    organelleId: 'mitochondria',
    organelleName: 'Mitochondria',
    nickname: 'The Powerhouse',
    functionText: 'Breaks down food to release energy for the cell',
    isPlantOnly: false,
    emoji: '⚡',
    color: '#f97316'
  },
  {
    id: 'm-membrane',
    organelleId: 'cell-membrane',
    organelleName: 'Cell Membrane',
    nickname: 'The Gatekeeper',
    functionText: 'Controls what enters and exits the cell',
    isPlantOnly: false,
    emoji: '🛡️',
    color: '#0ea5e9'
  },
  {
    id: 'm-cytoplasm',
    organelleId: 'cytoplasm',
    organelleName: 'Cytoplasm',
    nickname: 'The Jelly',
    functionText: 'Jelly-like fluid that fills the cell and cushions parts',
    isPlantOnly: false,
    emoji: '🍮',
    color: '#06b6d4'
  },
  {
    id: 'm-cellwall',
    organelleId: 'cell-wall',
    organelleName: 'Cell Wall',
    nickname: 'The Protective Armour',
    functionText: 'Tough outer layer that supports and protects the plant cell',
    isPlantOnly: true,
    emoji: '🏰',
    color: '#16a34a'
  },
  {
    id: 'm-chloroplast',
    organelleId: 'chloroplast',
    organelleName: 'Chloroplast',
    nickname: 'The Solar Panel',
    functionText: 'Traps sunlight to make food through photosynthesis',
    isPlantOnly: true,
    emoji: '☀️',
    color: '#10b981'
  },
  {
    id: 'm-vacuole',
    organelleId: 'vacuole',
    organelleName: 'Vacuole',
    nickname: 'The Storage Tank',
    functionText: 'Stores water, nutrients, and waste for the cell',
    isPlantOnly: false,
    emoji: '💧',
    color: '#3b82f6'
  },
  {
    id: 'm-ribosomes',
    organelleId: 'ribosomes',
    organelleName: 'Ribosomes',
    nickname: 'The Protein Factories',
    functionText: 'Tiny builders that build proteins for cell growth',
    isPlantOnly: false,
    emoji: '🧱',
    color: '#ec4899'
  }
];
