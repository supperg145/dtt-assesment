import { createPinia } from "pinia";
import { useHousesStore } from "./houses/housesStore";
import { useFilterStore } from "./filter/filterStore";
import { useNavigationStore } from "./navigation/navigationStore";
import { useFavoritesStore } from "./favorites/favoritesStore";

const pinia = createPinia();

export {
  pinia,
  useHousesStore,
  useFilterStore,
  useNavigationStore,
  useFavoritesStore,
};
