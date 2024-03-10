import { TitForTat } from "./players/TitForTat";

const p1 = new TitForTat();
const p2 = new TitForTat();

const d1 = p1.decide([]);
console.log(d1);

console.log(p2.decide([d1]));
