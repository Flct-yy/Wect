# Screen 对象

`screen` 对象是浏览器对象模型（BOM）的重要组成部分，提供了用户**显示屏幕**的详细信息。这些信息对于创建响应式布局、适配不同设备和优化用户体验至关重要。

## 一、screen 对象核心属性

| 属性 | 描述 | 示例值 | 备注 |
|------|------|--------|------|
| **`width`** | 屏幕总宽度（像素） | `1920` | 包括任务栏等系统界面 |
| **`height`** | 屏幕总高度（像素） | `1080` | 包括任务栏等系统界面 |
| **`availWidth`** | 可用宽度（像素） | `1920` | 扣除系统界面后的宽度 |
| **`availHeight`** | 可用高度（像素） | `1040` | 扣除系统界面后的高度 |
| **`colorDepth`** | 颜色深度（位） | `24` | 通常为24位真彩色 |
| **`pixelDepth`** | 像素深度（位） | `24` | 现代浏览器与colorDepth相同 |
| **`orientation`** | 屏幕方向 | `{ angle: 0, type: "landscape-primary" }` | 包含角度和方向类型 |
| **`devicePixelRatio`** | 设备像素比 | `2.0` | 物理像素与CSS像素比（非标准但广泛支持） |

## 二、orientation 对象详解

`screen.orientation` 对象提供屏幕方向信息：

| 属性 | 描述 | 示例值 |
|------|------|--------|
| **`angle`** | 屏幕旋转角度 | `0`, `90`, `180`, `270` |
| **`type`** | 方向类型 | `"landscape-primary"`, `"portrait-secondary"` |

### 方向类型（type）可能的值：
- `"portrait-primary"`: 竖屏（主方向）
- `"portrait-secondary"`: 竖屏（次方向）
- `"landscape-primary"`: 横屏（主方向）
- `"landscape-secondary"`: 横屏（次方向）

### 监听屏幕方向变化：
```javascript
screen.orientation.addEventListener("change", () => {
  console.log(`当前方向: ${screen.orientation.type}, 角度: ${screen.orientation.angle}`);
});
```

## 三、设备像素比（devicePixelRatio）

### 1. 基本概念
```javascript
const dpr = window.devicePixelRatio || 1;
```
- `1`: 标准密度屏幕（如普通PC显示器）
- `1.5-2.5`: 高密度屏幕（如Retina显示屏）
- `3+`: 超高密度屏幕（高端手机）

### 2. 实际应用
```javascript
// 根据像素比加载高清图片
function loadImage(url) {
  const dpr = window.devicePixelRatio;
  let hdUrl = url;
  
  if (dpr >= 2) {
    hdUrl = url.replace('.jpg', '@2x.jpg');
  }
  if (dpr >= 3) {
    hdUrl = url.replace('.jpg', '@3x.jpg');
  }
  
  return hdUrl;
}

// 创建高分辨率canvas
function createHDCanvas(width, height) {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio;
  
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  
  return canvas;
}
```

## 四、实际应用场景

### 1. 响应式布局决策
```javascript
// 根据屏幕尺寸选择布局
function selectLayout() {
  if (screen.availWidth >= 1200) {
    return 'desktop';
  } else if (screen.availWidth >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

// 检查是否移动设备
const isMobile = screen.availWidth < 768 || 
                screen.availHeight < 480;
```

### 2. 全屏应用适配
```javascript
// 进入全屏模式
function enterFullscreen() {
  const element = document.documentElement;
  
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { /* Chrome, Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE/Edge */
    element.msRequestFullscreen();
  }
}

// 退出全屏
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// 全屏状态检测
document.addEventListener('fullscreenchange', () => {
  const isFullscreen = !!document.fullscreenElement;
  console.log(`全屏状态: ${isFullscreen ? '开启' : '关闭'}`);
});
```

### 3. 多显示器检测（实验性API）
```javascript
// 检查是否在多显示器环境下
if (window.screen.isExtended) {
  console.log('检测到多显示器设置');
  
  // 获取所有屏幕信息
  window.screen.getScreens().then(screens => {
    screens.forEach((screen, index) => {
      console.log(`屏幕 ${index + 1}: ${screen.width}x${screen.height}`);
    });
    
    // 将窗口移动到第二个屏幕
    if (screens.length > 1) {
      const secondScreen = screens[1];
      window.moveTo(
        secondScreen.availLeft,
        secondScreen.availTop
      );
    }
  });
}
```

## 五、屏幕方向应用

### 1. 锁定屏幕方向
```javascript
// 锁定为横屏模式
function lockLandscape() {
  screen.orientation.lock('landscape')
    .then(() => console.log('方向已锁定'))
    .catch(error => console.error('方向锁定失败:', error));
}

// 解锁屏幕方向
function unlockOrientation() {
  screen.orientation.unlock();
}
```

