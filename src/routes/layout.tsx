import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { clues } from "~/data/clues";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <header>
        <h1 class="neonText">Christmas jukebox</h1>
      </header>
      <Slot />
    </>
  );
});

export const onRequest: RequestHandler = async ({
  next,
  sharedMap,
  cookie,
}) => {
  const answers = new Map(Object.entries(cookie.get("answers")?.json() ?? {}));

  sharedMap.set("answers", answers);
  await next();

  const knownAnswers = sharedMap.get("answers");
  cookie.set(
    "answers",
    JSON.stringify(Object.fromEntries(knownAnswers.entries())),
    { path: "/" }
  );
};

export const useClues = routeLoader$(() => {
  return clues;
});

export const useKnownAnswers = routeLoader$<Map<string, string>>(
  ({ sharedMap }) => {
    return sharedMap.get("answers") ?? (new Map() as Map<string, string>);
  }
);
