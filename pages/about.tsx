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

          <ReactMarkdown>{attributes.aim_objectives}</ReactMarkdown>
        </div>
        <div className="Management">
          <PeopleList roles={peopleContent.attributes.roles} />
        </div>
        <div className="People"></div>
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