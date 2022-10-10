import dynamic from "next/dynamic";
import config from "../cms/config";
import Index from "pages/index.tsx";
import WGs from "pages/wgs.tsx";
import Updates from "./updates";
import People from "./people";
import preparePeopleContent from "../util/preparePeopleContent";
import Update from "./updates/[id]";

// regular js, because can't figure out how to override that dynamic expects a component output

const CMS = dynamic(
  async () => {
    const cms = await import("netlify-cms-app");
    cms.init({ config });
    cms.registerPreviewStyle("styles/globals.css");
    cms.registerPreviewStyle("styles/GridTable.css");
    cms.registerPreviewStyle("styles/index.css");
    cms.registerPreviewStyle("styles/Nav.css");
    cms.registerPreviewStyle("styles/people.css");
    cms.registerPreviewStyle("styles/PeopleList.css");
    cms.registerPreviewStyle("styles/updates.css");
    cms.registerPreviewStyle("styles/WGs.css");

    cms.registerPreviewTemplate("home", ({ entry }) => {
      return (
        <div className="AppContainer">
          <Index content={asContent(entry)} />;
        </div>
      );
    });

    cms.registerPreviewTemplate("wgs", ({ entry }) => {
      return (
        <div className="AppContainer">
          <WGs content={asContent(entry)} />;
        </div>
      );
    });

    cms.registerPreviewTemplate("people", ({ entry }) => {
      const contentMd = asContent(entry);
      const content = preparePeopleContent(contentMd);
      return (
        <div className="AppContainer">
          <People content={content} />;
        </div>
      );
    });

    cms.registerPreviewTemplate("updates", ({ entry }) => {
      const content = asContent(entry);
      content.attributes.updates = [
        {
          id: "1",
          title: "Title goes here",
          image: "img/europe.jpeg",
          date: "2020-01-01",
          author: "Author goes here",
        },
      ];

      return (
        <div className="AppContainer">
          <Updates content={content} />;
        </div>
      );
    });

    cms.registerPreviewTemplate("update", ({ entry }) => {
      const content = asContent(entry);
      content.attributes.date = content.attributes.date
        .toISOString()
        .split("T")[0];
      content.attributes.id = "id";
      return (
        <div className="AppContainer">
          <Update content={content} />;
        </div>
      );
    });
  },
  { ssr: false, loading: () => <p>Loading...</p> }
);

const AdminPage = () => {
  return <CMS />;
};

const asContent = (entry) => {
  const data = entry.toJS().data;
  const content = { attributes: { ...data } };
  if (content.attributes.body) {
    content.body = content.attributes.body;
    delete content.attributes.body;
  }
  return content;
};

export default AdminPage;
