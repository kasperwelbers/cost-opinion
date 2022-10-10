import { Person } from "../types";

const wgs = ["Theory", "Tools", "Data", "Dissemination"];

export default function prepareWGPeople(people: Person[]) {
  const members: any = {};
  people.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  for (let p of people) {
    for (let wg of p.workgroups) {
      const wpi = wgs.findIndex((x) => x === wg);
      if (wpi == null) continue;
      const code = "WG" + (wpi + 1);

      if (!members[wpi])
        members[wpi] = { leader: null, vices: [], members: [] };

      if (p.role === code + "L") {
        members[wpi].leader = p;
      } else if (p.role === code + "V") {
        members[wpi].vices.push(p);
      } else {
        members[wpi].members.push(p);
      }
    }
  }

  return members;
}
