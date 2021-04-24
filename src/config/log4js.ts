import * as path from 'path';
const baseLogPath = path.resolve(process.cwd(), 'logs'); // 日志要写入哪个目录

const log4jsConfig = {
  // appenders是告诉日志文件输入到哪里去
  appenders: {
    console: {
      type: 'console', // 会打印到控制台
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m'
      }
    },
    access: {
      type: 'dateFile', // 会写入文件，并按照日期分类
      // 日志文件名，会命名为：access.20200320.log
      filename: `${baseLogPath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true, // 是否保留文件后缀
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] [%h] %m'
      }
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: JSON.stringify({
          "date": "%d{yyyy-MM-dd hh:mm:ss}",
          "level": "%p",
          "category": "%c",
          "host": "%h",
          "pid": "%z",
          "data": '%m'
        }, null, 2),
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      // 多久后就删除
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: JSON.stringify({
          "date": "%d{yyyy-MM-dd hh:mm:ss}",
          "level": "%p",
          "category": "%c",
          "host": "%h",
          "pid": "%z",
          "data": '%m'
        }, null, 2),
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      // maxLogSize: 10485760,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  pm2: true, // 使用 pm2 来管理项目时，打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  disableClustering: true,
};

export default log4jsConfig;
