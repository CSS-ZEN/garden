module.exports = {
    images: {
        domains: ['csszen-screenshot.s3.us-east-2.amazonaws.com']
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
