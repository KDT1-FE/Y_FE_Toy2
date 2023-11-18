import pocketRequest from './pocketRequest';

const getGameData = async (id: string) => {
  const gameData = await pocketRequest.get('game', `/${id}`);
  return gameData;
};

const patchGameResult = async (id: string, data: object) => {
  const gameData = await pocketRequest.patch('game', id, data);
  return gameData;
};

export { getGameData, patchGameResult };
