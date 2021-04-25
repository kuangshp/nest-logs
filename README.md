<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## 一、`Nestjs`中日志管理包

* 1、在你的`nestjs`项目中安装依赖包

  ```properties
  npm install nest-logs
  ```

* 2、在`app.module.ts`中导入日志模块包

  ```typescript
  import { NestLogsModule} from 'nest-logs';
  
  @Module({
    imports: [
      NestLogsModule
    ],
    controllers: [],
    providers: [
     
    ],
  })
  export class AppModule { }
  ```

## 二、基本使用

* 1、如果你想拦截每次请求，你可以在控制器上加上`nest-logs`包中提供的装饰器

  ```typescript
  import { NestLogger } from 'nest-logs';
  @NestLogger()
  @Controller()
  export class AppController {}
  ```

  ```properties
  # 运行后的效果，可以将一系列的参数打印出来
  2021-04-25 09:20:30 [INFO] [MacBook-Pro-6.local] app.controller.js: 
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    当前类名: AppController
    当前方法名: hello
    当前请求: POST - /
    IP: ::ffff:127.0.0.1
    当前Params参数: {}
    当前Query参数: {}
    当前请求体: {
    "username": "admin",
    "password": "123456"
  }
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  ```

* 2、在别的地方使用日志打印(**比如在控制器中**)

  > 默认会存储到日志文件中,如果你不想存储仅仅是想在控制台上显示日志,可以加上第二个参数为`false`

  ```typescript
  import { Logger } from 'nest-logs';
  
  ...
  @Get()
  getHello(): string {
    // 会存储到日志文件中和在控制台上打印
    Logger.info("测试代码")
    // 仅仅在控制台打印
    Logger.info("测试代码", false) 
    return this.appService.getHello();
  }
  ...
  ```

  ```properties
  2021-04-25 09:19:45 [INFO] [MacBook-Pro-6.local] [app.controller.js]-[AppController.getHello]: 
  "测试代码"
  ```

  

## 三、生产上线结合`PM2`来使用

* 1、在项目的根目录下创建一个`ecosystem.config.js`

  > 可以直接拷贝我这份过去使用

  ```javascript
  /* eslint-disable @typescript-eslint/camelcase */
  module.exports = {
    apps: [{
      name: 'nest-server', // 项目名字,启动后的名字
      script: './dist/main.js', // 执行的文件
      cwd: './', // 根目录
      args: '', // 传递给脚本的参数
      watch: true, // 开启监听文件变动重启
      ignore_watch: ['node_modules', 'public', 'logs'], // 不用监听的文件
      exec_mode: 'cluster_mode',
      instances: '2', // max表示最大的 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
      autorestart: true, // 默认为 true, 发生异常的情况下自动重启
      max_memory_restart: '1G',
      instance_var: "INSTANCE_ID", // 添加这一行可以实现使用nest-logs包的日志管理
      // error_file: './logs/app-err.log', // 错误日志文件
      // out_file: './logs/app-out.log', // 正常日志文件
      // merge_logs: true, // 设置追加日志而不是新建日志
      // log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
      min_uptime: '60s', // 应用运行少于时间被认为是异常启动
      max_restarts: 30, // 最大异常重启次数
      restart_delay: 60, // 异常重启情况下，延时重启时间
      env: { // 环境参数，当前指定为开发环境
        NODE_ENV: 'development'
      },
      env_production: { // 环境参数,当前指定为生产环境
        NODE_ENV: 'production'
      },
      env_test: { // 环境参数,当前为测试环境
        NODE_ENV: 'test'
      }
    }],
  
    deploy: {
      production: {
        user: 'root',
        host: '39.**.99.86',
        ref: 'origin/master',
        repo: 'git@github.com:repo.git',
        path: '/var/www/nest-test',
        'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
      }
    }
  }
  ```

* 2、`package.json`中配置启动部署脚本

  ```json
  "scripts": {
    ...
    "pm2:prod": "pm2 start ecosystem.config.js --env production",
    "pm2:dev": "pm2 start ecosystem.config.js --env development",
    "pm2:test": "pm2 start ecosystem.config.js --env test"
  },
  ```

  



