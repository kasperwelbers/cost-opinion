import fs from "fs";
import readMd from "./readMd";

export default function prepareResultsList() {
  const dir = "content/pages/projects";
  const files = fs.readdirSync(dir);

  const projects = files.map((f) => {
    const { attributes } = readMd(dir + "/" + f);
    return {
      id: f.replace(/\.md$/, ""),
      title: attributes.title || "",
      description: attributes.description || "",
      logos: attributes.logos || [],
    };
  });

  return projects;
}
