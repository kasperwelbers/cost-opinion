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
  attributes: UpdateAttributes;
  body: string;
}
interface UpdateAttributes {
  id: string;
  title: string;
  image: string;
  date: string;
  author: string;
}

const Update: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  return (
    <div className={"AppComponent Updates"}>
      <div className={"Header fade-in"}>
        <Link href="/updates">
          <button
            className="Button"
            style={{
              width: "10rem",
              background: "#fff3",
              marginBottom: "2rem",
            }}
          >
            <FaBackward size="2rem" />
          </button>
        </Link>
        <h1>{attributes.title}</h1>
        <b>{attributes.author}</b>
        <br />
        <span>{attributes.date}</span>
      </div>
      <div className="Update">
        {attributes.image ? (
          <img src={"/" + attributes.image} alt={attributes.image} />
        ) : null}
        <div className="UpdateBody">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const updates = fs.readdirSync("content/pages/updates");
  const paths = updates.map((u) => ({
    params: { id: u.replace(/\.md$/, "") },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  // no idea why ids can be an array, but hence the silly stuff
  const ids: string | string[] = params?.id || "";
  const id: string = Array.isArray(ids) ? ids[0] : ids;
  const content = readMd(`content/pages/updates/${id}.md`);
  if (typeof content.attributes.date !== "string")
    content.attributes.date = content.attributes.date
      .toISOString()
      .split("T")[0];
  if (
    content.attributes.announce_until &&
    typeof content.attributes.announce_until !== "string"
  )
    content.attributes.announce_until = content.attributes.announce_until
      .toISOString()
      .split("T")[0];
  content.attributes.id = id;

  return {
    props: { content },
  };
};

export default Update;
