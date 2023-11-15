import pocketRequest from './pocketRequest';

const getGameData = async (id: string) => {
  const gameData = await pocketRequest.get('game', id);
  return gameData;
};

const patchGameResult = async (id: string, data: object) => {
  try {
    const gameData = await pocketRequest.patch('game', id, data);
    console.log(gameData);
  } catch (error) {
    console.error('Pocket API: GET 요청 실패');
    console.log(error);
  }
};

export { getGameData, patchGameResult };
