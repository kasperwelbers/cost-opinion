import { NextPage } from "next";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Person } from "../types";

interface Props {
  roles: { [role: string]: Person };
}

// groups: Leadership and coordination
// or: action chair / grant holder / coordination / working groups

const PeopleList: NextPage<Props> = ({ roles }) => {
  if (!roles) return null;

  return (
    <div className="PeopleGrid">
      {/* {Object.keys(roles).map((role) => {
        return <Person role={role} roles={roles} />;
      })} */}

      <Group key="leaders" name="Action Management">
        <Person role="AC" label="action chair" roles={roles} />
        <Person role="ACV" label="vice action chair" roles={roles} />
        <Person role="GHSR" label="scientific representative" roles={roles} />
        <Person
          role="GHSRV"
          label="vice scientific representative"
          roles={roles}
        />
        <Person role="GAC" label="grant awarding coordinator" roles={roles} />
        <Person
          role="WG4V2"
          label="science communication coordinator"
          roles={roles}
        />
        {/* <Person role="GHM" roles={roles} />
        <Person role="GHFL" roles={roles} /> */}
      </Group>
      {["Theory", "Tools", "Data", "Dissemination"].map((wp, i) => (
        <Group key={wp} name={`Workgroup ${i + 1}: ${wp}`}>
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
