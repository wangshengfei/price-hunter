const Subscription = require('egg').Subscription;

class UpdateData extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 28 17 * * *',
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    await this.ctx.curl('http://127.0.0.1:7005/save', {
      dataType: 'json',
      // 由于请求时间较长，设置一个 timeout 否则会报错
      timeout: 20000
    });
    console.log('17:28执行了定时任务')
  }
}

module.exports = UpdateData;
