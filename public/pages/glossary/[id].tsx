import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import readMd from "../../util/readMd";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import { FaBackward } from "react-icons/fa";
import Link from "next/link";

interface Props {
  content: Content;
}
interface Content {
  body: string;
}

const Update: NextPage<Props> = ({ content }) => {
  const { body } = content;
  return (
    <div className={"AppComponent GlossaryContainer"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Link href="/glossary">
            <button
              className="Button"
              style={{
                width: "5rem",
                background: "#fff3",
                marginTop: "2rem",
                marginBottom: "0rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <FaBackward size="2rem" />
              </div>
            </button>
          </Link>
        </div>
        <div className="Glossary">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const updates = fs.readdirSync("content/pages/glossary_items");
  const paths = updates.map((u) => ({
    params: { id: u.replace(/\.md$/, ".html") },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  // no idea why ids can be an array, but hence the silly stuff
  const ids: string | string[] = params?.id || "";
  console.log(ids);
  let id: string = Array.isArray(ids) ? ids[0] : ids;
  id = id.replace(/\.html$/, ""); // remove .html extension
  const content = readMd(`content/pages/glossary_items/${id}.md`);

  return {
    props: { content },
  };
};

export default Update;
