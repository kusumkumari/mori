/* eslint-disable */
import React, { Component } from "react";
import { Card, CardBody, CardTitle, Modal,Button,Badge,
  ModalHeader,
  ModalBody, } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

class DeviceList extends Component {
  render() {
    const { data, retrieveDeviceHandler, handleChangeStatus, detailing_data, modal, detailing_data_id } = this.props;
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
          <IntlMessages id="device.list" />  <i className="iconsminds-receipt-4 text-primary" style={{fontSize:"large"}} />
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
                Header: <IntlMessages id="device.id" />,
                accessor: "device_id",
                filterable: true,
                Cell: props => <p className=".rt-td"><i className="iconsminds-smartphone-4" /> {props.value}</p>
              },
              
              {
                Header: <IntlMessages id="device.list-employee" />,
                accessor: "employee",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value ? props.value : "N/A"}</p>
              },
              {
                Header: <IntlMessages id="device.list-mapped-date" />,
                accessor: "mapped_date",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value ?<CalendarTodayIcon /> :""} {props.value ? props.value : "N/A"}</p>
              },
              {
                Header: <IntlMessages id="device.list-mapped-time" />,
                accessor: "mapped_time",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value ? <AccessTimeIcon /> : ""} {props.value ? props.value : "N/A"}</p>
              },
              {
                Header: <IntlMessages id="device.list-generate-code" className="button-center" />,
                accessor: "",
                Cell: props => <p className="button-center"><Button className="wd-85" color={props.original.is_qr_generated ? "success": "danger"} onClick={()=>this.props.addDeviceHandler(props.original.id)} disabled={props.original.is_qr_generated ? true : false}>
                  <b>{props.original.is_qr_generated ? <IntlMessages id="device.list-generated" />  :  <IntlMessages id="device.list-generate" />}</b></Button></p>
              },
               {
                Header: <IntlMessages id="device.list-status" />,
                accessor: "active_status",
                Cell: props => <p className="button-center"><Switch
                  id={name}
                  name={name}
                  className={this.props.className}
                  checked={props.value}
                  onClick={(e) => handleChangeStatus(props)}
                />
                </p>
              },
              {
                Header: <IntlMessages id="device.list-view11" className="button-center" />,
                accessor: "id",
                Cell: props =>props.original.is_qr_generated ?
                <p className="button-center"><span className="simple-icon-eye  text-primary" style={{fontSize:"x-large"}} onClick={(e) => this.props.toggle(props)}>
                  </span>
                  </p>
                  :
                   <IntlMessages id="device.list-qr-code" /> 
              
              }
              // {
              //   Header: "BarCode",
              //   accessor: "barcode_pic",
              //   Cell: props => <p className="text-muted"><img src={props.value} /></p>
              // }
              // {
              //   Header: "Status",
              //   accessor: "active_status",
              //   Cell: props => <p><Switch
              //     id={name}
              //     name={name}
              //     className={this.props.className}
              //     checked={props.value}
              //     onChange={(e) => handleChangeStatus(props)} />
              //   </p>
              // },
              // {
              //   Header: "Edit",
              //   accessor: "id",
              //   Cell: props => <a href="#form"><p className="simple-icon-pencil" onClick={(e) => retrieveDeviceHandler(props.value)}>
              //   </p></a>
              // }
            ]}
          />
          <Modal isOpen={modal} style={{marginTop: "170px"}} >
            <ModalHeader toggle={(e) => this.props.toggleClose()}>
              <IntlMessages id="modal.barCode-detail" />
            </ModalHeader>
            <ModalBody>
              <div>
                <img src={detailing_data}  style={{margin:"0 auto",display: "block"}} />               
              </div>
             
            </ModalBody>
          </Modal>
        
        </CardBody>
      </Card>
    );
  }
}

export default DeviceList;


