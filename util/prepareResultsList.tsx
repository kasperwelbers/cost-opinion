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

  results.sort((a, b) =>
    a.pub_year > b.pub_year ? -1 : b.pub_year > a.pub_year ? 1 : 0
  );
  return results;
}
