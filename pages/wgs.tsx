import { useState } from "react";
import fs from "fs";
import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import {
  FaDatabase,
  FaBook,
  FaToolbox,
  FaBroadcastTower,
} from "react-icons/fa";

interface Props {
  content: Content;
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
}

const WGs: NextPage<Props> = ({ content }) => {
  const { title, image, workgroups } = content.attributes;
  const [selected, setSelected] = useState<number>();

  return (
    <div className={`AppComponent WGs ${selected != null ? "Mini" : ""}`}>
      <div
        className="Image"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
      <div
        style={{ display: "flex", flexDirection: "column", overflow: "auto" }}
      >
        <h1 className="Title">{title}</h1>
        <div className="WorkingGroups">
          {workgroups.map((wg, i) => {
            return (
              <div key={wg.title} className="WorkingGroup fade-in">
                <div className="Card fade-in" onClick={() => setSelected(i)}>
                  <div
                    className="Icon"
                    style={{
                      color: selected === i ? "var(--primary-light)" : "white",
                    }}
                  >
                    {i === 0 && <FaBook key="theory" />}
                    {i === 1 && <FaToolbox key="tools" />}
                    {i === 2 && <FaDatabase key="data" />}
                    {i === 3 && <FaBroadcastTower key="dissemination" />}
                  </div>
                  <h3>{wg.title}</h3>
                </div>
                {/* <span>{wg.subtitle}</span> */}
                {/* <LazyImage src={wg.featuredImage} alt="LazyImage" /> */}
              </div>
            );
          })}
        </div>
        {selected != null ? (
          <WorkingGroupDetails wg={workgroups[selected]} />
        ) : null}
      </div>
    </div>
  );
};

interface WGDetailsProps {
  wg: WorkGroup;
}

const WorkingGroupDetails: NextPage<WGDetailsProps> = ({ wg }) => {
  if (!wg) return null;
  return (
    <div className="WorkingGroupDetails fade-in-slow">
      <h1>{wg.title}</h1>
      <ReactMarkdown>{wg.body}</ReactMarkdown>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`content/pages/wgs.md`);
  return {
    props: { content: content.default },
  };
};

export default WGs;
