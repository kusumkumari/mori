/* eslint-disable */
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import AccountHistoryList from "./AccountHistoryList";
import { listAccountHistoryAPI } from "../ApiIntegration";
import { Notification } from "../Utils/Notification";

class AccountHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataLength: null,

    };
  }
  

  listAccountHistory = () => {
    let id =this.props.match.params.id;
    listAccountHistoryAPI({id:id.toString()},(apiResponse) => {
      console.log("yyyyyyyyyyyyyyy", apiResponse)
      if (apiResponse.status == "success") {
        this.setState({
          data: apiResponse.response.data.data,
          dataLength: apiResponse.response.data.data.length,
        });
      }
    });
  }
  componentWillMount() {
    console.log("iiiiiiiiiiiiiiiiiiii",this.props.match.params.id)
    this.listAccountHistory();
  }



  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div id="form"></div>
            <i className="iconsminds-receipt-4 text-primary" style={{ fontSize: "x-large" }} />
            <Breadcrumb heading="menu.account-history" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="12">
           
            <AccountHistoryList {...this.state}
              title="dashboards.top-viewed-posts"
            />
       
          </Colxx>
        </Row>
     
      </Fragment>
    );
  }
}
export default injectIntl(AccountHistory);