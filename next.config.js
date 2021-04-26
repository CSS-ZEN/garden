
module.exports = {
    future: {
        webpack5: true,
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
}
