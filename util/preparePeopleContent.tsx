import countries from "../content/data/countries.json";
import { Person } from "../types";

const countryCodeLookup: Record<string, any> = {};
for (let c of countries) countryCodeLookup[c.code] = c;

export default function preparePeopleContent(content: any) {
  const people = [];
  const roles: Record<string, Person> = {};
  const countries: Record<string, Person[]> = {};

  for (let person of content.attributes.people) {
    const country = countryCodeLookup[person.country];

    if (!country)
      throw new Error(
        "Country in COST action participant list neither matches on ISO code or country name"
      );

    const workgroups = [];
    if (person.wg_theory) workgroups.push("wg_theory");
    if (person.wg_tools) workgroups.push("wg_tools");
    if (person.wg_data) workgroups.push("wg_data");
    if (person.wg_dissemination) workgroups.push("wg_dissemination");

    let chairMail = "";
    if (person.role === "AC" || person.role === "ACV" || person.role === "GHSR")
      chairMail = "leaders@opinion-network.eu";
    if (person.role === "WG1L") chairMail = "wg1-leaders@opinion-network.eu";
    if (person.role === "WG2L") chairMail = "wg2-leaders@opinion-network.eu";
    if (person.role === "WG3L") chairMail = "wg3-leaders@opinion-network.eu";
    if (person.role === "WG4L") chairMail = "wg4-leaders@opinion-network.eu";

    const personObj = {
      name: person.name,
      homepage: person.homepage || null,
      workgroups,
      role: person.role || null,
      mc: person.mc === 1,
      email: person.email || chairMail || "",
      country: country.name,
      countryCode: country.code,
      countryFlag: country.emoji,
    };

    people.push(personObj);
    if (person.role) roles[person.role] = personObj;
    if (!countries[country.code]) countries[country.code] = [];
    countries[country.code].push(personObj);
  }

  // deep copy content to overwrite the people array
  // (don't know what next does, but overwriting seems to mess up)
  return {
    ...content,
    attributes: { ...content.attributes, people, roles, countries },
  };
}
