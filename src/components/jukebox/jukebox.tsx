import { component$ } from "@builder.io/qwik";
import { type Clue } from "~/models/clue";
import { ClueChallenge } from "../clue-challenge";
import { Celebration } from "../celebration";

interface JukeboxProps {
  clues: readonly Clue[];
  knownAnswers: Map<string, string>;
}

export const Jukebox = component$<JukeboxProps>(({ clues, knownAnswers }) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: "960px",
          margin: "0 auto 50px",
        }}
      >
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
