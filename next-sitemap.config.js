/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://lunastev.org',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    additionalPaths: async (config) => [
        await config.transform(config, '/portfolio'),
        await config.transform(config, '/graph'),
        await config.transform(config, '/license'),
        await config.transform(config, '/sponsor'),
        await config.transform(config, '/tools/base64'),
        await config.transform(config, '/tools/color'),
        await config.transform(config, '/tools/qr'),
        await config.transform(config, '/tools/image'),
        await config.transform(config, '/tools/json'),
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://lunastev.org/sitemap.xml',
        ],
    },
}