### 2. 方向相关布局调整
```javascript
// 根据方向调整布局
function adjustLayout() {
  const orientation = screen.orientation.type;
  
  if (orientation.includes('landscape')) {
    document.body.classList.add('landscape');
    document.body.classList.remove('portrait');
  } else {
    document.body.classList.add('portrait');
    document.body.classList.remove('landscape');
  }
}

// 初始调整
adjustLayout();

// 方向变化时重新调整
screen.orientation.addEventListener('change', adjustLayout);
```

## 六、安全与隐私注意事项

1. **指纹识别风险**：
   ```javascript
   // 避免收集过多识别信息
   const minimalScreenInfo = {
     width: screen.width,
     height: screen.height,
     dpr: window.devicePixelRatio
   };
   ```

2. **权限要求**：
   - 全屏API需要用户交互触发（如点击事件）
   - 屏幕方向锁定需要用户许可

3. **敏感操作确认**：
   ```javascript
   function requestFullscreenWithConfirm() {
     if (confirm('是否进入全屏模式？')) {
       enterFullscreen();
     }
   }
   ```

## 七、兼容性处理

### 1. 旧浏览器方向检测
```javascript
// 兼容旧版方向检测
function getOrientation() {
  if (screen.orientation) {
    return screen.orientation.type;
  }
  
  // 旧版方法
  return window.innerWidth > window.innerHeight 
    ? 'landscape' 
    : 'portrait';
}
```

### 2. 设备像素比兼容
```javascript
const dpr = window.devicePixelRatio || 
            window.screen.deviceXDPI / window.screen.logicalXDPI || 
            1;
```

### 3. 全屏API兼容
```javascript
// 获取全屏元素
function getFullscreenElement() {
  return document.fullscreenElement ||
         document.mozFullScreenElement ||
         document.webkitFullscreenElement ||
         document.msFullscreenElement;
}

// 全屏状态检测
function isFullscreen() {
  return !!getFullscreenElement();
}
```

## 八、最佳实践

### 1. 响应式设计优先
```javascript
// 优先使用CSS媒体查询
@media (min-width: 1200px) { /* 桌面样式 */ }
@media (max-width: 768px) { /* 移动样式 */ }
@media (orientation: landscape) { /* 横屏样式 */ }
```

### 2. 适当使用JavaScript增强
```javascript
// 高DPI设备加载高清资源
if (window.devicePixelRatio > 1) {
  document.querySelectorAll('img.hd').forEach(img => {
    img.src = img.dataset.src2x;
  });
}
```

### 3. 考虑折叠屏设备
```javascript
// 检测折叠屏铰链区域
if ('hinge' in window) {
  const hinge = window.hinge;
  console.log('铰链位置:', hinge.width, hinge.height, hinge.top);
  
  // 避免在铰链区域放置重要内容
  document.documentElement.style.setProperty(
    '--hinge-top', 
    `${hinge.top}px`
  );
}
```

## 九、实际应用案例

### 1. 游戏设备适配
```javascript
function initGame() {
  // 锁定为横屏
  lockLandscape();
  
  // 进入全屏
  enterFullscreen();
  
  // 根据DPI调整渲染
  const canvas = createHDCanvas(800, 600);
  document.body.appendChild(canvas);
  
  // 监听退出全屏
  document.addEventListener('fullscreenchange', () => {
    if (!isFullscreen()) {
      unlockOrientation();
    }
  });
}
```

### 2. 演示文稿应用
```javascript
// 检测投影屏幕
function detectProjector() {
  if (window.screen.isExtended) {
    return window.screen.getScreens().then(screens => {
      return screens.some(screen => 
        screen.width >= 1920 && screen.height >= 1080
      );
    });
  }
  return Promise.resolve(false);
}

// 双屏演示模式
detectProjector().then(hasProjector => {
  if (hasProjector) {
    enablePresenterMode();
  }
});
```

### 3. 艺术画布应用
```javascript
// 最大化画布区域
function setupCanvas() {
  const canvas = document.getElementById('artCanvas');
  const dpr = window.devicePixelRatio;
  
  canvas.width = screen.availWidth * dpr;
  canvas.height = screen.availHeight * dpr;
  
  canvas.style.width = `${screen.availWidth}px`;
  canvas.style.height = `${screen.availHeight}px`;
  
  // 进入全屏
  enterFullscreen();
  
  // 隐藏界面元素
  document.getElementById('controls').style.display = 'none';
}
```

## 总结

`screen` 对象提供了访问用户屏幕的关键能力：
- **尺寸信息**：获取屏幕物理尺寸和可用空间
- **显示特性**：颜色深度、像素密度等
- **方向控制**：检测和锁定屏幕方向
- **多屏支持**：管理多显示器环境（实验性）

**最佳实践建议**：
1. 优先使用CSS媒体查询实现响应式设计
2. 使用JavaScript增强特定设备体验
3. 尊重用户隐私，避免过度收集屏幕信息
4. 提供友好的全屏和方向切换控制
5. 考虑折叠屏等新型设备的特殊需求

掌握 `screen` 对象的使用可以创建出在各种显示设备上都能提供优秀体验的Web应用。