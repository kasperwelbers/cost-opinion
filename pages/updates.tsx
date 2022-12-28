import { NextPage, GetStaticProps } from "next";
import prepareUpdatesList from "../util/prepareUpdatesList";
import readMd from "../util/readMd";
import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { FaCaretDown, FaChevronCircleDown } from "react-icons/fa";

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
  id: string;
  title: string;
  date: string;
  image: string;
  author: string;
}

const Updates: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;

  return (
    <div className={"AppComponent Updates"}>
      <div className={"Header fade-in"}>
        <h1>{attributes.title}</h1>
      </div>
      <div className="Body">
        <UpdateList updates={attributes.updates} />
      </div>
    </div>
  );
};

interface UpdateListProps {
  updates: Update[];
}

const UpdateList: FunctionComponent<UpdateListProps> = ({ updates }) => {
  const pagesize = 5;
  const [nItems, setNItems] = useState(pagesize);
  const router = useRouter();

  const showUpdates = updates.slice(0, nItems);
  if (showUpdates.length === 0)
    return (
      <div style={{ textAlign: "center" }}>There are no updates yet :(</div>
    );

  return (
    <div className="UpdatesList">
      {showUpdates.map((update, i) => {
        return (
          <div
            key={i + update.id}
            className="UpdateLink fade-in"
            onClick={() => router.push("updates/" + update.id)}
          >
            <div
              className="Image"
              style={{
                backgroundImage: `url("${update.image}")`,
              }}
            />
            <div className="Text">
              <div className="Date">
                <b>{update.date}</b>
                <span style={{ paddingLeft: "1rem" }}>{update.author}</span>
              </div>
              <h3 className="Title">{update.title}</h3>
            </div>
          </div>
        );
      })}
      {nItems >= updates.length ? null : (
        <div className="ShowMore">
          <FaChevronCircleDown
            size="5rem"
            onClick={() => setNItems((current) => current + pagesize)}
          />
        </div>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/updates.md");
  content.attributes.updates = prepareUpdatesList();
  return { props: { content } };
};

export default Updates;
