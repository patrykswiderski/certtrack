interface Options {
  name?: string;
}

const values: number[] = [1, 2, 3];
const firstValue: number | undefined = values[0];
const options: Options = {};

export { firstValue, options };
