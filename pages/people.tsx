import { NextPage, GetStaticProps } from "next";
import preparePeopleContent from "../util/preparePeopleContent";
import readMd from "../util/readMd";
import PeopleMap from "../components/PeopleMap";
import { PeopleContent } from "../types";
import { FaLink } from "react-icons/fa";

import LogoMC from "../public/logos/logo_cg.svgr";

interface Props {
  content: PeopleContent;
}

const About: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  return (
    <div className="AppComponent AboutContainer">
      <div
        className="AppComponentImage"
        style={{
          filter: "saturate(0)",

          backgroundImage: `url("/img/europe.jpeg")`,
        }}
      />

      <div className="About fade-in-slow">
        <div className="AboutBody">
          <h1>{attributes.title}</h1>

          <PeopleMap content={content} />
        </div>
      </div>

      <PeoplePerCountry people={content.attributes.people} />
    </div>
  );
};

function PeoplePerCountry(props: {
  people: PeopleContent["attributes"]["people"];
}) {
  const { people } = props;
  const countries = people.reduce((countries, person) => {
    const country = person.country;
    if (!countries[country]) {
      countries[country] = [];
    }
    countries[country].push(person);
    return countries;
  }, {} as { [country: string]: PeopleContent["attributes"]["people"] });

  const countryArray = Object.entries(countries).sort((a, b) => {
    const countryA = a[0];
    const countryB = b[0];
    return countryA < countryB ? -1 : 1;
  });

  // somehow, in the most weird twists of all time, I cannot use CSS
  // to style the SVGs
  const iconStyle = {
    height: "2.3rem",
    width: "3rem",
    color: "white",
    stroke: "white",
    padding: "0.5rem",
    cursor: "pointer",
  };

  return (
    <div className="PersonPerCountry">
      <style jsx>{`
        .PersonPerCountry {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          gap: 2rem;
          margin: auto;
          max-height: 2500px;
          max-width: 1200px;
          color: white;
          padding: 2rem;
          overflow: auto;
        }

        .Country {
          background: #0004;
          backdrop-filter: blur(2px);
          flex: 1 1 auto;
          width: 100%;
          max-width: 250px;
          padding: 1rem 1.5rem;
          border-radius: 5px;
          border: 1px solid var(--primary-light);
        }
        @media (max-width: 900px) {
          .PersonPerCountry {
            max-height: 10000px;
          }
          .Country {
            max-width: 300px;
          }
        }
        .CountryLabel {
          display: flex;
          height: 5rem;
          align-items: center;
        }
        .CountryLabel div {
          font-size: 3rem;
          padding: 0rem 1rem 1rem 0rem;
        }
        .PersonLabel {
          width: 100%;
          gap: 1rem;
          justify-content: space-between;
        }
        .IconGroup {
          display: flex;
          justify-content: flex-end;
          stroke: white;
        }
        .MC {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      {countryArray.map(([country, people]) => (
        <div key={country} className="Country">
          <div className="CountryLabel">
            <div>{people[0].countryFlag}</div>
            <h2>{country}</h2>
          </div>

          <div className="MC">
            <div>
              {people.map((person, i) => {
                if (!person.mc) return null;
                return (
                  <div key={person.name + i} className="PersonLabel">
                    <div>
                      · {person.name}{" "}
                      {person.homepage ? (
                        <a
                          href={person.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaLink size={12} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <a
              href={
                "https://cost.eu/actions/CA21129/#tabs+Name:Management%20Committee"
              }
              target="_blank"
              rel="noreferrer"
            >
              <LogoMC style={iconStyle} className="Icon" />
            </a>
          </div>
          <br />
          {people.map((person, i) => {
            if (person.mc) return null;
            return (
              <div key={person.name + i} className="PersonLabel">
                <div>
                  · {person.name}{" "}
                  {person.homepage ? (
                    <a href={person.homepage} target="_blank" rel="noreferrer">
                      <FaLink size={12} />
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const peopleMd = readMd("content/pages/people.md");
  const content = preparePeopleContent(peopleMd);

  return { props: { content } };
};

export default About;
