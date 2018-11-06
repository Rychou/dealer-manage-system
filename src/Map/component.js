import React, { Component } from 'react';
import { AMap, MassMarks, Marker } from 'react-amap-binding';
import PropTypes from 'prop-types';

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

  handleClick(map, target, e) {
    console.log(1);
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

  render() {
    return (
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
    );
  }
}

Map.propTypes = {
  fetchMapData: PropTypes.func.isRequired,
  isResolved: PropTypes.bool.isRequired,
};

export default Map;
