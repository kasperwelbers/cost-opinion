import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import readMd from "../util/readMd";
import LogoNet from "../public/logos/logo_net.svgr";
import LogoCg from "../public/logos/logo_cg.svgr";

import PeopleMap, { PeopleContent } from "../components/PeopleMap";
import preparePeopleContent from "../util/preparePeopleContent";

interface Props {
  content: Content;
  peopleContent: PeopleContent;
}
interface Content {
  attributes: HomeAttributes;
  body: string;
}
interface HomeAttributes {
  title: string;
  subtitle: string;
  who: string;
  what: string;
  image: string;
}

const HomePage: NextPage<Props> = ({ content, peopleContent }) => {
  const { attributes, body } = content;
  return (
    <main className={"AppComponent Home"}>
      <div
        className="AppComponentImage"
        style={{
          backgroundImage: `url("/img/europe.jpeg")`,
        }}
      />
      <div className={"Header"}>
        <div className={"Container relative fade-in"}>
          <div>
            <h1 className={"Title"}>{attributes.title}</h1>
            {attributes.subtitle && (
              <h3 className={"Subtitle"}>{attributes.subtitle}</h3>
            )}
          </div>
        </div>
      </div>
      <div className="Body fade-in-slow">
        <div className="BodyCard">
          <div className={"BodyContainer attached"}>
            <div className={"container"}>
              <ReactMarkdown>{attributes.what}</ReactMarkdown>
            </div>
            <LogoNet />
          </div>
          <div className="MapContainer">
            <div className="container">
              <PeopleMap content={peopleContent} />
            </div>
            <div className="Who">
              <LogoCg />
              <ReactMarkdown>{attributes.who}</ReactMarkdown>
            </div>
          </div>
        </div>
        {/* <div className={"BodyContainer"}>
          <LogoCg />
          <div className={"container"}>
            <ReactMarkdown>{attributes.who}</ReactMarkdown>
          </div>
        </div> */}
      </div>

      <div className="EmptyFlex" />
      <div className="spacer wave" />
      <div className="Underwater"></div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/home.md");

  const peopleMd = readMd("content/pages/people.md");
  const peopleContent = preparePeopleContent(peopleMd);

  return { props: { content, peopleContent } };
};

export default HomePage;
