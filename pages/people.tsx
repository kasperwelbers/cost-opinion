import { NextPage, GetStaticProps } from "next";
import preparePeopleContent from "../util/preparePeopleContent";
import PeopleList from "../components/PeopleList";
import { Person, Position } from "../types";
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart";
import LogoNet from "../public/logos/logo_net.svgr";
import {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Portal from "../components/Portal";

import LogoWG1 from "../public/logos/logo_wg1.svgr";
import LogoWG2 from "../public/logos/logo_wg2.svgr";
import LogoWG3 from "../public/logos/logo_wg3.svgr";
import LogoWG4 from "../public/logos/logo_wg4.svgr";

import { FaLink } from "react-icons/fa";
import ReactSelect, { SingleValue } from "react-select";
import readMd from "../util/readMd";

interface Props {
  content: PeopleContent;
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
  countries: { [countryCode: string]: Person[] };
}

const People: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  const [tooltip, setTooltip] = useState<string>();
  const [portalPosition, setPortalPosition] = useState<Position>();
  const [people, setPeople] = useState<Person[]>();
  const [person, setPerson] = useState<Person>();
  const searchRef = useRef<HTMLDivElement>(null);

  const dropdownOptions = useMemo(
    () =>
      content.attributes.people
        .map((p) => ({
          label: p.name,
          value: p.name,
        }))
        .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0)),
    [content]
  );

  const onDropdownSelect = (
    value: SingleValue<{ label: string; value: string }>
  ) => {
    const person = content.attributes.people.find(
      (p) => p.name === value?.value
    );
    if (!person || !searchRef.current) return;
    const people = content.attributes.countries[person.countryCode];
    const bc = searchRef.current.getBoundingClientRect();
    setPortalPosition({ x: bc.x, y: bc.y - bc.height });
    setPeople(people);
    setPerson(person);
  };

  const setPopup = useCallback(
    (x: number, y: number, people: Person[]) => {
      setPortalPosition({ x, y });
      setPeople(people);
      setPerson(undefined);
    },
    [setPortalPosition, setPeople]
  );

  return (
    <div className="AppComponent PeopleContainer">
      <div
        className="AppComponentImage"
        style={{
          filter: "saturate(0)",

          backgroundImage: `url("${attributes.image}")`,
        }}
      />

      <div className="WideContainer People">
        <div className="Title">
          <h1>{attributes.title}</h1>
          <LogoNet />
        </div>

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
          <div className="SearchPerson">
            <label>Search person</label>
            <br />
            <ReactSelect
              options={dropdownOptions}
              onChange={(value) => onDropdownSelect(value)}
            />
            <div ref={searchRef} />
          </div>
          <ReactTooltip html={true} backgroundColor="#000000ff">
            {tooltip}
          </ReactTooltip>
          <Portal position={portalPosition} setPosition={setPortalPosition}>
            <PersonPopup people={people} person={person} />
          </Portal>
        </div>
      </div>
    </div>
  );
};

interface PersonPopupProps {
  people: Person[] | undefined;
  person: Person | undefined;
}

const PersonPopup: FunctionComponent<PersonPopupProps> = ({
  people,
  person,
}) => {
  if (!people) return null;
  const mc = people.filter((p) => p.mc);
  const member = people.filter((p) => !p.mc);

  return (
    <div>
      <h3 className="Country">
        {people[0].country + " " + people[0].countryFlag}{" "}
      </h3>
      <div className="PopupContainer">
        <div className="Popup">
          {mc.length > 0 ? (
            <b>
              <br />
              Management Committee
            </b>
          ) : null}
          {mc.map((p, i) => (
            <PersonPopupItem key={i + p.name} p={p} person={person} />
          ))}
          {member.length > 0 ? (
            <b>
              <br />
              Members
            </b>
          ) : null}
          {member.map((p, i) => (
            <PersonPopupItem key={i + p.name} p={p} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PersonPopupItemProps {
  p: Person | undefined;
  person: Person | undefined;
}

const PersonPopupItem: FunctionComponent<PersonPopupItemProps> = ({
  p,
  person,
}) => {
  if (!p) return null;
  return (
    <div className={`Member ${person?.name === p.name ? "selected" : ""}`}>
      <span key="name">
        {p.name}{" "}
        {p.homepage ? (
          <a href={p.homepage}>
            <FaLink size={12} />
          </a>
        ) : null}
      </span>{" "}
      <div key="wtf" className="IconGroup">
        {p.workgroups.map((wg) => {
          if (wg === "Theory")
            return <LogoWG1 key={"theory"} className="Icon" />;
          if (wg === "Tools") return <LogoWG2 key={"tools"} className="Icon" />;
          if (wg === "Data") return <LogoWG3 key={"data"} className="Icon" />;
          if (wg === "Dissemination")
            return <LogoWG4 key={"dissemination"} className="Icon" />;
          return null;
        })}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentMd = readMd("content/pages/people.md");
  const content = preparePeopleContent(contentMd);

  return { props: { content } };
};

export default People;
