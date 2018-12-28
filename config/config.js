export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [{
        path: '/',
        component: './index.js',
    }],
    proxy: {
        '/api': {
          target: 'http://xiaozhuo.info',
          changeOrigin: true,
        },
    },
};