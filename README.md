# ConfigConverter

[![Netlify Status](https://api.netlify.com/api/v1/badges/549d28b7-12f7-404b-8c77-01381f573b62/deploy-status)](https://app.netlify.com/sites/qx/deploys)

状态：Success(blue)/Building(yellow)/Failed(red)
将各种代理软件的配置文件进行转换

## API Endpoint

演示地址为 `https://qx.netlify.com/` 后接以下入口

- `/api/SurgeProfile2SurgeList` 将 Surge 配置文件转换为 List
- `/api/QuantumultXScriptAddDeviceID` [将 QX 脚本中添加设备 ID](https://t.me/singee_daily/10)
- `/api/QuantumultXScriptSubscriptionAddDeviceID` [自动为 QX 脚本订阅添加设备 ID 行](https://t.me/singee_daily/7)

## 自部署

上述网址仅供演示使用，随时可能停止。自行使用请点击下面按钮部署至 netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wangfei021325/ConfigConverter)
