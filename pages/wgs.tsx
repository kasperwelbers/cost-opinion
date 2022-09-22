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

const iconsize = "4em";

interface Props {
  content: Content;
  workinggroups: WorkingGroup[];
}

interface Content {
  attributes: {
    title: string;
    image: string;
    workgroups: {
      title: string;
      body: string;
    };
  };
}

const WGs: NextPage<Props> = ({ content }) => {
  const { title, image, workgroups } = content.attributes;
  const [selected, setSelected] = useState<number>();

  return (
    <div className="WGs">
      <div
        className="Image"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
      <div
        style={{ display: "flex", flexDirection: "column", overflow: "auto" }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            paddingTop: selected == null ? "4rem" : "1rem",
            zIndex: 10,
            transition: "font-size 0.5s, padding 1s",
            fontSize: selected == null ? "2rem" : "0rem",
          }}
        >
          <h1>{title}</h1>
        </div>
        <div className="WorkingGroups">
          {workgroups.map((wg, i) => {
            return (
              <div
                key={wg.title}
                className={`WorkingGroup ${
                  selected != null ? "Mini" : ""
                } fade-in`}
              >
                <div className="Card fade-in" onClick={() => setSelected(i)}>
                  <div
                    className="Icon"
                    style={{
                      color: selected === i ? "var(--primary-light)" : "white",
                    }}
                  >
                    {i === 0 && (
                      <FaBook key="theory" style={{ fontSize: iconsize }} />
                    )}
                    {i === 1 && (
                      <FaToolbox key="tools" style={{ fontSize: iconsize }} />
                    )}
                    {i === 2 && (
                      <FaDatabase key="data" style={{ fontSize: iconsize }} />
                    )}
                    {i === 3 && (
                      <FaBroadcastTower
                        key="dissemination"
                        style={{ fontSize: iconsize }}
                      />
                    )}
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
  wg: WorkingGroup;
}

const WorkingGroupDetails: NextPage<WGDetailsProps> = ({ wg }) => {
  if (!wg) return null;
  console.log(wg.body);
  return (
    <div className="WorkingGroupDetails fade-in">
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
