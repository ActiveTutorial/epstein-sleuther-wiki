import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),

  base: '/epstein-sleuther-wiki/',

  theme: defaultTheme({
    logo: '/wiki-logo-light-theme.svg',
    logoDark: '/wiki-logo-dark-theme.svg',

    sidebar: [
      {
        text: 'Introduction',
        children: ['/']
      },
      {
        text: 'Server Structure',
        children: [
          '/server-structure/general.md',
          '/server-structure/akamai.md',
          '/server-structure/concordance.md'
        ]
      }
    ],
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'GitHub', link: 'https://github.com/ActiveTutorial/epstein-sleuther-wiki', icon: 'fab fa-github', target: '_blank' }
    ]
  }),

  lang: 'en-US',
  title: 'Sleuther Wiki'
})