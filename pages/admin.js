import dynamic from "next/dynamic";
import config from "../cms/config";

// regular js, because can't figure out how to override that dynamic expects a component output

const CMS = dynamic(
  () =>
    import("netlify-cms-app").then((cms) => {
      cms.init({ config });
    }),
  { ssr: false, loading: () => <p>Loading...</p> }
);

const AdminPage = () => {
  return <CMS />;
};

export default AdminPage;
