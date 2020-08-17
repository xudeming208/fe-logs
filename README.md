<h1 align="center">
  fe-logs
</h1>
<br>
<p align="center">
  <a href="https://travis-ci.org/xudeming208/fe-logs"><img src="https://travis-ci.org/xudeming208/fe-logs.svg?branch=master" alt="Travis Status"></a>
  <!-- <a href='https://coveralls.io/github/xudeming208/mid-cli'><img src='https://coveralls.io/repos/github/xudeming208/mid-cli/badge.svg' alt='Coverage Status' /></a> -->
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/fe-logs.svg" alt="Nodejs"></a>
  <a href="https://www.npmjs.com/package/fe-logs"><img src="https://img.shields.io/npm/v/fe-logs.svg" alt="Version"></a>
  <a href="https://npmcharts.com/compare/fe-logs?minimal=true"><img src="https://img.shields.io/npm/dm/fe-logs.svg" alt="Downloads"></a>
  <a href="https://github.com/xudeming208/fe-logs/graphs/contributors"><img src="https://img.shields.io/github/contributors/xudeming208/fe-logs.svg" alt="Contributors"></a>
  <a href="https://www.npmjs.com/package/fe-logs"><img src="https://img.shields.io/github/license/xudeming208/fe-logs.svg" alt="License"></a>
</p>

## 介绍
利用nodejs编写的前端本地日志打点系统


## 安装

```javascript
npm i fe-logs -S
```

## 使用

```javascript
const log = require('fe-logs');
log.info('this is a log');
```

>设置日志文件名称

```javascript
log.setName('.myLog.log');

```

>如果需要按日期分类日志，可动态设置日志文件名称，比如：

```javascript
log.setName(new Date().toLocaleString().split(' ')[0] + '.log');

```

## 模式
>不同的模式会利用不同的console方法，详情见以下表格：

模式 | 对象的方法
-|-
空 | 需手动调用log.info()
log | 日志为所有console.log方法输出的内容
info | 日志为所有console.info方法输出的内容
warn | 日志为所有console.warn方法输出的内容
error | 日志为所有console.error方法输出的内容

>比如模式为error时，则除了log.info输出的内容外，代码中的所有console.error信息也都会导出到日志文件。例如：

```javascript
const log = require('fe-logs');
log.setMode('error');
```

>可以同时设置多种模式。例如：

```javascript
const log = require('fe-logs');
log.setMode('log');
log.setMode('info');
log.setMode('warn');
log.setMode('error');
```

>如果没执行log.setMode()方法或者模式为空或者表格之外的mode，则不会自动输出日志，需要在输出日志的地方手动调用log.info。例如：

```javascript
const log = require('fe-logs');
log.info('this is a log');
```

## 帮助

1. 日志文件叫什么名称?
	- 默认叫.myLog.log
	- 可以通过log.setName设置

2. 日志文件在哪？
	- windows:
		1. 打开C盘，然后进入Users(用户)文件夹
		2. 进入登录用户的文件夹，比如xudeming
		3. 找到.myLog.log
	- mac:
		1. 右键点击Finder(访达)，点击“前往文件夹”
		2. 输入框中输入/，点击前往按钮即可打开根目录
		3. 点击用户文件夹，然后点击登录用户的文件夹，比如xudeming
		4. 如果没有显示隐藏文件夹，可以按下快捷键`command + shift + .`显示隐藏文件
		5. 找到.myLog.log
	- linux:
		1. 执行命令`cd ~`
		2. 找到.myLog.log

3. 如果要输出trace，可以在参考如下：

	```javascript
	console.error(JSON.stringify({
		trace: console.trace()
	}));
	```