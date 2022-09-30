import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// include TURKEY as nomral
// include CYpres, Israel, states as separaten nodes

const MapChart = ({ setTooltipContent }) => {
  return (
    <div data-tip="">
      <ComposableMap
        width={600}
        height={600}
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10.0, -53.0, 0],
          scale: 900,
        }}
        //style={{ borderRight: "0.5px solid #ffffff77" }}
      >
        <Geographies geography="/data/europe.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              console.log(geo);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => alert(geo.properties.geounit)}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.geounit}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#ffffff",
                      outline: "none",
                    },
                    hover: {
                      fill: "var(--primary-light)",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);