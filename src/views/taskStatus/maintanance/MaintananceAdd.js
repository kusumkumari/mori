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

export default class MaintananceAdd extends Component {

  render() {
    const { handleChange, addMaintenanceHandler } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="add.maintenance-management" />  <i className="iconsminds-add text-primary" style={{fontSize:"large"}}  />
          </CardTitle>
            <FormGroup row>
                <Label sm="3">
                  <IntlMessages id="maintenance.employee-id" />
                </Label>
                <Colxx sm="9">
                  <Input type="text" name="empID" value={this.props.empID} onChange={handleChange} /><br />
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
                <IntlMessages id="maintenance.username" />
              </Label>
              <Colxx sm="9">
                <Input type="text" name="username" value={this.props.username} onChange={handleChange} />
              </Colxx>
            </FormGroup>


            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="maintenance.password" />
              </Label>
              <Colxx sm="9">
                <Input type="password" name="password" value={this.props.password} onChange={handleChange} />
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
                <Input type="text" name="mobile" placeholder="ハイフンを入れずに入力して下さい" value={this.props.mobile} onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <Button className="float-right mg-10" color="primary" onClick={addMaintenanceHandler} >
              <IntlMessages id="product.save" />
            </Button>
            <Button className="float-right mg-10" color="primary" onClick={this.props.closeForm} >
              <IntlMessages id="product.cancel" />
            </Button>

        </CardBody>
      </Card>
    
    );
  }
}
