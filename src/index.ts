import { ConfigurablePlayer } from "./players/ConfigurablePlayer";
import { titForTatFactory } from "./players/TitForTat";
import { twoPlayersVersus } from "./versus/TwoPlayersVersus";

const noise = 0.1;

const p1 = titForTatFactory({
  noise,
});
const p2 = new ConfigurablePlayer("Conf 2", {
  cooperate: 0.1,
  noCooperate: 0,
  noise,
});

const results = twoPlayersVersus({
  maxTurnsMean: 10_000,
})(p1, p2);
const [_p1, _p2] = results.players;

console.log(`${_p1.name} points:`, _p1.points);
console.log(`${_p2.name} points:`, _p2.points);
console.log("Turns", results.turns);
