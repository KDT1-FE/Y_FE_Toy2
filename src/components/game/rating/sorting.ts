export interface Id {
  name: string;
  correct: number;
}

const sorting = (idArray: Id[]) =>
  idArray.sort((a, b) => b.correct - a.correct || a.name.localeCompare(b.name));

export default sorting;
