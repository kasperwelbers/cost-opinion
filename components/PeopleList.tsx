import { NextPage } from "next";
import { FunctionComponent } from "react";
import { FaEnvelope } from "react-icons/fa";
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
    <div className="PeopleList">
      {/* {Object.keys(roles).map((role) => {
        return <Person role={role} roles={roles} />;
      })} */}
      <Group
        key="leaders"
        name="Action Management & Workgroups"
        type="management"
        mail="leaders@opinion-network.eu"
      >
        <Person role="AC" label="action chair" roles={roles} />
        <Person role="ACV" label="action vice chair" roles={roles} />
        <Person
          role="GHSR"
          label="grant holder scientific representative"
          roles={roles}
        />
        <Person
          role="WG4V2"
          label="science communication coordinator"
          roles={roles}
        />
        <Person role="GAC" label="grant awarding coordinator" roles={roles} />
        <Person
          role="GHSRV"
          label="grant holder vice scientific representative"
          roles={roles}
        />
        <div className="Person" />
        <Person
          role="GACV"
          label="vice grant awarding coordinator"
          roles={roles}
        />
        <Person role="GHM" label="grant holder manager" roles={roles} />

        {/* <Person role="GHM" roles={roles} />
        <Person role="GHFL" roles={roles} /> */}
      </Group>

      <Group
        key={"wg1"}
        name={`Theory`}
        type="workgroup"
        mail="wg1-leaders@opinion-network.eu"
      >
        <Person key={"theory"} role={`WG1L`} label="chair" roles={roles} />
        <Person key="theory1" role={`WG1V1`} label="vice chair" roles={roles} />
        <Person key="theory2" role={`WG1V2`} label="Theory" roles={roles} />
      </Group>
      <Group
        key={"wg2"}
        name={`Tools`}
        type="workgroup"
        mail="wg2-leaders@opinion-network.eu"
      >
        <Person key={"tools"} role={`WG2L`} label="chair" roles={roles} />
        <Person key="tools1" role={`WG2V1`} label="vice chair" roles={roles} />
        <Person key="tools2" role={`WG2V2`} label="vice chair" roles={roles} />
      </Group>
      <Group
        key={"wg3"}
        name={`Application & Data`}
        type="workgroup"
        mail="wg3-leaders@opinion-network.eu"
      >
        <Person key={"data"} role={`WG3L`} label="chair" roles={roles} />
        <Person key="data1" role={`WG3V1`} label="vice chair" roles={roles} />
        <Person key="data2" role={`WG3V2`} label="vice chair" roles={roles} />
      </Group>
      <Group
        key={"wg4"}
        name={`Inclusion & Dissemination`}
        type="workgroup"
        mail="wg4-leaders@opinion-network.eu"
      >
        <Person
          key={"dissemination"}
          role={`WG4L`}
          label="chair"
          roles={roles}
        />
        <Person key="diss1" role={`WG4V1`} label="vice chair" roles={roles} />
        <Person key="diss2" role={`WG4V2`} label="vice chair" roles={roles} />
      </Group>
    </div>
  );
};

interface GroupProps {
  name: string;
  children: ReactElement[];
  type: string;
  mail?: string;
}

const Group: FunctionComponent<GroupProps> = ({
  name,
  children,
  type,
  mail,
}) => {
  return (
    <div className={`RoleGroupContainer ${type}`}>
      <div className="GroupLabel">
        <h4>{name}</h4>
        {mail && <Mail to={mail} />}
      </div>

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
      <div>{roles?.[role]?.name || ""}</div>
      <label>{roles?.[role] ? label : ""}</label>
    </div>
  );
};

const Mail: FunctionComponent<{ to: string }> = ({ to }) => {
  // function mailTo() {
  //   window.open(`mailto:${to}`);
  // }

  return (
    <div className="Mail">
      <a href={`mailto:${to}`}>
        <FaEnvelope
          style={{
            fontSize: "1.7rem",
            paddingRight: "0.8rem",
            transform: "translateY(4px)",
            cursor: "pointer",
          }}
        />
      </a>
      {to}
    </div>
  );
};

export default PeopleList;
