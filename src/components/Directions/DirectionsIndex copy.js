
import React, { Component } from "react";
import Map from "./DirectionRenderComponent";

export default class Directions extends Component {
  
  render() {
    const {mapData,mapDataLength} =this.props;
    const path = [];
    for (let index = 0; index < mapDataLength; index++) {
      const {id,battery_percentage,device_id,location_data, start_time, end_time,emp_name,username,signal_quality } = mapData[index];
      for(let j=0; j<location_data.length; j++){
      const { from_lat,from_lon } = location_data[j];
      path.push({ lat: from_lat, lng: from_lon, battery:battery_percentage, device:device_id,startTime:start_time,endTime:end_time,emp_name:emp_name,username:username,signal:signal_quality})
      }
    }
   console.log("tttttttttssssssssssss",path)
    return (
        
 <Map path={path} />
     
    );
  }
}


