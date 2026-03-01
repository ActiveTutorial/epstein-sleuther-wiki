import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

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
        text: 'Website Structure',
        children: [
          '/website-structure/general.md',
          '/website-structure/akamai.md',
          '/website-structure/concordance.md'
        ]
      }
    ],

    navbar: [
      { text: 'Home', link: '/' },
      {
        text: 'GitHub',
        link: 'https://github.com/ActiveTutorial/epstein-sleuther-wiki',
        icon: 'fab fa-github',
        target: '_blank'
      }
    ]
  }),

  plugins: [
    markdownImagePlugin({
      mark: true
    }),

    markdownChartPlugin({
      mermaid: true
    })
  ],

  lang: 'en-US',
  title: 'Sleuther Wiki'
})