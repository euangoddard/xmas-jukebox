import { distance } from "fastest-levenshtein";
import { type Clue } from "~/models/clue";

const synonyms = new Map([
  ["+", "and"],
  ["&", "and"],
  ["1", "one"],
  ["2", "two"],
  ["3", "three"],
  ["4", "four"],
  ["5", "five"],
  ["6", "six"],
  ["7", "seven"],
  ["8", "eight"],
  ["9", "nine"],
  ["xmas", "christmas"],
]);

const stopWords = new Set(["the"]);

const levenshteinTolerance = 3;

export function checkClueAnswer(clue: Clue, answer: string): boolean {
  const clueAnswerNormalized = normalizePhrase(clue.answer);
  const answerNormalized = normalizePhrase(answer);
  const levenshteinDistance = distance(clueAnswerNormalized, answerNormalized);
  return levenshteinDistance < levenshteinTolerance;
}

function normalizePhrase(phrase: string): string {
  if (!phrase) {
    return phrase;
  }
  const phraseLower = phrase.toLowerCase();
  const words = phraseLower.split(/\s+/g);
  const wordsNormalized = [];
  for (const word of words) {
    const word_synonym = normalizeSynonyms(word);
    const word_normalized = word_synonym.replace(/\W+/g, "");
    if (word_normalized && !stopWords.has(word_normalized)) {
      wordsNormalized.push(word_normalized);
    }
  }
  return wordsNormalized.join("-");
}

function normalizeSynonyms(word: string): string {
  return synonyms.get(word) ?? word;
}
