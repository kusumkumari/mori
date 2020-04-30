/* eslint-disable */
import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Link,
} from "react-router-dom";

const TopnavNotifications = (props) => {
  const {notiCount, notifyDetail, notifyDetailLength, handleChange} = props;
  let notificationData=[]
  for(let i=0; i<notifyDetailLength; i++){
    const{order_id,mobile_number,email, id}=notifyDetail[i]
    notificationData.push({order_id:order_id, title:mobile_number, date:email, id:id})
  }
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        > 
          <i className="simple-icon-bell" />
          {notiCount != 0 ?
          <span className="count">{notiCount}</span>
          :
          ""
}
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {notificationData.map((notificationData, index) => {
              return(
                <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                <Link to={"/notification-list/"+notificationData.id} onClick={(e)=>handleChange(notificationData.id)}>
                <p className="font-weight-medium mb-1">{notificationData.order_id}</p>
                
                </Link>
                <div className="pl-3 pr-2">
                <Link to={"/notification-list/"+notificationData.id} onClick={(e)=>handleChange(notificationData.id)}>
                    <p className="font-weight-medium mb-1">{notificationData.title}</p>
                    <p className="text-muted mb-0 text-small">{notificationData.date}</p>
                  </Link>
                </div>
                <br/>
                <Link to="/notification-list/">Sell All </Link>
              </div>
              )
            })}
          </PerfectScrollbar>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
