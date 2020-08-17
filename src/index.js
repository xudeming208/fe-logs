'use strict'

const fs = require('fs');
const stream = require('stream');
const os = require('os');
const platform = os.platform();
// 日志目录
const homedir = os.homedir() + '/';
// 日志文件名称
const logName = '.myLog.log';


global.console.mylog = global.console.log;
global.console.myinfo = global.console.info;
global.console.mywarn = global.console.warn;
global.console.myerror = global.console.error;


// 获取version
let config = {
	version: 'unknow'
};
try {
	config = require('../../../package.json');
} catch (error) {
	console.error(error.toString());
}

// 将string转换为stream
function string2stream(string) {
	// 创建一个bufferstream
	let bufferStream = new stream.PassThrough();
	//将Buffer写入
	bufferStream.end(Buffer.from(string));
	return bufferStream;
}

// class Log
class Log {
	constructor() {
		this.loggerObj = {};
		this.hasWriteCommonMsg = false;
		// mode
		this.mode = '';
		// 日志目录
		this.dir = homedir + logName;
	}

	// 设置日志名称
	setName(val) {
		this.dir = homedir + val;
	}

	// 设置模式
	setMode(val) {
		this.mode = val;

		// 自定义模式
		switch (this.mode) {
			case 'log':
				global.console.log = (...arg) => {
					// 调用本来的方法
					global.console.mylog.apply(global, arg);
					this.info(arg);
				}
				break;
			case 'info':
				global.console.info = (...arg) => {
					// 调用本来的方法
					global.console.myinfo.apply(global, arg);
					this.info(arg);
				}
				break;
			case 'warn':
				global.console.warn = (...arg) => {
					// 调用本来的方法
					global.console.mywarn.apply(global, arg);
					this.info(arg);
				}
				break;
			case 'error':
				global.console.error = (...arg) => {
					// 调用本来的方法
					global.console.myerror.apply(global, arg);
					this.info(arg);
				}
				break;
			default:
				console.error(`mode必须为log、info、warn、error中的一种`);
		}
	}

	// logger
	logger() {
		return fs.createWriteStream(this.dir, {
			// 'flags: a' means appending (old data will be preserved)
			flags: 'a'
		});
	}

	// 输出通用信息
	writeCommonMsg() {
		let myos = 'null';
		switch (platform) {
			case 'win32':
				myos = 'Windows';
				break;
			case 'darwin':
				myos = 'Mac';
				break;
			case 'linux':
				myos = 'Linux';
				break;
			default:
				myos = 'unknow';
		};
		this.loggerObj.os = myos;
		this.loggerObj.version = config.version;

		this.logger().write('\n通用信息：\n');
		this.logger().write(JSON.stringify(this.loggerObj, null, '\t'));

		this.hasWriteCommonMsg = true;
	}

	// 输出用户自定义的日志信息
	info(msg) {
		// 通用信息只写一遍
		if (!this.hasWriteCommonMsg) {
			// 退出重启项目时，清空原来的log
			fs.createWriteStream(this.dir).write('');
			this.writeCommonMsg();
		}

		let msgArr = [];

		// 自定义消息一直append
		msgArr.push(`\n\n\n\n\n日志详情：\n`);
		// 时间
		msgArr.push(`时间：${new Date().toLocaleString()}\n`);

		// 信息
		// msgArr.push(`msg信息：\n${msg}\n`);
		// msgArr.push(`msg.toString()信息：\n${msg.toString()}\n`);
		try {
			msgArr.push(`信息：\n${JSON.stringify(msg)}\n`);
		} catch (err) {
			msgArr.push(`JSON.stringify(msg)发生错误，详情为：\n${err}\n`);
		}

		// 将日志写入文件
		string2stream(msgArr.join('')).pipe(this.logger());
	}
}

const log = new Log();

module.exports = log;