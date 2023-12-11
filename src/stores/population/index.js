import { defineStore } from 'pinia'

import state from "./state";
import action from "./action";

export default defineStore("populationStore", {
    state: () => state,
    actions: action,
});
