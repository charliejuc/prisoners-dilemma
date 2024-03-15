import { Player } from "./Player";

export type Versus = (options: { maxTurnsMean: number }) => (
  p1: Player,
  p2: Player
) => {
  players: [Player, Player];
  turns: number;
  _meta: {
    maxTurnsPairs: number;
  };
};
