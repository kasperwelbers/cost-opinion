import fs from "fs";
import readMd from "./readMd";

export default function prepareResultsList() {
  const dir = "content/pages/results";
  const files = fs.readdirSync(dir);

  const results = files.map((f) => {
    const { attributes } = readMd(dir + "/" + f);
    return {
      id: f.replace(/\.md$/, ""),
      title: attributes.title || "",
      author: attributes.author || "",
      published_in: attributes.published_in || "",
      pub_year: attributes.pub_year || "",
      url: attributes.url || "",
    };
  });

  // forthcoming / in press first, then by year (newest first), then undated
  const sortKey = (r: { author: string; pub_year: string | number }) => {
    if (/\((?:Eds?\.,\s*)?(?:forthcoming|in press)\)\.?\s*$/i.test(r.author))
      return Infinity;
    return Number(r.pub_year) || -Infinity;
  };
  results.sort((a, b) => {
    const ka = sortKey(a);
    const kb = sortKey(b);
    return ka > kb ? -1 : kb > ka ? 1 : 0;
  });
  return results;
}
