import { NextPage, GetStaticProps } from "next";
import preparePeopleContent from "../util/preparePeopleContent";
import GridTable from "../components/GridTable";
import PeopleList from "../components/PeopleList";
import { ColumnSpec, Person, PortalData } from "../types";
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart";
import { useCallback, useState } from "react";
import Portal from "../components/Portal";

import {
  FaDatabase,
  FaBook,
  FaToolbox,
  FaBroadcastTower,
} from "react-icons/fa";

interface Props {
  content: PeopleContent;
  columns: ColumnSpec[];
}
interface PeopleContent {
  attributes: PeopleAttributes;
  body: string;
}
interface PeopleAttributes {
  title: string;
  image: string;
  people: Person[];
  mc: boolean;
  roles: { [role: string]: Person };
  countries: { [countryCode: string]: Person };
}

const People: NextPage<Props> = ({ content, columns }) => {
  const { attributes, body } = content;
  const [tooltip, setTooltip] = useState(null);
  const [portalData, setPortalData] = useState<PortalData>();

  const setPopup = useCallback((x: number, y: number, people: Person[]) => {
    const content = <PersonPopup people={people} />;
    setPortalData({ x, y, content });
  });

  return (
    <div className="AppComponent PeopleContainer">
      <div
        className="AppComponentImage"
        style={{
          backgroundImage: `url("${attributes.image}")`,
        }}
      />

      <div className="WideContainer People">
        <h1 className="Title">{attributes.title}</h1>
        <div className="PeopleBody">
          {/* <ReactMarkdown>{body}</ReactMarkdown> */}
          <PeopleList roles={attributes.roles} />
        </div>
        <div className="PeopleMap">
          <MapChart
            setTooltipContent={setTooltip}
            setPopup={setPopup}
            countries={attributes.countries}
          />
          <ReactTooltip html={true} backgroundColor="#000000ff">
            {tooltip}
          </ReactTooltip>
          <Portal portalData={portalData} setPortalData={setPortalData} />
        </div>
        {/* <div className="PeopleTableBox">
          <GridTable
            data={attributes.people}
            columns={columns}
            backgroundColor="white"
          />
        </div> */}
      </div>
    </div>
  );
};

const PersonPopup = ({ people }) => {
  const [person, setPerson] = useState<Person>();
  const mc = people.filter((p) => p.mc);
  const member = people.filter((p) => !p.mc);

  return (
    <div>
      <h3 className="Country">
        {people[0].country + " " + people[0].countryFlag}{" "}
      </h3>
      <div className="PopupContainer">
        <div className="Popup">
          <b>Management Committee</b>
          {mc.map((p) => (
            <PersonPopupItem p={p} person={person} setPerson={setPerson} />
          ))}
          {member.length > 0 ? (
            <b>
              <br />
              Members
            </b>
          ) : null}
          {member.map((p) => (
            <PersonPopupItem p={p} person={person} setPerson={setPerson} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PersonPopupItem = ({ p, person, setPerson }) => {
  const personPopup = person && (
    <div className="PersonPopup">
      {person.homepage ? <a href={person.homepage}>homepage</a> : null}
      <div className="IconGroup">
        {person.workgroups.map((wg) => (
          <div className="Icon">
            {wg === "Theory" && <FaBook key="theory" />}
            {wg === "Tools" && <FaToolbox key="tools" />}
            {wg === "Data" && <FaDatabase key="data" />}
            {wg === "Dissemination" && <FaBroadcastTower key="dissemination" />}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="Member"
      onClick={() => setPerson(p)}
      style={{
        color: person?.name === p.name ? "black" : "var(--primary)",
        minWidth: person?.name === p.name ? "250px" : "100px",
      }}
    >
      - {p.name}
      {p === person ? personPopup : null}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentMd = await import(`../content/pages/people.md`);
  const content = preparePeopleContent(contentMd.default);

  const columns = [
    { name: "countryFlag", label: "🌎", style: { textAlign: "center" } },
    { name: "name", label: "The Network", href: "homepage" },
  ];

  return { props: { content, columns } };
};

export default People;
