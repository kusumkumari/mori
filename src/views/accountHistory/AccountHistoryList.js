/* eslint-disable */
import React, { Component } from "react";
import {
  Card, CardBody, CardTitle, Modal,
  ModalHeader,
  ModalBody, Button
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


class AccountHistoryList extends Component {
  render() {
    const { data, retrieveMaintananceHandler, handleChangeStatus, modal, detailing_data } = this.props;
    return (
      <Card className="mb-4">
        <CardBody>
         
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
                Header: <IntlMessages id="acc.acc-action" />,
                accessor: "acc_action",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: <IntlMessages id="acc.date" />,
                accessor: "acc_action_date",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: <IntlMessages id="acc.time" />,
                accessor: "acc_action_time",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header: <IntlMessages id="acc.username" />,
                accessor: "username",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: <IntlMessages id="acc.employee-id" />,
                accessor: "emp_id",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
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
                    <h6> <i className="iconsminds-building" /> {detailing_data && detailing_data.Company ? detailing_data.Company : "No Comapny Name"}</h6>
                    <h6> <i className="iconsminds-id-card" /> {detailing_data && detailing_data.emp_id ? detailing_data.emp_id : "No Employee ID"}</h6>
                    <h6> <i className="iconsminds-business-man" /> {detailing_data && detailing_data.designation ? detailing_data.designation : "No Designation"}</h6>
                    <Link to="/account-history/">
                      <Button color="primary" className="float-right">Account History</Button>
                      </Link>
                    <div>


                    </div>
                  </div>
                </div>
                <h5 className="text-primary h5-1">Basic Information</h5>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-business-man-woman text-p1">Gender</span> : {detailing_data && detailing_data.gender ? detailing_data.gender : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-add-user text-p1">Age</span> : {detailing_data && detailing_data.age ? detailing_data.age : "N/A"}</p>
                  </div>
                </div>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-drop text-p1">Blood Grroup</span> : {detailing_data && detailing_data.blood_group ? detailing_data.blood_group : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-post-mail text-p1">Address</span> : {detailing_data && detailing_data.address ? detailing_data.address : "N/A"}</p>
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

                <h5 className="text-primary h5-1">Emergency Detail</h5>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-user text-p1">Contact Person</span> : {detailing_data && detailing_data.emg_contact_person ? detailing_data.emg_contact_person : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-mail-with-at-sign text-p1">Email</span> : {detailing_data && detailing_data.emg_email ? detailing_data.emg_email : "N/A"}</p>
                  </div>
                </div>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-smartphone-4 text-p1">Mobile</span> : {detailing_data && detailing_data.emg_mobile ? detailing_data.emg_mobile : "N/A"}</p>
                  </div>

                </div>

                <h5 className="text-primary h5-1">Device Detail</h5>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-user text-p1">Device ID</span> : {detailing_data && detailing_data.emg_contact_person ? detailing_data.emg_contact_person : "N/A"}</p>
                  </div>
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-mail-with-at-sign text-p1">Device Name</span> : {detailing_data && detailing_data.emg_email ? detailing_data.emg_email : "N/A"}</p>
                  </div>
                </div>
                <div className="flexbox">
                  <div className="flex">
                    <p className="p1-s"><span className="iconsminds-smartphone-4 text-p1">Color Code</span> : {detailing_data && detailing_data.emg_mobile ? detailing_data.emg_mobile : "N/A"}</p>
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

export default AccountHistoryList;


