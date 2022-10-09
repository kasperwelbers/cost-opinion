import fs from "fs";
import readMd from "./readMd";

export default function prepareUpdatesList() {
  const dir = "content/pages/updates";
  const files = fs.readdirSync(dir);

  const updates = files.map((f) => {
    const { attributes } = readMd(dir + "/" + f);
    return {
      id: f.replace(/\.md$/, ""),
      title: attributes.title,
      image: attributes.image,
      date: attributes.date.toISOString().split("T")[0],
      author: attributes.author,
    };
    return attributes;
  });

  updates.sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0));

  return updates;
}
