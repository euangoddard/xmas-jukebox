import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { type Clue } from "~/models/clue";
import { useCheckAnswer } from "~/routes/play";
import styles from "./clue-challenge.module.css";
import { PlayButton } from "../play-button";

interface ClueProps {
  clue: Clue;
  number: number;
  correctAnswer: string | null;
}

export const ClueChallenge = component$<ClueProps>(
  ({ clue, number, correctAnswer }) => {
    const audioRef = useSignal<HTMLAudioElement>();
    const checkAnswer = useCheckAnswer();

    const form = (
      <Form action={checkAnswer}>
        <div class={styles.fieldWrapper}>
          <input
            type="text"
            name="answer"
            required
            placeholder={`Title of track ${number}`}
            class={styles.shrink}
          />
          <input type="hidden" name="clue" value={clue.id} />

          <button
            type="submit"
            disabled={checkAnswer.isRunning}
            class={styles.button}
          >
            Check
          </button>
          {checkAnswer.value?.failed && (
            <aside class={styles.error}>Wrong answer!</aside>
          )}
        </div>
      </Form>
    );

    return (
      <div>
        <h2>Track {number}</h2>
        <div class={styles.content}>
          <audio src={`/clues/${clue.id}.m4a`} ref={audioRef} />
          <PlayButton
            onClick$={() => audioRef.value!.play()}
            spaceRight={true}
          />
          {!!correctAnswer || checkAnswer.value?.success ? (
            <span class={styles.correct}>
              {correctAnswer ?? checkAnswer.value?.answer} &nbsp;✅
            </span>
          ) : (
            form
          )}
        </div>
      </div>
    );
  }
);
