/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 处理 curl 请求超时
  // 执行 http_proxy=http://127.0.0.1:[端口号] npm run de 启动命令
  // 端口号 改成本地代理的端口号
  // 代理
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        // proxy: process.env.http_proxy,
      },
    };
  }

  config.mongoose = {
    clients: {
      db1: {
        url: 'mongodb://develop:developpwd@localhost:27017/blog',
        options: {
          server: {
            poolSize: 40,
          }
        }
      }
    }
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586770407328_8776';

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  config.querykeyWord = {
    keyWord: 'macbook pro 13.3 256G'
  };

  // add your middleware config here
  config.middleware = [
    'robot',
  ];

  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
