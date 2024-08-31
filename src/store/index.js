import { createStore } from "vuex";
import houses from "./houses";
import filter from "./filter/filter";
import navigation from "./navigation/navigation";
import favorites from "./favorites/favorites";

export default createStore({
  modules: {
    houses,
    filter,
    navigation,
    favorites,
  },
});
