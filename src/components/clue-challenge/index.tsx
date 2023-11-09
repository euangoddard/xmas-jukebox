import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { type Clue } from "~/models/clue";
import { useCheckAnswer } from "~/routes/play";

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
        <div style={{ position: "relative" }}>
          <input
            type="text"
            name="answer"
            required
            placeholder={`Title of track ${number}`}
          />
          <input type="hidden" name="clue" value={clue.id} />

          <button type="submit" disabled={checkAnswer.isRunning}>
            Check
          </button>
          {checkAnswer.value?.failed && (
            <aside
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                color: "red",
                fontFamily: "var(--font-stack-sys)",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Wrong answer!
            </aside>
          )}
        </div>
      </Form>
    );

    return (
      <div>
        <h2>Track {number}</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <audio src={`/clues/${clue.id}.m4a`} ref={audioRef} />
          <button
            style={{
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              display: "inline-flex",
              fontSize: "2rem",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 0 0 6px",
              border: "none",
              boxShadow: "var(--neon-shadow)",
              cursor: "pointer",
              marginRight: "1rem",
            }}
            onClick$={() => audioRef.value!.play()}
            aria-label="Play tune"
          >
            ▶
          </button>
          {!!correctAnswer || checkAnswer.value?.success
            ? correctAnswer ?? checkAnswer.value?.answer
            : form}
        </div>
      </div>
    );
  }
);
