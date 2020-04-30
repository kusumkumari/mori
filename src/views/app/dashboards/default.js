/* eslint-disable */
import React, { useState, Component, Fragment } from 'react'
import { injectIntl } from 'react-intl'
import {
  Row,
  Card,
  CardSubtitle,
  CardText,
  Input,
  Button,
  Label
} from 'reactstrap'
import { Colxx, Separator } from '../../../components/common/CustomBootstrap'
import Breadcrumb from '../../../containers/navs/Breadcrumb'
import '../../../assets/css/custom.css'
import { ThemeColors } from '../../../helpers/ThemeColors'
import {
  getDashboardMapDeviceAPI,
  getmantananceAPI,
  dashboardMapDeviceAPI,
  listCardStaticsAPI
} from '../../ApiIntegration'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DetailOrders from './DetailOrders'
import { Notification } from '../../Utils/Notification'
import Directions from '../../../components/Directions/DirectionsIndex'
import { Link } from 'react-router-dom'
import RadialProgressCard from '../../../components/cards/RadialProgressCard'


// use material theme
import 'react-times/css/material/default.css';
import Fab from '@material-ui/core/Fab';
import RestoreIcon from '@material-ui/icons/Restore';

const colors = ThemeColors()

class DefaultDashboard extends Component {
  constructor() {
    super()
    this.state = {
      time: new Date(),
      days: '',
      center: {
        lat: 20.5937,
        lng: 78.9629
      },
      zoom: 4,
      endDate: moment().toString(),
      devices: [],
      data: [],
      dataLength: '',
      modal: false,
      checked: '',
      mapData: [],
      mapDataLength: '',
      completeTask: 0,
      pendingTask: 0,
      offlineDevice: 0,
      onlineDevice: 0,
      startTime: moment(),
      startTimeFormat:moment(),
      endTime: moment(),
      endTimeFormat:moment(),

    }
  }

  handleChangeEnd = date => {
    this.setState({
      endDate: moment(date).toString()
    })
    this.dashboardMapDevice(this.state.devices, moment(date).toString(), this.state.startTime, this.state.endTime)
  }

  selectDevices = e => {
    const { checked } = this.state
    let deviceArray = []
    deviceArray = [...this.state.devices]
    // console.log('checkkkkkkkkkkkkkkkkkkkkkk', e.target.checked, deviceArray)
    if (e.target.checked) {
      deviceArray.push(parseInt(e.target.name))
      this.setState({ devices: deviceArray, checked: e.target.name })
      // console.log('dddddddddddddd', deviceArray)
      this.dashboardMapDevice(deviceArray, this.state.endDate, this.state.startTime, this.state.endTime)
    } else {
      console.log(deviceArray)

      const index = deviceArray.indexOf(parseInt(e.target.name))
      if (index > -1) {
        deviceArray.splice(index, 1)
      }

      // console.log('arrrayyyyyyyyyyyyyyyy', deviceArray)
      this.setState({ devices: deviceArray })
      this.dashboardMapDevice(deviceArray, this.state.endDate, this.state.startTime, this.state.endTime)
    }
    if (localStorage) {
      localStorage.setItem('devicesChecked', JSON.stringify(deviceArray))
      // console.log('devices saved to storage', deviceArray)
    }
  }
  dashboardMapDevice(deviceArray, endDate, startTime, endTime) {
    let stTime
    let enTime
    if (startTime) {
      stTime = startTime
    }
    else {
      stTime = ""
    }
    if (endTime) {
      enTime = endTime
    }
    else {
      enTime = ""
    }
    dashboardMapDeviceAPI(
      { ids: deviceArray, created_at: endDate, start_time: stTime, end_time: enTime },
      apiResponse => {
        console.log('rrrrrrrrrrrrrrrrrrr', apiResponse)
        if (apiResponse.response.data.success) {
          this.setState({
            mapData: apiResponse.response.data.data,
            mapDataLength: apiResponse.response.data.data.length
          })
        } else {
          if (apiResponse.response.data.error.id_valid) {
            Notification(
              2,
              apiResponse.response.data.error.id_valid,
              'device-map-warning'
            )
          }
          if (apiResponse.response.data.error.total_device) {
            Notification(
              2,
              apiResponse.response.data.error.total_device,
              'device-limit-warning'
            )
          }
          if (apiResponse.response.data.error.time) {
            Notification(
              2,
              apiResponse.response.data.error.time,
              'device-limit-time'
            )
          }
          this.setState({
            mapData: [],
            mapDataLength: ''
          })
        }
      }
    )
  }

