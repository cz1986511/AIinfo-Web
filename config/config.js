export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [{
        path: '/',
        routes: [
            { path: 'artlist',
              component: './artlist' 
            },
        ]
    }],
    proxy: {
        '/api': {
          target: 'http://xiaozhuo.info',
          changeOrigin: true,
        },
    },
};