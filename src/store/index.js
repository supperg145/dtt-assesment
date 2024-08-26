import { createStore } from "vuex";
import houses from "./houses";
import filter from "./filter/filter";

export default createStore({
  modules: {
    houses,
    filter,
  },
});
