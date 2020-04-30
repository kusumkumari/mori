/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import TaskAdd from "./TaskAdd";
import TaskEdit from "./TaskEdit";
import TaskList from "./TaskList";
import { addTaskAPI, listTasksAPI, listBuildingsAPI, listAllotedPersonAPI,changeTaskStatusAPI, getTaskAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";
import moment from "moment";

class Task extends Component {
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
      buildingData:[],
      buildingDataLength:"",
      allotedData:[],
      allotedDataLength:"",
      allotedPerson:[],
      building:[],
      dateTime:moment().utcOffset("+05:30").format(),
      taskDesc:"",
      isOpenForm:false,


    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeBuilding = (e) => {
    this.setState({
     building: e,
    });
  };
  handleChangeAlloted = (e) => {
    this.setState({
     allotedPerson: e,
    });
  };
  handleDateTime =(date)=>{
    console.log("timeeeeeeeeeeeeeeeeee",date)
    this.setState({
      dateTime:moment(date).utcOffset("+05:30").format()
    })
  }
  addTaskHandler = () => {
    const { building, allotedPerson, taskDesc,dateTime } = this.state;
    let alloted = []
    for (let i = 0; i < allotedPerson.length; i++) {
      alloted.push(allotedPerson[i].value)
    }
    let buildingValue=""
    if(building){
      buildingValue=building.value
    }
    else{
      buildingValue=""
    }
    console.log("kkkkkkkkkkkkkkkkkkkkk",building,buildingValue,alloted,taskDesc,dateTime)
    addTaskAPI({ building_name: buildingValue ? buildingValue :"" , alloted_to: alloted, task_description: taskDesc,reporting_time:dateTime }, ({ response }) => {
      console.log("aaaaaaaaaaa", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "creation-suuceess")
        this.setState({ building: [], allotedPerson: [], taskDesc: "",dateTime:moment().utcOffset("+05:30").format() })
        this.listTasks();
      }
      else {
        console.log(response.data.error)
        if (response.data.error.building_name) {
          Notification(0, response.data.error.building_name, "building-error")
        }
        if (response.data.error.alloted_to) {
          Notification(0, response.data.error.alloted_to, "alloted-person-error")
        }
        if (response.data.error.task_description) {
          Notification(0, response.data.error.task_description, "task-description-error")
        }
        if (response.data.error.reporting_time) {
          Notification(0, response.data.error.reporting_time, "color-code-error")
        }
        
        if (response.data.error.duplicate) {
          Notification(0, response.data.error.duplicate, "duplicate-error")
        }
      }
    });
  };

  editTaskHandler = () => {
    const { building, allotedPerson, taskDesc,dateTime,id } = this.state;
    let alloted = []
    for (let i = 0; i < allotedPerson.length; i++) {
      alloted.push(allotedPerson[i].value)
    }
    let buildingValue=""
    if(building){
      if(building[0])
      buildingValue=building[0].value
      else
      buildingValue=building.value
    }
    else{
      buildingValue=""
    }
    console.log("uuuuuuuuuuuuuu",buildingValue,alloted,taskDesc,dateTime)
    addTaskAPI({ id:id.toString(),building_name: buildingValue, alloted_to: alloted, task_description: taskDesc,reporting_time:dateTime }, ({ response }) => {
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "updation-success")
        this.setState({isEdit:false, building: [], allotedPerson: [], taskDesc: "",dateTime:moment().utcOffset("+05:30").format() })
        this.listTasks();
      }
      else {
        console.log(response.data.error)
        if (response.data.error.building_name) {
          Notification(0, response.data.error.building_name, "building-error")
        }
        if (response.data.error.alloted_to) {
          Notification(0, response.data.error.alloted_to, "alloted-person-error")
        }
        if (response.data.error.task_description) {
          Notification(0, response.data.error.task_description, "task-description-error")
        }
        if (response.data.error.reporting_time) {
          Notification(0, response.data.error.reporting_time, "color-code-error")
        }
        
        if (response.data.error.duplicate) {
          Notification(0, response.data.error.duplicate, "duplicate-error")
        }
      }
    });
  };


  retrieveTaskHandler = (id) => {
    this.setState({ isEdit: true })
    getTaskAPI({id:id.toString()}, ({ response }) => {
      console.log("gettttttttttttttttttt",response)
      if (response.data.success == true) {
        this.setState({
          building: response.data.data[0].building_detail,
          taskDesc: response.data.data[0].task_description,
          allotedPerson: response.data.data[0].employee_details,
          dateTime: moment(response.data.data[0].reporting_time).utcOffset("+11:00").format(),
          id: response.data.data[0].id
        })
      }

    });
  };

  listTasks(){
    listTasksAPI((apiResponse) => {
      console.log("11111111111111111111", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length
        });
      }
    });
  }
  listBuildings(){
    listBuildingsAPI((apiResponse) => {
      console.log("2222222222222222", apiResponse);
      if (apiResponse.status == "success") {
        this.setState({
          buildingData: apiResponse.response.data.data,
          buildingDataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  listAllotedPerson(){
    listAllotedPersonAPI((apiResponse)=>{
      console.log("eeeeeeeeeeeeeeeeeeeeeee", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          allotedData: apiResponse.response.data.data,
          allotedDataLength: apiResponse.response.data.data.length,
        });
      }

    })
  }
  componentDidMount() {
    this.listTasks();
    this.listBuildings();
    this.listAllotedPerson();
  }

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeTaskStatusAPI({id:id.toString(), active_status:status}, (apiResponse) => {
      console.log("cccchange",apiResponse)
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "status-changed")
        this.listTasks();
      }
      else {
        Notification(0, "Something went wrong", "status-changed-error")
      }
    })
  }
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
            <i className="iconsminds-wrench text-primary" style={{fontSize:"x-large"}}  /><Breadcrumb heading="menu.task-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
              
                {this.state.isEdit ?
                  <TaskEdit {...this.state}
                  handleChange={this.handleChange}
                  handleChangeBuilding={this.handleChangeBuilding}
                  handleChangeAlloted={this.handleChangeAlloted}
                  handleDateTime={this.handleDateTime}
                  closeForm={this.closeForm}
                  editTaskHandler={this.editTaskHandler}
                  />
                  :""}
                  {this.state.isOpenForm ?
                  <TaskAdd {...this.state}
                    handleChange={this.handleChange}
                    handleChangeBuilding={this.handleChangeBuilding}
                    handleChangeAlloted={this.handleChangeAlloted}
                    handleDateTime={this.handleDateTime}
                    closeForm={this.closeForm}
                    addTaskHandler={this.addTaskHandler} />
                    :""
                }
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <TaskList {...this.state}
              retrieveTaskHandler={this.retrieveTaskHandler}
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
export default injectIntl(Task);