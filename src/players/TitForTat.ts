import { ConfigurablePlayer } from "./ConfigurablePlayer";

export const titForTatFactory = (options: { noise: number }) => {
  return new ConfigurablePlayer("Tit for Tat", {
    cooperate: 0.1,
    noCooperate: 0,
    noise: options.noise,
  });
};
