import { NextPage, GetStaticProps } from "next";
import preparePeopleContent from "../util/preparePeopleContent";
import GridTable from "../components/GridTable";
import PeopleList from "../components/PeopleList";
import { ColumnSpec, Person } from "../types";
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart";
import { useCallback, useState } from "react";
import Portal from "../components/Portal";

interface Props {
  content: PeopleContent;
  columns: ColumnSpec[];
}
interface PeopleContent {
  attributes: PeopleAttributes;
  body: string;
}
interface PeopleAttributes {
  title: string;
  image: string;
  people: Person[];
  roles: { [role: string]: Person };
  countries: { [countryCode: string]: Person };
}

const People: NextPage<Props> = ({ content, columns }) => {
  const { attributes, body } = content;
  const [tooltip, setTooltip] = useState(null);
  const [openPortal, setOpenPortal] = useState(false);
  const [portalData, setPortalData] = useState<{
    x: Number;
    y: number;
    content: string;
  }>({ x: null, y: null, content: null });

  const setPopup = useCallback((x: number, y: number, people: Person[]) => {
    setPortalData({ x, y, content: "test" });
    setOpenPortal(true);
  });

  return (
    <div className="AppComponent PeopleContainer">
      <div
        className="AppComponentImage"
        style={{
          backgroundImage: `url("${attributes.image}")`,
        }}
      />

      <div className="WideContainer People">
        <h1 className="Title">{attributes.title}</h1>
        <div className="PeopleBody">
          {/* <ReactMarkdown>{body}</ReactMarkdown> */}
          <PeopleList roles={attributes.roles} />
        </div>
        <div className="PeopleMap">
          <MapChart
            setTooltipContent={setTooltip}
            setPopup={setPopup}
            countries={attributes.countries}
          />
          <ReactTooltip html={true} backgroundColor="#000000ff">
            {tooltip}
          </ReactTooltip>
          <Portal
            open={openPortal}
            setOpen={setOpenPortal}
            portalData={portalData}
          >
            test
          </Portal>
        </div>
        {/* <div className="PeopleTableBox">
          <GridTable
            data={attributes.people}
            columns={columns}
            backgroundColor="white"
          />
        </div> */}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentMd = await import(`../content/pages/people.md`);
  const content = preparePeopleContent(contentMd.default);

  const columns = [
    { name: "countryFlag", label: "🌎", style: { textAlign: "center" } },
    { name: "name", label: "The Network", href: "homepage" },
  ];

  return { props: { content, columns } };
};

export default People;
