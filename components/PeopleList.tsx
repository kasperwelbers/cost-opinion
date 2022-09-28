import { NextPage } from "next";
import { FaRegFolder } from "react-icons/fa";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Person } from "../types";

interface Props {
  roles: { [role: string]: Person };
}

const roleMap = {
  AC: "Chair",
  ACV: "Vice Chair",
  GHSR: "Scientific Representative",
  GHSRV: "Vice Scientific Representative",
  GHM: "Manager",
  GHFL: "Financial & Legal Representative",
  GSC: "Grant Awarding Coordinator",
  "SCC/WG4VL2": "Science Communication Coordinator / WG4 Vice 2",
  WG1L: "Theory Workgroup Leader",
  WG1V1: "Theory Workgroup Vice 1",
  WG1V2: "Theory Workgroup Vice 2",
  WG2L: "Tools Workgroup Leader",
  WG2V1: "Tools Workgroup Vice 1",
  WG2V2: "Tools Workgroup Vice 2",
  WG3L: "Data Workgroup Leader",
  WG3V1: "Data Workgroup Vice 1",
  WG3V2: "Data Workgroup Vice 2",
  WG4L: "Dissemination Workgroup Leader",
  WG$V1: "Dissemination Workgroup Vice 1",
};

const PeopleList: NextPage<Props> = ({ roles }) => {
  if (!roles) return null;

  return (
    <div className="PeopleGrid">
      {/* {Object.keys(roles).map((role) => {
        return <Person role={role} roles={roles} />;
      })} */}

      <Group name="Action Leaders">
        <Person role="AC" roles={roles} />
        <Person role="ACV" roles={roles} />
      </Group>
      <Group name="Grant Holder Representatives">
        <Person role="GHSR" roles={roles} />
        <Person role="GHSRV" roles={roles} />
        <Person role="GHM" roles={roles} />
        <Person role="GHFL" roles={roles} />
      </Group>
      <Group name="Leadership">
        <Person role="AC" roles={roles} />
        <Person role="ACV" roles={roles} />
      </Group>
    </div>
  );
};

interface GroupProps {
  name: string;
  children: ReactElement[];
}

const Group = ({ name, children }) => {
  return (
    <div className="RoleGroupContainer">
      <h4>{name}</h4>
      <div className="RoleGroup">{children}</div>
    </div>
  );
};

interface PersonProps {
  role: String;
  roles: { [role: string]: Person };
}

const Person = ({ role, roles }) => {
  return (
    <div className="Person">
      <div>{roles?.[role]?.name || "..."}</div>
      <label>{roleMap[role]}</label>
    </div>
  );
};

export default PeopleList;
