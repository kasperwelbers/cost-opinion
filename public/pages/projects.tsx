import { GetStaticProps, NextPage } from "next";
import readMd from "../util/readMd";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import prepareResultsList from "../util/prepareResultsList";
import prepareDeliverablesList from "../util/prepareDeliverablesList";
import prepareProjectsList from "../util/prepareProjectsList";
import { useState } from "react";

interface Props {
  title: string;
  body: string;
  projects: Projects[];
}

interface Result {
  id: string;
  title: string;
  author: string;
  published_in: string;
  pub_year: string;
  url: string;
}

interface Projects {
  id: string;
  title: string;
  description: string;
  logos: {
    logo: string;
  }[];
}

const Results: NextPage<Props> = ({ title, body, projects }) => {
  const [selected, setSelected] = useState("");
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
            background: #fff;
            color: black;
            padding: 1rem 2rem;
            border-radius: 10px;
            border: 1px solid var(--primary-light);
            cursor: pointer;
            font-weight: 700;
            font-size: 2.4rem;
          }
          .Item.selected {
            border-radius: 10px 10px 0 0;
          }
          .Item:hover {
          }
          .Item h4 {
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
            width: 3.5rem;
            text-align: center;
            border-radius: 5px;
            margin-bottom: 8px;
            height: 2.45rem;
            padding: 0 0.3rem 0 0.3rem;
          }
          .NoShadow {
            text-shadow: none;
          }
          .Description {
            margin-top: 0.4rem;
            background: #fffc;
            color: black;
            padding: 2rem;
            border-radius: 0px 0px 10px 10px;
            animation: fadeIn 0.5s;
          }
          .Logos {
            justify-content: center;
            display: flex;
            max-width: 100%;
          }
          .Logos img {
            flex: auto;
            padding-top: 10px;
            min-width: 120px;
            max-height: 120px;
            margin: 1rem;
          }
          .hidden {
            display: none;
          }
        `}
      </style>
      <div className="Results">
        <div className="Container">
          <ReactMarkdown className="NoMargin">{body}</ReactMarkdown>
          <div className="List">
            {projects.map((project) => {
              console.log(project.description);
              return (
                <div key={project.id}>
                  <div
                    className={`Item ${selected === project.id ? "selected" : ""}`}
                    onClick={() =>
                      selected === project.id
                        ? setSelected("")
                        : setSelected(project.id)
                    }
                  >
                    <div className="">{project.title}</div>
                    <div className="Logos">
                      {project.logos.map((logo) => {
                        console.log(logo);
                        return (
                          <img
                            key={logo.logo}
                            src={logo.logo}
                            alt={project.title}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className={`Description ${selected === project.id ? "" : "hidden"}`}
                  >
                    <ReactMarkdown className="NoMargin">
                      {project.description}
                    </ReactMarkdown>
                  </div>
                </div>
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
  const projects = prepareProjectsList() || [];
  return { props: { title: attributes.title, body, projects } };
};

export default Results;
