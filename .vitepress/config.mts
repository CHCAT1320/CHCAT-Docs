import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { katex } from '@mdit/plugin-katex-slim'

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
export default withMermaid(defineConfig({
  title: "chcat-docs",
  description: "冰猫の御用docs",
  lang: 'zh-CN',
  lastUpdated: true,
  base: '/',
  markdown: {
    config: (md) => {
      md.use(katex)
      md.use(tabsMarkdownPlugin)
    },
  },
  mermaid: {
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
      wrappingWidth: 200,
      nodeSpacing: 40,
      rankSpacing: 50,
      padding: 16
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        'fastdom',
        'fastdom/extensions/fastdom-promised.js'
      ]
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        'vitepress-plugin-nprogress'
      ]
    }
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
      { text: '首页', link: '/' },
      { text: '知识', link: '/knowladge/' },
      { text: '项目', link: '/objects/' },
    ],

    sidebar: [
      {
        text: '知识',
        collapsed: false,
        items: [
          {
            text: 'Rizline',
            collapsed: false,
            items: [
              {
                text: '谱面',
                collapsed: false,
                items: [
                  { text: '谱面格式', link: '/knowladge/rizline/rizline.md' },
                  { text: '缓动类型', link: '/knowladge/rizline/easeType.md' },
                  { text: 'CH-RZL-EDIT', link: '/knowladge/rizline/cre.md' }
                ]
              },
              {
                text: '移动端',
                collapsed: false,
                items: [
                  { text: '资源获取', link: '/knowladge/rizline/mobile/assets.md' },
                  { text: '存档', link: '/knowladge/rizline/mobile/save.md' },
                  { text: '其它 API', link: '/knowladge/rizline/mobile/api.md' }
                ]
              },
              {
                text: 'PC',
                collapsed: false,
                items: [
                  { text: '资源获取', link: '/knowladge/rizline/pc/assets.md' },
                  { text: '存档', link: '/knowladge/rizline/pc/save.md' }
                ]
              }
            ]
          },
          {
            text: 'CHUNITHM',
            collapsed: false,
            items: [
              { text: '谱面格式说明', link: '/knowladge/chunithm/chunithm.md' },
              { text: '时间转换', link: '/knowladge/chunithm/time-conversion.md' }
            ]
          },
          {
            text: 'UMIGURI',
            collapsed: false,
            items: [
              { text: '逆向总览', link: '/knowladge/umiguri/' },
              { text: 'LARC（app.larc）', link: '/knowladge/umiguri/larc.md' },
              { text: 'UARC / UNA', link: '/knowladge/umiguri/uarc.md' },
              { text: '游戏代码可读化', link: '/knowladge/umiguri/code.md' }
            ]
          },
          {
            text: 'Phigros',
            collapsed: false,
            items: [
              { text: '第9章红区（BlockArea）', link: '/knowladge/phigros/' },
              { text: '数据规格', link: '/knowladge/phigros/data.md' },
              { text: '运行时行为', link: '/knowladge/phigros/behavior.md' },
              { text: '渲染表现', link: '/knowladge/phigros/render.md' },
              { text: '材质细节', link: '/knowladge/phigros/materials.md' },
              { text: '代码（C#）', link: '/knowladge/phigros/code/' },
              { text: '着色器（GLSL）', link: '/knowladge/phigros/shaders/' },
              { text: '贴图资源', link: '/knowladge/phigros/tex/' },
              { text: '块数据样本', link: '/knowladge/phigros/blockAreaList.md' },
              { text: '材质参数', link: '/knowladge/phigros/block-params.md' }
            ]
          },
          {
            text: '哔哩哔哩 API',
            collapsed: true,
            items: [
              { text: '概述与调用方式', link: '/knowladge/bilibili/' },
              { text: '视频', link: '/knowladge/bilibili/video.md' },
              { text: '用户', link: '/knowladge/bilibili/user.md' },
              { text: '番剧 / 影视 / 漫画', link: '/knowladge/bilibili/bangumi.md' },
              { text: '直播', link: '/knowladge/bilibili/live.md' },
              { text: '动态与图文', link: '/knowladge/bilibili/dynamic.md' },
              { text: '专栏 / 音频 / 图集', link: '/knowladge/bilibili/article.md' },
              { text: '评论与通用接口', link: '/knowladge/bilibili/comment.md' },
              { text: '搜索 / 排行 / 热门', link: '/knowladge/bilibili/search.md' },
              { text: '收藏夹', link: '/knowladge/bilibili/favorite.md' },
              { text: '登录与凭据', link: '/knowladge/bilibili/account.md' },
              { text: '活动 / 游戏 / 装扮 / 投票', link: '/knowladge/bilibili/activity.md' },
              { text: '投稿与创作中心', link: '/knowladge/bilibili/upload.md' },
              { text: '其它接口', link: '/knowladge/bilibili/misc.md' }
            ]
          }
        ]
      },
      {
        text: '项目',
        collapsed: false,
        items: [
          { text: 'ch-rzl', link: '/objects/ch-rzl/' },
          { text: 'ch-phi', link: '/objects/ch-phi/' }
        ]
      }
    ],
    outline: [2, 3],

    editLink: {
      pattern: 'https://github.com/CHCAT1320/CHCAT-Docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CHCAT1320/CHCAT-Docs' }
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: true, // 显示详细列表视图
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '导航',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        },
        // MiniSearch 高级配置
        miniSearch: {
          options: {
            tokenize: (text) => text.split(/[\s\-]+/),
            processTerm: (term) => term.toLowerCase(),
          },
          searchOptions: {
            fuzzy: 0.2,      // 模糊匹配阈值
            prefix: true,    // 前缀匹配
            boost: { title: 4, text: 2, titles: 1 } // 权重设置
          }
        }
      }
    }
  }
}))

