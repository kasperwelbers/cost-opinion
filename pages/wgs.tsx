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
import styles from "styles/WGs.module.css";

const iconsize = "4em";

interface Props {
  content: Content;
  workinggroups: WorkingGroup[];
}

interface Content {
  attributes: {
    title: string;
    image: string;
  };
}
interface WorkingGroup {
  attributes: {
    title: string;
  };
  name: string;
  body: string;
}

const WGs: NextPage<Props> = ({ content, workinggroups }) => {
  const { attributes } = content;
  const [selected, setSelected] = useState<number>();

  return (
    <div
      style={{
        flex: "1 1 auto",
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        background: "var(--primary)",
        position: "relative",
      }}
    >
      <div
        className={styles.Image}
        style={{
          backgroundImage: `url("${attributes.image}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
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
            transition: "font-size 1s, padding 1s",
            fontSize: selected == null ? "2rem" : "0rem",
          }}
        >
          <h1>{attributes.title}</h1>
        </div>
        <div className={styles.WorkingGroups}>
          {workinggroups.map((wg, i) => {
            return (
              <div
                key={wg.attributes.title}
                className={`${styles.WorkingGroup} ${
                  selected != null ? styles.Mini : ""
                } fade-in`}
              >
                <div
                  className={`${styles.Card} fade-in`}
                  onClick={() => setSelected(i)}
                >
                  <div
                    className={styles.Icon}
                    style={{
                      color: selected === i ? "var(--primary-light)" : "white",
                    }}
                  >
                    {wg.name === "wp1.md" && (
                      <FaBook key="theory" style={{ fontSize: iconsize }} />
                    )}
                    {wg.name === "wp2.md" && (
                      <FaToolbox key="tools" style={{ fontSize: iconsize }} />
                    )}
                    {wg.name === "wp3.md" && (
                      <FaDatabase key="data" style={{ fontSize: iconsize }} />
                    )}
                    {wg.name === "wp4.md" && (
                      <FaBroadcastTower
                        key="dissemination"
                        style={{ fontSize: iconsize }}
                      />
                    )}
                  </div>
                  <h3>{wg.attributes.title}</h3>
                </div>
                {/* <span>{wg.subtitle}</span> */}
                {/* <LazyImage src={wg.featuredImage} alt="LazyImage" /> */}
              </div>
            );
          })}
        </div>
        {selected != null ? (
          <WorkingGroupDetails wg={workinggroups[selected]} />
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
  return (
    <div className={`${styles.WorkingGroupDetails} fade-in`}>
      <h1>{wg.attributes.title}</h1>
      <ReactMarkdown>{wg.body}</ReactMarkdown>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`content/pages/wgs.md`);

  const files = fs.readdirSync("content/pages/workinggroups");
  const workinggroups = [];
  for (let f of files) {
    const d = await import("content/pages/workinggroups/" + f);
    workinggroups.push({ ...d.default, name: f });
  }

  return {
    props: { content: content.default, workinggroups },
  };
};

export default WGs;
