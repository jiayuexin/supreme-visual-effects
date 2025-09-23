import { createApp } from 'vue'
import Playground from './Playground.vue'
import SupremeVisualEffects from './index'

const app = createApp(Playground)

app.use(SupremeVisualEffects)

app.mount('#app')
