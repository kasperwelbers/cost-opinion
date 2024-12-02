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
  fill: "white",
  default: {
    fill: "white",
    outline: "none",
    cursor: "pointer",
    stroke: "black",
  },
  hover: {
    fill: "var(--primary-light)",
    outline: "none",
    cursor: "pointer",
    stroke: "black",
  },
  pressed: {
    fill: "#E42",
    outline: "none",
    cursor: "pointer",
  },
};
const nonMemberStyle = {
  default: {
    fill: "#66616144",
    outline: "none",
    cursor: "pointer",
    stroke: "black",
  },
  hover: {
    fill: "#ffffff44",
    outline: "none",
    stroke: "black",
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
    e.preventDefault();
    e.stopPropagation();
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
            geographies = geographies.filter((geo, i) => {
              const code = geo.properties["Alpha-2"];

              const membercountry = countries[code];
              if (membercountry || NONEU.includes(code))
                missedCountries.delete(code);
              if (!showCountries.includes(code)) return false;
              return true;
            });

            const miniGeographies = geographies.filter((geo) =>
              ["MT"].includes(geo.properties["Alpha-2"]),
            );
            if (missedCountries.size > 0) {
              console.log(
                "SOME MEMBER COUNTRIES NOT CORRECTLY MATCHED (CHECK THE COUNTRY CODES)",
                missedCountries,
              );
            }

            return (
              <>
                {geographies.map((geo) => {
                  const countryCode = geo.properties["Alpha-2"];
                  const isMember = countries[countryCode];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={(e) => onClick(countryCode, e)}
                      onMouseEnter={() => onMouseEnter(countryCode)}
                      onMouseLeave={onMouseLeave}
                      style={isMember ? memberCountryStyle : nonMemberStyle}
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
        {NONEU.map((countryCode, i) => {
          return (
            <Marker
              key={countryCode}
              coordinates={[40 - i, 69 - i * 2.5]}
              style={memberCountryStyle}
              onClick={(e) => onClick(countryCode, e)}
              onMouseEnter={() => onMouseEnter(countryCode)}
              onMouseLeave={onMouseLeave}
            >
              <text
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  cursor: "pointer",
                  stroke: "white",
                  strokeWidth: "0.3px",
                }}
                x="15"
                y="5"
              >
                {countryCode}
              </text>
              <circle r={9} fill="white" />
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

const NONEU = ["US", "IL", "KZ", "MX"];
const showCountries = [
  "AL",
  "AT",
  "BI",
  "BE",
  "BG",
  "BA",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "ES",
  "EE",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MD",
  "MK",
  "MT",
  "ME",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RS",
  "SK",
  "SI",
  "SE",
  "TR",
  "UA",
];

export default memo(MapChart);
