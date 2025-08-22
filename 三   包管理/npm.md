# npm
npm 是 Node.js 的默认包管理器，也是全球最大的软件注册中心。

## 安装软件包
首先，有两种安装软件包的方法： 本地安装和全局安装。
```bash
安装所有依赖：npm install	
安装包，生产依赖：npm install <package>（可简写为 npm i）
全局安装：npm install -g <package>
开发依赖：npm install <package> --save-dev
精确版本：npm install package@version
卸载包：npm uninstall <package>
```

## 配置文件
**package.json & package-lock.json & node_modules分别是什么**
+ package.json：定义项目元数据和依赖范围的手动维护的配置文件。
+ package-lock.json：由 npm 自动生成的精确依赖锁定文件，确保安装一致性。
+ node_modules：存储所有依赖代码的自动生成目录，无需提交到版本控制。
### package.json
```json
{
  // 项目名称（必须）
  "name": "my-project",
  // 项目版本号（必须）
  "version": "1.0.0",
  //
  "description": "A sample Node.js project",
  "main": "index.js",
  // 自定义命令行脚本
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  //生产环境依赖
  "dependencies": {
    "express": "^4.18.2"
  },
  //开发环境依赖
  "devDependencies": {
    "eslint": "^8.50.0"
  },
  //指定 Node.js/npm 版本要求
  "engines": {
    "node": ">=18.0.0"
  },
  "keywords": ["node", "example"],
  "author": "Your Name",
  "license": "MIT"
}
```

## 版本
npm 严格遵循`语义化版本控制（SemVer，Semantic Versioning）`，其版本号格式为 `主版本号.次版本号.修订号`（MAJOR.MINOR.PATCH），并通过 `package.json` 中的版本标识符（如 ^、~）控制依赖更新行为。

npm 版本控制符：
+ ^1.2.3 → 允许更新 次版本和修订号（1.x.x，默认行为）
+ ~1.2.3 → 仅允许更新 修订号（1.2.x）
+ 1.2.3 → 锁定 精确版本（不自动更新）