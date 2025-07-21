
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/atomic-todo-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/atomic-todo-app"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1057, hash: '7e9ad07f5cd4e22e3be96c2719a1c530d34d06a81273fb5c7ca0ac4d2ec8af04', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1050, hash: '697323082f13d335cdc806cb07242f16bb3ff354796555480fb2e2b43fe35f61', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 10992, hash: '6bc2e27c83cdfde0e46015b2365fce674b3af837772de806ed0e23925e7f60f1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-FISDTYO3.css': {size: 721, hash: 'FPs4kwzPCzQ', text: () => import('./assets-chunks/styles-FISDTYO3_css.mjs').then(m => m.default)}
  },
};
