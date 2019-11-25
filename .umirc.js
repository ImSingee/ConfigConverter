// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/generator/QuantumultXScriptAddDeviceID',
          component: './generator/QuantumultXScriptAddDeviceID',
        },
        {
          path: '/generator/QuantumultXScriptSubscriptionAddDeviceID',
          component: './generator/QuantumultXScriptSubscriptionAddDeviceID',
        },
        {
          path: '/generator/QuantumultXScriptSubscriptionAddDeviceIDPreset',
          component: './generator/QuantumultXScriptSubscriptionAddDeviceIDPreset',
        },
        {
          path: '/',
          component: '../pages/index',
        },
        {
          path: '/404',
          component: '../pages/404',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'CC',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ]
};
