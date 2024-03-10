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

  public abstract decide(decisions: Decision[]): Decision;
}
