import { GetStaticProps, NextPage } from "next";
import readMd from "../util/readMd";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import { FaBackward } from "react-icons/fa";

interface Props {
  content: Content;
}

interface Content {
  body: string;
}

const Glossary: NextPage<Props> = ({ content }) => {
  return (
    <div className={`AppComponent GlossaryContainer`}>
      <div className="Glossary">
        {content.body && (
          <div dangerouslySetInnerHTML={{ __html: content.body }} />
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/glossary.md");
  return { props: { content } };
};

export default Glossary;
