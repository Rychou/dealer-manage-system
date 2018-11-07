import React, { Component } from 'react';
import { AMap, MassMarks, Marker } from 'react-amap-binding';
import PropTypes from 'prop-types';
import DashBoard from './DashBoard';
import './index.less';

class Map extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      marker: {},
    };
  }

  componentDidMount() {
    const { isResolved, fetchMapData } = this.props;
    if (!isResolved) {
      fetchMapData();
    }
  }

  handleMouseOver = (map, target, e) => {
    this.setState({
      marker: {
        position: e.data.lnglat,
        label: {
          content: e.data.selfNum,
        },
      },
    });
  };

  handleClick = (map, target, e) => {};

  render() {
    return (
      <div className="map-container">
        <div className="map-cover">
          <DashBoard dashboard={this.props.dashboard} />
        </div>
        <AMap appKey={process.env.AMAP_KEY}>
          <MassMarks
            data={this.props.points}
            style={this.props.styles}
            onClick={this.handleClick}
            zIndex={99}
            zooms={[3, 22]}
            onMouseOver={this.handleMouseOver}
          />
          <Marker icon="none" zIndex={100} {...this.state.marker} />
        </AMap>
      </div>
    );
  }
}

Map.propTypes = {
  fetchMapData: PropTypes.func.isRequired,
  isResolved: PropTypes.bool.isRequired,
  points: PropTypes.array,
  styles: PropTypes.array,
};

export default Map;
