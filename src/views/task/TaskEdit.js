/* eslint-disable */
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
// import * as Datetime from 'react-datetime';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// import "../../assets/css/date.css";
export default class TaskEdit extends Component {

  render() {
    const { handleChange, editTaskHandler, buildingData, buildingDataLength, allotedData, allotedDataLength } = this.props;
    const buildingOption = [];
    const allotedOption = [];

    for (let index = 0; index < buildingDataLength; index++) {
      const { id, building_name } = buildingData[index];
      buildingOption.push({ label: building_name, value: id, key: id })
    }
    for (let index = 0; index < allotedDataLength; index++) {
      const { id, username } = allotedData[index];
      allotedOption.push({ label: username, value: id, key: id })
    }
   
    console.log("mmmmmmmmmmmmmm",this.props.dateTime, typeof(this.props.dateTime))
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="add.task-management" />  <i className="simple-icon-pencil text-primary" style={{fontSize:"large"}}  />
          </CardTitle>
         
          <Form className="dashboard-quick-post">
            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="task.building-name" />
              </Label>
              <Colxx sm="9">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="CatId"
                value={this.props.building}
                onChange={this.props.handleChangeBuilding}
                options={buildingOption} />             
              </Colxx>
            </FormGroup>
            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="task.description" />
              </Label>
              <Colxx sm="9">
                <Input type="text" name="taskDesc" value={this.props.taskDesc} onChange={handleChange} /><br />
              </Colxx>
            </FormGroup>
            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="task.alloted-person" />
              </Label>
              <Colxx sm="9">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="CatId"
                isMulti={true}
                value={this.props.allotedPerson}
                onChange={this.props.handleChangeAlloted}
                options={allotedOption}
                 />             
              </Colxx>
            </FormGroup>

            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="task.location" />
              </Label>
              <Colxx sm="9">
              {/* <Datetime onChange={this.props.handleDateTime}/> */}
              <DatePicker
                selected={moment(this.props.dateTime)}
                onChange={this.props.handleDateTime}
                 showTimeSelect
                 timeFormat="HH:mm"
                 timeIntervals={5}      
                 dateFormat="LLL"
              />
            
              </Colxx>
            </FormGroup>

            <Button className="float-right mg-10" color="primary" onClick={editTaskHandler} >
              <IntlMessages id="product.edit" />
            </Button>
            <Button className="float-right mg-10" color="primary" onClick={this.props.closeForm} >
              <IntlMessages id="product.cancel" />
            </Button>
          </Form>

        </CardBody>
      </Card>
    );
  }
}
