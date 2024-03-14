import { ConfigurablePlayer } from "./players/ConfigurablePlayer";

const p1 = new ConfigurablePlayer("Conf 1", {
  cooperate: 0.1,
  noCooperate: 0,
  noise: 0.1,
});
const p2 = new ConfigurablePlayer("Conf 2", {
  cooperate: 0,
  noCooperate: 0.8,
  noise: 0.1,
});

const d1 = p1.turn([]);
console.log(d1);

const d2 = p2.turn([d1]);
console.log(d2);

console.log(p1.turn([d1, d2]));
