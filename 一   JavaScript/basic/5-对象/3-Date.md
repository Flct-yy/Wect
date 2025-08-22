# Date 对象

JavaScript 的 Date 对象是处理日期和时间的基础工具，提供了创### 建、操作和格式化日期时间的功能。

## 创建日期对象

Date 对象可以用以下方式创建：

- `new Date()`：创建当前日期和时间的 Date 对象。
- `new Date(year, month, day, hours, minutes, seconds, milliseconds)`：创建指定日期和时间的 Date 对象。
- `new Date(milliseconds)`：创建指定时间戳的 Date 对象。
- `Date.parse(dateString)`：解析日期字符串并返回对应的 Date 对象。

## 日期对象方法

### 一、时间获取方法
方法	|描述|	返回值范围|	示例
---|---|---|----
getFullYear()|	四位年份|	1000-9999	|2023
getMonth()|	月份|	0-11 (0=一月)	|6 (七月)
getDate()|	月中的日|	1-31	|15
getDay()|	星期几|	0-6 (0=周日)|	6 (周六)
getHours()|	小时|	0-23	|12
getMinutes()|	分钟|	0-59	|30
getSeconds()|	秒|	0-59	|0
getMilliseconds()|	毫秒|	0-999	|0
getTime()|	时间戳（毫秒）|	自1970-01-01	|1672531200000
getTimezoneOffset()|	时区偏移（分钟）|	UTC与本地时差	|-480 (UTC+8)
### 二、时间设置方法
方法	|描述|	参数范围	|示例
---|---|---|----
setFullYear(year)	|设置年份|	四位数字	|date.setFullYear(2024)
setMonth(month)	|设置月份|	0-11|	date.setMonth(11) (十二月)
setDate(day)	|设置月中日期|	1-31	date.setDate(25)
setHours(hours)	|设置小时|	0-23|	date.setHours(23)
setMinutes(minutes)	|设置分钟|	0-59|	date.setMinutes(45)
setSeconds(seconds)	|设置秒|	0-59|	date.setSeconds(30)
setMilliseconds(ms)	|设置毫秒|	0-999|	date.setMilliseconds(500)
setTime(timestamp)	|设置时间戳|	毫秒值|	date.setTime(1672617600000)
### 三、UTC 时间方法
方法	|描述|	示例
---|---|---
getUTCFullYear()|	UTC 年份|	2023
getUTCMonth()|	UTC 月份|	6
getUTCDate()|	UTC 日期|	15
getUTCDay()|	UTC 星期|	6
getUTCHours()|	UTC 小时|	4 (当本地12点时)
getUTCMinutes()|	UTC 分钟|	30
getUTCSeconds()|	UTC 秒|	0
getUTCMilliseconds()|	UTC 毫秒|	0
setUTCFullYear(year)|	设置 UTC 年份|	date.setUTCFullYear(2024)
setUTCMonth(month)|	设置 UTC 月份|	date.setUTCMonth(11)
setUTCDate(day)|	设置 UTC 日期|	date.setUTCDate(25)
setUTCHours(hours)|	设置 UTC 小时|	date.setUTCHours(23)
setUTCMinutes(min)|	设置 UTC 分钟|	date.setUTCMinutes(45)
setUTCSeconds(sec)|	设置 UTC 秒|	date.setUTCSeconds(30)
setUTCMilliseconds(ms)|	设置 UTC 毫秒|	date.setUTCMilliseconds(500)
### 四、日期格式化方法
方法	|描述|	示例输出
---|---|---
toString()	|完整日期时间字符串|	"Sat Jul 15 2023 12:30:00 GMT+0800 (China Standard Time)"
toDateString()	|日期部分字符串|	"Sat Jul 15 2023"
toTimeString()	|时间部分字符串|	"12:30:00 GMT+0800 (China Standard Time)"
toISOString()	|ISO  8601 格式|	"2023-07-15T04:30:00.000Z"
toUTCString()	|UTC  格式字符串|	"Sat, 15 Jul 2023 04:30:00 GMT"
toLocaleString()	|本地化日期时间|	"2023/7/15 12:30:00" (中文环境)
toLocaleDateString()	|本地化日期|	"2023/7/15"
toLocaleTimeString()	|本地化时间|	"12:30:00"
toJSON()	|JSON 序列化格式|	"2023-07-15T04:30:00.000Z"
### 五、静态方法
方法	|描述|	示例
---|---|---
Date.now()	|当前时间戳（毫秒）|	1689400000000
Date.parse(dateString)	|解析日期字符串返回时间戳|	Date.parse('2023-07-15') // 1689350400000
Date.UTC(year, month, ...)	|返回 UTC 时间戳|	Date.UTC(2023, 6, 15) // 1689379200000



