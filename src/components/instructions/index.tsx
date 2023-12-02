import { component$ } from "@builder.io/qwik";
import { PlayButton } from "../play-button";

export const Instructions = component$(() => (
  <p>
    Use the <PlayButton spaceLeft={true} spaceRight={true} /> to listen to the
    snippet of the tune, and, once your recognize it enter its name and press{" "}
    <strong
      style={{
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textDecorationThickness: "3px",
      }}
    >
      Check
    </strong>
    .
  </p>
));
