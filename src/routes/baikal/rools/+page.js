import { baikalRulesPage } from '$lib/data/baikalRules.js';

export const prerender = true;

export function load() {
  return {
    page: baikalRulesPage
  };
}