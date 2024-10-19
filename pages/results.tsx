import { GetStaticProps, NextPage } from "next";
import readMd from "../util/readMd";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import prepareResultsList from "../util/prepareResultsList";
import prepareDeliverablesList from "../util/prepareDeliverablesList";

interface Props {
  title: string;
  body: string;
  results: Result[];
  deliverables: Deliverable[];
}

interface Result {
  id: string;
  title: string;
  author: string;
  published_in: string;
  pub_year: string;
  url: string;
}

interface Deliverable {
  id: string;
  deliverable: string;
  workgroup: string;
  title: string;
  url: string;
}

const Results: NextPage<Props> = ({ title, body, results, deliverables }) => {
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
            text-shadow: none;
          }
          .List {
            display: flex;
            flex-direction: column;
            gap: 1rem;
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
          .author {
            font-size: clamp(1.2rem, 1.8vw, 1rem);
            line-height: clamp(1.5rem, 2.2vw, 2rem);
          }
          .DeliverableHeader {
            display: flex;
            justify-content: space-between;
            items-align: start;
          }
          .Deliverable {
            background: var(--primary);
            color: white;
            font-size: 1.5rem;
            width: 4rem;
            border-radius: 5px;
            margin-bottom: 8px;
            height: 2.45rem;
            padding: 0 0.3rem 0 0.3rem;
          }
          .NoShadow {
            text-shadow: none;
          }
        `}
      </style>
      <div className="Results">
        <div className="Container">
          <h1>Deliverables</h1>
          <ReactMarkdown className="NoMargin">{body}</ReactMarkdown>
          <hr />
          <br />
          <div className="List">
            {deliverables.map((deliverable) => {
              return (
                <a
                  key={deliverable.id}
                  className="Item"
                  href={deliverable.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="DeliverableHeader">
                    <h4 className="NoShadow">{deliverable.title}</h4>
                    {deliverable.deliverable ? (
                      <div className="Deliverable">
                        {deliverable.deliverable}
                      </div>
                    ) : null}
                  </div>
                  <div className="author">{deliverable.workgroup}</div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="Container">
          <h1>Publications</h1>
          <ReactMarkdown className="NoMargin">{body}</ReactMarkdown>
          <hr />
          <br />
          <div className="List">
            {results.map((result) => {
              return (
                <a
                  key={result.id}
                  className="Item"
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4 className="NoShadow">{result.title}</h4>
                  <div className="author">
                    {result.author} ({result.pub_year}).{" "}
                    <i>{result.published_in}</i>
                  </div>
                </a>
              );
            })}
          </div>
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
  const { attributes, body } = readMd("content/pages/results.md");
  const results = prepareResultsList() || [];
  const deliverables = prepareDeliverablesList() || [];
  return { props: { title: attributes.title, body, results, deliverables } };
};

export default Results;
