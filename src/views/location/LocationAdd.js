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
  CustomInput,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { GoogleComponent } from 'react-google-location';

const API_KEY = "AIzaSyCIDUSBqHPfkEssENT_X9vuWt5nzca8_W4"

export default class LocationAdd extends Component {

  render() {
    const { handleChange, addDeviceHandler, countryData, countryDataLength, stateData, stateLength, cityData, cityLength } = this.props;
    const countryOptions = [];
    for (let index = 0; index < countryDataLength; index++) {
      const { id, country } = countryData[index];
      countryOptions.push({ label: country, value: id, key: id })
    }
    const stateOptions = [{ label: "県を選択", value: "", key: "state" }];
    for (let index = 0; index < stateLength; index++) {
      const { id, state } = stateData[index];
      stateOptions.push({ label: state, value: id, key: id })
    }
    const cityOptions = [{ label: "市を選択", value: "", key: "city" }];
    for (let index = 0; index < cityLength; index++) {
      const { id, city } = cityData[index];
      cityOptions.push({ label: city, value: id, key: id })
    }
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="add.location-management" /> <i className="iconsminds-add text-primary" style={{fontSize:"large"}}  />
          </CardTitle>

          <Form className="dashboard-quick-post">
            <FormGroup row>
                <Label sm="3">
                  <IntlMessages id="location.building-name" />
                </Label>
                <Colxx sm="9">
                <Input type="text" name="buildingName" value={this.props.buildingName} onChange={handleChange} />
                </Colxx>
              </FormGroup>

            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="location.country" />
              </Label>
              <Colxx sm="9">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="category"
                  placeholder="選択"
                  value={this.props.country}
                  onChange={this.props.handleChangeCountry}
                  options={countryOptions} />
              </Colxx>
            </FormGroup>


            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="location.state" />
              </Label>
              <Colxx sm="9">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  placeholder="選択"
                  name="category"
                  value={this.props.state}
                  onChange={this.props.handleChangeState}
                  options={stateOptions} />
              </Colxx>
            </FormGroup>


            <FormGroup row>
              <Label sm="3">
                <IntlMessages id="location.city" />
              </Label>
              <Colxx sm="9">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  placeholder="選択"
                  name="category"
                  value={this.props.city}
                  onChange={this.props.handleChangeCity}
                  options={cityOptions} />

              </Colxx>
            </FormGroup>
            <FormGroup row>
            <Label sm="3">
              <IntlMessages id="location.enter-address-manually" />
            </Label>
            <Colxx sm="9">
              <CustomInput
                type="checkbox"
                id="hasmanual"
                value={this.props.hasManuallyAddress}
                checked={this.props.hasManuallyAddress}
                onClick={this.props.manageVisibility}
              />
            </Colxx>
          </FormGroup>
            <FormGroup row style={{display:this.props.defaultLocation}}>
              <Label sm="3">
                <IntlMessages id="location.address" />
              </Label>
              <Colxx sm="9">
                <GoogleComponent
                  apiKey={API_KEY}
                  language={'ja'}
                  // value={this.props.removeAddress}
                  name="address"
                  placeholder="位置情報を入力"
                  country={'country:jp'}
                  coordinates={true}
                  onChange={(e) => { this.props.googleApis(e) }} />
              </Colxx>
            </FormGroup>
            <FormGroup row style={{display:this.props.mannualLocation}}>
                <Label sm="3">
                  <IntlMessages id="location.lat" />
                </Label>
                <Colxx sm="3">
                <Input type="text" name="lat" value={this.props.lat} onChange={handleChange} />
                </Colxx>
                <Label sm="3">
                  <IntlMessages id="location.long" />
                </Label>
                <Colxx sm="3">
                <Input type="text" name="long" value={this.props.long} onChange={handleChange} />
                </Colxx>
              </FormGroup>
              <FormGroup row style={{display:this.props.mannualLocation}}> 
                <Label sm="3">
                  <IntlMessages id="location.address" />
                </Label>
                <Colxx sm="9">
                <Input type="text" name="newAddress" value={this.props.newAddress} onChange={handleChange} />
                </Colxx>
               
              </FormGroup>
            <Button className="float-right" color="primary" onClick={this.props.addLocationeHandler} >
              <IntlMessages id="product.save" />
            </Button>
          </Form>

        </CardBody>
      </Card>
    );
  }
}
