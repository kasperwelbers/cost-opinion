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
  "SCC/WG4VL2": "Science Communication Coordinator & WG4 Vice 2",
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

// groups: Leadership and coordination
// or: action chair / grant holder / coordination / working groups

const PeopleList: NextPage<Props> = ({ roles }) => {
  if (!roles) return null;

  return (
    <div className="PeopleGrid">
      {/* {Object.keys(roles).map((role) => {
        return <Person role={role} roles={roles} />;
      })} */}

      <Group name="Action Leaders">
        <Person role="AC" label="action chair" roles={roles} />
        <Person role="ACV" label="vice action chair" roles={roles} />
        <Person role="GHSR" label="scientific representative" roles={roles} />
        <Person
          role="GHSRV"
          label="vice scientific representative"
          roles={roles}
        />
        <Person role="GSC" label="grant awarding coordinator" roles={roles} />
        <Person
          role="GHSRV"
          label="science communication coordinator"
          roles={roles}
        />
        {/* <Person role="GHM" roles={roles} />
        <Person role="GHFL" roles={roles} /> */}
      </Group>
      {["Theory", "Tools", "Data", "Dissemination"].map((wp, i) => (
        <Group name={`Workgroup ${i + 1}: ${wp}`}>
          <Person role={`WG${i + 1}L`} label="chair" roles={roles} />
          <Person role={`WG${i + 1}V1`} label="vice chair 1" roles={roles} />
          <div className="Person" />
          <Person role={`WG${i + 1}V2`} label="vice chair 2" roles={roles} />
        </Group>
      ))}
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
  label: String;
  roles: { [role: string]: Person };
}

const Person = ({ role, label, roles }) => {
  return (
    <div className="Person">
      <div>{roles?.[role]?.name || "..."}</div>
      <label>{label}</label>
    </div>
  );
};

export default PeopleList;
