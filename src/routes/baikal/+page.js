import { baikalCardsPage } from '$lib/data/baikalCards.js';

export const prerender = true;

export function load() {
  return {
    game: baikalCardsPage
  };
}