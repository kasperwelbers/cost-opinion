import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import readMd from "../util/readMd";

interface Props {
  content: Content;
}
interface Content {
  attributes: HomeAttributes;
  body: string;
}
interface HomeAttributes {
  title: string;
  subtitle: string;
  image: string;
}

const HomePage: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  return (
    <main className={"AppComponent Home"}>
      <div
        className="AppComponentImage"
        style={{
          backgroundImage: `url("${attributes.image}")`,
        }}
      />
      <div className={"Header"}>
        <div
          className={"Container relative fade-in"}
          style={{ minHeight: "min(20vw, 300px)" }}
        >
          <div>
            <h1 className={"Title"}>{attributes.title}</h1>
            {attributes.subtitle && (
              <h3 className={"Subtitle"}>{attributes.subtitle}</h3>
            )}
          </div>
          {/* <div
            className={"Logo"}
            style={{
              backgroundImage: `url("${attributes.image}")`,
            }}
          /> */}
        </div>
      </div>
      <div className={"BodyContainer"}>
        <div className={"Body container fade-in-slow"}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className="spacer wave" />
      <div className="Underwater"></div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/home.md");
  return { props: { content } };
};

export default HomePage;
