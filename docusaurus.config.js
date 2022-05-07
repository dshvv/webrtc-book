// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// 侧边栏生成-拦截器（下边用）
function reverseSidebarItems(items) {
  const result = items.map((item) => {
    item.label = item.id.replace("章_", "章 ");
    if (item.type === "category") {
      return { ...item, items: reverseSidebarItems(item.items) };
    }
    return item;
  });
  return result;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "WebRTC手册",
  tagline: "web端实时音视频技术",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/webrtc-book/build/", // 主要是为了配合gitPage，否则默认 "/" 即可
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "webrtc-book", // Usually your repo name.

  i18n: {
    // 国际化配置
    defaultLocale: "zh",
    locales: ["zh"],
  },

  presets: [
    // 预设
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/dshvv/webrtc-book",
          async sidebarItemsGenerator({
            // 侧边栏生成-拦截
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return reverseSidebarItems(sidebarItems);
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig: // 顶部导航和底部导航基础配置
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "WebRTC手册",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "第1章_啥是WebRTC",
            position: "left",
            label: "文档",
          },
          {
            href: "https://www.cnblogs.com/dingshaohua",
            label: "博客",
            position: "right",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: "javascript",
      },
    }),
};

module.exports = config;
