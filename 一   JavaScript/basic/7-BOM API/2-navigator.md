# navigator 对象
提供了有关浏览器环境和用户设备的详细信息。

这个对象包含了大量属性和方法，用于检测浏览器特## 性、获取设备信息以及执行特定浏览器操作。


## 一、核心属性概览
属性	|描述|	示例值
-|-|-
userAgent|	浏览器用户代理字符串|	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
appName|	浏览器名称|	"Netscape" (历史遗留)
appVersion|	浏览器版本信息|	"5.0 (Windows)"
platform|	操作系统平台|	"Win32", "MacIntel"
language|	浏览器首选语言|	"zh-CN", "en-US"
languages|	用户偏好语言列表|	["zh-CN", "zh", "en"]
cookieEnabled|	是否启用cookie|	true
onLine|	是否联网|	true
hardwareConcurrency|	CPU核心数|	8
deviceMemory|	设备内存(GB)|	8
maxTouchPoints|	最大触控点数|	5 (手机通常为5点触控)
## 二、网络相关属性
属性	|描述|	示例值
-|-|-
connection|	网络连接信息|	{type: "wifi", downlink: 10, rtt: 100}
saveData|	是否开启省流量模式|	true

### connection 对象详解
```
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

if (connection) {
  console.log('网络类型:', connection.type); // "wifi", "cellular", "ethernet"
  console.log('下行速度:', connection.downlink + ' Mb/s');
  console.log('往返延迟:', connection.rtt + ' ms');
}
```
## 三、位置与媒体相关
### 1. geolocation - 地理位置API
```
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log('纬度:', position.coords.latitude);
      console.log('经度:', position.coords.longitude);
    },
    error => {
      console.error('获取位置失败:', error.message);
    }
  );
} else {
  console.log('该浏览器不支持地理位置服务');
}
```
### 2. mediaDevices - 媒体设备API
```
// 获取摄像头和麦克风访问权限
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    videoElement.srcObject = stream;
  })
  .catch(err => {
    console.error('媒体访问错误:', err);
  });

// 枚举所有媒体设备
navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(device => {
      console.log(`${device.kind}: ${device.label} (${device.deviceId})`);
    });
  });
```
## 四、设备能力检测方法
方法	|描述|	使用场景
-|-|-
javaEnabled()|	是否启用Java|	检测Java小程序支持
vibrate()|	设备振动|	移动端交互反馈
getBattery()|	获取电池信息|	移动端电量管理
requestMediaKeySystemAccess()	|DRM支持检测|	加密视频播放

### 设备振动示例
```
// 振动模式：振动200ms -> 暂停100ms -> 振动300ms
if ('vibrate' in navigator) {
  navigator.vibrate([200, 100, 300]);
}

// 停止振动
navigator.vibrate(0);
```
### 电池状态检测
```
navigator.getBattery().then(battery => {
  console.log('电量:', battery.level * 100 + '%');
  console.log('充电状态:', battery.charging ? '充电中' : '未充电');
  
  // 监听电量变化
  battery.addEventListener('levelchange', () => {
    console.log('电量变化:', battery.level * 100 + '%');
  });
});
```

## 五、现代Web API集成
### 1. Web Share API
```
// 分享内容到其他应用
if (navigator.share) {
  navigator.share({
    title: '网页标题',
    text: '分享内容描述',
    url: 'https://example.com'
  })
  .then(() => console.log('分享成功'))
  .catch(error => console.log('分享取消', error));
}
```
### 2. Clipboard API
```
// 复制文本到剪贴板
navigator.clipboard.writeText('要复制的文本')
  .then(() => console.log('复制成功'))
  .catch(err => console.error('复制失败:', err));

// 读取剪贴板文本
navigator.clipboard.readText()
  .then(text => console.log('剪贴板内容:', text))
  .catch(err => console.error('读取失败:', err));
```
### 3. Badging API
```
// 设置应用图标徽章（仅PWA应用）
if ('setAppBadge' in navigator) {
  // 设置徽章数字
  navigator.setAppBadge(5).catch(console.error);
  
  // 清除徽章
  navigator.clearAppBadge().catch(console.error);
}
```
## 六、浏览器检测技巧
### 1. 现代浏览器检测（推荐）
```
// 特性检测优于浏览器嗅探
function isFeatureSupported(feature) {
  return feature in navigator;
}

console.log('支持地理定位:', isFeatureSupported('geolocation'));
console.log('支持Web蓝牙:', isFeatureSupported('bluetooth'));
```
### 2. 传统浏览器检测（不推荐）
```
// 检测Chrome
const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge|Edg/.test(navigator.userAgent);

// 检测Firefox
const isFirefox = /Firefox/.test(navigator.userAgent);

// 检测Safari
const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
```