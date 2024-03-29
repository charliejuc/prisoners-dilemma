import { faker } from "@faker-js/faker";
import { ConfigurablePlayer } from "../players/ConfigurablePlayer";
import { Player } from "../types/Player";

export const generatePlayer = (options?: {
  name?: string;
  cooperate?: number;
  noCooperate?: number;
  noise?: number;
}): Player => {
  const name = options?.name ?? faker.person.fullName();
  const cooperate =
    options?.cooperate ?? faker.number.float({ min: 0, max: 1 });
  const noCooperate =
    options?.noCooperate ?? faker.number.float({ min: 0, max: 1 });

  return new ConfigurablePlayer(name, {
    cooperate,
    noCooperate,
    noise: options?.noise ?? faker.number.float({ min: 0, max: 1 }),
  });
};

export const generatePlayerCooperateSmoothed = (options?: {
  name?: string;
  cooperate?: number;
  noCooperate?: number;
  noise?: number;
}): Player => {
  const cooperate =
    options?.cooperate ?? faker.number.float({ min: 0, max: 1 });
  const noCooperate =
    options?.noCooperate ?? faker.number.float({ min: 0, max: 1 });

  return generatePlayer({
    ...options,
    cooperate: options?.cooperate ? cooperate : Math.pow(cooperate, 8),
    noCooperate: options?.noCooperate ? noCooperate : Math.pow(noCooperate, 8),
  });
};

export const generatePlayerReactive = (options?: {
  name?: string;
  cooperate?: number;
  noCooperate?: number;
  noise?: number;
}): Player => {
  const cooperate =
    options?.cooperate ?? faker.number.float({ min: 0, max: 0.1 });
  const noCooperate =
    options?.noCooperate ?? faker.number.float({ min: 0, max: 0.1 });

  return generatePlayer({
    ...options,
    cooperate,
    noCooperate,
  });
};

export const generatePlayerBad = (options?: {
  name?: string;
  cooperate?: number;
  noCooperate?: number;
  noise?: number;
}): Player => {
  const cooperate =
    options?.cooperate ?? faker.number.float({ min: 0, max: 0.1 });
  const noCooperate =
    options?.noCooperate ?? faker.number.float({ min: 0.2, max: 1 });

  return generatePlayer({
    ...options,
    cooperate,
    noCooperate,
  });
};

export const generatePlayerGood = (options?: {
  name?: string;
  cooperate?: number;
  noCooperate?: number;
  noise?: number;
}): Player => {
  const cooperate =
    options?.cooperate ?? faker.number.float({ min: 0.2, max: 1 });
  const noCooperate =
    options?.noCooperate ?? faker.number.float({ min: 0, max: 0.1 });

  return generatePlayer({
    ...options,
    cooperate,
    noCooperate,
  });
};
