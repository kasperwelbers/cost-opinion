import fs from "fs";
import readMd from "./readMd";

function toDateString(d: unknown): string {
  if (d instanceof Date) return d.toISOString().split("T")[0];
  if (typeof d === "string") return d.split("T")[0];
  return "";
}

export default function prepareUpdatesList() {
  const dir = "content/pages/updates";
  const files = fs.readdirSync(dir);

  const updates = files.map((f) => {
    const { attributes } = readMd(dir + "/" + f);
    return {
      id: f.replace(/\.md$/, ""),
      title: attributes.title,
      image: attributes.image || "",
      date: toDateString(attributes.date),
      author: attributes.author,
      announce_until: toDateString(attributes.announce_until),
    };
  });

  // Sort descending by date. Dates are normalised to YYYY-MM-DD strings
  // before sorting so the comparison is always a reliable lexicographic one,
  // regardless of whether gray-matter returns Date objects or strings
  // (behaviour that can change with the underlying js-yaml version).
  updates.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });

  return updates;
}
