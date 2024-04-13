export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const cloneArray = <T>(arr: T[]): T[] => {
  try {
    return JSON.parse(JSON.stringify(arr));
  } catch (err) {
    return [...arr];
  }
};

export const shuffle = <T>(array: T[]): T[] => {
  const newArray = cloneArray(array);

  let currentIndex = newArray.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
};

export const getNumericValue = (value: string) => {
  const num = parseInt(value, 10);
  return isNaN(num) ? undefined : num;
};
