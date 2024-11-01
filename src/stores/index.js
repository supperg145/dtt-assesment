import { createPinia } from "pinia";
import { useHousesStore } from "./housesStore";
import { useFilterStore } from "./filterStore";
import { useNavigationStore } from "./navigationStore";
import { useFavoritesStore } from "./favoritesStore";

const pinia = createPinia();

export {
  pinia,
  useHousesStore,
  useFilterStore,
  useNavigationStore,
  useFavoritesStore,
};
