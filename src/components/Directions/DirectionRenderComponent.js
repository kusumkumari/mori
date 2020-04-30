/* eslint-disable */
import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow
} from 'react-google-maps'
import IntlMessages from '../../helpers/IntlMessages'
import BatteryAlertIcon from '@material-ui/icons/BatteryAlert'
import Battery20Icon from '@material-ui/icons/Battery20'
import Battery30Icon from '@material-ui/icons/Battery30'
import Battery50Icon from '@material-ui/icons/Battery50'
import Battery60Icon from '@material-ui/icons/Battery60'
import Battery80Icon from '@material-ui/icons/Battery80'
import Battery90Icon from '@material-ui/icons/Battery90'
import BatteryFullIcon from '@material-ui/icons/BatteryFull'
import SignalCellular0BarIcon from '@material-ui/icons/SignalCellular0Bar'
import SignalCellular1BarIcon from '@material-ui/icons/SignalCellular1Bar'
import SignalCellular2BarIcon from '@material-ui/icons/SignalCellular2Bar'
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar'
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar'
const key = 'AIzaSyCIDUSBqHPfkEssENT_X9vuWt5nzca8_W4'

const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`

class Map extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: [],
      maplength: 0
    }
    this.handleToogle = this.handleToogle.bind(this)
  }

  handleToogle = i => {
    this.setState(state => {
      const newOpen = state.isOpen
      newOpen[i] = !newOpen[i]
      return { isOpen: newOpen }
    })
  }
  UNSAFE_componentWillUpdate(props) {
    const { maplength } = props
    if (maplength === this.state.maplength) return

    this.setState(state => {
      const newData = new Array(maplength).fill(false)
      state.isOpen.forEach((stat, i) => {
        if (newData[i] !== undefined) newData[i] = stat
      })
      return { isOpen: newData, maplength }
    })
  }
  render = () => {
    // console.log(
    //   'map data',
    //   this.state.isOpen
    // )
    const { mapData, maplength } = this.props
    // let battery = this.props.path[0] ? this.props.path[0].battery : ""
    // let device = this.props.path[0] ? this.props.path[0].device : ""
    // let firstLat = this.props.path[0] ? this.props.path[0].lat : ""
    // let firstLong = this.props.path[0] ? this.props.path[0].lng : ""
    // let emp_name = this.props.path[0] ? this.props.path[0].emp_name : ""
    // let username = this.props.path[0] ? this.props.path[0].username : ""
    // let startTime = this.props.path[0] ? this.props.path[0].startTime : ""
    // let endTime = this.props.path[0] ? this.props.path[0].endTime : ""
    // let signal = this.props.path[0] ? this.props.path[0].signal : ""

    return (
      <GoogleMap
        googleMapURL={G_API_URL}
        defaultZoom={12}
        defaultCenter={{ lat: 35.6762, lng: 139.6503 }}>
        {mapData.map((data, idx) => (
          <>
            {idx == 0 ? (
              <Polyline
                path={data.location_data}
                options={{ strokeColor: '#FF0000' }}
              />
            ) : (
              ''
            )}
            {idx == 1 ? (
              <Polyline
                path={data.location_data}
                options={{ strokeColor: '#0000FF' }}
              />
            ) : (
              ''
            )}
            {idx == 2 ? (
              <Polyline
                path={data.location_data}
                options={{ strokeColor: '#006400' }}
              />
            ) : (
              ''
            )}
            {idx == 3 ? (
              <Polyline
                path={data.location_data}
                options={{ strokeColor: '#07290f' }}
              />
            ) : (
              ''
            )}
            {idx == 4 ? (
              <Polyline
                path={data.location_data}
                options={{ strokeColor: '#FFA500' }}
              />
            ) : (
              ''
            )}
            <Marker
              icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              position={data.location_data[0]}
              onMouseOver={() => this.handleToogle(idx)}
              onMouseOut={() => this.handleToogle(idx)}>
              {this.state.isOpen[idx] && (
                <InfoWindow onCloseClick={() => this.handleToogle(idx)}>
                  <div style={{ fontSize: '16px' }}>
                    <b className='text-primary'>
                      <i className='iconsminds-engineering text-primary ft-16'></i>
                      <IntlMessages id='employee-name' /> :
                    </b>
                    {data.emp_name} <br />
                    <b className='text-primary'>
                      <i className='iconsminds-user text-primary ft-16'></i>
                      <IntlMessages id='user-name' /> :
                    </b>
                    {data.username} <br />
                    <b className='text-primary'>
                      <i className='iconsminds-smartphone-3 text-primary ft-16'></i>
                      <IntlMessages id='device.id' /> :
                    </b>
                    {data.device_id} <br />
                    <b className='text-primary'>
                      <i
                        className='simple-icon-calendar text-primary ft-16'
                        style={{ paddingLeft: '3px' }}></i>
                      <IntlMessages id='start-time' /> :
                    </b>
                    {data.start_time} <br />
                    <b className='text-primary'>
                      <i
                        className='simple-icon-calendar text-primary ft-16'
                        style={{ paddingLeft: '3px' }}></i>
                      <IntlMessages id='end-time' /> :
                    </b>
                    {data.end_time} <br />
                    <b>
                      {data.battery_percentage == 0 ? <BatteryAlertIcon /> : ''}
                      {data.battery_percentage == 20 ? <Battery20Icon /> : ''}
                      {data.battery_percentage == 30 ? <Battery30Icon /> : ''}
                      {data.battery_percentage == 50 ? <Battery50Icon /> : ''}
                      {data.battery_percentage == 60 ? <Battery60Icon /> : ''}
                      {data.battery_percentage == 80 ? <Battery80Icon /> : ''}
                      {data.battery_percentage == 90 ? <Battery90Icon /> : ''}
                      {data.battery_percentage == 100 ? (
                        <BatteryFullIcon />
                      ) : (
                        ''
                      )}

                      {data.battery_percentage + '%'}
                    </b>
                    <b>
                      {data.signal_quality == 0 ? (
                        <SignalCellular0BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 1 ? (
                        <SignalCellular1BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 3 ? (
                        <SignalCellular2BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 5 ? (
                        <SignalCellular3BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 7 ? (
                        <SignalCellular4BarIcon />
                      ) : (
                        ''
                      )}
                    </b>
                  </div>
                </InfoWindow>
              )}
            </Marker>
            <Marker
              position={
                data.location_data[
                  data.location_data ? data.location_data.length - 1 : 0
                ]
              }
              onMouseOver={() => this.handleToogle(idx)}
              onMouseOut={() => this.handleToogle(idx)}>
              {this.state.isOpen[idx] && (
                <InfoWindow onCloseClick={() => this.handleToogle(idx)}>
                  <div style={{ fontSize: '16px' }}>
                    <b className='text-primary'>
                      <i className='iconsminds-engineering text-primary ft-16'></i>
                      <IntlMessages id='employee-name' /> :
                    </b>
                    {data.emp_name} <br />
                    <b className='text-primary'>
                      <i className='iconsminds-user text-primary ft-16'></i>
                      <IntlMessages id='user-name' /> :
                    </b>
                    {data.username} <br />
                    <b className='text-primary'>
                      <i className='iconsminds-smartphone-3 text-primary ft-16'></i>
                      <IntlMessages id='device.id' /> :
                    </b>
                    {data.device_id} <br />
                    <b className='text-primary'>
                      <i
                        className='simple-icon-calendar text-primary ft-16'
                        style={{ paddingLeft: '3px' }}></i>
                      <IntlMessages id='start-time' /> :
                    </b>
                    {data.start_time} <br />
                    <b className='text-primary'>
                      <i
                        className='simple-icon-calendar text-primary ft-16'
                        style={{ paddingLeft: '3px' }}></i>
                      <IntlMessages id='end-time' /> :
                    </b>
                    {data.end_time} <br />
                    <b>
                      {data.battery_percentage == 0 ? <BatteryAlertIcon /> : ''}
                      {data.battery_percentage == 20 ? <Battery20Icon /> : ''}
                      {data.battery_percentage == 30 ? <Battery30Icon /> : ''}
                      {data.battery_percentage == 50 ? <Battery50Icon /> : ''}
                      {data.battery_percentage == 60 ? <Battery60Icon /> : ''}
                      {data.battery_percentage == 80 ? <Battery80Icon /> : ''}
                      {data.battery_percentage == 90 ? <Battery90Icon /> : ''}
                      {data.battery_percentage == 100 ? (
                        <BatteryFullIcon />
                      ) : (
                        ''
                      )}

                      {data.battery_percentage + '%'}
                    </b>
                    <b>
                      {data.signal_quality == 0 ? (
                        <SignalCellular0BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 1 ? (
                        <SignalCellular1BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 3 ? (
                        <SignalCellular2BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 5 ? (
                        <SignalCellular3BarIcon />
                      ) : (
                        ''
                      )}
                      {data.signal_quality == 7 ? (
                        <SignalCellular4BarIcon />
                      ) : (
                        ''
                      )}
                    </b>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </>
        ))}
      </GoogleMap>
    )
  }
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
)(Map)
