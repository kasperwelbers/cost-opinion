import { NextPage, GetStaticProps } from "next";
import prepareUpdatesList from "../util/prepareUpdatesList";
import readMd from "../util/readMd";
import { useMemo } from "react";
import { Update } from "../types";
import UpdateList from "../components/UpdateList";

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

const Updates: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;

  const [updates, announcements] = useMemo(() => {
    const updates: Update[] = [];
    const announcements: Update[] = [];

    const now = Date.now();
    for (const update of attributes.updates) {
      if (update.announce_until && Date.parse(update.announce_until) >= now) {
        announcements.push(update);
      } else {
        updates.push(update);
      }
    }
    return [updates, announcements];
  }, [attributes]);

  return (
    <div className={"AppComponent Updates"}>
      <div className="Body">
        {announcements.length > 0 && (
          <div>
            <div className={"Header fade-in"}>
              <h2>Announcements</h2>
            </div>
            <UpdateList updates={announcements} />
          </div>
        )}
        <div>
          <div className={"Header fade-in"}>
            <h2>{attributes.title}</h2>
          </div>
          <UpdateList updates={updates} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/updates.md");
  content.attributes.updates = prepareUpdatesList();
  return { props: { content } };
};

export default Updates;
