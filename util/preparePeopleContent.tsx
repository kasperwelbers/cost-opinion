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

    const personObj = {
      name: person.name,
      homepage: person.homepage,
      workgroups: person.workgroups,
      role: person.role,
      mc: person.mc === 1,
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
