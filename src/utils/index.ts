import fsP from "fs/promises";

export const cartesianProduct = <T>(...args: T[][]): T[][] => {
  return args.reduce(
    (acc, arg) => {
      return acc.flatMap((x) => arg.map((y) => x.concat(y as any)));
    },
    [[]]
  );
};

export const saveJSONFile = async (obj: object, filePath: string) => {
  await fsP.writeFile(filePath, JSON.stringify(obj, null, 2), {
    encoding: "utf-8",
  });
};

export const readJSONFile = async (filePath: string) => {
  const data = await fsP.readFile(filePath, "utf-8");

  return JSON.parse(data);
};
