import { generatePassword } from "./generatePassword.js";

document.addEventListener("submit", e => {
  e.preventDefault();
  const passwordForm = document.getElementById("password-form");
  const formEntries = new FormData(passwordForm).entries();

  const {
    "pass-length": length,
    case: wordCase,
    "has-numbers": numbers,
    "has-symbols": symbols
  } = Array.from(formEntries).reduce(
    (final, [key, value]) => ({ ...final, [key]: value }),
    {}
  );

  const password = generatePassword({
    length: Number(length),
    symbols: symbols === "on",
    numbers: numbers === "on",
    wordCase
  });

  const $passwordSpan = document.createElement("span");

  $passwordSpan.textContent = password;

  document.body.appendChild($passwordSpan);
});
