# 插画师极简作品集模板 / Minimal Illustrator Portfolio

说明（中文 / English）：
- 这是一个极简中性风格的静态网站模板，支持中/英文（双语）界面和作品说明。
- 页面包含：`index.html`（画廊）与 `artwork.html`（作品详情二级页），并通过 `artworks.json` 加载作品数据。
- 鼠标光标已替换为星形元素（JS 实现）；在触屏设备上会自动隐藏。

运行（Run）
1. 推荐使用本地静态服务器（避免 fetch 的本地文件限制）：
   - Python: `python -m http.server`（在该项目目录）
   - VSCode: 使用 Live Server 插件
2. 打开浏览器访问 `http://localhost:8000`（或 VSCode Live Server 给的地址）。

如何替换图片与内容（How to replace）
- 把你的作品图片放到 `images/` 文件夹（名称可自定义，但要更新 `artworks.json` 中的 `image` 字段）。
- 编辑 `artworks.json` 中 10 条作品数据（示例已包含 10 条），字段说明：
  - id: 唯一编号
  - title_cn / title_en: 中文 / English 标题
  - short_cn / short_en: 简短说明（卡片用）
  - desc_cn / desc_en: 详细说明（详情页用）
  - image: 图片相对路径（例如 `images/1.jpg`）

如何增加/减少作品数量
- 修改 `artworks.json` 内的条目数。脚本会自动渲染文件内所有条目。
- index.html 画廊默认按文件顺序渲染为网格；详情页通过 `artwork.html?id=<id>` 打开对应作品。

自定义星形光标（Custom star）
- 位置、颜色、尺寸在 `style.css`（--star-size）与 `script.js`（SVG path 与 fill）中可调整。
- 若想使用系统原生 cursor（而非跟随元素），将 `body{cursor:none;}` 改为 `body{cursor:auto;}` 并移除或隐藏 `#starCursor`。

无障碍（Accessibility）
- 使用了语义化标签（header/main/footer、article）和 aria 标签。触屏设备上会隐藏 JS 星形以避免遮挡。

其它建议
- 若要做更复杂的国际化（例如多语言内容量非常大），可以改用专门的 i18n 库或将文本放到 JSON 中进行管理。
- 可将详情页改为单页面弹窗（modal）或用路由框架变为 SPA，根据需要调整.
