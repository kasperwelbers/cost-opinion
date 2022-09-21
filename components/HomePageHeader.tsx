import React from "react";
import PropTypes from "prop-types";

import Content from "./Content";
import BackgroundImage from "./BackgroundImage";
import "./PageHeader.css";

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = "",
}) => {
  if (large) className += " PageHeader-large";
  return (
    <div className={`PageHeader relative ${className}`}>
      {backgroundImage && (
        <BackgroundImage src={backgroundImage} opacity={0.4} />
      )}
      <div className="container relative">
        <h1 className="PageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="PageHeader--Subtitle" src={subtitle} />
        )}
      </div>
    </div>
  );
};
PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

/**
 * Alternative page header for the Home page
 */
export const HomePageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  className = "",
}) => {
  if (large) className += " HomePageHeader-large";
  return (
    <div className={`HomePageHeader relative ${className}`}>
      {backgroundImage && (
        <BackgroundImage src={backgroundImage} opacity={1} contain />
      )}
      <div className="container relative">
        <h1 className="HomePageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="HomePageHeader--Subtitle" src={subtitle} />
        )}
      </div>
    </div>
  );
};
HomePageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PageHeader;
