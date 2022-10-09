import { NextPage, GetStaticProps } from "next";
import prepareUpdatesList from "../util/prepareUpdatesList";
import ReactMarkdown from "react-markdown";
import readMd from "../util/readMd";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

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
      <div className="spacer wave" />
      <div className="Underwater"></div>
    </div>
  );
};

interface UpdateListProps {
  updates: Update[];
}

const UpdateList: FunctionComponent<UpdateListProps> = ({ updates }) => {
  const [nItems, setNItems] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // infinite scroll
    addItemsIfBottom(setNItems);
    window.addEventListener("scroll", () => addItemsIfBottom(setNItems));
    return () => {
      window.removeEventListener("scroll", () => addItemsIfBottom(setNItems));
    };
  }, [setNItems]);

  const showUpdates = updates.slice(0, nItems);
  if (showUpdates.length === 0) return <div>There are no updates :(</div>;

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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/updates.md");
  content.attributes.updates = prepareUpdatesList();
  return { props: { content } };
};

const addItemsIfBottom = (setNItems: Dispatch<SetStateAction<number>>) => {
  const { scrollTop, offsetHeight } = document.documentElement;
  const { innerHeight } = window;
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

  if (bottomOfWindow) setNItems((current) => current + 5);
};

export default Updates;
