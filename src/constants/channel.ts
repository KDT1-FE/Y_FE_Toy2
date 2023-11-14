export const ALL_CHANNELS = ['channels'];

// export const CATEGORIES = [
//   '기타',
//   '일상',
//   '프로그래밍',
//   '음식',
//   '고민',
//   '프론트엔드',
//   '백엔드',
//   '알고리즘',
//   '산책',
// ];

export const CATEGORIES = [
  { name: '전체', value: '' },
  { name: '기타', value: '기타' },
  { name: '일상', value: '일상' },
  { name: '프로그래밍', value: '프로그래밍' },
  { name: '음식', value: '음식' },
  { name: '고민', value: '고민' },
  { name: '프론트엔드', value: '프론트엔드' },
  { name: '백엔드', value: '백엔드' },
  { name: '알고리즘', value: '알고리즘' },
];

export const CATEGORY_COLOR_SCHEMES: { [key: string]: string } = {
  전체: 'skyblue',
  기타: 'red',
  일상: 'orange',
  프로그래밍: 'yellow',
  음식: 'green',
  고민: 'blue',
  프론트엔드: 'indigo',
  백엔드: 'purple',
  알고리즘: 'pink',
  산책: 'gray',
};
