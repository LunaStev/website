/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://lunastev.org',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
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
