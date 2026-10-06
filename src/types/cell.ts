export type CellType = 'animal' | 'plant';

export interface Organelle {
  id: string;
  name: string;
  pronunciation?: string;
  nickname: string;
  shortFunction: string;
  fullDescription: string;
  foundIn: 'both' | 'plant-only' | 'animal-only';
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  emoji: string;
  funFact: string;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  organelleId: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
  targetCellType?: 'animal' | 'plant' | 'both';
}

export interface MatchPair {
  id: string;
  organelleId: string;
  organelleName: string;
  nickname: string;
  functionText: string;
  isPlantOnly: boolean;
  emoji: string;
  color: string;
}
