# 快速开始

## 安装
```bash
pnpm add supreme-visual-effects
```

## 引入
```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createSupremeEffects } from 'supreme-visual-effects'

createApp(App)
  .use(createSupremeEffects())
  .mount('#app')
```

更多配置请查看下一节 👉 [全局配置](./config.md)