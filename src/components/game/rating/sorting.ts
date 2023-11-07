export interface Id {
  id: string;
  correct: number;
}

const sorting = (idArray: Id[]) => idArray.sort((a, b) => b.correct - a.correct || a.id.localeCompare(b.id));

export default sorting;
