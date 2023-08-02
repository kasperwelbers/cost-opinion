import { Person, Position } from "../types";
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart";
import {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Portal from "../components/Portal";

import { FaLink } from "react-icons/fa";
import { SingleValue } from "react-select";
import { PeopleContent } from "../types";

interface Props {
  content: PeopleContent;
}

const PeopleMap: FunctionComponent<Props> = ({ content }: Props) => {
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
    <div className="PeopleMap">
      <style jsx>{`
        .PeopleMap {
          max-width: 1000px;
          /* margin: auto; */
          grid-area: map;
          border-radius: 20px;
          position: relative;
          padding: 2rem 0rem 0rem 0rem;
          font-size: 1.5rem;
        }

        .SearchPerson {
          position: absolute;
          top: 2rem;
          right: 2rem;
          text-align: center;
          width: 18rem;
          color: black;
          padding: 0 0 5px 10px;
          background: #0007;
          border-radius: 5px;
        }

        .SearchPerson label {
          font-weight: 800;
          color: white;
        }
      `}</style>
      <MapChart
        setTooltipContent={setTooltip}
        setPopup={setPopup}
        countries={attributes.countries}
      />
      {/* <div className="SearchPerson">
        <label>Search person</label>
        <br />
        <ReactSelect
          options={dropdownOptions}
          onChange={(value) => onDropdownSelect(value)}
        />
        <div ref={searchRef} />
      </div> */}
      <ReactTooltip html={true} backgroundColor="#000000ff">
        {tooltip}
      </ReactTooltip>
      <Portal position={portalPosition} setPosition={setPortalPosition}>
        <PersonPopup people={people} person={person} />
      </Portal>
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
      <style jsx>{`
        .Country {
          color: black;
          text-align: center;
        }

        .PopupContainer {
          position: relative;
          display: flex;
          z-index: 100;
        }

        .Popup {
          color: black;
          padding: 0rem 0.5rem;
        }
      `}</style>
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
      <style jsx>{`
        .Member {
          display: flex;
          align-items: flex-end;

          position: relative;
        }

        .Member.selected {
          font-weight: 900;

          color: var(--primary);
        }

        .Member.selected::before {
          content: "";
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary);
          position: absolute;
          left: 0;
          top: 8px;
        }
        .Member span {
          width: 20rem;
        }

        .IconGroup {
          display: flex;
          justify-content: flex-end;
        }

        .IconGroup .Icon {
          height: 1rem;
          width: 1rem;
          stroke: blue;
        }

        .Member a {
          color: #333;
          stroke: black;
          height: 2rem;
          width: 2rem;
        }
        span {
          font-size: 1.2rem;
        }
      `}</style>
      <span key="name">
        {p.name}{" "}
        {p.homepage ? (
          <a href={p.homepage} target="_blank" rel="noreferrer">
            <FaLink size={12} />
          </a>
        ) : null}
      </span>{" "}
    </div>
  );
};

export default PeopleMap;
