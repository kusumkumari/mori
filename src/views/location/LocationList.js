/* eslint-disable */
import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import LocationOnIcon from '@material-ui/icons/LocationOn';
class LocationList extends Component {
  render() {
    const { data, retrieveLocationHandler, handleChangeStatus } = this.props;
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="location.list" /> <i className="iconsminds-receipt-4 text-primary" style={{fontSize:"large"}} />
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
                Header: <IntlMessages id="task.building-name" />,
                accessor: "building_name",
                filterable: true,
                Cell: props => <p className=".rt-td text-primary"><i className="iconsminds-building" /> {props.value}</p>
              },
              {
                Header: <IntlMessages id="location.country" />,
                accessor: "country_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header:  <IntlMessages id="location.state" />,
                accessor: "state_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header:  <IntlMessages id="location.city" />,
                accessor: "city_name",
                filterable: true,
                Cell: props => <p className="text-muted">{props.value}</p>
              },
              {
                Header:  <IntlMessages id="location.address" />,
                accessor: "address",
                filterable: true,
                Cell: props => <p className="text-muted"> <LocationOnIcon /> {props.value}</p>
              },
              
              {
                Header: <IntlMessages id="device.list-status" />,
                accessor: "active_status",
                Cell: props => <p><Switch
                  id={name}
                  name={name}
                  className={this.props.className}
                  checked={props.value}
                  onChange={(e) => handleChangeStatus(props)} />
                </p>
              },
              {
                Header: <IntlMessages id="product.edit" />,
                accessor: "id",
                Cell: props => <a href="#form"><p className="simple-icon-pencil text-primary" onClick={(e) => retrieveLocationHandler(props.value)}>
                </p></a>
              }
            ]}
          />
           
        </CardBody>
      </Card>
    );
  }
}

export default LocationList;


