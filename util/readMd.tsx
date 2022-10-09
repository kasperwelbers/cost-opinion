import fs from "fs";
import matter from "gray-matter";

export default function readMd(path: string) {
  const filecontent = fs.readFileSync(path);
  const content = matter(filecontent);
  return {
    attributes: content.data,
    body: content.content,
  };
}
