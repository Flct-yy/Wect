# Location 对象


`location` 对象是浏览器对象模型（BOM）的核心部分，提供了与当前文档 URL 相关的信息和操作功能。它允许 JavaScript 访问、解析和操作浏览器的地址栏内容。

## 一、location 对象核心属性

| 属性 | 描述 | 示例值 |
|------|------|--------|
| **`href`** | 完整的 URL 字符串 | `"https://www.example.com:8080/path/page.html?query=value#section"` |
| **`protocol`** | URL 协议（带冒号） | `"https:"` |
| **`host`** | 主机名和端口 | `"www.example.com:8080"` |
| **`hostname`** | 主机名（不含端口） | `"www.example.com"` |
| **`port`** | 端口号 | `"8080"` |
| **`pathname`** | URL 路径部分 | `"/path/page.html"` |
| **`search`** | 查询字符串（带问号） | `"?query=value"` |
| **`hash`** | URL 片段标识符（带井号） | `"#section"` |
| **`origin`** | 协议+主机名+端口（只读） | `"https://www.example.com:8080"` |

## 二、location 对象方法

### 1. 页面导航方法

| 方法 | 描述 | 行为差异 |
|------|------|----------|
| **`assign(url)`** | 加载新文档 | 添加历史记录 |
| **`replace(url)`** | 替换当前文档 | **不添加**历史记录 |
| **`reload(force)`** | 重新加载当前页 | `force=true` 强制从服务器加载 |

```javascript
// 导航到新页面（可返回）
location.assign('https://newpage.com');

// 替换当前页面（不可返回）
location.replace('https://newpage.com');

// 重新加载当前页
location.reload();          // 可能从缓存加载
location.reload(true);      // 强制从服务器加载
```

### 2. URL 解析方法
```javascript
// 解析 URL 字符串
const url = new URL('https://example.com/path?name=John');
console.log(url.searchParams.get('name')); // "John"
```

## 三、URL 操作技巧

### 1. 获取查询参数
```javascript
// 解析当前 URL 的查询参数
const params = new URLSearchParams(location.search);

// 获取单个参数
const name = params.get('name'); // "John"

// 获取所有参数
for (const [key, value] of params) {
  console.log(`${key}: ${value}`);
}

// 检查参数是否存在
if (params.has('page')) {
  console.log('页码存在');
}
```

### 2. 修改 URL 而不重载页面
```javascript
// 修改查询参数
function updateQueryParam(key, value) {
  const params = new URLSearchParams(location.search);
  params.set(key, value);
  
  // 使用 history API 更新 URL 而不重载页面
  history.pushState({}, '', `?${params.toString()}${location.hash}`);
}

// 修改 hash
function scrollToSection(sectionId) {
  location.hash = `#${sectionId}`;
  // 或使用更平滑的方式
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}
```

### 3. 构建完整 URL
```javascript
function buildURL(path, queryParams) {
  const url = new URL(location.origin);
  url.pathname = path;
  
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}

// 使用示例
const newURL = buildURL('/products', { category: 'electronics', page: 2 });
console.log(newURL); // "https://example.com/products?category=electronics&page=2"
```

## 四、实际应用场景

### 1. 单页面应用 (SPA) 路由
```javascript
// 监听 URL 变化
window.addEventListener('popstate', handleRouteChange);

// 处理路由变化
function handleRouteChange() {
  const path = location.pathname;
  
  switch(path) {
    case '/':
      renderHomePage();
      break;
    case '/about':
      renderAboutPage();
      break;
    case '/contact':
      renderContactPage();
      break;
    default:
      renderNotFoundPage();
  }
}

// 导航到新路由
function navigateTo(path) {
  history.pushState({}, '', path);
  handleRouteChange();
}
```

### 2. 页面重定向
```javascript
// 条件重定向
if (!userLoggedIn) {
  // 保存当前页面以便登录后返回
  const returnUrl = encodeURIComponent(location.href);
  location.href = `/login?return=${returnUrl}`;
}

// 延迟重定向
setTimeout(() => {
  location.replace('/thank-you');
}, 5000);
```

### 3. 跨域安全检测
```javascript
// 检查是否同源
function isSameOrigin(url) {
  try {
    return new URL(url).origin === location.origin;
  } catch {
    return false;
  }
}

