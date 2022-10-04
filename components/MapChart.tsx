import React, {
  Dispatch,
  FunctionComponent,
  memo,
  SetStateAction,
} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { Person } from "../types";

// include TURKEY as nomral
// include CYpres, Israel, states as separaten nodes

const memberCountryStyle = {
  fill: "#ffffff",
  default: {
    fill: "#ffffff",
    outline: "none",
    cursor: "pointer",
    stroke: "black",
  },
  hover: {
    fill: "var(--primary-light)",
    outline: "none",
    cursor: "pointer",
  },
  pressed: {
    fill: "#E42",
    outline: "none",
    cursor: "pointer",
  },
};

interface Props {
  setTooltipContent: Dispatch<SetStateAction<string | undefined>>;
  setPopup: (x: number, y: number, people: Person[]) => void;
  countries: Record<string, Person[]>;
}

const MapChart: FunctionComponent<Props> = ({
  setTooltipContent,
  setPopup,
  countries,
}) => {
  const onClick = (countryCode: string, e: any) => {
    if (countries[countryCode])
      setPopup(e.clientX, e.clientY, countries[countryCode]);
  };

  const onMouseEnter = (countryCode: string) => {
    if (countries[countryCode]) {
      const members = countries[countryCode];
      const label = `<b>${members[0].country} ${members[0].countryFlag} <br/> ${members.length} members</b>`;

      setTooltipContent(label);
    }
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div data-tip="">
      <ComposableMap
        width={600}
        height={450}
        //projection="geoAzimuthalEqualArea"
        projectionConfig={{
          center: [18, 50],
          scale: 800,
        }}
        //style={{ borderRight: "0.5px solid #ffffff77" }}
      >
        <Geographies geography="/data/world.json">
          {({ geographies }) => {
            const missedCountries = new Set(Object.keys(countries));
            geographies = geographies.filter((geo) => {
              const membercountry = countries[geo.properties["Alpha-2"]];
              if (membercountry)
                missedCountries.delete(geo.properties["Alpha-2"]);
              return !!membercountry;
            });
            const miniGeographies = geographies.filter((geo) =>
              ["MT"].includes(geo.properties["Alpha-2"])
            );
            if (missedCountries.size > 0) {
              console.log(
                "SOME MEMBER COUNTRIES NOT CORRECTLY MATCHED (CHECK THE COUNTRY CODES)",
                missedCountries
              );
            }
            return (
              <>
                {geographies.map((geo) => {
                  const countryCode = geo.properties["Alpha-2"];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={(e) => onClick(countryCode, e)}
                      onMouseEnter={() => onMouseEnter(countryCode)}
                      onMouseLeave={onMouseLeave}
                      style={memberCountryStyle}
                    ></Geography>
                  );
                })}
                {miniGeographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const countryCode = geo.properties["Alpha-2"];

                  return (
                    <g key={geo.rsmKey}>
                      <Marker
                        coordinates={centroid}
                        style={memberCountryStyle}
                        onClick={(e) => onClick(countryCode, e)}
                        onMouseEnter={() => onMouseEnter(countryCode)}
                        onMouseLeave={onMouseLeave}
                      >
                        <rect height={"10px"} width="10px" />
                      </Marker>
                    </g>
                  );
                })}
              </>
            );
          }}
        </Geographies>
        <Marker
          coordinates={[-10, 70]}
          style={memberCountryStyle}
          onClick={(e) => onClick("US", e)}
          onMouseEnter={() => onMouseEnter("US")}
          onMouseLeave={onMouseLeave}
        >
          <text
            style={{
              fontSize: "15px",
              cursor: "pointer",
              stroke: "white",
            }}
            x="25"
            y="18"
          >
            United States
          </text>
          <rect height={"20px"} width="20px" />
        </Marker>
        <Marker
          coordinates={[-9.7, 67]}
          style={memberCountryStyle}
          onClick={(e) => onClick("IL", e)}
          onMouseEnter={() => onMouseEnter("IL")}
          onMouseLeave={onMouseLeave}
        >
          <text
            style={{ fontSize: "15px", cursor: "pointer", stroke: "white" }}
            x="25"
            y="18"
          >
            Israel
          </text>
          <rect height={"20px"} width="20px" />
        </Marker>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
