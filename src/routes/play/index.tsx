import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  type DocumentHead,
  zod$,
  z,
} from "@builder.io/qwik-city";
import { Jukebox } from "~/components/jukebox/jukebox";
import { clues } from "~/data/clues";
import { checkClueAnswer } from "~/helpers/clue-check";
import { useClues, useKnownAnswers } from "../layout";
import { Instructions } from "~/components/instructions";

export default component$(() => {
  const clues = useClues();
  const knownAnswers = useKnownAnswers();
  return (
    <>
      <Instructions />
      <Jukebox clues={clues.value} knownAnswers={knownAnswers.value} />
    </>
  );
});

export const head: DocumentHead = {
  title: "Merry Christmas and a happy 2024!",
  meta: [
    {
      name: "description",
      content: "A Christmas-song matching game by Euan Goddard",
    },
  ],
};

export const useCheckAnswer = routeAction$(
  async (data, { fail, sharedMap }) => {
    const clue = clues.find(({ id }) => id === data.clue);
    if (!clue) {
      return fail(404, {
        message: `No clue with ID: ${data.clue}`,
      });
    }

    if (!checkClueAnswer(clue, data.answer)) {
      return fail(400, {
        message: "Wrong answer!",
      });
    }
    const knownAnswers: Map<string, string> = sharedMap.get("answers");
    knownAnswers.set(clue.id, clue.answer);

    return {
      success: true,
      answer: clue.answer,
    };
  },
  zod$({
    clue: z.string().nonempty(),
    answer: z.string().nonempty(),
  })
);
