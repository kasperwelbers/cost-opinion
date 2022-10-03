import React, { createRef, memo, RefObject } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

// include TURKEY as nomral
// include CYpres, Israel, states as separaten nodes

const memberCountryStyle = {
  default: {
    fill: "#ffffff",
    outline: "none",
    stroke: "black",
    cursor: "pointer",
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

const MapChart = ({ setTooltipContent, setPopup, countries }) => {
  const onClick = (countryCode: String, e: MouseEvent) => {
    if (countries[countryCode])
      setPopup(e.clientX, e.clientY, countries[countryCode]);
  };

  const onMouseEnter = (countryCode: String) => {
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
            const ref = createRef();
            const missedCountries = new Set(Object.keys(countries));
            geographies = geographies.filter((geo) => {
              const membercountry = countries[geo.properties["Alpha-2"]];
              if (membercountry)
                missedCountries.delete(geo.properties["Alpha-2"]);
              return !!membercountry;
            });
            if (missedCountries.size > 0) {
              console.log(
                "SOME MEMBER COUNTRIES NOT CORRECTLY MATCHED (CHECK THE COUNTRY CODES)",
                missedCountries
              );
            }
            return (
              <>
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const countryCode = geo.properties["Alpha-2"];
                  const countryPerson = countries[countryCode][0];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      ref={ref}
                      geography={geo}
                      onClick={(e) => onClick(countryCode, e)}
                      onMouseEnter={() => onMouseEnter(countryCode)}
                      onMouseLeave={onMouseLeave}
                      style={memberCountryStyle}
                    >
                      <Marker coordinates={centroid}>
                        <text fontSize={14} textAnchor="middle" y="2">
                          test
                        </text>
                      </Marker>
                    </Geography>
                  );
                })}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const countryCode = geo.properties["Alpha-2"];
                  const countryPerson = countries[countryCode][0];
                  let size = "10px";
                  let offsetX = "0";
                  if (["MT", "CY"].includes(countryCode)) {
                    size = "20px";
                    offsetX = "10";
                  }

                  return (
                    <g
                      key={geo.rsmKey}
                      geography={geo}
                      style={memberCountryStyle}
                    >
                      <Marker
                        coordinates={centroid}
                        onClick={() => onClick(countryCode)}
                        onMouseEnter={() => onMouseEnter(countryCode)}
                        onMouseLeave={onMouseLeave}
                      >
                        <text
                          style={{ fontSize: size, cursor: "pointer" }}
                          x={offsetX}
                          y="5"
                        >
                          {countryPerson.countryFlag}
                        </text>
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
          onClick={() => onClick("US")}
          onMouseEnter={() => onMouseEnter("US")}
          onMouseLeave={onMouseLeave}
        >
          <text style={{ fontSize: "25px", cursor: "pointer" }} x="25" y="18">
            🇺🇸
          </text>
          <rect height={"20px"} width="20px" />
        </Marker>
        <Marker
          coordinates={[-9.7, 67]}
          style={memberCountryStyle}
          onClick={() => onClick("IL")}
          onMouseEnter={() => onMouseEnter("IL")}
          onMouseLeave={onMouseLeave}
        >
          <text style={{ fontSize: "25px", cursor: "pointer" }} x="25" y="18">
            🇮🇱
          </text>
          <rect height={"20px"} width="20px" />
        </Marker>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
