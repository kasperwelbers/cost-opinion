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
  console.log(content.body);
  return (
    <div className={`AppComponent PoliciesContainer`}>
      <div className="Policies">
        <ReactMarkdown
          className="NoMargin"
          components={{
            h1: ({ node, ...props }: any) => (
              <h1 id={generateSlug(props.children[0])} {...props}></h1>
            ),
            h2: ({ node, ...props }: any) => (
              <h2 id={generateSlug(props.children[0])} {...props}></h2>
            ),
            h3: ({ node, ...props }: any) => (
              <h3 id={generateSlug(props.children[0])} {...props}></h3>
            ),
          }}
        >
          {content.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/policies.md");
  return { props: { content } };
};

const generateSlug = (string: string) => {
  let str = string.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
};

export default Policies;
