module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["body"] },
    });
    config.module.rules.push({
      test: /\.svgr$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
