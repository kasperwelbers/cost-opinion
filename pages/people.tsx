import { NextPage, GetStaticProps } from "next";
import preparePeopleContent from "../util/preparePeopleContent";
import GridTable from "../components/GridTable";
import PeopleList from "../components/PeopleList";
import { ColumnSpec, Person } from "../types";
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart";
import { useState } from "react";

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

  return (
    <div className="AppComponent PeopleContainer">
      <div
        className="AppComponentImage"
        style={{
          backgroundImage: `url("${attributes.image}")`,
        }}
      />

      <div className="Container People">
        <h1 className="Title">{attributes.title}</h1>
        <div className="PeopleBody">
          {/* <ReactMarkdown>{body}</ReactMarkdown> */}
          <PeopleList roles={attributes.roles} />
        </div>
        <div className="PeopleMap">
          <MapChart
            setTooltipContent={setTooltip}
            countries={attributes.countries}
          />
          <ReactTooltip html={true} backgroundColor="#000000ff">
            {tooltip}
          </ReactTooltip>
        </div>
        <div className="PeopleTableBox">
          <GridTable
            data={attributes.people}
            columns={columns}
            backgroundColor="var(--primary-light)"
          />
        </div>
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
