import { GetStaticProps, NextPage } from "next";
import readMd from "../util/readMd";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface Props {
  content: Content;
}

interface Content {
  body: string;
}

const Policies: NextPage<Props> = ({ content }) => {
  return (
    <div className={`AppComponent PoliciesContainer`}>
      <div className="Policies">
        <ReactMarkdown className="NoMargin">{content.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/policies.md");
  return { props: { content } };
};

export default Policies;
