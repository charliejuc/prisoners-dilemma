export const cartesianProduct = <T>(...args: T[][]): T[][] => {
  return args.reduce(
    (acc, arg) => {
      return acc.flatMap((x) => arg.map((y) => x.concat(y as any)));
    },
    [[]]
  );
};
