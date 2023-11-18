import { component$ } from "@builder.io/qwik";
import { type Clue } from "~/models/clue";
import { ClueChallenge } from "../clue-challenge";
import { Celebration } from "../celebration";
import styles from "./jukebox.module.css";

interface JukeboxProps {
  clues: readonly Clue[];
  knownAnswers: Map<string, string>;
}

export const Jukebox = component$<JukeboxProps>(({ clues, knownAnswers }) => {
  return (
    <>
      <div class={styles.grid}>
        {clues.map((clue, index) => (
          <ClueChallenge
            clue={clue}
            number={index + 1}
            correctAnswer={knownAnswers.get(clue.id) ?? null}
            key={clue.id}
          />
        ))}
      </div>
      <Celebration knownAnswers={knownAnswers} clues={clues} />
    </>
  );
});
