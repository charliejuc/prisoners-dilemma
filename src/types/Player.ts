export interface Decision {
  id: string;
  player: Player;
  cooperate: boolean;
  turn: number;
}

export abstract class Player {
  public abstract id: string;
  public abstract readonly name: string;
  protected readonly cooperate = true;
  protected readonly noCooperate = false;

  protected abstract decide(decisions: Decision[]): boolean;

  abstract turn(decisions: Decision[]): Decision;
}
