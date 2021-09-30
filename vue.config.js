module.exports = {
    devServer: {
        // host: 'localhost',//target host
        // port: 8082,
        proxy: {
            '/base': {
                target: 'https://msearch.bytebase.cn',
                changeOrigin: true,
                ws: true,
                autoRewrite: true,
                cookieDomainRewrite: true,
                pathRewrite: {
                    '^/base':''
                }
            }
        }
    }
}





