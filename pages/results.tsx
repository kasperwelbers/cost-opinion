import { GetStaticProps, NextPage } from "next";
import readMd from "../util/readMd";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import prepareResultsList from "../util/prepareResultsList";

interface Props {
  content: Content;
}

interface Content {
  body: string;
  attributes: {
    results: ResultsAttributes[];
  };
}

interface ResultsAttributes {
  id: string;
  title: string;
  author: string;
  published_in: string;
  pub_year: string;
  url: string;
}

const Results: NextPage<Props> = ({ content }) => {
  return (
    <div className={`AppComponent`}>
      <style jsx>
        {`
          .Results {
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .Container {
            width: 100%;
            margin-top: 2rem;
            padding: 2rem;
            max-width: 800px;
          }
          .Results h1 {
            text-align: center;
          }
          .Item {
            background: #fffb;
            color: black;
            padding: 1rem 2rem;
            border-radius: 10px;
            border: 1px solid var(--primary-light);
            cursor: pointer;
          }
          .Item:hover {
            background: #fffd;
          }
          .Item h4 {
            color: var(--primary);
          }
          a {
            display: block;
            color: black;
            text-decoration: none;
          }
        `}
      </style>
      <div className="Results">
        <div className="Container">
          <h1>Results</h1>
          <hr />
          <br />
          {content.attributes.results.map((result) => {
            return (
              <a
                key={result.id}
                className="Item"
                href={result.url}
                target="_blank"
                rel="noreferrer"
              >
                <h4>{result.title}</h4>
                <span>
                  {result.author} ({result.pub_year}).{" "}
                  <i>{result.published_in}</i>
                </span>
              </a>
            );
          })}
        </div>
        {/* <ReactMarkdown
          className="NoMargin"
          components={{
            h1: ({ node, ...props }: any) => (
              <h1 id={generateSlug(props.children[0])} {...props}></h1>
            ),
            h2: ({ node, ...props }: any) => (
              <h2 id={generateSlug(props.children[0])} {...props}></h2>
            ),
            h3: ({ node, ...props }: any) => (
              <h3 id={generateSlug(props.children[0])} {...props}></h3>
            ),
            pre: ({ node, ...props }: any) => {
              const { className, children } = props.children[0].props;
              const title = className?.split("language-")?.[1];

              return (
                <div
                  style={{
                    borderRadius: "5px",
                    textAlign: "justify",
                    padding: "2rem 2rem",
                    background: "#0006",
                    color: "#bbb",
                    marginTop: "4rem",
                  }}
                >
                  {title ? (
                    <h3 style={{ textAlign: "center", color: "white" }}>
                      {title}
                    </h3>
                  ) : null}
                  <div>{children}</div>
                </div>
              );
            },
            hr: ({ node, ...props }: any) => {
              console.log(props);
              return <hr style={{ marginBottom: "4rem" }} {...props}></hr>;
            },
            code: ({ node, ...props }: any) => {
              console.log(props);
              return <p {...props}></p>;
            },
          }}
        >
          {content.body}
        </ReactMarkdown> */}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/results.md");
  content.attributes.results = prepareResultsList();
  return { props: { content } };
};

const generateSlug = (string: string) => {
  let str = string.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
};

export default Results;
