/* eslint-disable */
import React, { useState, Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row, Card, CardSubtitle, CardText, CardBody, Button } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import '../../assets/css/custom.css';
import { ThemeColors } from '../../helpers/ThemeColors';
import { getEmployeeLocationAPI } from '../ApiIntegration';

import "react-datepicker/dist/react-datepicker.css";
import { Notification } from "../Utils/Notification";
import DirectionsMap from "../../components/Directions/DirectionsMap";

const colors = ThemeColors()

class TaskStatusList extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 20.5937,
        lng: 78.9629
      },
      zoom: 4,
      devices:[],
      data:[],
      dataLength:"",
      modal:false,
      checked:false,
      mapData:[],
      mapDataLength:"",
    };

  }


  getEmployeeLocation = () => {
    getEmployeeLocationAPI((apiResponse) => {
      console.log("DDDDDDDDDDDDDDDD", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  componentDidMount() {
    this.getEmployeeLocation();
  }
  

  render() {
    const { messages } = this.props.intl;

    const {data}=this.state;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <i className="iconsminds-location-2 text-primary" style={{fontSize:"x-large"}}  /><Breadcrumb heading="menu.employee-current-location" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
      
        <Row>
          <Colxx xss="8" sm="12" className="mb-5">

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
export default injectIntl(TaskStatusList);