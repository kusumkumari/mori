/* eslint-disable */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Card, CardBody, CardTitle } from "reactstrap";
import Pagination from "../../../components/DatatablePagination";
import IntlMessages from "../../../helpers/IntlMessages";


class OutletsRevenue extends Component {

  componentDidMount() {
    const dataEdited = this.props.revenuData.slice(0, 12);

    this.setState({
      revenuData: dataEdited,
    });
  }

  render() {
    const {revenuData} =this.props;
    return (
      <Card className="h-100">
        <CardBody>
          <CardTitle>
            <IntlMessages id={"dashboards.outlet-wise-revenue"} />
          </CardTitle>
            <ReactTable
              data={revenuData}
              defaultPageSize={6}
              showPageJump={false}
              showPageSizeOptions={false}
              PaginationComponent={Pagination}
              columns={[
                {
                  Header: "Outlet",
                  accessor: "outlet_name",
                  Cell: props => <p className="text-muted">{props.value}</p>
                },
                {
                  Header: "Revenue",
                  accessor: "revenue",
                  Cell: props => <p className="text-muted">{props.value}</p>
                }
              ]}
            />
        </CardBody>
      </Card>
    );
  }
}

export default OutletsRevenue;