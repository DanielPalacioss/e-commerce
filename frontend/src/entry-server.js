import { renderToString } from '@vue/server-renderer';
import { createApp } from './main';
export async function render(url) {
    const { app, router } = createApp(true);
    await router.push(url);
    await router.isReady();
    const appHtml = await renderToString(app);
    return appHtml;
}
