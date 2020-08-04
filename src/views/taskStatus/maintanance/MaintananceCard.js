/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import MaintananceAdd from "./MaintananceAdd";
import MaintananceEdit from "./MaintananceEdit";
import MaintananceList from "./MaintananceList";
import { addMaintenanceAPI, listMaintenanceAPI, getmantananceAPI, changeMantananceStatusAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class Maintanance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empID:"",
      name: "",
      username: "",
      password: "",
      email: "",
      mobile: "",
      isEdit: false,
      id: "",
      data: [],
      dataLength: null,
      modal:false,
      isOpenForm:false,

    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addMaintenanceHandler = () => {
    const { name, username, password, email, mobile, empID } = this.state;
    addMaintenanceAPI({ username: username,password:password,mobile:mobile, name: name, email: email, emp_id:empID }, ({ response }) => {
      console.log("aaaaaaaaaaa", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "creation-suuceess")
        this.setState({ username: "", name: "", password: "",email: "", mobile:"", empID:""  })
        this.listMaintenance();
      }
      else {
        console.log(response.data.error)
        if (response.data.error.emp_id) {
          Notification(0, response.data.error.emp_id, "employee-id-error")
        }
        if (response.data.error.name) {
          Notification(0, response.data.error.name, "name-error")
        }
        if (response.data.error.username) {
          Notification(0, response.data.error.username, "username-error")
        }
        if (response.data.error.email) {
          Notification(0, response.data.error.email, "email-error")
        }
        if (response.data.error.mobile) {
          Notification(0, response.data.error.mobile, "mobile-error")
        }
        if (response.data.error.password) {
          Notification(0, response.data.error.password, "password-error")
        }
        if (response.data.error.unique) {
          Notification(0, response.data.error.unique, "duplicate-error")
        }
        if (response.data.error.unique_mail) {
          Notification(0, response.data.error.unique_mail, "unique-email-error")
        }
        if (response.data.error.unique_mobile) {
          Notification(0, response.data.error.unique_mobile, "unique-mobile-error")
        }
        
      }
    });
  };

  editMaintenanceHandler = () => {
    const { name, email, mobile, id } = this.state;
    addMaintenanceAPI({ id:id.toString(),mobile:mobile, name: name, email: email }, ({ response }) => {
      console.log("aaaaaaaaaaa", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "updation-success")
        this.setState({ isEdit:false,username: "", name: "", password: "",email: "", mobile:"", empID:""  })
        this.listMaintenance();
      }
      else {
        console.log(response.data.error)
        // if (response.data.error.emp_id) {
        //   Notification(0, response.data.error.emp_id, "Employee ID Error")
        // }
        if (response.data.error.name) {
          Notification(0, response.data.error.name, "name-error")
        }
        // if (response.data.error.username) {
        //   Notification(0, response.data.error.username, "username Error")
        // }
        if (response.data.error.email) {
          Notification(0, response.data.error.email, "email-error")
        }
        if (response.data.error.mobile) {
          Notification(0, response.data.error.mobile, "mobile-error")
        }
        // if (response.data.error.password) {
        //   Notification(0, response.data.error.password, "Password Error")
        // }
        if (response.data.error.unique) {
          Notification(0, response.data.error.unique, "duplicate-error")
        }
        if (response.data.error.unique_mail) {
          Notification(0, response.data.error.unique_mail, "unique-email-error")
        }
        if (response.data.error.unique_mobile) {
          Notification(0, response.data.error.unique_mobile, "unique-mobile-error")
        }
        
      }
    });
  };


  retrieveMaintananceHandler = (id) => {
    this.setState({ isEdit: true })
    getmantananceAPI({id:id.toString()}, ({ response }) => {
      console.log("kkkkkkkkkkkkkkkkkkkkk333333",response)
      if (response.data.success == true) {
        this.setState({
          name: response.data.data[0].name,
          username: response.data.data[0].username,
          empID: response.data.data[0].emp_id,
          mobile: response.data.data[0].mobile,
          email: response.data.data[0].email,
          id: response.data.data[0].id
        })
      }

    });
  };

  listMaintenance = () => {
    listMaintenanceAPI((apiResponse) => {
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
    this.listMaintenance();
  }

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeMantananceStatusAPI({id:id, active_status:status}, (apiResponse) => {
      console.log("iiiiiiiiiii",apiResponse)
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "status-changed")
        this.listMaintenance();
      }
      else {
        Notification(0, "Something went wrong", "status-changed-error")
      }
    })
  }

  toggleClose =(e)=>{
    this.setState({ modal : false})
  }
  toggle = (id) => {
    getmantananceAPI({id:id.toString()}, (apiResponse) => {
      console.log("kkkkkkkkkkkkkkkkk",apiResponse)
      if (apiResponse.response.data.success == true) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          detailing_data: apiResponse.response.data.data[0],
        }));
      }
    })
  };
  openForm=()=>{
    this.setState({isOpenForm:true})
  }
  closeForm=()=>{
    this.setState({isOpenForm:false, isEdit:false})
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="iconsminds-engineering text-primary" style={{fontSize:"x-large"}}  />
            <Breadcrumb heading="menu.maintanance-person-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="8">
            <Row>
              <Colxx md="12" className="mb-4">
              {this.state.isEdit ?
                  <MaintananceEdit {...this.state}
                  handleChange={this.handleChange}
                  closeForm={this.closeForm}
                  editMaintenanceHandler={this.editMaintenanceHandler}
                  />
                  :""}
                  {this.state.isOpenForm ?
                  <MaintananceAdd {...this.state}
                    handleChange={this.handleChange}
                    closeForm={this.closeForm}
                    addMaintenanceHandler={this.addMaintenanceHandler} />
                    :""
              }
             
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <MaintananceList {...this.state}
              toggleClose={this.toggleClose}
              toggle={this.toggle}
              retrieveMaintananceHandler={this.retrieveMaintananceHandler}
              handleChangeStatus={this.handleChangeStatus}
              openForm={this.openForm}
              title="dashboards.top-viewed-posts"
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Maintanance);