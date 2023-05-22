import { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

import LogoWG1 from "../public/logos/logo_wg1.svgr";
import LogoWG2 from "../public/logos/logo_wg2.svgr";
import LogoWG3 from "../public/logos/logo_wg3.svgr";
import LogoWG4 from "../public/logos/logo_wg4.svgr";
import readMd from "../util/readMd";
import prepareWGPeople from "../util/prepareWGPeople";
import { Person } from "../types";
import { FaEnvelope } from "react-icons/fa";
import preparePeopleContent from "../util/preparePeopleContent";

interface Props {
  content: Content;
  wgPeople: Record<number, WGPeople>;
}

interface Content {
  attributes: {
    title: string;
    image: string;
    workgroups: WorkGroup[];
  };
}
interface WorkGroup {
  title: string;
  body: string;
  shortDescription: string;
}
interface WGPeople {
  leader: Person;
  vices: Person[];
  members: Person[];
}

const WGs: NextPage<Props> = ({ content, wgPeople }) => {
  const { title, image, workgroups } = content.attributes;
  const [people, setPeople] = useState<WGPeople>();
  const [selected, setSelected] = useState<number>();
  return (
    <div className={`AppComponent WGs ${selected != null ? "Mini" : ""}`}>
      <div className="WGsBody">
        <h1 className="Title">{title}</h1>
        <div className="WorkingGroups">
          {workgroups.map((wg, i) => {
            let logoclass = i === selected ? "Logo selected" : "Logo";

            return (
              <div key={wg.title} className="WorkingGroup fade-in">
                <div
                  className="Card fade-in"
                  onClick={() => {
                    setSelected(i);
                    if (selected === undefined) {
                      setPeople(undefined);
                      setTimeout(() => setPeople(wgPeople[i]), 500);
                    } else {
                      setPeople(wgPeople[i]);
                    }
                  }}
                >
                  {i === 0 && <LogoWG1 className={logoclass} />}
                  {i === 1 && <LogoWG2 className={logoclass} />}
                  {i === 2 && <LogoWG3 className={logoclass} />}
                  {i === 3 && <LogoWG4 className={logoclass} />}
                  <div className="WorkingGroupLabel">
                    <h3>{wg.title}</h3>

                    <ReactMarkdown>{wg.shortDescription}</ReactMarkdown>
                  </div>
                </div>
                {/* <span>{wg.subtitle}</span> */}
                {/* <LazyImage src={wg.featuredImage} alt="LazyImage" /> */}
              </div>
            );
          })}
        </div>
        {selected != null ? (
          <WorkingGroupDetails wg={workgroups[selected]} people={people} />
        ) : null}
      </div>
    </div>
  );
};

interface WGDetailsProps {
  wg: WorkGroup;
  people: WGPeople | undefined;
}

const WorkingGroupDetails: NextPage<WGDetailsProps> = ({ wg, people }) => {
  if (!wg) return null;
  if (!people) return null;

  const leader = people.leader;
  const vices = people.vices;
  const members = people.members;

  const printPerson = (person: Person) => {
    if (!person) return "";
    return (
      <div style={{ display: "flex" }}>
        <span style={{ paddingRight: "1rem" }}>{person.countryFlag}</span>
        <div>{person.name}</div>
      </div>
    );
  };

  return (
    <div className="WorkingGroupDetails fade-in-slow">
      <h1>{wg.title}</h1>
      <h2>Working group</h2>
      <ReactMarkdown>{wg.body}</ReactMarkdown>
      <div className="WGPeople">
        <div className="WGChairs">
          <div key="leader" className="Person">
            <label>CHAIR </label>{" "}
            <div style={{ marginTop: "10px" }}>{printPerson(leader)}</div>
          </div>
          <div key="vices" className="Person">
            <label>VICE CHAIRS</label>
            <div style={{ marginTop: "10px" }} key="v1">
              {printPerson(vices[0])}
            </div>
            <div key="v2">{printPerson(vices[1])}</div>
          </div>
          <div className="Contact">
            <a href={`mailto:${leader.email}`}>
              <FaEnvelope
                style={{
                  fontSize: "1.6rem",
                  paddingRight: "0.8rem",
                  transform: "translateY(4px)",
                  cursor: "pointer",
                }}
              />
            </a>
            {leader.email}
          </div>
          {/* <div key="contact" className="Person">
            <label>CONTACT</label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FaEnvelope
                style={{
                  padding: "0",
                  textAlign: "right",
                  transform: "translateY(5px)",
                  cursor: "pointer",
                }}
                onClick={() => window.open(`mailto:${leader.email}`)}
              />
            </div>
          </div> */}
        </div>

        <h2 className="MembersLabel">MEMBERS</h2>
        <div className="WGMembers">
          {members.map((member, i) => {
            return <div key={member.name + i}>{printPerson(member)}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/wgs.md");

  const people = readMd("content/pages/people.md");
  const peopleContent = preparePeopleContent(people);
  const wgPeople: Record<number, WGPeople> = prepareWGPeople(
    peopleContent.attributes.people
  );
  return {
    props: { content, wgPeople },
  };
};

export default WGs;
