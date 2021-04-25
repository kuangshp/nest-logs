import * as Log4js from 'log4js';
import config from '../config/log4js';
import * as Path from 'path';
import * as StackTrace from 'stacktrace-js';

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

// 注入配置
Log4js.configure(config);
// 实例化
const logger = Log4js.getLogger();
// 日志级别
logger.level = LoggerLevel.TRACE;

export class Logger {

  static trace(args: string | object | number | boolean | unknown, isPersistent = true): void {
    Logger.printLog('trace', args, isPersistent);
  }

  static debug(args: string | object | number | boolean | unknown, isPersistent = true): void {
    Logger.printLog('debug', args, isPersistent);
  }

  static info(args: string | object | number | boolean | unknown, isPersistent = true): void {
    Logger.printLog('info', args, isPersistent);
  }

  static warn(args: string | object | number | boolean | unknown, isPersistent = true):void {
    Logger.printLog('warn', args, isPersistent);
  }

  static error(args: string | object | number | boolean | unknown, isPersistent = true): void {
    Logger.printLog('error', args, isPersistent);
  }

  static fatal(args: string | object | number | boolean | unknown, isPersistent = true): void {
    Logger.printLog('fatal', args, isPersistent);
  }

  // 写入文件中
  static access(fileName: string, args: string | object | number | boolean | unknown) {
    Logger.loggerCustom.info(fileName, args);
  }

  private static printLog(type: string, args: string | object | number | boolean | unknown, isPersistent = true):void {
    const fileInfo = Logger.getStackTrace();
    if (isPersistent) {
      Logger.loggerCustom[type](fileInfo, `\n${JSON.stringify(args, null, 2)}\n`);
    }
    logger[type](fileInfo, `\n${JSON.stringify(args, null, 2)}\n`);
  }

  private static getStackTrace = (deep: number = 3): string => {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];
    // const lineNumber: number = stackInfo.lineNumber;
    // const columnNumber: number = stackInfo.columnNumber;
    const functionName: string = stackInfo.functionName;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    // console.log(stackList, lineNumber, columnNumber, functionName, '===');
    return `[${basename}]-[${functionName}]:`;
  }

  private static get loggerCustom(): Log4js.Logger {
    return Log4js.getLogger('http');
  }
}
