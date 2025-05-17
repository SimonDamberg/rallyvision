export const mapPenalty = (penalty: string): string => {
  const penaltyMap: { [key: string]: string } = {
    "one-finger": "EN KLUNK",
    "two-fingers": "TVÅ KLUNKAR",
    down: "SVEP",
  };
  return penaltyMap[penalty] || penalty;
};
