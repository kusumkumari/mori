
import React, { Component } from "react";
import Map from "./DirectionRenderMap";

export default class Directions extends Component {

  render() {
    const { data, dataLength } = this.props;

    const path = [];
    for (let index = 0; index < dataLength; index++) {
      const { id, battery_percentage, device_id, lat,lon,signal_quality,username,emp_name } = data[index];
      path.push({ lat: lat, lng: lon, battery: battery_percentage, device: device_id,signal:signal_quality,username:username,emp_name:emp_name })
    }

console.log("pathhhhhhhhhhhhhh",path)
    return (

      <Map path={path} />

    );
  }
}