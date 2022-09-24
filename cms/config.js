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
                { label: "Firstname", name: "firstname", widget: "string" },
                {
                  label: "Workgroups",
                  name: "workgroups",
                  widget: "select",
                  multiple: true
                  options: ["Theory", "Tools", "Data", "Dissemination"],
                },
                { label: "MC", name: "mc", widget: "boolean" },
                { label: "Homepage", name: "homepage", widget: "string" },
                {
                  label: "Role",
                  name: "role",
                  widget: "select",
                  options: [
                    { label: "Action Chair", value: "AC" },
                    { label: "Action Vice Chair", value: "ACV" },
                    { label: "GH Scientific Representative", value: "GHSR" },
                    {
                      label: "GH Vice Scientific Representative",
                      value: "GHSRV",
                    },
                    { label: "Theory Workgroup Leader", value: "WG1L" },
                    { label: "Theory Workgroup Vice 1", value: "WG1V1" },
                    { label: "Theory Workgroup Vice 2", value: "WG1V2" },
                    { label: "Tools Workgroup Leader", value: "WG2L" },
                    { label: "Tools Workgroup Vice 1", value: "WG2V1" },
                    { label: "Tools Workgroup Vice 2", value: "WG2V2" },
                    { label: "Data Workgroup Leader", value: "WG3L" },
                    { label: "Data Workgroup Vice 1", value: "WG3V1" },
                    { label: "Data Workgroup Vice 2", value: "WG3V2" },
                    { label: "Dissemination Workgroup Leader", value: "WG4L" },
                    { label: "Dissemination Workgroup Vice 1", value: "WG4V1" },
                    {
                      label: "Science Communication Coordinator / WG4 Vice 2",
                      value: "SCC/WG4VL2",
                    },
                    { label: "Grant Awarding Coordinator", value: "GAC" },
                  ],
                },
                { label: "Country", name: "country", widget: "string" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
