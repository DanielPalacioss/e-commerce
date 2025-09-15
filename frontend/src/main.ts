import './style.css'
import './assets/main.css'

import {createApp as createClientApp, createSSRApp} from 'vue'
import App from './App.vue'
import router from "./routes"

export function createApp(ssr = false) {
    const app = ssr ? createSSRApp(App) : createClientApp(App)

    app.use(router)
    return {app, router}
}

// Montaje si no es SSR
if (typeof window !== 'undefined') {
    const {app, router} = createApp(false)
    router.isReady().then(() => {
        app.mount('#app')
    })
}

