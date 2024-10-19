import fs from "fs";
import readMd from "./readMd";

export default function prepareDeliverablesList() {
  const dir = "content/pages/deliverables";
  const files = fs.readdirSync(dir);

  const deliverables = files.map((f) => {
    const { attributes } = readMd(dir + "/" + f);
    return {
      id: f.replace(/\.md$/, ""),
      deliverable: attributes.deliverable || "",
      workgroup: attributes.workgroup || "",
      title: attributes.title || "",
      url: attributes.url || "",
    };
  });

  return deliverables;
}
