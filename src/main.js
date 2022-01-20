import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import appAxios from "@/utils/appAxios";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import InputMask from "primevue/inputmask";
import Listbox from "primevue/listbox";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";
import Password from "primevue/password";
import Tag from "primevue/tag";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import TabMenu from "primevue/tabmenu";
const app = createApp(App);
app.use(store);
app.use(router);

app.provide("appAxios", appAxios);

app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("InputText", InputText);
app.component("Card", Card);
app.component("InputMask", InputMask);
app.component("Listbox", Listbox);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Toast", Toast);
app.component("Password", Password);
app.component("Tag", Tag);
app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("Dropdown", Dropdown);
app.component("InputNumber", InputNumber);
app.component("TabMenu", TabMenu);

app.mount("#app");
