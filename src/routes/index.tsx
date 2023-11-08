import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h2>Wishing you a Merry Christmas and a Happy 2024!</h2>
      <h2>Love from Euan, Chloe, Eric & Alex</h2>
      <hr />
      <p>This year's Christmas card is a Christmas song recognition game.</p>
      <p>
        You must listen to the snippet of the tune and enter the name of the
        song
      </p>
      <p class="total-centering">
        <Link class="button-link" href="/play">
          Play
        </Link>
      </p>
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
