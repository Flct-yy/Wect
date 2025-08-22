# History 对象

`history` 对象是浏览器对象模型（BOM）的重要组成部分，它提供了与浏览器**会话历史记录**交互的能力，允许开发者在不刷新页面的情况下操作浏览器的导航历史。

## 一、核心属性和方法

### 1. 基本属性
| 属性 | 描述 | 类型 |
|------|------|------|
| **`length`** | 当前会话中的历史记录数量 | `number` |
| **`scrollRestoration`** | 控制页面刷新后的滚动行为 | `auto` 或 `manual` |
| **`state`** | 当前历史记录条目的状态对象 | `any` |

### 2. 导航方法
| 方法 | 描述 | 行为 |
|------|------|------|
| **`back()`** | 后退到上一个页面 | 相当于点击浏览器后退按钮 |
| **`forward()`** | 前进到下一个页面 | 相当于点击浏览器前进按钮 |
| **`go(delta)`** | 相对当前页面前进/后退指定步数 | `go(-1)` = `back()`, `go(1)` = `forward()` |

## 二、HTML5 History API

### 1. `pushState()`
```javascript
history.pushState(state, title[, url])
```
- **功能**：添加新的历史记录条目（不刷新页面）
- **参数**：
  - `state`：与记录关联的状态对象（最大640KB）
  - `title`：浏览器忽略此参数（通常设为空字符串）
  - `url`：新的URL（必须同源，可选）

```javascript
// 添加新历史记录
history.pushState({page: 1}, "", "/page1");
```

### 2. `replaceState()`
```javascript
history.replaceState(state, title[, url])
```
- **功能**：替换当前历史记录条目（不刷新页面）
- **参数**：同 `pushState`

```javascript
// 替换当前历史记录
history.replaceState({page: 2}, "", "/page2");
```

### 3. `popstate` 事件
```javascript
window.addEventListener("popstate", (event) => {
  console.log("导航变化:", event.state);
});
```
- **触发时机**：用户导航历史记录时（前进/后退）
- **event.state**：获取关联的状态对象

## 三、完整 SPA 路由实现示例

```javascript
class Router {
  constructor(routes) {
    this.routes = routes;
    
    // 初始路由处理
    window.addEventListener("DOMContentLoaded", () => this.handleRoute());
    
    // 监听历史变化
    window.addEventListener("popstate", () => this.handleRoute());
    
    // 拦截链接点击
    document.body.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        this.navigate(e.target.href);
      }
    });
  }
  
  handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes["/404"];
    
    // 渲染对应组件
    document.getElementById("app").innerHTML = route.component();
    
    // 更新页面标题
    document.title = route.title;
  }
  
  navigate(path) {
    // 获取路径名（忽略域名部分）
    const routePath = new URL(path).pathname;
    
    if (this.routes[routePath]) {
      // 添加新历史记录
      history.pushState({}, "", path);
      this.handleRoute();
    } else {
      // 处理404
      history.replaceState({}, "", "/404");
      this.handleRoute();
    }
  }
}

// 路由配置
const routes = {
  "/": {
    title: "首页",
    component: () => `<h1>欢迎来到首页</h1>`
  },
  "/about": {
    title: "关于我们",
    component: () => `<h1>关于页面</h1>`
  },
  "/contact": {
    title: "联系我们",
    component: () => `<h1>联系方式</h1>`
  },
  "/404": {
    title: "页面未找到",
    component: () => `<h1>404 - 页面不存在</h1>`
  }
};

// 初始化路由
const router = new Router(routes);
```

## 四、高级应用技巧

### 1. 滚动位置恢复
```javascript
// 保存滚动位置
window.addEventListener("beforeunload", () => {
  history.replaceState(
    {...history.state, scrollY: window.scrollY},
    ""
  );
});

// 恢复滚动位置
window.addEventListener("popstate", (event) => {
  if (event.state?.scrollY) {
    window.scrollTo(0, event.state.scrollY);
  }
});
```

### 2. 数据预加载
```javascript
// 预加载下一页数据
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("mouseenter", () => {
    const path = new URL(link.href).pathname;
    if (routes[path]) {
      fetch(`/api/data/${path}`)
        .then(res => res.json())
        .then(data => {
          // 缓存数据
          sessionStorage.setItem(`preload-${path}`, JSON.stringify(data));
        });
    }
  });
});
```

