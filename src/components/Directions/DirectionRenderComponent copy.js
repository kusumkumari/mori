/* eslint-disable */
import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow
} from "react-google-maps";
import IntlMessages from "../../helpers/IntlMessages";
import BatteryAlertIcon from '@material-ui/icons/BatteryAlert';
import Battery20Icon from '@material-ui/icons/Battery20';
import Battery30Icon from '@material-ui/icons/Battery30';
import Battery50Icon from '@material-ui/icons/Battery50';
import Battery60Icon from '@material-ui/icons/Battery60';
import Battery80Icon from '@material-ui/icons/Battery80';
import Battery90Icon from '@material-ui/icons/Battery90';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import SignalCellular0BarIcon from '@material-ui/icons/SignalCellular0Bar';
import SignalCellular1BarIcon from '@material-ui/icons/SignalCellular1Bar';
import SignalCellular2BarIcon from '@material-ui/icons/SignalCellular2Bar';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';
const key = "AIzaSyCIDUSBqHPfkEssENT_X9vuWt5nzca8_W4";

const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`;

class Map extends Component {
  state = {
    isOpen: false,
  }
  handleToogle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  render = () => {
    let battery = this.props.path[0] ? this.props.path[0].battery : ""
    let device = this.props.path[0] ? this.props.path[0].device : ""
    let firstLat = this.props.path[0] ? this.props.path[0].lat : ""
    let firstLong = this.props.path[0] ? this.props.path[0].lng : ""
    let emp_name = this.props.path[0] ? this.props.path[0].emp_name : ""
    let username = this.props.path[0] ? this.props.path[0].username : ""
    let startTime = this.props.path[0] ? this.props.path[0].startTime : ""
    let endTime = this.props.path[0] ? this.props.path[0].endTime : ""
    let signal = this.props.path[0] ? this.props.path[0].signal : ""

    return (
      <GoogleMap
        googleMapURL={G_API_URL}
        defaultZoom={12}
        defaultCenter={firstLat ? { lat: firstLat, lng: firstLong } : { lat: 35.6762, lng: 139.6503 }}
      >
        <Polyline path={this.props.path} options={{ strokeColor: "#FF0000 " }} />
        <Marker position={this.props.path[this.path ? this.path.length - 1 : 0]} onMouseOver={this.handleToogle}>
          {this.state.isOpen &&
            <InfoWindow onCloseClick={this.handleToogle}>
              <div style={{ fontSize: "16px" }}>
                <b className="text-primary"><i className="iconsminds-engineering text-primary ft-16"> </i> <IntlMessages id="employee-name" /> : </b> {emp_name} <br />
                <b className="text-primary"> <i className="iconsminds-user text-primary ft-16"> </i> <IntlMessages id="user-name" /> :  </b> {username} <br />
                <b className="text-primary"> <i className="iconsminds-smartphone-3 text-primary ft-16"></i> <IntlMessages id="device.id" /> : </b> {device} <br />
                <b className="text-primary">  <i className="simple-icon-calendar text-primary ft-16" style={{paddingLeft:"3px"}}> </i>  <IntlMessages id="start-time" /> : </b> {startTime} <br />
                <b className="text-primary"><i className="simple-icon-calendar text-primary ft-16" style={{paddingLeft:"3px"}}> </i>  <IntlMessages id="end-time" /> : </b> {endTime} <br />


                <b>{battery == 0 ? <BatteryAlertIcon /> : ""}
                  {battery == 20 ? <Battery20Icon /> : ""}
                  {battery == 30 ? <Battery30Icon /> : ""}
                  {battery == 50 ? <Battery50Icon /> : ""}
                  {battery == 60 ? <Battery60Icon /> : ""}
                  {battery == 80 ? <Battery80Icon /> : ""}
                  {battery == 90 ? <Battery90Icon /> : ""}
                  {battery == 100 ? <BatteryFullIcon /> : ""}

                  {battery + "%"}</b>
                <b>{signal==0?
                  <SignalCellular0BarIcon />: ""}
                  {signal ==1 ? <SignalCellular1BarIcon /> : ""}
                  {signal ==3 ? <SignalCellular2BarIcon /> : ""}
                  {signal ==5 ? <SignalCellular3BarIcon /> : ""}
                  {signal ==7 ? <SignalCellular4BarIcon /> : ""} </b>
              </div>
            </InfoWindow>
          }
        </Marker>
      </GoogleMap>
    );
  };
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Map);
