export default {
  cms_manual_init: true,
  backend: {
    //name: "git-gateway",
    name: "github",
    repo: "kasperwelbers/cost-opinion",
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
            {
              label: "Body",
              name: "body",
              widget: "markdown",
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
            {
              label: "Workgroups",
              name: "workgroups",
              widget: "list",
              allow_add: false,
              fields: [
                { label: "Title", name: "title", widget: "string" },
                { label: "Body", name: "body", widget: "markdown" },
              ],
            },
          ],
        },
        {
          label: "People",
          name: "people",
          file: "content/pages/people.md",
          fields: [
            { label: "Title", name: "title", widget: "string" },
            { label: "Image", name: "image", widget: "image" },
            { label: "Body", name: "body", widget: "markdown" },
            {
              label: "People",
              name: "people",
              widget: "list",
              fields: [
                { label: "Name", name: "name", widget: "string" },
                { label: "Location", name: "location", widget: "map" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