### 3. 路由切换动画
```javascript
function handleRoute() {
  const app = document.getElementById("app");
  
  // 添加淡出动画
  app.classList.add("fade-out");
  
  setTimeout(() => {
    // 渲染新内容
    app.innerHTML = route.component();
    
    // 加载预取数据
    const preload = sessionStorage.getItem(`preload-${path}`);
    if (preload) initPage(JSON.parse(preload));
    
    // 添加淡入动画
    app.classList.remove("fade-out");
    app.classList.add("fade-in");
    
    setTimeout(() => app.classList.remove("fade-in"), 300);
  }, 300);
}
```

## 五、安全注意事项

### 1. 防止 XSS 攻击
```javascript
// 安全渲染内容
function safeRender(content) {
  const div = document.createElement("div");
  div.textContent = content;
  return div.innerHTML;
}

// 使用示例
history.pushState({}, "", `/profile/${encodeURIComponent(userInput)}`);
```

### 2. 验证 URL 参数
```javascript
function validateRouteParams(params) {
  // 白名单验证
  const validKeys = ["page", "sort", "filter"];
  
  return Object.keys(params).every(key => 
    validKeys.includes(key) && 
    /^[a-zA-Z0-9_-]+$/.test(params[key])
  );
}
```

### 3. 防止历史记录污染
```javascript
// 限制历史记录添加频率
let lastPushTime = 0;

function safePushState(path) {
  if (Date.now() - lastPushTime > 1000) {
    history.pushState({}, "", path);
    lastPushTime = Date.now();
  } else {
    history.replaceState({}, "", path);
  }
}
```

## 六、实际应用场景

### 1. 分页导航
```javascript
function goToPage(page) {
  const url = new URL(window.location);
  url.searchParams.set("page", page);
  
  history.pushState({page}, "", url);
  loadPageData(page);
}
```

### 2. 多步骤表单
```javascript
const formSteps = ["/step1", "/step2", "/step3"];
let currentStep = 0;

function nextStep() {
  if (currentStep < formSteps.length - 1) {
    currentStep++;
    history.pushState({step: currentStep}, "", formSteps[currentStep]);
    renderFormStep(currentStep);
  }
}

window.addEventListener("popstate", (event) => {
  if (event.state?.step !== undefined) {
    currentStep = event.state.step;
    renderFormStep(currentStep);
  }
});
```

### 3. 无限滚动 + 历史记录
```javascript
let currentPage = 1;

window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 500) {
    currentPage++;
    history.replaceState({page: currentPage}, "", `?page=${currentPage}`);
    loadMoreItems(currentPage);
  }
});
```

## 七、兼容性处理

### 1. 旧版浏览器回退方案
```javascript
if (window.history && window.history.pushState) {
  // 使用 History API
} else {
  // 回退到 hash 路由
  window.addEventListener("hashchange", () => {
    const path = window.location.hash.substring(1) || "/";
    handleRoute(path);
  });
}
```

### 2. Hash 路由实现
```javascript
function navigateHash(path) {
  window.location.hash = path;
}

window.addEventListener("hashchange", () => {
  const path = window.location.hash.substring(1) || "/";
  handleRoute(path);
});
```

## 八、性能优化

### 1. 防抖历史记录更新
```javascript
const updateHistory = debounce((path) => {
  history.replaceState({}, "", path);
}, 300);

searchInput.addEventListener("input", () => {
  const url = new URL(window.location);
  url.searchParams.set("q", searchInput.value);
  updateHistory(url.toString());
});
```

### 2. 缓存页面状态
```javascript
const pageCache = new Map();

function loadPage(path) {
  if (pageCache.has(path)) {
    renderPage(pageCache.get(path));
    return;
  }
  
  fetch(`/api${path}`)
    .then(res => res.json())
    .then(data => {
      pageCache.set(path, data);
      renderPage(data);
    });
}
```

## 九、总结与最佳实践

`history` 对象是现代 Web 应用开发的核心：
- **SPA 路由基础**：实现无刷新页面导航
- **状态管理**：通过 `state` 对象保存页面状态
- **用户体验**：保持浏览器的前进/后退功能正常

**最佳实践**：
1. 使用 `pushState` 添加主要导航历史
2. 使用 `replaceState` 更新查询参数等微小变化
3. 始终处理 `popstate` 事件确保导航一致性
4. 在 `state` 中保存必要状态信息
5. 考虑兼容性并提供回退方案
6. 优化滚动位置恢复机制
7. 实现路由过渡动画提升用户体验

掌握 `history` 对象的使用是创建现代单页面应用（SPA）的关键技能，能显著提升用户体验和应用性能。