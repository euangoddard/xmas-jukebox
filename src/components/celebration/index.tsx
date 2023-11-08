import { component$, useComputed$, useVisibleTask$ } from "@builder.io/qwik";
import { type Clue } from "~/models/clue";
import { create as createConfetti } from "canvas-confetti";

export interface CelebrationProps {
  knownAnswers: Map<string, string>;
  clues: readonly Clue[];
}

export const Celebration = component$<CelebrationProps>(
  ({ knownAnswers, clues }) => {
    const hasCelebrated = useComputed$(
      () => knownAnswers.size === clues.length
    );
    return (
      <div class="celebration">
        {hasCelebrated.value && (
          <>
            <h2>Congratulations! You got all the songs!</h2>
            <CelebrationConfetti />
          </>
        )}
      </div>
    );
  }
);

const CelebrationConfetti = component$(() => {
  useVisibleTask$(() => {
    buildConfetti(0.5, 1);
  });

  return <></>;
});

function buildConfetti(x: number, y: number): void {
  const confetti = createConfetti(undefined, { resize: true, useWorker: true });
  confetti({
    particleCount: 200,
    spread: 100,
    colors: ["#fff", "#f00", "#0f0"],
    origin: { x, y },
  });
}
