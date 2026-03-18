/**
 * QuestRaid RPG Leveling Formula
 * Level = Math.floor(Math.sqrt(XP / 100)) + 1
 */
export const calculateLevel = (xp: number) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const calculateXPForNextLevel = (level: number) => {
  return Math.pow(level, 2) * 100;
};
