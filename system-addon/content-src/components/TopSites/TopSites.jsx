const React = require("react");
const {connect} = require("react-redux");
const {FormattedMessage} = require("react-intl");

const TopSitesPerfTimer = require("./TopSitesPerfTimer");
const TopSitesEdit = require("./TopSitesEdit");
const {TopSite, TopSitePlaceholder} = require("./TopSite");
const {InfoIntl} = require("content-src/components/Sections/Sections");

const TopSites = props => {
  const realTopSites = props.TopSites.rows.slice(0, props.TopSitesCount);
  const placeholderCount = props.TopSitesCount - realTopSites.length;
  const infoOption = {
    header: {id: "settings_pane_topsites_header"},
    body: {id: "settings_pane_topsites_body"}
  };
  return (<TopSitesPerfTimer>
    <section className="section top-sites">
      <div className="section-top-bar">
        <h3 className="section-title"><span className={`icon icon-small-spacer icon-topsites`} /><FormattedMessage id="header_top_sites" /></h3>
        <InfoIntl infoOption={infoOption} dispatch={props.dispatch} />
      </div>
      <ul className="top-sites-list">
        {realTopSites.map((link, index) => link && <TopSite
          key={link.guid || link.url}
          dispatch={props.dispatch}
          link={link}
          index={index}
          intl={props.intl} />)}
        {placeholderCount > 0 && [...Array(placeholderCount)].map((_, i) => <TopSitePlaceholder key={i} />)}
      </ul>
      <TopSitesEdit {...props} />
    </section>
  </TopSitesPerfTimer>);
};

module.exports = connect(state => ({TopSites: state.TopSites, TopSitesCount: state.Prefs.values.topSitesCount}))(TopSites);
module.exports._unconnected = TopSites;
