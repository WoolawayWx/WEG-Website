import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from "vue-gtag";
import { createHead } from '@unhead/vue'
import './index.css'
import 'primeicons/primeicons.css'


// main

const head = createHead()

createApp(App).use(router).use(VueGtag, {
    pageTrackerScreenviewEnabled: true,
    config: { id: "G-J5FGJKHVEZ" }, router
}).use(head).mount('#app')


