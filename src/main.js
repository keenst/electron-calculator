import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import 'tw-elements'
import VueMousetrapPlugin from 'vue-mousetrap'

let app = createApp(App);

app.use(VueMousetrapPlugin)

app.mount("#app");
