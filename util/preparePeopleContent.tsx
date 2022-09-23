import countries from "../content/data/countries.json";
const countryLookup = {};
const countryCodeLookup = {};
for (let c of countries) countryLookup[c.name] = c;
for (let c of countries) countryCodeLookup[c.code] = c;

export default function preparePeopleContent(content) {
  const people = [];

  for (let person of content.attributes.people) {
    const [, countryName, countryCode] =
      person.country.match(/(.*?) \((.*?)\)/);

    // fix non-ISO country codes used by COST
    const country =
      countryCodeLookup[countryCode] || countryLookup[countryName];

    if (!country)
      throw new Error(
        "Country in COST action participant list neither matches on ISO code or country name"
      );

    people.push({
      name: person.firstname + " " + person.lastname,
      homepage: person.homepage,
      country: country.name,
      countryCode: country.code,
      countryFlag: country.emoji,
    });
  }

  // deep copy content to overwrite the people array
  // (don't know what next does, but overwriting seems to mess up)
  return { ...content, attributes: { ...content.attributes, people } };
}
