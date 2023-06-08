import { NextPage, GetStaticProps } from "next";
import preparePeopleContent from "../util/preparePeopleContent";
import PeopleList from "../components/PeopleList";
import readMd from "../util/readMd";
import { PeopleContent } from "../types";
import ReactMarkdown from "react-markdown";

interface Props {
  content: {
    attributes: {
      title: string;
      aim_objectives: string;
    };
    body: string;
  };
  peopleContent: PeopleContent;
}

const About: NextPage<Props> = ({ content, peopleContent }) => {
  const { attributes, body } = content;

  return (
    <div className="AppComponent AboutContainer">
      <div className="WideContainer About fade-in">
        <div className="AboutBody">
          <h1>{attributes.title}</h1>

          <div>
            <ReactMarkdown>{attributes.aim_objectives}</ReactMarkdown>
          </div>

          <a
            className="JoinLink"
            href="https://cost.eu/actions/CA21129/#tabs+Name:Working%20Groups%20and%20Membership"
            target="_blank"
            rel="noreferrer"
          >
            Apply to join OPINION
          </a>
          {/* <img src="/img/opinion_i.gif" alt={"OPINION logo"} /> */}
        </div>

        <div className="Management">
          <PeopleList roles={peopleContent.attributes.roles} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/about.md");

  const peopleMd = readMd("content/pages/people.md");
  const peopleContent = preparePeopleContent(peopleMd);

  return { props: { content, peopleContent } };
};

export default About;
