import { defineConfig } from "vitepress";

const githubUrl = "https://github.com/kevinstackio/japan-pr";
const algoliaConfig = {
  appId: "5MDTLT6KV7",
  apiKey: "5d1c2450c55de9919ef9254517c3d823",
  indexName: "japan_kevinstack_dev_5mdtlt6kv7_pages",
} as const;

export default defineConfig({
  title: "JapanPR",
  description: "赴日计划，通过高才解锁永驻。",
  lang: "zh-CN",
  base: "/",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/vitepress-logo-mini.svg" }],
    [
      "meta",
      {
        name: "algolia-site-verification",
        content: "F569E8F1CF800B2C",
      },
    ],
  ],
  themeConfig: {
    logo: "/vitepress-logo-mini.svg",
    nav: [{ text: "日本語", link: "/japanese/gojuon" }],
    sidebar: {
      "/journey/": [
        {
          text: "赴日计划",
          items: [{ text: "序言", link: "/journey/preface" }],
        },
      ],
      "/japanese/": [
        {
          text: "日本語",
          items: [{ text: "五十音", link: "/japanese/gojuon" }],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: githubUrl }],
    search: {
      provider: "algolia",
      options: algoliaConfig,
    },
  },
});
