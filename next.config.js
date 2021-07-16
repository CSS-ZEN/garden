const withTM = require('next-transpile-modules')([
    '@csszen/components.markdown',
])


module.exports = withTM({
    future: {
        webpack5: true,
    },
    images: {
        domains: ['csszen-screenshot.s3.us-east-2.amazonaws.com']
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })
        return config
    },
    rewrites: async () => [
        {
            source: '/theme/:id/index.html',
            destination: '/theme/:id/index.html',
        },
        {
            source: '/theme/:id/:filename',
            destination: '/api/theme/:id/:filename',
        },
    ],
    redirects: async () => [
        {
            source: '/theme/:id',
            destination: '/theme/:id/index.html',
            permanent: true,
        },
    ]
})
