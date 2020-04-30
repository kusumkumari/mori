/* eslint-disable */
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";

export const BestSellers = (props) => {
  const { produtcs } = props;
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.best-sellers" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          {produtcs && produtcs.length>0 ?
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
          
            {produtcs.slice(0, 6).map((order, index) => {
              return (
             
                <div key={index} className="d-flex flex-row mb-3">
                   
                  <p
                    className="d-block position-relative"
                  >
                    {order.img ?
                      <img
                        src={order.img}
                        alt={order.title}
                        className="list-thumbnail border-0"
                      />
                      :

                      <img
                        src={require("../../../assets/no-image.png")}
                        alt={order.title}
                        className="list-thumbnail border-0"
                      />
                    }

                  </p>

                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <p className="list-item-heading">{order.title}</p>
                    <div className="pr-4">
                      <p className="text-muted mb-1 text-small">
                        {order.description}
                      </p>
                    </div>
                    <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                      {order.category}
                    </div>

                  </div>
               
                  
                </div>
                
              );
            })}
           
          </PerfectScrollbar>
           :
           <p style={{textAlign:"center"}}>No Data Available</p>
          }
        </div>
      </CardBody>
    </Card>
  );
}

export default BestSellers;