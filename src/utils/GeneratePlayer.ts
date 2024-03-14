import { faker } from "@faker-js/faker";
import { ConfigurablePlayer } from "../players/ConfigurablePlayer";
import { Player } from "../types/Player";

export const generatePlayer = (options: {
  name?: string;
  cooperate?: number;
  noCooperate?: number;
  noise?: number;
}): Player => {
  const name = faker.person.fullName();
  return new ConfigurablePlayer(name, {
    cooperate: options.cooperate ?? faker.number.float({ min: 0, max: 1.01 }),
    noCooperate:
      options.noCooperate ?? faker.number.float({ min: 0, max: 1.01 }),
    noise: options.noise ?? faker.number.float({ min: 0, max: 1.01 }),
  });
};
