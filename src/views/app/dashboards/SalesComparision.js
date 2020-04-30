/* eslint-disable */
import React from "react";
import {
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import {LineChart} from "../../../components/charts"


const SalesComparision = (props) => {
  const { lineChartData , id }=props;
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id={id} />
        </CardTitle>
        <div className="dashboard-line-chart">
          <LineChart shadow data={lineChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesComparision;
