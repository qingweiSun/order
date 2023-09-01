const fs = require('fs-extra');

// 执行打包操作...

// 移动打包后的目录
fs.move(
  'out',
  '../../server/order-auto/public',
  { overwrite: true },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log('打包后的目录已移动到 server/order-auto/public 目录');
    }
  },
);
