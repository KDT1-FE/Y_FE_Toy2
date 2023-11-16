interface Vote {
  by: string;
  liar: string;
}

interface GameData {
  id: string;
  users: string[];
  votedFor: Vote[];
}

const calculateVote = (gameData: GameData): string | null => {
  if (gameData.votedFor.length !== gameData.users.length) {
    console.log(
      `투표가 진행중입니다: ${gameData.votedFor.length} / ${gameData.users.length}`,
    );
    return null;
  }

  const voteCount: Record<string, number> = {};
  gameData.votedFor.forEach((vote) => {
    const liarId = vote.liar;
    console.log("liarId:" + liarId);
    voteCount[liarId] = (voteCount[liarId] || 0) + 1;
  });

  let maxCount = 0;
  let maxId: string | null = null;

  for (const id in voteCount) {
    if (voteCount[id] > maxCount) {
      maxCount = voteCount[id];
      maxId = id;
      console.log("maxId", maxId, maxCount + "표");
    }
  }

  return maxId;
};

export default calculateVote;
