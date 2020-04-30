/* eslint-disable */
import React, { useState, Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row, Card, CardSubtitle, CardText, CardBody, Button, Input } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import '../../assets/css/custom.css';
import { ThemeColors } from '../../helpers/ThemeColors';
import { getEmployeeTodayLocationAPI } from '../ApiIntegration';

import "react-datepicker/dist/react-datepicker.css";
import { Notification } from "../Utils/Notification";
import DirectionsMap from "../../components/Directions/DirectionsIndex";
import IntlMessages from "../../helpers/IntlMessages";

const colors = ThemeColors()

class TaskHistoryList extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 20.5937,
        lng: 78.9629
      },
      zoom: 4,
      filterData:"0",
      mapData: [],
      mapDataLength: "",
      emp_name:"",
      mobile:"",
      device_id:"",

    };

  }

  handleChange=(e)=>{
    console.log("eeeeeeeeehhhhhhhhhhhhh",e.target.value)
    this.setState({filterData:e.target.value})
    this.getEmployeeTodayLocation(e.target.value);

  }
  componentDidMount(){
    document.getElementById("todayid").style.display = "none";
    this.getEmployeeTodayLocation(this.state.filterData);
  }

  getEmployeeTodayLocation = (is_filter) => {
    console.log("ppppppppppppppppp",this.props.match.params.id)
    getEmployeeTodayLocationAPI({id:this.props.match.params.id, is_filter:is_filter},(apiResponse) => {
      console.log("DDDDDDDDDDDDDDDD", apiResponse)
      if (apiResponse.response.data.success == true) {
        this.setState({
          mapData: apiResponse.response.data.data,
          mapDataLength: apiResponse.response.data.data.length,
          emp_name:apiResponse.response.data.data[0].emp_name,
          mobile:apiResponse.response.data.data[0].mobile,
          device_id:apiResponse.response.data.data[0].device_id,

        });
       
      }
      else {
        Notification(2, apiResponse.response.data.message, "")
        
      }
    });
  }
 


  render() {
    const { messages } = this.props.intl;

    const { data } = this.state;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" style={{marginTop:"40px"}}>
            <i className="iconsminds-location-2 text-primary" style={{ fontSize: "x-large" }} />
            <Breadcrumb heading="menu.person-location" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx xss="8" sm="12" className="mb-5">
            <div className="flexbox">
            <Colxx xss="12" sm="3" className="mb-5">
            <div className="flexbox">
              <i className="simple-icon-calendar text-primary" style={{ fontSize: "x-large", background: "white", padding: "9px", border: "1px solid gainsboro" }} />
              
              <Input type="select" onChange={this.handleChange} style={{margin:"0px"}}>
                <option value="0">今日</option>
                <option value="1">昨日</option>
              </Input>
              </div>
              </Colxx>
              <Colxx xss="12" sm="3" className="mb-5"  style={{background: "white", padding: "9px", border: "1px solid gainsboro" }}>
              <b><IntlMessages id="employee-name" /> :</b> {this.state.emp_name ? this.state.emp_name : "N/A" }, </Colxx>
              <Colxx xss="12" sm="3" className="mb-5" style={{background: "white", padding: "9px", border: "1px solid gainsboro" }}>
              <b><IntlMessages id="device.id" /> :</b> {this.state.device_id ? this.state.device_id : "N/A" },</Colxx>
              <Colxx xss="12" sm="3" className="mb-5" style={{background: "white", padding: "9px", border: "1px solid gainsboro" }}>
              <b><IntlMessages id="employee-number" /> :</b> {this.state.mobile ? this.state.mobile : "N/A"}</Colxx>

            </div>
            <Card>
              <div style={{ height: '100vh', width: '100%' }}>
                <DirectionsMap {...this.state} />
              </div>
            </Card>


          </Colxx>

        </Row>

      </Fragment>

    );
  }
}
export default injectIntl(TaskHistoryList);