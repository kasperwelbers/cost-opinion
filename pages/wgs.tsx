import { useState } from "react";
import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

import LogoWG1 from "../public/logos/logo_wg1.svgr";
import LogoWG2 from "../public/logos/logo_wg2.svgr";
import LogoWG3 from "../public/logos/logo_wg3.svgr";
import LogoWG4 from "../public/logos/logo_wg4.svgr";
import readMd from "../util/readMd";

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
        className="AppComponentImage"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
      <div className="WGsBody">
        <h1 className="Title">{title}</h1>
        <div className="WorkingGroups">
          {workgroups.map((wg, i) => {
            let logoclass = i === selected ? "Logo selected" : "Logo";

            return (
              <div key={wg.title} className="WorkingGroup fade-in">
                <div className="Card fade-in" onClick={() => setSelected(i)}>
                  {i === 0 && <LogoWG1 className={logoclass} />}
                  {i === 1 && <LogoWG2 className={logoclass} />}
                  {i === 2 && <LogoWG3 className={logoclass} />}
                  {i === 3 && <LogoWG4 className={logoclass} />}
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
  const content = readMd("content/pages/wgs.md");
  return {
    props: { content: content },
  };
};

export default WGs;
