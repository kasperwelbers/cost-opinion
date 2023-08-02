import { GetStaticProps, NextPage } from "next";
import readMd from "../util/readMd";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface Props {
  content: Content;
}

interface Content {
  body: string;
  attributes: GrantAttributes;
}

interface GrantAttributes {
  title: string;
  description: string;
  members_only_text: string;
  footnote: string;
  grant_types: GrantType[];
}

interface GrantType {
  title: string;
  who: string;
  what: string;
  how_much: string;
  how: string;
  members_only: boolean;
}

const Grants: NextPage<Props> = ({ content }) => {
  const [selected, setSelected] = useState<number>();
  const { title, description, members_only_text, footnote, grant_types } =
    content.attributes;

  const selectedGrant = selected != null && grant_types?.[selected];
  console.log(members_only_text);
  return (
    <div className={`AppComponent Grants`}>
      <h1 className="Title">{title}</h1>

      <p className="Description">{description}</p>

      <div className={`GrantsBody ${selected != null ? "showDetails" : ""}`}>
        <div className="GrantTypes">
          {grant_types.map((grant, i) => {
            return (
              <div
                key={grant.title}
                className={`GrantType ${i === selected ? "selected" : ""}`}
                onClick={() => setSelected(i)}
              >
                <h3>
                  <ReactMarkdown className="NoMargin">
                    {grant.title}
                  </ReactMarkdown>
                </h3>
              </div>
            );
          })}
        </div>
        <div className={`GrantTypeDetails`}>
          {selectedGrant ? (
            <div className="GrantTypeBody fade-in">
              <div className="GrantTypeWho">
                <h3>Who is eligible</h3>
                <ReactMarkdown className="NoMargin">
                  {selectedGrant.who + (selectedGrant.members_only ? "*" : "")}
                </ReactMarkdown>
              </div>
              <div className="GrantTypeWhat">
                <h3>What is it for</h3>
                <ReactMarkdown className="NoMargin">
                  {selectedGrant.what}
                </ReactMarkdown>
              </div>
              <div className="GrantTypeHowMuch">
                <h3>Budget per grant</h3>
                <ReactMarkdown className="NoMargin">
                  {selectedGrant.how_much}
                </ReactMarkdown>
              </div>
              <div className="GrantTypeHow">
                <h3>How to apply</h3>
                <ReactMarkdown className="NoMargin">
                  {selectedGrant.how}
                </ReactMarkdown>
              </div>
              {selectedGrant.members_only && (
                <div className="MembersOnly">
                  <ReactMarkdown className="NoMargin">
                    {"*" + members_only_text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      <div className="footnote">
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/grants.md");
  return { props: { content } };
};

export default Grants;
