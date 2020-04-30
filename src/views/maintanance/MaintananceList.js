/* eslint-disable */
import React, { Component } from "react";
import {
  Card, CardBody, CardTitle, Modal,
  ModalHeader,
  ModalBody, Button, Badge
} from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import { Done, Clear } from '@material-ui/icons';
import {
  Link,
} from "react-router-dom";

class DeviceList extends Component {
  render() {
    const { data, retrieveMaintananceHandler, handleChangeStatus, modal, detailing_data } = this.props;
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="maintenance.person-list" /> 
            <i className="iconsminds-receipt-4  text-primary" style={{ fontSize: "large"}} />
            <p onClick={()=>this.props.openForm()} style={{float:"right"}} className="text-primary">
              <i className="iconsminds-add text-primary" style={{ fontSize: "large"}}  />   
              <IntlMessages id="form-add" />
            </p>
          </CardTitle>
          <ReactTable
            data={data}
            defaultPageSize={10}
            showPageJump={true}
            showPageSizeOptions={true}
            PaginationComponent={DataTablePagination}
            defaultFilterMethod={filterCaseInsensitive}
            className='-striped -highlight'
            columns={[
              {
                Header: <IntlMessages id="user.username" />,
                accessor: "username",
                filterable: true,
                Cell: props => <p className=".rt-td text-primary"> <i className="iconsminds-user" /> {props.value}</p>
              },
              {
                Header: <IntlMessages id="maintenance.person-list-name" />,
                accessor: "name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: <IntlMessages id="maintenance.person-list-email" />,
                accessor: "email",
                filterable: true,
                Cell: props => <p className="text-muted"> <i className="iconsminds-mail-with-at-sign" /> {props.value}</p>
              },
              {
                Header: <IntlMessages id="maintenance.person-list-mobile" />,
                accessor: "mobile",
                filterable: true,
                Cell: props => <p className="text-muted"><i className="iconsminds-smartphone-4" /> {props.value}</p>
              },
              {
                Header: <IntlMessages id="maintenance.person-list-acc-status" />,
                accessor: "user_status",
                filterable: true,
                Cell: props =>   <Badge className="adjs-1-2" color={props.original.color} pill>
                <b style={{fontSize: "14px"}}>{props.value}</b>
              </Badge>
              },
              {
                Header: <IntlMessages id="device.list-status" />,
                accessor: "active_status",
                Cell: props => <p><Switch
                  id={name}
                  name={name}
                  className={this.props.className}
                  checked={props.value}
                  onClick={(e) => handleChangeStatus(props)}
                />
                </p>
              },

              {
                Header: <IntlMessages id="product.edit" />,
                accessor: "id",
                Cell: props => <a href="#form"><p className="simple-icon-pencil text-primary" onClick={(e) => retrieveMaintananceHandler(props.value)}>
                </p></a>
              },
              {
                Header: <IntlMessages id="device.list-view1" />,
                accessor: "id",
                Cell: props => <span className="simple-icon-eye text-primary" style={{fontSize:"x-large"}} onClick={(e) => this.props.toggle(props.value)}>
                </span>
              }
            ]}
          />
          <Modal isOpen={modal} >
            <ModalHeader toggle={(e) => this.props.toggleClose()}>
              <IntlMessages id="modal.employee-detail" />
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="flexbox">
                  {detailing_data && detailing_data.emp_pic ?
                    <img src={detailing_data.emp_pic} className="bar-code-adj" />
                    :
                    <img src={require("../../assets/no-image.png")} className="bar-code-adj" />
                  }
                  <div className="employee-ids">
                    <h6> <i className="iconsminds-building" /> {detailing_data && detailing_data.Company ? detailing_data.Company : "N/A"}</h6>
                    <h6> <i className="iconsminds-id-card" /> {detailing_data && detailing_data.emp_id ? detailing_data.emp_id : "N/A"}</h6>
                    <h6> <i className="iconsminds-business-man" /> {detailing_data && detailing_data.designation ? detailing_data.designation : "N/A"}</h6>
                    {detailing_data ? <Link to={"/account-history/"+detailing_data.id}>
                      <Button color="primary" className="float-right"><IntlMessages id="menu.account-history" /></Button>
                      </Link>
                      : ""}
                    <div>


                    </div>
                  </div>
                </div>
                <h5 className="text-primary h5-1"><IntlMessages id="maintenance.person-list-basic-information" /></h5>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-business-man-woman text-p1"> <IntlMessages id="maintenance.person-list-gender" /> </span> : {detailing_data && detailing_data.gender ? detailing_data.gender : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-add-user text-p1"> <IntlMessages id="maintenance.person-list-age" /> </span> : {detailing_data && detailing_data.age ? detailing_data.age : "N/A"}</p>
                  </div>
                </div>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-drop text-p1"> <IntlMessages id="maintenance.person-list-blood-group" /></span> : {detailing_data && detailing_data.blood_group ? detailing_data.blood_group : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-post-mail text-p1"> <IntlMessages id="location.address" /></span> : {detailing_data && detailing_data.address ? detailing_data.address : "N/A"}</p>
                  </div>
                  {/* <div className="flex">  
                    <p className="p1-s"><span className="text-p1">Country</span> : {detailing_data && detailing_data.country ? detailing_data.country : "N/A" }</p>
                  </div> */}
                </div>
                {/* <div className="flexbox">
                  <div className="flex"> 
                    <p className="p1-s"><span className="text-p1">State</span> : {detailing_data && detailing_data.state ? detailing_data.state : "N/A" }</p>
                  </div>
                  <div className="flex">  
                    <p className="p1-s"><span className="text-p1">City</span> : {detailing_data && detailing_data.city ? detailing_data.city : "N/A" }</p>
                  </div>
                </div> */}

                <h5 className="text-primary h5-1"> <IntlMessages id="maintenance.person-list-emergency-detail" /></h5>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-user text-p1"> <IntlMessages id="maintenance.person-list-contact-person" /> </span> : {detailing_data && detailing_data.emg_contact_person ? detailing_data.emg_contact_person : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-mail-with-at-sign text-p1"> <IntlMessages id="maintenance.person-list-email" /> </span> : {detailing_data && detailing_data.emg_email ? detailing_data.emg_email : "N/A"}</p>
                  </div>
                </div>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-smartphone-4 text-p1"> <IntlMessages id="maintenance.person-list-mobile" /></span> : {detailing_data && detailing_data.emg_mobile ? detailing_data.emg_mobile : "N/A"}</p>
                  </div>

                </div>

                <h5 className="text-primary h5-1"><IntlMessages id="maintenance.person-list-device-detail" /></h5>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-id-card text-p1"><IntlMessages id="device.id" /></span> : {detailing_data && detailing_data.device_id ? detailing_data.device_id : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-smartphone-4 text-p1"> <IntlMessages id="maintenance.person-list-device-name" /> </span> : {detailing_data && detailing_data.device_name ? detailing_data.device_name : "N/A"}</p>
                  </div>
                </div>
                <div className="flexbox">
                  <div>
                    <p className="p1-s"><span className="simple-icon-calendar text-p1"> <IntlMessages id="maintenance.person-list-mapped-at" />  </span> : {detailing_data && detailing_data.mapped_at ? detailing_data.mapped_at : "N/A"}</p>
                  </div>

                </div>

              </div>

            </ModalBody>
          </Modal>

        </CardBody>
      </Card>
    );
  }
}

export default DeviceList;