// 安全打开链接
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    if (!isSameOrigin(link.href)) {
      e.preventDefault();
      window.open(link.href, '_blank', 'noopener,noreferrer');
    }
  });
});
```

## 五、安全注意事项

### 1. 防止开放式重定向漏洞
```javascript
// 不安全的实现
const redirect = new URLSearchParams(location.search).get('redirect');
if (redirect) {
  location.href = redirect; // 可能被恶意利用
}

// 安全的实现
function safeRedirect(url) {
  // 仅允许重定向到同源或可信域名
  const allowedDomains = ['trusted-site.com', 'another-trusted.org'];
  const targetDomain = new URL(url).hostname;
  
  if (allowedDomains.includes(targetDomain) {
    location.href = url;
  } else {
    location.href = '/'; // 默认重定向
  }
}
```

### 2. 正确处理用户输入
```javascript
// 不安全的 URL 构建
const userInput = document.getElementById('search').value;
location.href = `/search?q=${userInput}`; // 可能包含非法字符

// 安全的 URL 构建
const safeInput = encodeURIComponent(userInput);
location.href = `/search?q=${safeInput}`;
```

### 3. 避免历史记录污染
```javascript
// 添加历史记录的正确场景
history.pushState({}, '', '/new-page'); // 用户操作触发的导航

// 避免在微小状态变化时添加历史记录
// 错误做法：每次输入都添加历史记录
searchInput.addEventListener('input', () => {
  history.pushState({}, '', `?search=${searchInput.value}`);
});

// 正确做法：使用 replaceState 或防抖
function updateSearch() {
  history.replaceState({}, '', `?search=${searchInput.value}`);
}

searchInput.addEventListener('input', debounce(updateSearch, 500));
```

## 六、location 对象与 SEO

### 1. 服务端渲染同步
```javascript
// 客户端检查当前 URL
if (location.pathname !== window.__INITIAL_PATH__) {
  // 与服务器渲染结果不匹配时重新同步
  renderCorrectPage();
}
```

### 2. 规范 URL 处理
```javascript
// 确保 URL 规范统一
if (location.pathname.endsWith('/')) {
  // 重定向到非斜杠结尾版本
  location.replace(location.pathname.slice(0, -1) + location.search + location.hash);
}
```

### 3. 处理 404 页面
```javascript
// 客户端 404 处理
if (!routeExists(location.pathname)) {
  // 设置正确的 HTTP 状态码（需要服务端配合）
  document.title = '404 - Page Not Found';
  renderNotFoundPage();
  
  // 通知搜索引擎（如果适用）
  const meta = document.createElement('meta');
  meta.name = 'robots';
  meta.content = 'noindex';
  document.head.appendChild(meta);
}
```

## 七、现代 API 替代方案

### 1. URL 和 URLSearchParams
```javascript
// 创建 URL 对象
const url = new URL('https://example.com/path');
url.searchParams.set('page', 2);

// 获取参数值
const page = url.searchParams.get('page'); // "2"

// 添加多个值
url.searchParams.append('filter', 'new');
url.searchParams.append('filter', 'popular');
```

### 2. History API
```javascript
// 添加历史记录
history.pushState({ page: 1 }, 'Page 1', '/page1');

// 监听历史变化
window.addEventListener('popstate', (event) => {
  console.log('导航到:', event.state?.page);
});

// 替换当前历史记录
history.replaceState({ page: 2 }, 'Page 2', '/page2');
```

## 总结

`location` 对象是 Web 开发中控制浏览器导航的核心：
- **信息获取**：访问 URL 的各个组成部分（协议、主机、路径等）
- **导航控制**：使用 `assign()`、`replace()` 和 `reload()` 控制页面加载
- **URL 操作**：通过 `URLSearchParams` 解析和构建查询字符串
- **现代实践**：结合 History API 实现 SPA 路由

**最佳实践建议**：
1. 优先使用 `replace()` 进行不需要历史记录的导航
2. 使用 `URLSearchParams` 处理查询参数
3. 结合 History API 实现无刷新导航
4. 始终验证和清理用户提供的 URL
5. 考虑 SEO 影响，确保客户端路由与服务器同步

掌握 `location` 对象的使用是创建现代 Web 应用的基础，特别是在单页面应用（SPA）和复杂导航场景中。