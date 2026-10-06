import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import 'katex/dist/katex.min.css'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
import './stylee.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(NolebaseHighlightTargetedHeading)
    })
  },
  enhanceApp(ctx) {
    enhanceAppWithTabs(ctx.app)
    vitepressNprogress(ctx)
  }
} satisfies Theme
