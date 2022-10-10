import { NextPage } from "next";
import { FunctionComponent } from "react";
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
        <Person role="ACV" label="action vice chair" roles={roles} />
        <Person
          role="GHSR"
          label="grant holder scientific representative"
          roles={roles}
        />
        <Person
          role="GHSRV"
          label="GH vice scientific representative"
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

      <Group key={"wgchairs"} name={`Working group chairs`}>
        <Person key={"theory"} role={`WG1L`} label="Theory" roles={roles} />
        <Person key={"tools"} role={`WG2L`} label="Tools" roles={roles} />
        <Person
          key={"data"}
          role={`WG3L`}
          label="Application & Data"
          roles={roles}
        />
        <Person
          key={"dissemination"}
          role={`WG4L`}
          label="Inclusion & Dissemination"
          roles={roles}
        />
      </Group>
      <Group key={"wgvicechairs"} name={`Working group vice chairs`}>
        <Person key="theory1" role={`WG1V1`} label="Theory" roles={roles} />
        <Person key="theory2" role={`WG1V2`} label="Theory" roles={roles} />

        <Person key="tools1" role={`WG2V1`} label="Tools" roles={roles} />
        <Person key="tools2" role={`WG2V2`} label="Tools" roles={roles} />

        <Person
          key="data1"
          role={`WG3V1`}
          label="Application & Data"
          roles={roles}
        />
        <Person
          key="data2"
          role={`WG3V2`}
          label="Application & Data"
          roles={roles}
        />

        <Person
          key="diss1"
          role={`WG4V1`}
          label="Inclusion & Dissemination"
          roles={roles}
        />
        <Person
          key="diss2"
          role={`WG4V2`}
          label="Inclusion & Dissemination"
          roles={roles}
        />
      </Group>
    </div>
  );
};

interface GroupProps {
  name: string;
  children: ReactElement[];
}

const Group: FunctionComponent<GroupProps> = ({ name, children }) => {
  return (
    <div className="RoleGroupContainer">
      <h4>{name}</h4>
      <div className="RoleGroup">{children}</div>
    </div>
  );
};

interface PersonProps {
  role: string;
  label: string;
  roles: { [role: string]: Person };
}

const Person: FunctionComponent<PersonProps> = ({ role, label, roles }) => {
  return (
    <div className="Person">
      <div>{roles?.[role]?.name || "..."}</div>
      <label>{label}</label>
    </div>
  );
};

export default PeopleList;
