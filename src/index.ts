import { titForTatFactory } from "./players/TitForTat";
import { cartesianProduct } from "./utils";
import { generatePlayer } from "./utils/GeneratePlayer";
import { twoPlayersVersus } from "./versus/TwoPlayersVersus";

const noise = 0.1;

const p1 = titForTatFactory({
  noise,
});
const p2 = generatePlayer({
  noise,
});

const results = twoPlayersVersus({
  maxTurnsMean: 10_000,
})(p1, p2);
const [_p1, _p2] = results.players;

console.log(_p1);
console.log(_p2);
console.log(`${_p1.name} points:`, _p1.points);
console.log(`${_p2.name} points:`, _p2.points);
console.log("Turns", results.turns);

const arr = [1, 2, 3, 4, 5, 6];
console.log(cartesianProduct(arr, arr));
console.log(arr);
