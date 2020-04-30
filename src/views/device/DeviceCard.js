/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import DeviceAdd from "./DeviceAdd";
import DeviceEdit from "./DeviceEdit";
import DeviceList from "./DeviceList";
import { addDeviceAPI, listDevicesAPI, changeDeviceStatusAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: "",
      name: "",
      colorCode: "",
      isEdit: false,
      id: "",
      data: [],
      dataLength: null,
      modal: false,
      detailing_data: "",
      detailing_data_id: "",

    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addDeviceHandler = (id) => {
    addDeviceAPI({ id: id.toString() }, ({ response }) => {
      console.log("aaaaaaaaaaa", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "qrcode-generate-success")
        this.listDevices();
      }
      else {
        console.log(response.data.error)
        if (response.data.error.duplicate) {
          Notification(0, response.data.error.duplicate, "duplicate-device-error")
        }
      }
    });
  };

  // editDeviceHandler = () => {
  //   const { deviceId, name, colorCode, id } = this.state;
  //   addDeviceAPI({ id: id.toString(), device_id: deviceId, name: name, color_code: colorCode }, ({ response }) => {
  //     console.log("eeeeeeeeeeeeeee", response)
  //     if (response.data.success == true) {
  //       Notification(1, response.data.message, "Device Success")
  //       this.setState({ deviceId: "", name: "", colorCode: "" })
  //       this.listDevices();
  //     }
  //     else {
  //       console.log(response.data.error)
  //       if (response.data.error.name) {
  //         Notification(0, response.data.error.name, "Device Name Error")
  //       }
  //       if (response.data.error.device_id) {
  //         Notification(0, response.data.error.device_id, "Device ID Error")
  //       }
  //       if (response.data.error.color_code) {
  //         Notification(0, response.data.error.color_code, "Color Code Error")
  //       }
  //       if (response.data.error.unique_check) {
  //         Notification(0, response.data.error.unique_check, "Duplicate Device Error")
  //       }
  //     }
  //   });
  // };


  // retrieveDeviceHandler = (id) => {
  //   this.setState({ isEdit: true })
  //   getDeviceAPI(id.toString(), ({ response }) => {
  //     if (response.data.success == true) {
  //       this.setState({
  //         name: response.data.data[0].name,
  //         deviceId: response.data.data[0].device_id,
  //         colorCode: response.data.data[0].color_code,
  //         id: response.data.data[0].id
  //       })
  //     }

  //   });
  // };

  listDevices = () => {
    listDevicesAPI((apiResponse) => {
      console.log("ttttttttttt", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  componentDidMount() {
    this.listDevices();
  }

  handleChangeStatus = (e) => {
    console.log("eeeeeeeeeeeees",e)

    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeDeviceStatusAPI({id:id, active_status:status}, (apiResponse) => {
      console.log("kkkkkkkkkkkkkkkkksssssssssssssss",apiResponse)
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "status-changed")
        this.listDevices();
      }
      else {
        Notification(0, "Something went wrong", "status-changed-error")
      }
    })
  }
  toggle = (e) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      detailing_data: e.original.barcode_pic,
      detailing_data_id: e.original.id,
    }));

  };
  toggleClose =(e)=>{
    this.setState({ modal : false})
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="iconsminds-smartphone-3 text-primary" style={{fontSize:"x-large"}}  /><Breadcrumb heading="menu.device-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {/* <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <DeviceEdit {...this.state}
                    handleChange={this.handleChange}
                    editDeviceHandler={this.editDeviceHandler}
                  />
                  :
                  <DeviceAdd {...this.state}
                    handleChange={this.handleChange}
                    addDeviceHandler={this.addDeviceHandler} />
                }
              </Colxx>
            </Row>
          </Colxx>
        </Row> */}
        <Row>
          <Colxx xxs="12">
            <DeviceList {...this.state}
              toggle={this.toggle}
              toggleClose={this.toggleClose}
              // retrieveDeviceHandler={this.retrieveDeviceHandler}
              handleChangeStatus={this.handleChangeStatus}
              addDeviceHandler={this.addDeviceHandler} 
              title="dashboards.top-viewed-posts"
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Device);