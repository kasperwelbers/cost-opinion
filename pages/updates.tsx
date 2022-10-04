import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

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
    <main className={"AppComponent Updates"}>
      <div className={"Header"}>
        <div
          className={"Container relative fade-in"}
          style={{ minHeight: "min(20vw, 300px)" }}
        >
          <div style={{ display: "flex", height: "100%" }}>
            <h1 style={{ margin: "auto" }}>
              TODO: page for publishing updates on the project
            </h1>
          </div>
        </div>
      </div>
      <div className="spacer wave" />
      <div className="BodyContainer">
        <div style={{ height: "100%" }}></div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/home.md`);
  return { props: { content: content.default } };
};

export default HomePage;
