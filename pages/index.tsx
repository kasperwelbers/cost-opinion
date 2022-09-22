import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import styles from "styles/Home.module.css";

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
  return (
    <main className={styles.Home}>
      <div className={styles.Header}>
        <div className={"Container relative fade-in"}>
          <div>
            <h1 className={styles.Title}>{attributes.title}</h1>
            {attributes.subtitle && (
              <h3 className={styles.Subtitle}>{attributes.subtitle}</h3>
            )}
          </div>
          <div
            className={styles.Image}
            style={{
              backgroundImage: `url("${attributes.image}")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>

      <div className={styles.BodyContainer}>
        <div className={`${styles.Body} container fade-in-slow`}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/home.md`);
  return { props: { content: content.default } };
};

export default HomePage;
