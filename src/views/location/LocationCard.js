/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import LocationAdd from "./LocationAdd";
import LocationEdit from "./LocationEdit";
import LocationList from "./LocationList";
import { addLocationAPI, listLocationAPI, listCountryAPI, listStateAPI, listCityAPI, retrieveLocationAPI, changeLocationStatusAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class Location extends Component {
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
      country: [],
      state: [],
      city: [],
      removeAddress: '',
      address: "",
      longitude: "",
      latitude: "",
      buildingName: "",
      id: "",
      googleInput:"",
      addressBox:"none",
      hasManuallyAddress:false,
      defaultLocation:"",
      mannualLocation:"none",
      lat:"",
      long:"",
      newAddress:""
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeCountry = (e) => {

    this.setState({ country: e, state: [], city: [] });
    this.listState(e.value);
  };

  handleChangeState = (e) => {
    this.setState({ state: e, city: [] });
    this.listCity(e.value);
  };

  handleChangeCity = (e) => {
    this.setState({ city: e });
  };

  googleApis = (e) => {
    console.log("uuuuuuuuuuuu",e, typeof(e))
    this.setState({
      longitude: e.coordinates.lng,
      address: e.place,
      latitude: e.coordinates.lat,
      removeAddress: e,
    })
  }
  manageVisibility = () => {
    let checkbox = document.getElementById('hasmanual');
    let defaultlocation = ""
    let mannuallocation = ""
    let hasmannual=false
    if (checkbox.checked != true) {
      defaultlocation = ""
      mannuallocation = "none"
      hasmannual=false
    }
    else {
      defaultlocation = "none"
      mannuallocation = ""
      hasmannual=true
    }
    this.setState({ defaultLocation:defaultlocation,mannualLocation:mannuallocation,hasManuallyAddress:hasmannual })

  }
  addLocationeHandler = () => {
    const { buildingName, country, state, city, address, latitude, longitude, lat, long, newAddress, hasManuallyAddress } = this.state;
    console.log("qqqqqqqqqq", this.state)
    let countryStr = ""
    let stateStr = ""
    let cityStr = ""
    let lats=""
    let lngs=""
    let addresses=""
    if (country != "") {
      countryStr = country.value.toString()
    }
    else {
      countryStr = ""
    }
    if (state != "") {
      stateStr = state.value.toString()
    }
    else {
      stateStr = ""
    }
    if (city != "") {
      cityStr = city.value.toString()
    }
    else {
      cityStr = ""
    }
    if(hasManuallyAddress){
      lats=lat
      lngs=long
      addresses=newAddress
    }
    else{
      lats=latitude
      lngs=longitude
      addresses=address
    }
 
    addLocationAPI({building_name: buildingName, address: addresses, country: countryStr, state: stateStr, city: cityStr, latitude: lats, longitude: lngs }, ({ response }) => {
      console.log("aaaaaaaaaaa", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "creation-suuceess")
        this.setState({ buildingName: "", country: [], state: [], city: [], address: "", latitude: "", longitude: "", removeAddress: "" })
        window.location.href="/location";
        this.listLocation();
      }
      else {
        console.log(response.data.error)
        if (response.data.error.building_name) {
          Notification(0, response.data.error.building_name, "building-error")
        }
        if (response.data.error.country) {
          Notification(0, response.data.error.country, "country-error")
        }
        if (response.data.error.state) {
          Notification(0, response.data.error.state, "state-error")
        }
        if (response.data.error.city) {
          Notification(0, response.data.error.city, "city-error")
        }
        if (response.data.error.address) {
          Notification(0, response.data.error.address, "address-error")
        }
        if (response.data.error.longitude) {
          Notification(0, response.data.error.longitude, "longitude-error")
        }
        if (response.data.error.latitude) {
          Notification(0, response.data.error.latitude, "latitude-error")
        }
        if (response.data.error.duplicate) {
          Notification(0, response.data.error.duplicate, "duplicate-error")
        }
      }
    });
  };

  editLocationeHandler = () => {
    const { id, buildingName, country, state, city, address, latitude, longitude, lat, long, newAddress, hasManuallyAddress } = this.state;
    console.log("qqqqqqqqqq", this.state)
    let countryStr = ""
    let stateStr = ""
    let cityStr = ""
    let lats=""
    let lngs=""
    let addresses=""
    if (country != "") {
      if (country[0]) {
        countryStr = country[0].value.toString()
      }
      else {
        countryStr = country.value.toString()
      }
    }
    else {
      countryStr = ""
    }
    if (state != "") {
      if (state[0]) {
        stateStr = state[0].value.toString()
      }
      else {
        stateStr = state.value.toString()
      }
    }
    else {
      stateStr = ""
    }
    if (city != "") {
      if (city[0]) {
        cityStr = city[0].value.toString()
      }
      else {
        cityStr = city.value.toString()
      }
    }
    else {
      cityStr = ""
    }
    if(hasManuallyAddress){
      lats=lat
      lngs=long
      addresses=newAddress
    }
    else{
      lats=latitude
      lngs=longitude
      addresses=address
    }
    addLocationAPI({
      id: id.toString(), building_name: buildingName, address: addresses, country: countryStr,
      state: stateStr, city: cityStr, latitude: lats, longitude: lngs
    }, ({ response }) => {
      console.log("bbbbbbbbbbbbbb", response)
      if (response.data.success == true) {
        Notification(1, response.data.message, "updation-success")
        this.setState({ isEdit:false,buildingName: "", country: [], state: [], city: [], address: "", latitude: "", longitude: "", removeAddress: "", lat:"", long:"", newAddress:"" })
        document.getElementsByClassName("location-box")[0].title=" ";
        document.getElementsByClassName("location-box")[0].value=" ";
        this.listLocation();

      }
      else {
        console.log(response.data.error)
        if (response.data.error.building_name) {
          Notification(0, response.data.error.building_name, "building-error")
        }
        if (response.data.error.country) {
          Notification(0, response.data.error.country, "country-error")
        }
        if (response.data.error.state) {
          Notification(0, response.data.error.state, "state-error")
        }
        if (response.data.error.city) {
          Notification(0, response.data.error.city, "city-error")
        }
        if (response.data.error.address) {
          Notification(0, response.data.error.address, "address-error")
        }
        if (response.data.error.longitude) {
          Notification(0, response.data.error.longitude, "longitude-error")
        }
        if (response.data.error.latitude) {
          Notification(0, response.data.error.latitude, "latitude-error")
        }
        if (response.data.error.duplicate) {
          Notification(0, response.data.error.duplicate, "duplicate-error")
        }
      }
    });
  };

  retrieveLocationHandler = (id) => {
    this.setState({ isEdit: true,googleInput:"none", addressBox:"" })
    retrieveLocationAPI({ id: id.toString() }, ({ response }) => {
      console.log("rrrrrrrrrrr", response)
      if (response.data.success == true) {
        const add ={place: response.data.data[0].address,coordinates: {lat: response.data.data[0].latitude, lng: response.data.data[0].longitude}}
       console.log(add.coordinates.lat, typeof(add))
        this.setState({
          country: response.data.data[0].country_detail,
          state: response.data.data[0].state_detail,
          city: response.data.data[0].city_detail,
          latitude: response.data.data[0].latitude,
          address:response.data.data[0].address,
          longitude: response.data.data[0].longitude,
          buildingName: response.data.data[0].building_name,
          id: response.data.data[0].id
        })
      }

    });
  };

  handleGoogleInput=()=>{
    this.setState({ googleInput:"", addressBox:"none" })
  }


  componentDidMount() {
    this.listLocation();
    this.listCountry();
    document.getElementsByClassName("location-box")[0].placeholder="位置情報を入力";

  }

  listLocation = () => {
    listLocationAPI((apiResponse) => {
      console.log("ttttttttttt", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data,
          dataLength: apiResponse.response.data.length,
        });
      }
    });
  }
  listCountry() {
    listCountryAPI((apiResponse) => {
      console.log("hhhhhhhhhhhhhhhh", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          countryData: apiResponse.response.data.data,
          countryDataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  listState(id) {
    listStateAPI({ id: id }, (apiResponse) => {
      console.log("jjjjjjjjjjjjjjj", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          stateData: apiResponse.response.data.data,
          stateLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  listCity(id) {
    listCityAPI({ id: id }, (apiResponse) => {
      console.log("kkkkkkkkkkkkkk", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          cityData: apiResponse.response.data.data,
          cityLength: apiResponse.response.data.data.length,
        });
      }
    });
  }

  handleChangeStatus = (e) => {
    let id = (e.original.id).toString()
    let status = (!e.original.active_status).toString()
    changeLocationStatusAPI({id:id, active_status:status}, (apiResponse) => {
      if (apiResponse.response.data.success == true) {
        Notification(1, apiResponse.response.data.message, "status-changed")
        this.listLocation();
      }
      else {
        Notification(0, "Something went wrong", "status-changed-error")
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="iconsminds-location-2 text-primary" style={{fontSize:"x-large"}}  />
            <Breadcrumb heading="menu.location-management" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                {this.state.isEdit ?
                  <LocationEdit {...this.state}
                    manageVisibility={this.manageVisibility}
                    handleChange={this.handleChange}
                    handleChangeCountry={this.handleChangeCountry}
                    googleApis={this.googleApis}
                    handleChangeState={this.handleChangeState}
                    handleChangeCity={this.handleChangeCity}
                    editLocationeHandler={this.editLocationeHandler}
                    handleGoogleInput={this.handleGoogleInput}
                  />
               :
                  <LocationAdd {...this.state}
                    manageVisibility={this.manageVisibility}
                    handleChange={this.handleChange}
                    handleChangeCountry={this.handleChangeCountry}
                    googleApis={this.googleApis}
                    handleChangeState={this.handleChangeState}
                    handleChangeCity={this.handleChangeCity}
                    closeForm={this.closeForm}
                    addLocationeHandler={this.addLocationeHandler} />
                  
                }
              </Colxx>
            </Row>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <LocationList {...this.state}
              retrieveLocationHandler={this.retrieveLocationHandler}
              handleChangeStatus={this.handleChangeStatus}
              title="dashboards.top-viewed-posts"
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Location);