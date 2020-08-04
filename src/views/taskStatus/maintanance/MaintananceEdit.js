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

export default class MaintananceEdit extends Component {

  render() {
    const { handleChange, addDeviceHandler } = this.props;
    return (
      <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="edit.maintenance-management" /> <i className="simple-icon-pencil text-primary" style={{fontSize:"large"}}  />
        </CardTitle>
          <FormGroup row>
              <Label sm="3">
                <IntlMessages id="maintenance.employee-id" />
              </Label>
              <Colxx sm="9">
                <Input type="text" name="empID" value={this.props.empID} disabled={true} /><br />
              </Colxx>
            </FormGroup>
          
            <FormGroup row>
            <Label sm="3">
              <IntlMessages id="maintenance.username" />
            </Label>
            <Colxx sm="9">
              <Input type="text" name="username" value={this.props.username} disabled={true} />
            </Colxx>
          </FormGroup>

          <FormGroup row>
            <Label sm="3">
              <IntlMessages id="maintenance.name" />
            </Label>
            <Colxx sm="9">
              <Input type="text" name="name" value={this.props.name} onChange={handleChange} /><br />
            </Colxx>
          </FormGroup>

          <FormGroup row>
            <Label sm="3">
              <IntlMessages id="maintenance.email" />
            </Label>
            <Colxx sm="9">
              <Input type="text" name="email" value={this.props.email} onChange={handleChange} />
            </Colxx>
          </FormGroup>
          <FormGroup row>
            <Label sm="3">
              <IntlMessages id="maintenance.mobile" />
            </Label>
            <Colxx sm="9">
              <Input type="text" name="mobile"  placeholder="ハイフンを入れずに入力して下さい" value={this.props.mobile} onChange={handleChange} />
            </Colxx>
          </FormGroup>

          <Button className="float-right mg-10" color="primary" onClick={this.props.editMaintenanceHandler} >
            <IntlMessages id="product.edit" />
          </Button>
          <Button className="float-right mg-10" color="primary" onClick={this.props.closeForm} >
              <IntlMessages id="product.cancel" />
            </Button>

      </CardBody>
    </Card>
  
   );
  }
}
