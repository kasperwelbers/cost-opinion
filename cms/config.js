export default {
  cms_manual_init: true,
  backend: {
    name: "git-gateway",
    branch: "main",
  },

  media_folder: "public/img",
  public_folder: "img",

  collections: [
    {
      name: "pages",
      label: "Pages",
      files: [
        {
          label: "Home",
          name: "home",
          file: "content/pages/home.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Image",
              name: "image",
              widget: "image",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              widget: "string",
            },
          ],
        },
        {
          label: "WGs",
          name: "wgs",
          file: "content/pages/wgs.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Image",
              name: "image",
              widget: "image",
            },
          ],
        },
      ],
    },
    {
      name: "workinggroups",
      label: "Working Groups",
      folder: "content/workinggroups",
      slug: "{{slug}}",
      create: false,
      fields: [{ label: "Title", name: "title", widget: "string" }],
    },
  ],
};
