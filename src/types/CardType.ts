export type CardType = {
  id: number;
  instanceId: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  letterName: string;
  word: {
    pronunciation: string;
    coptic: string;
  };
};
