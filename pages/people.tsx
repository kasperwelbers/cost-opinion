import { NextPage, GetStaticProps } from "next";
import preparePeopleContent from "../util/preparePeopleContent";
import GridTable from "components/GridTable";
import ReactMarkdown from "react-markdown";

interface Props {
  content: Content;
}
interface Content {
  attributes: PeopleAttributes;
  body: string;
}
interface PeopleAttributes {
  title: string;
  image: string;
  people: Person[];
}
interface Person {
  name: string;
  homepage: string;
  country: string;
  countryCode: string;
  countryFlag: string;
}

const columns = [
  { name: "countryFlag", label: "🌎", style: { textAlign: "center" } },
  { name: "name", label: "The Network", href: "homepage" },
];

const People: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  return (
    <div className="Container People">
      <div className="PeopleBody">
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
      <div className="PeopleTableBox">
        <GridTable data={attributes.people} columns={columns} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentMd = await import(`../content/pages/people.md`);
  const content = preparePeopleContent(contentMd.default);
  return { props: { content: content } };
};

export default People;
