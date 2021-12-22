import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router_index";
import store from "./store/store_,index";

import Socketio from '@/plugins/Socket.io';

import PrimeVue from 'primevue/config';
import "primeflex/primeflex.css";

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'; 

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import ToggleButton from 'primevue/togglebutton';
import Dock from 'primevue/dock';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import TabMenu from 'primevue/tabmenu';
import Menubar from 'primevue/menubar';
import InputSwitch from 'primevue/inputswitch';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping

const app = createApp(App); //create app

app.use(PrimeVue,{ripple: true});
app.use(store);
app.use(router);
app.use(ToastService);

app.use(Socketio, {
    connection: process.env.VUE_APP_SOCKET_NET_ADR,
    options: {
        forceNew: true,
    }
});

app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("InputText",InputText);
app.component("Checkbox",Checkbox);
app.component("ToggleButton",ToggleButton);
app.component("Dock",Dock);
app.component("TabMenu",TabMenu);
app.component("Menubar",Menubar);
app.component("InputSwitch",InputSwitch);
app.component('Toast', Toast);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('ColumnGroup',ColumnGroup);


app.mount("#app");
