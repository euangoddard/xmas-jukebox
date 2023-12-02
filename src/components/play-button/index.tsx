import { component$ } from "@builder.io/qwik";
import styles from "./play-button.module.css";

interface PlayButtonProps {
  onClick$?: VoidFunction;
  spaceLeft?: true;
  spaceRight?: true;
}

export const PlayButton = component$<PlayButtonProps>(
  ({ onClick$, spaceLeft, spaceRight }) => {
    return (
      <button
        class={[
          styles.play,
          { [styles.spaceLeft]: spaceLeft, [styles.spaceRight]: spaceRight },
        ]}
        onClick$={() => {
          onClick$ && onClick$();
        }}
        aria-label="Play tune"
      >
        ▶
      </button>
    );
  }
);
