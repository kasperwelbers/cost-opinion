import { NextPage, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import readMd from "../util/readMd";
import LogoNet from "../public/logos/logo_net.svgr";
import prepareUpdatesList from "../util/prepareUpdatesList";
import UpdateList from "../components/UpdateList";
import { Update } from "../types";

interface Props {
  content: Content;
  announcements: Update[];
}
interface Content {
  attributes: HomeAttributes;
  body: string;
}
interface HomeAttributes {
  title: string;
  subtitle: string;
  who: string;
  what: string;
  image: string;
}

const HomePage: NextPage<Props> = ({ content, announcements }) => {
  const { attributes, body } = content;
  return (
    <main className={"AppComponent Home"}>
      <div className={"Header"}>
        <div className={"Container relative fade-in"}>
          <div>
            <h1 className={"Title"}>{attributes.title}</h1>
            {attributes.subtitle && (
              <h3 className={"Subtitle"}>{attributes.subtitle}</h3>
            )}
          </div>
        </div>
      </div>
      <div className="Body">
        <div className="HomeAnnouncements">
          {announcements.length > 0 && (
            <>
              {/* <h2>Announcements</h2> */}
              <UpdateList updates={announcements} />
            </>
          )}
        </div>
        <div className={"BodyContainer fade-in"}>
          <div>
            <ReactMarkdown>{attributes.what}</ReactMarkdown>
          </div>
          <div>
            <img src="/img/opinion_i.gif" alt={"OPINION logo"} />
            {/* <LogoNet /> */}
          </div>
        </div>
        {/* <div className="MapContainer fade-in-slow">
          <div className="container">
            <PeopleMap content={peopleContent} />
          </div>
        </div> */}
        <div className="BodyContainer inverse fade-in">
          <div>
            <ReactMarkdown>{attributes.who}</ReactMarkdown>
          </div>
          <div>
            <LogoNet />
          </div>
        </div>

        {/* <div className={"BodyContainer"}>
          <LogoCg />
          <div className={"container"}>
            <ReactMarkdown>{attributes.who}</ReactMarkdown>
          </div>
        </div> */}
      </div>

      <div className="EmptyFlex" />
      <div className="Cost fade-in">
        <div>
          Opinion is funded by COST{"  "}(
          <a href="https://www.cost.eu/actions/CA21129/">CA21129</a>)
        </div>
        <div>
          <ReactMarkdown>
            COST (European Cooperation in Science and Technology) is a funding
            agency for research and innovation networks. Our Actions help
            connect research initiatives across Europe and enable scientists to
            grow their ideas by sharing them with their peers. This boosts their
            research, career and innovation.
          </ReactMarkdown>
        </div>
      </div>
      {/* <div className="spacer wave" />
      <div className="Underwater"></div> */}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = readMd("content/pages/home.md");

  const updates = prepareUpdatesList();
  const announcements = updates.filter((update) => {
    return (
      update.announce_until && Date.parse(update.announce_until) >= Date.now()
    );
  });

  return { props: { content, announcements } };
};

export default HomePage;
