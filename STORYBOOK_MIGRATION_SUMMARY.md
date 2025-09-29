# Storybook 到 VitePress 迁移总结

## 背景

为了简化技术栈并提高开发体验，我们决定将原有的 Storybook 组件演示系统更换为 VitePress。

## 迁移内容

### 1. 删除的文件和依赖

- 删除了 `.storybook` 配置目录
- 删除了所有 `*.stories.ts` 文件
- 移除了 Storybook 相关依赖：
  - `storybook`
  - `@storybook/vue3`
  - `@storybook/vue3-vite`
  - `@storybook/addon-essentials`

### 2. 保留的功能

- 交互式组件演示
- 组件API文档
- 实时预览功能
- 响应式设计展示

### 3. 改进之处

- **技术栈统一**：VitePress 与项目现有的 Vite 技术栈保持一致
- **性能提升**：VitePress 启动更快，热更新更流畅
- **简化配置**：减少了复杂的 Storybook 配置
- **更好的集成**：VitePress 与 Vue 3 完美集成

## 使用方法

### 启动开发服务器

```bash
pnpm docs:dev
```

访问 `http://localhost:5173` 查看组件文档和演示。

### 构建文档站点

```bash
pnpm docs:build
```

## 优势

1. **轻量级**：相比 Storybook，VitePress 更加轻量
2. **快速启动**：基于 Vite 的开发服务器启动速度更快
3. **统一技术栈**：与项目其他部分使用相同的技术栈
4. **易于维护**：配置简单，易于理解和维护
5. **良好的移动端支持**：默认支持响应式设计

## 注意事项

1. 文档中的组件演示需要在 Vue 的 `setup` 语法中正确导入组件
2. 样式隔离需要通过 CSS 作用域或 CSS Modules 来实现
3. 复杂的交互演示可能需要额外的 JavaScript 代码

## 未来计划

1. 进一步完善所有组件的交互式演示
2. 添加更多实际使用场景的示例
3. 优化文档的视觉设计和用户体验
