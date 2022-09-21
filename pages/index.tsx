import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

interface Props {
  content: { attributes: HomeAttributes };
}
interface HomeAttributes {
  hero_title: string;
  hero_description: string;
  hero_image: string;
}

const HomePage: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  return (
    <div>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default HomePage;
