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

export default class DeviceAdd extends Component {

  render() {
    const { handleChange, addDeviceHandler } = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="add.device-management" />
          </CardTitle>

          <Form className="dashboard-quick-post">
            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="device.id" />
              </Label>
              <Colxx sm="9">
                <Input type="text" name="deviceId" value={this.props.deviceId} onChange={handleChange} /><br />
              </Colxx>
            </FormGroup>


            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="device.name" />
              </Label>
              <Colxx sm="9">
                <Input type="text" name="name" value={this.props.name} onChange={handleChange} />
              </Colxx>
            </FormGroup>


            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="device.color-code" />
              </Label>
              <Colxx sm="9">
                <Input type="text" name="colorCode" value={this.props.colorCode} onChange={handleChange} />
              </Colxx>
            </FormGroup>

            <Button className="float-right" color="primary" onClick={editDeviceHandler} >
              <IntlMessages id="product.edit" />
            </Button>
          </Form>

        </CardBody>
      </Card>
    );
  }
}
