import React, { Component } from 'react';
import { AMap, MassMarks, InfoWindow, Marker } from 'react-amap-binding';
import PropTypes from 'prop-types';
import DashBoard from './DashBoard';
import SearchForm from './SearchForm';
import './index.less';
import { Spin } from 'antd';

class Map extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      marker: {
        visible: false,
      },
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
        ...this.state.marker,
        position: e.data.lnglat,
        label: {
          content: e.data.selfNum,
        },
        visible: true,
      },
    });
  };

  handleMouseOut = () => {
    this.setState({
      marker: {
        ...this.state.marker,
        visible: false,
      },
    });
  };

  handleClick = (map, target, e) => {
    const { fetchBusInfo, updateInfoWindow } = this.props;
    fetchBusInfo({ vin: e.data.vin });
    // 更新坐标
    updateInfoWindow({
      position: e.data.lnglat,
    });
  };

  handleInfoWindowClose = () => {
    const { updateInfoWindow } = this.props;
    updateInfoWindow({ visible: false });
  };

  render() {
    const { fetchMapData, points, styles, dashboard, infoWindow, isResolved } = this.props;
    return (
      <div className="map-container">
        <Spin spinning={!isResolved} tip="Loading...">
          <div className="map-cover">
            <SearchForm fetchMapData={fetchMapData} />
            <DashBoard dashboard={dashboard} />
          </div>
          <AMap appKey={process.env.AMAP_KEY}>
            <MassMarks
              data={points}
              style={styles}
              onClick={this.handleClick}
              zIndex={99}
              zooms={[3, 22]}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
            />
            <InfoWindow onClose={this.handleInfoWindowClose} {...infoWindow} />
            <Marker content="none" {...this.state.marker} />
          </AMap>
        </Spin>
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
