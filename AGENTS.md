# NIC Robotics 官网 · 修改说明（给 Codex / GPT / Claude）

正式网址：https://www.nic-robotics.de
发布方式：推送到 `main` 后，Cloudflare Pages 约 1 分钟内自动上线。Cloudflare **不运行构建命令**，
所以推送前必须先在本地生成好网页（见下）。

## 1. 网站是怎么生成的

大部分页面由脚本生成，三种语言（德 / 英 / 中）同时输出。**不要直接改生成出来的 .html**，
否则下次重新生成会被覆盖，而且只改了一种语言。

| 要改什么 | 改哪个文件 |
|---|---|
| 产品、参数、分类、应用场景、客户案例等数据 | `assets/js/catalog.js`（文件末尾按版本追加的覆盖块，后面的覆盖前面的） |
| 首页、产品中心、产品详情、应用场景、客户案例、家庭/清洁机器人页的结构和文字 | `build/build.js` |
| 技术服务、报价、退货、联系、关于我们、法律页面 | `build/build-pages.js` |
| 导航、下拉菜单、页脚、全站公共部分、公司信息 | `build/partials.js` |
| 中文翻译（以德语原文为键） | `build/i18n-zh.js` |
| 样式 | `assets/css/style.css`（按编号分段，新内容加在末尾） |
| 交互（菜单、语言切换、筛选、灯箱、视频） | `assets/js/main.js` |
| 询盘清单与在线咨询窗口 | `assets/js/inquiry.js` |

文字写法：`sw('德语', 'English')` 的中文从 `i18n-zh.js` 取；`swx('德语', 'English', '中文')` 直接写三种语言。

## 2. 修改后的步骤

```bash
node build/build.js
node build/build-pages.js
```

需要 Node.js 18 或以上，不需要安装任何依赖。最后一行必须显示
`Done. DE · EN · ZH vollständig.`；如果提示缺少中文翻译，按 `build/missing-zh.json` 补到 `i18n-zh.js`。
然后把**源文件和生成的 .html 一起**提交并推送。

新增或删除页面时，同时更新 `sitemap.xml`。

## 3. 内容规则（必须遵守）

- 网站上**不得出现任何制造商/合作厂商的名称或品牌**，只能写"全球领先厂商""制造合作伙伴"等。仓库是公开的，代码注释里也不要写。
- 不编造客户案例、数字或认证；排名只能按已注明来源的**收入排名**表述，不能写成出货量。
- AI 合成或示意图片、尚未交付的 OTA 功能必须标注。
- **Logo 不得修改**，任何 logo 改动须先经网站负责人同意。
- 价格统一显示"询价"，不写占位价格。不承诺免费演示或"先试后买"。
- 三种语言内容必须一致，任何文字改动都要三语同步。
- 联系邮箱：info@ / sales@ / service@nic-robotics.de；公司：An Yuan GmbH。

## 4. 推送前自检

- 生成脚本无报错、三语完整
- 本地打开 `index.html` 抽查改动页面（手机宽度也看一下）
- 先 `git pull` 再推送，避免覆盖别人的修改
