export interface Decision {
  id: string;
  player: Player;
  cooperate: boolean;
  turn: number;
}

export const sumPointsToPlayers = (
  decision1: Decision,
  decision2: Decision
) => {
  if (decision1.cooperate && decision2.cooperate) {
    decision1.player.sumPoints(3);
    decision2.player.sumPoints(3);
    return;
  }

  if (decision1.cooperate && !decision2.cooperate) {
    decision1.player.sumPoints(0);
    decision2.player.sumPoints(5);
    return;
  }

  if (!decision1.cooperate && decision2.cooperate) {
    decision1.player.sumPoints(5);
    decision2.player.sumPoints(0);
    return;
  }

  decision1.player.sumPoints(1);
  decision2.player.sumPoints(1);
};

export abstract class Player {
  private _points = 0;
  abstract id: string;
  abstract readonly name: string;
  protected readonly cooperate = true;
  protected readonly noCooperate = false;

  sumPoints(points: number) {
    this._points += points;
  }

  get points() {
    return this._points;
  }

  abstract copy(): Player;

  protected abstract decide(decisions: Decision[]): boolean;

  abstract turn(decisions: Decision[]): Decision;
}
