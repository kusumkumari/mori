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
  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.path.length ? new Array(props.path.length).fill(false) : []
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
  render = () => {
    const { path } = this.props

    return (
      <GoogleMap
        googleMapURL={G_API_URL}
        defaultZoom={12}
        defaultCenter={{ lat: 35.6762, lng: 139.6503 }}>
        {path.map((data, idx) => (
          <Marker
            position={data}
            onMouseOver={() => this.handleToogle(idx)}
            onMouseOut={() => this.handleToogle(idx)}>
            {this.state.isOpen[idx] && (
              <InfoWindow onCloseClick={this.handleToogle}>
                <div style={{ fontSize: '16px' }}>
                  <b className='text-primary'>
                    <i
                      className='iconsminds-engineering text-primary'
                      style={{ fontSize: 'x-large' }}></i>
                    <IntlMessages id='employee-name' /> :
                  </b>
                  {data.emp_name} <br />
                  <b className='text-primary'>
                    <i
                      className='iconsminds-user text-primary'
                      style={{ fontSize: 'x-large' }}></i>
                    <IntlMessages id='user-name' /> :
                  </b>
                  {data.username} <br />
                  <b className='text-primary'>
                    <i
                      className='iconsminds-smartphone-3 text-primary'
                      style={{ fontSize: 'x-large' }}></i>
                    <IntlMessages id='device.id' /> :
                  </b>
                  {data.device} <br />
                  <b>
                    {data.battery == 0 ? <BatteryAlertIcon /> : ''}
                    {data.battery == 20 ? <Battery20Icon /> : ''}
                    {data.battery == 30 ? <Battery30Icon /> : ''}
                    {data.battery == 50 ? <Battery50Icon /> : ''}
                    {data.battery == 60 ? <Battery60Icon /> : ''}
                    {data.battery == 80 ? <Battery80Icon /> : ''}
                    {data.battery == 90 ? <Battery90Icon /> : ''}
                    {data.battery == 100 ? <BatteryFullIcon /> : ''}

                    {data.battery + '%'}
                  </b>
                  <b>
                    {data.signal == 0 ? <SignalCellular0BarIcon /> : ''}
                    {data.signal == 1 ? <SignalCellular1BarIcon /> : ''}
                    {data.signal == 3 ? <SignalCellular2BarIcon /> : ''}
                    {data.signal == 5 ? <SignalCellular3BarIcon /> : ''}
                    {data.signal == 7 ? <SignalCellular4BarIcon /> : ''}
                  </b>
                </div>
              </InfoWindow>
            )}
          </Marker>
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
