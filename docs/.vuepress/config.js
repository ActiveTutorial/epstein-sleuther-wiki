import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),

  theme: defaultTheme({
    logo: '/wiki-logo-light-theme.svg',
    logoDark: '/wiki-logo-dark-theme.svg',
  }),

  lang: 'en-US',
  title: 'Sleuther Wiki'
})