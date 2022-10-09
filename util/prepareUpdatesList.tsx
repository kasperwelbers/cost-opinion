import fs from "fs";

export default async function prepareUpdatesList() {
  const dir = "content/pages/updates";
  const files = fs.readdirSync(dir);
  files.map(async (f) => {
    const content = await import("../" + dir + "/" + f);
    console.log(content);
  });
}
