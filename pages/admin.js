import dynamic from "next/dynamic";
import config from "../cms/config";
import Index from "pages/index.tsx";
import WGs from "pages/wgs.tsx";

// regular js, because can't figure out how to override that dynamic expects a component output

const CMS = dynamic(
  async () => {
    const cms = await import("netlify-cms-app");
    cms.init({ config });
    cms.registerPreviewStyle("previewstyles/globals.css");
    cms.registerPreviewStyle("previewstyles/index.css");
    cms.registerPreviewStyle("previewstyles/WGs.css");

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
