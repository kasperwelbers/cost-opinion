import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import styles from "styles/Home.module.css";
import styled from "styled-components";

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

const Wrapper = styled.div`
  & {
    height: 100%;
    width: 100%;
  }
  & .Home {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  & .Header {
    background-color: var(--primary);
    color: var(--primary);
    height: 100%;
    width: 100%;
    background: white;
    padding: clamp(10px, 5vh, 15rem) 0;
  }

  & .HeaderContainer {
    position: relative;
  }

  & .Title {
    font-size: clamp(18px, 8vw, 70px);
    margin-bottom: 0;
    width: 55%;
  }

  & .Subtitle {
    font-weight: 400;
    font-size: clamp(10px, 4vw, 30px);
    width: 55%;
  }

  & .Image {
    position: absolute;
    top: 0;
    left: 65%;
    margin-top: clamp(0px, 2vw, 15px);
    width: 40%;
    height: 100%;
  }

  & .BodyContainer {
    flex: 1 1 auto;
    background: var(--primary-light);
  }

  & .Body {
    padding-top: 20px;
    font-size: clamp(10px, 2vw, 15px);
  }
`;

const HomePage: NextPage<Props> = ({ content }) => {
  const { attributes, body } = content;
  return (
    <main className={"Home"}>
      <div className={"Header"}>
        <div className={"Container relative fade-in"}>
          <div>
            <h1 className={"Title"}>{attributes.title}</h1>
            {attributes.subtitle && (
              <h3 className={"Subtitle"}>{attributes.subtitle}</h3>
            )}
          </div>
          <div
            className={"Image"}
            style={{
              backgroundImage: `url("${attributes.image}")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>

      <div className={"BodyContainer"}>
        <div className={"Body container fade-in-slow"}>
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
