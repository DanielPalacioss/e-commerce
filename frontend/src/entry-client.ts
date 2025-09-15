import {createApp} from './main'
import './assets/main.css'

const {app, router} = createApp(false)
router.isReady().then(() => {
    app.mount('#app')
})
