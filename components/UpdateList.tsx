import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { FaChevronCircleDown } from "react-icons/fa";
import { Update } from "../types";

interface UpdateListProps {
  updates: Update[];
}

const UpdateList: FunctionComponent<UpdateListProps> = ({ updates }) => {
  const pagesize = 5;
  const [nItems, setNItems] = useState(pagesize);
  const router = useRouter();

  const showUpdates = updates.slice(0, nItems);
  if (showUpdates.length === 0)
    return (
      <div style={{ textAlign: "center" }}>There are no updates yet :(</div>
    );

  return (
    <div className="UpdatesList">
      {showUpdates.map((update, i) => {
        return (
          <div
            key={i + update.id}
            className="UpdateLink fade-in"
            onClick={() => router.push("updates/" + update.id)}
          >
            <div
              className="Image"
              style={{
                backgroundImage: `url("${update.image}")`,
              }}
            />
            <div className="Text">
              <div className="Date">
                <b>{update.date}</b>
                <span style={{ paddingLeft: "1rem" }}>{update.author}</span>
              </div>
              <h3 className="Title">{update.title}</h3>
            </div>
          </div>
        );
      })}
      {nItems >= updates.length ? null : (
        <div className="ShowMore">
          <FaChevronCircleDown
            size="5rem"
            onClick={() => setNItems((current) => current + pagesize)}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateList;
