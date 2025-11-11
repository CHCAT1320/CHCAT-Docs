import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'

const customElements = [
  "math",
  "maction",
  "maligngroup",
  "malignmark",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mi",
  "mlabeledtr",
  "mlongdiv",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mscarries",
  "mscarry",
  "msgroup",
  "msline",
  "mspace",
  "msqrt",
  "msrow",
  "mstack",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "semantics",
  "annotation",
  "annotation-xml"
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "chcat-docs",
  description: "冰猫の御用docs",
  lang: 'zh-CN',
  lastUpdated: true,
  base: '/CHCAT-Docs/',
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    },
  },
  vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Rizline',
        items: [
          { text: 'Rizline谱面格式说明', link: '/knowladges/rizline/rizline.md' },
          { text: 'Rizline-easeType', link: '/knowladges/rizline/easeType.md' },
        ]
      },
      {
        text: 'Objects',
        items: [
          { text: 'ch-rzl', link: '/objects/ch-rzl/ch-rzl.md' },
          { text: 'ch-phi', link: '/objects/ch-obj/ch-phi.md' }
        ]
      }
    ],
    editLink: {
      pattern: 'https://github.com/CHCAT1320/CHCAT-Docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CHCAT1320/CHCAT-Docs' }
    ]
  }
})
