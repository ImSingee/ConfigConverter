# ConfigConverter
将各种代理软件的配置文件进行转换

- `/api/SurgeProfile2SurgeList` 将 Surge 配置文件转换为 List
- `/api/QuantumultXScriptAddDeviceID` 将 QX 脚本中添加设备 ID
- `/api/QuantumultXScriptSubscriptionAddDeviceID` 将 QX rewrite 订阅中 script-response-body 类型的 url 修改为相应的 `/api/QuantumultXScriptAddDeviceID` 转换后的 url