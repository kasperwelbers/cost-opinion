import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import styles from "styles/Home.module.css";
import MapChart from "../components/Map";

interface Props {
  content: Content;
}
interface Content {
  attributes: HomeAttributes;
  body: string;
}
interface HomeAttributes {
  title: string;
  subtitle: string;
  image: string;
}

const HomePage: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  return <MapChart />;
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/people.md`);
  return { props: { content: content.default } };
};

export default HomePage;
