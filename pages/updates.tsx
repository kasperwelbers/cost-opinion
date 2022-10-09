import { NextPage, GetStaticProps } from "next";
import prepareUpdatesList from "../util/prepareUpdatesList";
import ReactMarkdown from "react-markdown";

interface Props {
  content: Content;
}
interface Content {
  attributes: UpdatesAttributes;
  body: string;
}
interface UpdatesAttributes {
  title: string;
  image: string;
  updates: Update[];
}
interface Update {
  short_title: string;
  date: string;
}

const Updates: NextPage<Props> = ({ content }) => {
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
      <div className="BodyContainer"></div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/updates.md`);
  const updates = prepareUpdatesList();

  return { props: { content: content.default } };
};

export default HomePage;
