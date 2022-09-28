import countries from "../content/data/countries.json";

const countryLookup: Record<string, any> = {};
const countryCodeLookup: Record<string, any> = {};
for (let c of countries) countryLookup[c.name] = c;
for (let c of countries) countryCodeLookup[c.code] = c;

export default function preparePeopleContent(content: any) {
  const people = [];

  for (let person of content.attributes.people) {
    const match: RegExpMatchArray | null =
      person.country.match(/(.*?) \((.*?)\)/);
    if (match === null) {
      throw new Error(
        "Invalid country. COST participants list should have a country formatted as 'name (code)'"
      );
    }
    const [, countryName, countryCode] = match;

    // fix non-ISO country codes used by COST
    const country =
      countryCodeLookup[countryCode] || countryLookup[countryName];

    if (!country)
      throw new Error(
        "Country in COST action participant list neither matches on ISO code or country name"
      );

    people.push({
      name: person.name,
      homepage: person.homepage,
      workgroups: person.workgroups,
      role: person.role,
      country: country.name,
      countryCode: country.code,
      countryFlag: country.emoji,
    });
  }

  // deep copy content to overwrite the people array
  // (don't know what next does, but overwriting seems to mess up)
  return { ...content, attributes: { ...content.attributes, people } };
}
