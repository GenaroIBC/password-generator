const randomNum = (min, max) => Math.round(Math.random() * (max - min) + min);

const WORDS = [...Array(26).keys()].map(index =>
  String.fromCharCode(index + 97)
);

const SYMBOLS = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "|"
];

export function generatePassword({ length, symbols, numbers, wordCase }) {
  const getWord = () => {
    const word = WORDS[randomNum(0, WORDS.length - 1)]; // try without -1

    return wordCase === "mixedcase"
      ? randomNum(0, 9) % 2 === 0
        ? word
        : word.toUpperCase()
      : wordCase === "lowercase"
      ? word
      : word.toUpperCase();
  };

  // words
  if (!numbers && !symbols) {
    const password = Array(length).fill(undefined).map(getWord).join("");

    return password;
  }

  // words && numbers
  if (numbers && !symbols) {
    const password = Array(length)
      .fill(undefined)
      .map(() => {
        const num = randomNum(0, 9);
        const isOneOfTen = num === 0 || num === 5 || num === 9;

        return isOneOfTen ? randomNum(0, 9) : getWord();
      })
      .join("");

    return password;
  }

  // words && symbols
  if (symbols && !numbers) {
    const password = Array(length)
      .fill(undefined)
      .map(() => {
        const num = randomNum(0, 9);
        return num === 0 || num === 5 || num === 9
          ? SYMBOLS[randomNum(0, SYMBOLS.length - 1)]
          : getWord();
      })
      .join("");

    return password;
  }

  const password = Array(length)
    .fill(undefined)
    .map(() => {
      const num = randomNum(0, 9);

      return num === 0 || num === 5 || num === 9
        ? SYMBOLS[randomNum(0, SYMBOLS.length - 1)]
        : num % 2 === 0
        ? randomNum(0, 9)
        : getWord();
    })
    .join("");

  return password;
}
