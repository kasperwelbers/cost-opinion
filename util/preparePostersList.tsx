import fs from "fs";
import readMd from "./readMd";

export default function preparePostersList() {
  const dir = "content/pages/posters";
  const files = fs.readdirSync(dir);

  const deliverables = files.map((f) => {
    const { attributes } = readMd(dir + "/" + f);
    return {
      id: f.replace(/\.md$/, ""),
      thumbnail: attributes.thumbnail || "",
      title: attributes.title || "",
      url: attributes.url || "",
    };
  });

  return deliverables;
}