  listDashboardMapDevice = () => {
    getDashboardMapDeviceAPI(apiResponse => {
      console.log('Data: DDDDDDDDDDDDDDDD', apiResponse)
      if (apiResponse.status == 'success') {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        })
      }
    })
  }
  componentDidMount() {
    // create the interval once component is mounted
    this.listDashboardMapDevice()
    this.listCardStatics()
    var today = new Date()
    var months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12'
    ]
    var days = ['日曜日', '月曜', '火曜', '水曜', '木曜', '金曜日', '土曜']
    var curWeekDay = days[today.getDay()]
    var curDay = today.getDate()
    var curMonth = months[today.getMonth()]
    var curYear = today.getFullYear()
    var date = curWeekDay + ' ' + curYear + '/' + curMonth + '/' + curDay
    this.update = setInterval(() => {
      this.setState({ time: new Date(), days: date })
    }, 1 * 1000) // every 1 seconds

    const devices = localStorage
      ? JSON.parse(localStorage.getItem('devicesChecked'))
      : []
    console.log('Dashboard devices checked', devices)
    if (!!devices && devices.length) {
      this.setState({ devices })
      this.dashboardMapDevice(devices, moment().toString())
    }
  }

  componentWillUnmount() {
    // delete the interval just before component is removed
    clearInterval(this.update)
  }

  listCardStatics = () => {
    listCardStaticsAPI(apiResponse => {
      console.log(
        'hhhhhhhhhhhhhhhh',
        apiResponse.response.data.data[0].completed_percent
      )
      if (apiResponse.status == 'success') {
        this.setState({
          completeTask: apiResponse.response.data.data[0].completed_percent,
          pendingTask: apiResponse.response.data.data[0].pending_percent,
          offlineDevice: apiResponse.response.data.data[0].offline_devices,
          onlineDevice: apiResponse.response.data.data[0].online_devices
        })
      }
    })
  }
  toggleClose = e => {
    this.setState({ modal: false })
  }
  toggle = id => {
    getmantananceAPI({ id: id.toString() }, apiResponse => {
      console.log('kkkkkkkkkkkkkkkkk', apiResponse)
      if (apiResponse.response.data.success == true) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          detailing_data: apiResponse.response.data.data[0]
        }))
      }
    })
  }
  resetTime = e => {

    this.setState({ startTime: moment(), endTime: moment(), startTimeFormat:moment(), endTimeFormat:moment()})
    this.dashboardMapDevice(this.state.devices, this.state.endDate)

  }
  handleChangeStartTime=(e)=>{
    this.setState({startTime:moment(e).format("HH:mm"),startTimeFormat:e})
    this.dashboardMapDevice(this.state.devices, this.state.endDate, moment(e).format("HH:mm"),this.state.endTime)

  }
  handleChangeEndTime=(e)=>{
    this.setState({endTime:moment(e).format("HH:mm"),endTimeFormat:e})
    this.dashboardMapDevice(this.state.devices, this.state.endDate, this.state.startTime, moment(e).format("HH:mm"))

  }

  render() {
    const { messages } = this.props.intl
    const { data, time, days } = this.state

    return (
      <Fragment>
        <Row>
          <Colxx xxs='12'>
            <i
              className='iconsminds-dashboard text-primary'
              style={{ fontSize: 'x-large' }}
            />
            <Breadcrumb heading='menu.default' match={this.props.match} />
            <h3 className='text-primary'>
              <i
                className='iconsminds-clock text-primary'
                style={{ fontSize: 'large' }}
              />
              {time.toLocaleTimeString()} {days}
            </h3>

            <Separator className='mb-5' />
          </Colxx>
        </Row>

        <Row>
          <Colxx xl='3' lg='6' className='mb-4'>
            <RadialProgressCard
              title={` ${messages['dashboards.completed-tasks']}`}
              percent={this.state.completeTask}
            />
          </Colxx>
          <Colxx xl='3' lg='6' className='mb-4'>
            <RadialProgressCard
              title={` ${messages['dashboards.remaining-task']}`}
              percent={this.state.pendingTask}
            />
          </Colxx>
          <Colxx xl='3' lg='6' className='mb-4'>
            <RadialProgressCard
              title={` ${messages['dashboards.offline-device']}`}
              percent={this.state.offlineDevice}
            />
          </Colxx>
          <Colxx xl='3' lg='6' className='mb-4'>
            <RadialProgressCard
              title={` ${messages['dashboards.online-device']}`}
              percent={this.state.onlineDevice}
            />
          </Colxx>
        </Row>

        <Row>
          <Colxx xxs='12' className='mb-5 flexbox'>
            <Colxx sm='3'>
              <Label>
                <b className='text-primary'>
                  {` ${messages['dashboards.map-action']}`}
                </b>
              </Label>

              <div className='flexbox'>
                <i
                  className='simple-icon-calendar text-primary'
                  style={{
                    fontSize: 'x-large',
                    background: 'white',
                    padding: '9px',
                    border: '1px solid gainsboro'
                  }}
                />
                <DatePicker
                  selected={moment(this.state.endDate)}
                  onChange={this.handleChangeEnd}
                  dateFormat='YYYY/MM/DD'
                />
              </div>
            </Colxx>
            <Colxx sm="2">
              <Label> <b className="text-primary"> {` ${messages['dashboards.map-start-time']}`}</b></Label>
               <DatePicker
                  selected={this.state.startTimeFormat}
                  onChange={this.handleChangeStartTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption=""
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  style={{width:"70%"}}
                />
            </Colxx>

            <Colxx sm="2">
              <Label> <b className="text-primary"> {` ${messages['dashboards.map-end-time']}`}</b></Label>
              <DatePicker
                  selected={this.state.endTimeFormat}
                  onChange={this.handleChangeEndTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption=""
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                />
            </Colxx>
            <Colxx sm="1" style={{ paddingTop: "28px", fontSize: 'x-large', }}>
              {/* <Tooltip title="Reset Time" > */}
              <Fab
                variant="outlined"
                size="medium"
                style={{ width: "132px" }}
                // color="primary"
                onClick={this.resetTime}
              >
                <RestoreIcon />
                {'組み替える'}
              </Fab>
              {/* </Tooltip> */}
            </Colxx>
            <Colxx sm="2" style={{ paddingTop: "28px" }}>
              <Link to='/task_status/'>
                <Button className='float-right' color='primary'>
                  {` ${messages['dashboards.employees-current-locations']}`}
                </Button>
              </Link>
            </Colxx>
          </Colxx>
        </Row>
        <Row>
          <Colxx xss='8' sm='6' className='mb-5'>
            <Card>
              <div style={{ height: '100vh', width: '100%' }}>
                <Directions {...this.state} />
              </div>
            </Card>
          </Colxx>
          <Colxx xss='4' sm='6' className='mb-5'>
            <DetailOrders
              selectedDevicesArray={this.state.devices}
              {...this.state}
              toggle={this.toggle}
              toggleClose={this.toggleClose}
              selectDevices={this.selectDevices}
            />
            {/* <Card className="d-flex flex-row mb-2">
              <CardBody className="align-self-center d-flex flex-column justify-content-between min-width-zero" style={{padding:"0.75rem"}}>
                <CardSubtitle>
                  <CustomInput
                    type="checkbox"
                    label={data.device_id}
                    name="1"
                    onClick={this.selectDevices}
                  />
                </CardSubtitle>
                
              </CardBody>
            </Card> */}
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
export default injectIntl(DefaultDashboard)
