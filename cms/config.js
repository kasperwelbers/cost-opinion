export default {
  cms_manual_init: true,
  backend: {
    name: "git-gateway",
    //name: "github",
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
          label: "Policies",
          name: "policies",
          file: "content/pages/policies.md",
          fields: [
            {
              label: "Body",
              name: "body",
              widget: "markdown",
            },
          ],
        },
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
              label: "Subtitle",
              name: "subtitle",
              widget: "string",
            },
            {
              label: "Who",
              name: "who",
              widget: "markdown",
            },

            {
              label: "What",
              name: "what",
              widget: "markdown",
            },

            {
              label: "Body",
              name: "body",
              widget: "markdown",
            },
          ],
        },
        {
          label: "About",
          name: "about",
          file: "content/pages/about.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "Aim & Objectives",
              name: "aim_objectives",
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
              label: "Short description",
              name: "shortDescription",
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
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
            {
              label: "People",
              name: "people",
              widget: "list",
              fields: [
                { label: "Name", name: "name", widget: "string" },
                {
                  label: "Homepage",
                  name: "homepage",
                  required: false,
                  widget: "string",
                  default: null,
                },
                {
                  label: "WG Theory",
                  name: "wg_theory",
                  widget: "boolean",
                  default: false,
                },
                {
                  label: "WG Tools",
                  name: "wg_tools",
                  widget: "boolean",
                  default: false,
                },
                {
                  label: "WG Data",
                  name: "wg_data",
                  widget: "boolean",
                  default: false,
                },
                {
                  label: "WG Dissemination",
                  name: "wg_dissemination",
                  widget: "boolean",
                  default: false,
                },
                { label: "MC", name: "mc", widget: "boolean", required: false },
                {
                  label: "Email",
                  name: "email",
                  required: false,
                  widget: "string",
                },
                {
                  label: "Role",
                  name: "role",
                  required: false,
                  widget: "select",
                  options: [
                    { label: "Action Chair", value: "AC" },
                    { label: "Action Vice Chair", value: "ACV" },
                    { label: "GH Scientific Representative", value: "GHSR" },
                    {
                      label: "GH Vice Scientific Representative",
                      value: "GHSRV",
                    },
                    { label: "GH Manager", value: "GHM" },
                    {
                      label: "GH Financial & Legal Representative",
                      value: "GHFL",
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
                      value: "WG4V2",
                    },
                    { label: "Grant Awarding Coordinator", value: "GAC" },
                    { label: "Vice Grant Awarding Coordinator", value: "GACV" },
                  ],
                },
                {
                  label: "Country",
                  name: "country",
                  widget: "select",
                  options: [
                    { label: "Ascension Island", value: "AC" },
                    { label: "Andorra", value: "AD" },
                    { label: "United Arab Emirates", value: "AE" },
                    { label: "Afghanistan", value: "AF" },
                    { label: "Antigua & Barbuda", value: "AG" },
                    { label: "Anguilla", value: "AI" },
                    { label: "Albania", value: "AL" },
                    { label: "Armenia", value: "AM" },
                    { label: "Angola", value: "AO" },
                    { label: "Antarctica", value: "AQ" },
                    { label: "Argentina", value: "AR" },
                    { label: "American Samoa", value: "AS" },
                    { label: "Austria", value: "AT" },
                    { label: "Australia", value: "AU" },
                    { label: "Aruba", value: "AW" },
                    { label: "Åland Islands", value: "AX" },
                    { label: "Azerbaijan", value: "AZ" },
                    { label: "Bosnia & Herzegovina", value: "BA" },
                    { label: "Barbados", value: "BB" },
                    { label: "Bangladesh", value: "BD" },
                    { label: "Belgium", value: "BE" },
                    { label: "Burkina Faso", value: "BF" },
                    { label: "Bulgaria", value: "BG" },
                    { label: "Bahrain", value: "BH" },
                    { label: "Burundi", value: "BI" },
                    { label: "Benin", value: "BJ" },
                    { label: "St. Barthélemy", value: "BL" },
                    { label: "Bermuda", value: "BM" },
                    { label: "Brunei", value: "BN" },
                    { label: "Bolivia", value: "BO" },
                    { label: "Caribbean Netherlands", value: "BQ" },
                    { label: "Brazil", value: "BR" },
                    { label: "Bahamas", value: "BS" },
                    { label: "Bhutan", value: "BT" },
                    { label: "Bouvet Island", value: "BV" },
                    { label: "Botswana", value: "BW" },
                    { label: "Belarus", value: "BY" },
                    { label: "Belize", value: "BZ" },
                    { label: "Canada", value: "CA" },
                    { label: "Cocos (Keeling) Islands", value: "CC" },
                    { label: "Congo - Kinshasa", value: "CD" },
                    { label: "Central African Republic", value: "CF" },
                    { label: "Congo - Brazzaville", value: "CG" },
                    { label: "Switzerland", value: "CH" },
                    { label: "Côte d’Ivoire", value: "CI" },
                    { label: "Cook Islands", value: "CK" },
                    { label: "Chile", value: "CL" },
                    { label: "Cameroon", value: "CM" },
                    { label: "China", value: "CN" },
                    { label: "Colombia", value: "CO" },
                    { label: "Clipperton Island", value: "CP" },
                    { label: "Costa Rica", value: "CR" },
                    { label: "Cuba", value: "CU" },
                    { label: "Cape Verde", value: "CV" },
                    { label: "Curaçao", value: "CW" },
                    { label: "Christmas Island", value: "CX" },
                    { label: "Cyprus", value: "CY" },
                    { label: "Czechia", value: "CZ" },
                    { label: "Germany", value: "DE" },
                    { label: "Diego Garcia", value: "DG" },
                    { label: "Djibouti", value: "DJ" },
                    { label: "Denmark", value: "DK" },
                    { label: "Dominica", value: "DM" },
                    { label: "Dominican Republic", value: "DO" },
                    { label: "Algeria", value: "DZ" },
                    { label: "Ceuta & Melilla", value: "EA" },
                    { label: "Ecuador", value: "EC" },
                    { label: "Estonia", value: "EE" },
                    { label: "Egypt", value: "EG" },
                    { label: "Western Sahara", value: "EH" },
                    { label: "Eritrea", value: "ER" },
                    { label: "Spain", value: "ES" },
                    { label: "Ethiopia", value: "ET" },
                    { label: "European Union", value: "EU" },
                    { label: "Finland", value: "FI" },
                    { label: "Fiji", value: "FJ" },
                    { label: "Falkland Islands", value: "FK" },
                    { label: "Micronesia", value: "FM" },
                    { label: "Faroe Islands", value: "FO" },
                    { label: "France", value: "FR" },
                    { label: "Gabon", value: "GA" },
                    { label: "United Kingdom", value: "GB" },
                    { label: "Grenada", value: "GD" },
                    { label: "Georgia", value: "GE" },
                    { label: "French Guiana", value: "GF" },
                    { label: "Guernsey", value: "GG" },
                    { label: "Ghana", value: "GH" },
                    { label: "Gibraltar", value: "GI" },
                    { label: "Greenland", value: "GL" },
                    { label: "Gambia", value: "GM" },
                    { label: "Guinea", value: "GN" },
                    { label: "Guadeloupe", value: "GP" },
                    { label: "Equatorial Guinea", value: "GQ" },
                    { label: "Greece", value: "GR" },
                    {
                      label: "South Georgia & South Sandwich Islands",
                      value: "GS",
                    },
                    { label: "Guatemala", value: "GT" },
                    { label: "Guam", value: "GU" },
                    { label: "Guinea-Bissau", value: "GW" },
                    { label: "Guyana", value: "GY" },
                    { label: "Hong Kong SAR China", value: "HK" },
                    { label: "Heard & McDonald Islands", value: "HM" },
                    { label: "Honduras", value: "HN" },
                    { label: "Croatia", value: "HR" },
                    { label: "Haiti", value: "HT" },
                    { label: "Hungary", value: "HU" },
                    { label: "Canary Islands", value: "IC" },
                    { label: "Indonesia", value: "ID" },
                    { label: "Ireland", value: "IE" },
                    { label: "Israel", value: "IL" },
                    { label: "Isle of Man", value: "IM" },
                    { label: "India", value: "IN" },
                    { label: "British Indian Ocean Territory", value: "IO" },
                    { label: "Iraq", value: "IQ" },
                    { label: "Iran", value: "IR" },
                    { label: "Iceland", value: "IS" },
                    { label: "Italy", value: "IT" },
                    { label: "Jersey", value: "JE" },
                    { label: "Jamaica", value: "JM" },
                    { label: "Jordan", value: "JO" },
                    { label: "Japan", value: "JP" },
                    { label: "Kenya", value: "KE" },
                    { label: "Kyrgyzstan", value: "KG" },
                    { label: "Cambodia", value: "KH" },
                    { label: "Kiribati", value: "KI" },
                    { label: "Comoros", value: "KM" },
                    { label: "St. Kitts & Nevis", value: "KN" },
                    { label: "North Korea", value: "KP" },
                    { label: "South Korea", value: "KR" },
                    { label: "Kuwait", value: "KW" },
                    { label: "Cayman Islands", value: "KY" },
                    { label: "Kazakhstan", value: "KZ" },
                    { label: "Laos", value: "LA" },
                    { label: "Lebanon", value: "LB" },
                    { label: "St. Lucia", value: "LC" },
                    { label: "Liechtenstein", value: "LI" },
                    { label: "Sri Lanka", value: "LK" },
                    { label: "Liberia", value: "LR" },
                    { label: "Lesotho", value: "LS" },
                    { label: "Lithuania", value: "LT" },
                    { label: "Luxembourg", value: "LU" },
                    { label: "Latvia", value: "LV" },
                    { label: "Libya", value: "LY" },
                    { label: "Morocco", value: "MA" },
                    { label: "Monaco", value: "MC" },
                    { label: "Moldova", value: "MD" },
                    { label: "Montenegro", value: "ME" },
                    { label: "St. Martin", value: "MF" },
                    { label: "Madagascar", value: "MG" },
                    { label: "Marshall Islands", value: "MH" },
                    { label: "North Macedonia", value: "MK" },
                    { label: "Mali", value: "ML" },
                    { label: "Myanmar (Burma)", value: "MM" },
                    { label: "Mongolia", value: "MN" },
                    { label: "Macao SAR China", value: "MO" },
                    { label: "Northern Mariana Islands", value: "MP" },
                    { label: "Martinique", value: "MQ" },
                    { label: "Mauritania", value: "MR" },
                    { label: "Montserrat", value: "MS" },
                    { label: "Malta", value: "MT" },
                    { label: "Mauritius", value: "MU" },
                    { label: "Maldives", value: "MV" },
                    { label: "Malawi", value: "MW" },
                    { label: "Mexico", value: "MX" },
                    { label: "Malaysia", value: "MY" },
                    { label: "Mozambique", value: "MZ" },
                    { label: "Namibia", value: "NA" },
                    { label: "New Caledonia", value: "NC" },
                    { label: "Niger", value: "NE" },
                    { label: "Norfolk Island", value: "NF" },
                    { label: "Nigeria", value: "NG" },
                    { label: "Nicaragua", value: "NI" },
                    { label: "Netherlands", value: "NL" },
                    { label: "Norway", value: "NO" },
                    { label: "Nepal", value: "NP" },
                    { label: "Nauru", value: "NR" },
                    { label: "Niue", value: "NU" },
                    { label: "New Zealand", value: "NZ" },
                    { label: "Oman", value: "OM" },
                    { label: "Panama", value: "PA" },
                    { label: "Peru", value: "PE" },
                    { label: "French Polynesia", value: "PF" },
                    { label: "Papua New Guinea", value: "PG" },
                    { label: "Philippines", value: "PH" },
                    { label: "Pakistan", value: "PK" },
                    { label: "Poland", value: "PL" },
                    { label: "St. Pierre & Miquelon", value: "PM" },
                    { label: "Pitcairn Islands", value: "PN" },
                    { label: "Puerto Rico", value: "PR" },
                    { label: "Palestinian Territories", value: "PS" },
                    { label: "Portugal", value: "PT" },
                    { label: "Palau", value: "PW" },
                    { label: "Paraguay", value: "PY" },
                    { label: "Qatar", value: "QA" },
                    { label: "Réunion", value: "RE" },
                    { label: "Romania", value: "RO" },
                    { label: "Serbia", value: "RS" },
                    { label: "Russia", value: "RU" },
                    { label: "Rwanda", value: "RW" },
                    { label: "Saudi Arabia", value: "SA" },
                    { label: "Solomon Islands", value: "SB" },
                    { label: "Seychelles", value: "SC" },
                    { label: "Sudan", value: "SD" },
                    { label: "Sweden", value: "SE" },
                    { label: "Singapore", value: "SG" },
                    { label: "St. Helena", value: "SH" },
                    { label: "Slovenia", value: "SI" },
                    { label: "Svalbard & Jan Mayen", value: "SJ" },
                    { label: "Slovakia", value: "SK" },
                    { label: "Sierra Leone", value: "SL" },
                    { label: "San Marino", value: "SM" },
                    { label: "Senegal", value: "SN" },
                    { label: "Somalia", value: "SO" },
                    { label: "Suriname", value: "SR" },
                    { label: "South Sudan", value: "SS" },
                    { label: "São Tomé & Príncipe", value: "ST" },
                    { label: "El Salvador", value: "SV" },
                    { label: "Sint Maarten", value: "SX" },
                    { label: "Syria", value: "SY" },
                    { label: "Eswatini", value: "SZ" },
                    { label: "Tristan da Cunha", value: "TA" },
                    { label: "Turks & Caicos Islands", value: "TC" },
                    { label: "Chad", value: "TD" },
                    { label: "French Southern Territories", value: "TF" },
                    { label: "Togo", value: "TG" },
                    { label: "Thailand", value: "TH" },
                    { label: "Tajikistan", value: "TJ" },
                    { label: "Tokelau", value: "TK" },
                    { label: "Timor-Leste", value: "TL" },
                    { label: "Turkmenistan", value: "TM" },
                    { label: "Tunisia", value: "TN" },
                    { label: "Tonga", value: "TO" },
                    { label: "Turkey", value: "TR" },
                    { label: "Trinidad & Tobago", value: "TT" },
                    { label: "Tuvalu", value: "TV" },
                    { label: "Taiwan", value: "TW" },
                    { label: "Tanzania", value: "TZ" },
                    { label: "Ukraine", value: "UA" },
                    { label: "Uganda", value: "UG" },
                    { label: "U.S. Outlying Islands", value: "UM" },
                    { label: "United Nations", value: "UN" },
                    { label: "United States", value: "US" },
                    { label: "Uruguay", value: "UY" },
                    { label: "Uzbekistan", value: "UZ" },
                    { label: "Vatican City", value: "VA" },
                    { label: "St. Vincent & Grenadines", value: "VC" },
                    { label: "Venezuela", value: "VE" },
                    { label: "British Virgin Islands", value: "VG" },
                    { label: "U.S. Virgin Islands", value: "VI" },
                    { label: "Vietnam", value: "VN" },
                    { label: "Vanuatu", value: "VU" },
                    { label: "Wallis & Futuna", value: "WF" },
                    { label: "Samoa", value: "WS" },
                    { label: "Kosovo", value: "XK" },
                    { label: "Yemen", value: "YE" },
                    { label: "Mayotte", value: "YT" },
                    { label: "South Africa", value: "ZA" },
                    { label: "Zambia", value: "ZM" },
                    { label: "Zimbabwe", value: "ZW" },
                    { label: "England", value: "ENGLAND" },
                    { label: "Scotland", value: "SCOTLAND" },
                    { label: "Wales", value: "WALES" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Grants",
          name: "grants",
          file: "content/pages/grants.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "markdown",
            },
            {
              label: "Description",
              name: "description",
              widget: "markdown",
            },

            {
              label: "Members only text",
              name: "members_only_text",
              widget: "markdown",
            },
            {
              label: "Grant types",
              name: "grant_types",
              widget: "list",
              allow_add: true,
              fields: [
                { label: "Title", name: "title", widget: "markdown" },
                { label: "Who", name: "who", widget: "markdown" },
                { label: "What", name: "what", widget: "markdown" },
                { label: "criteria", name: "criteria", widget: "markdown" },
                { label: "How much", name: "how_much", widget: "markdown" },
                { label: "How", name: "how", widget: "markdown" },
                {
                  label: "Members only",
                  name: "members_only",
                  widget: "boolean",
                  default: false,
                },
              ],
            },
            { label: "Body", name: "body", widget: "markdown" },
          ],
        },
        {
          label: "Updates",
          name: "updates",
          file: "content/pages/updates.md",
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
            },
          ],
        },
      ],
    },
    {
      name: "update",
      label: "Update",
      folder: "content/pages/updates",
      create: true,
      slug: "{{slug}}_{{year}}-{{month}}-{{day}}",
      fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Date", name: "date", widget: "date" },
        { label: "Author", name: "author", widget: "string" },
        {
          label: "Announce until",
          name: "announce_until",
          widget: "date",
          required: false,
        },
        { label: "Body", name: "body", widget: "markdown" },
        { label: "Image", name: "image", widget: "image", required: false },
      ],
    },
  ],
};
