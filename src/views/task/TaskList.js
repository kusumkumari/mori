/* eslint-disable */
import React, { Component } from "react";
import { Card, CardBody, CardTitle, Badge } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../../helpers/IntlMessages";
import DataTablePagination from "../../components/DatatablePagination";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { filterCaseInsensitive } from "../Utils/FilterCaseInsenstive";
import moment from "moment";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Done, Clear } from '@material-ui/icons';

class TaskList extends Component {
  render() {
    const { data, retrieveTaskHandler, handleChangeStatus } = this.props;
    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="task.list" />
             <i className="iconsminds-receipt-4 text-primary" style={{fontSize:"large"}} />
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
                Header: <IntlMessages id="task.building-name" />,
                accessor: "building_name",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: <IntlMessages id="task.description" />,
                accessor: "task_description",
                filterable: true,
                Cell: props => <p className=".rt-td">{props.value}</p>
              },
              {
                Header: <IntlMessages id="task.status" />,
                accessor: "task_status",
                filterable: true,
                Cell: props => <p>{props.value=="Scheduled" || props.value=="予定"  ?<Badge className="adjs-1-2" color="primary" pill>
                <b style={{fontSize: "14px"}}>{props.value}</b>
              </Badge>: ""} 
               {props.value=="Completed" || props.value=="完成" ?<Badge className="adjs-1-2" color="success" pill>
               <b style={{fontSize: "14px"}}>{props.value}</b>
             </Badge>: ""}
             {props.value=="Overdue" || props.value=="延滞" ?<Badge className="adjs-1-2" color="danger" pill>
               <b style={{fontSize: "14px"}}>{props.value}</b>
             </Badge>: ""}</p>
              },
              {
                Header: <IntlMessages id="task.reporting-date" />,
                accessor: "reporting_date",
                filterable: true,
                Cell: props => <p className="text-muted"><CalendarTodayIcon /> {props.value}</p>
              },
              {
                Header: <IntlMessages id="task.reporting-time" />,
                accessor: "reporting_time",
                filterable: true,
                Cell: props => <p className="text-muted"><AccessTimeIcon /> { props.value}</p>
              },
              // {
              //   Header: "Is Seen",
              //   accessor: "is_seen",
              //   filterable: true,
              //   Cell: props => <p className="text-muted">{props.value ?
              //     <Done style={{ color: "#0bb30b" }} /> : <Clear color="error" />}</p>
              // },
              // {
              //   Header: "Seen At",
              //   accessor: "seen_at",
              //   filterable: true,
              //   Cell: props => <p className="text-muted">{props.value ? props.value : "Not seen"}</p>
              // },
              {
                Header:  <IntlMessages id="device.list-status" />,
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
                Cell: props => <a href="#form"><p className="simple-icon-pencil" onClick={(e) => retrieveTaskHandler(props.value)}>
                </p></a>
              }
            ]}
          />
        </CardBody>
      </Card>
    );
  }
}

export default TaskList;


