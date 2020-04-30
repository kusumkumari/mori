
import React, { Component } from "react";
import Map from "./DirectionRenderComponent";

export default class Directions extends Component {
  
  render() {
    const {mapData,mapDataLength} =this.props;
   
    return (
        
 <Map mapData={mapData} maplength={mapDataLength} />
     
    );
  }
}


