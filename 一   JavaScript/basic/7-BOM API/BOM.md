# BOM（Browser Object Model）

BOM（Browser Object Model）是浏览器对象模型的简称，它提供了独立于网页内容而与浏览器窗口进行交互的对象和接口。与 DOM 不同，BOM 没有正式标准，但所有现代浏览器都实现了相似的功能。

## BOM 核心对象概览
对象	|描述	|主要功能
-|-|-
window|	浏览器窗口的全局对象|	所有 BOM 对象的顶级容器
navigator|	浏览器相关信息|	检测浏览器类型、版本等
location|	当前页面的| URL 信息	获取和操作 URL
history|	浏览器的历史记录|	前进、后退、历史记录管理
screen|	用户屏幕信息|	获取屏幕分辨率、颜色深度等
document|	当前页面文档对象（属于 DOM）|	页面内容操作
frames|	窗口中的框架集合（已废弃）|	框架管理

## 完整的 BOM 体系

类别	|对象/API	|用途
-|-|-
核心对象|	window, navigator, location, history, screen, document, frames	|浏览器基础控制
存储|	localStorage, sessionStorage, indexedDB	|数据持久化
网络|	fetch, WebSocket, XMLHttpRequest	|网络通信
多媒体|	MediaDevices (摄像头/麦克风), WebRTC	|媒体处理
性能|	performance, Navigation Timing API	|性能监控
硬件|	Geolocation, DeviceOrientation, Battery API	|设备交互
离线|	Service Worker, Cache API	|离线应用
文件|	Blob, File, FileReader	|文件操作
通信|	BroadcastChannel, postMessage	|跨上下文通信
图形|	Canvas API, WebGL	|图形绘制




