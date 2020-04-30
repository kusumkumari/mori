/* eslint-disable */
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  setContainerClassnames,
  clickOnMobileMenu,

} from "../../redux/actions";

import {
  menuHiddenBreakpoint,
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import TopnavNotifications from "./Topnav.Notifications";
import IntlMessages from "../../helpers/IntlMessages";
 
import { logoutAPI, listNotificationCountAPI,notificationSeenAPI, userType } from '../../views/ApiIntegration';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      loading:false,
      notifyDetail:[],
      notifyDetailLength:null,
      notiCount:"",
    };
  }
  // notification(){
  //   listNotificationCountAPI((apiResponse) => {
  //     if (apiResponse.status == "success") {
  //       this.setState({
  //         notiCount: apiResponse.response.data.ordercount,
  //         notifyDetail: apiResponse.response.data.orderdetails,
  //         notifyDetailLength: apiResponse.response.data.orderdetails.length,
  //       });
  //     }
  //   });
  // }
  // handleChange=(id)=>{
  //   notificationSeenAPI({id:id},(apiResponse) => {
  //     console.log("555555555",apiResponse)
  //     if (apiResponse.status == "success") {
  //       this.setState({
  //         data: apiResponse.response.data.orderdata,
  //         dataLength: apiResponse.response.data.orderdata.length,
  //       });
  //     }
  //   })
  // }
  // componentDidMount() {
  //   const usertype =userType()
  //   if(usertype=='is_outlet'){
  //   this.notification();
  //   this.interval =setInterval(() => { 
  //    this.notification() 
  //   }, 1*5000);
  // }
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  };
  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };
  handleSearchInputKeyPress = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: ""
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.setState({loading:true});
      logoutAPI((response) => {
        this.setState({loading:false});
        this.props.history.push('/');
    });
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount } = this.props;
    const { messages } = this.props.intl;
    const usertype =userType();

    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

         
     
        </div>
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>

        <div className="navbar-right">
          {/* {isDarkSwitchActive && <TopnavDarkSwitch/>} */}
          <div className="header-icons d-inline-block align-middle">
          {usertype=='is_outlet' ?
            <TopnavNotifications {...this.state} handleChange={this.handleChange} />
            :""}
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{localStorage.getItem("companyName")}</span>
                <span>
                  {localStorage.getItem("logo") == "null" ?
                     <i className="iconsminds-user" style={{fontSize:"x-large"}} />
                  :
                  <img alt="Profile" src={localStorage.getItem("logo")} />
              }
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
              {/* <Link to="/settings"><DropdownItem> <i className="simple-icon-settings" /> Settings</DropdownItem></Link>
                <DropdownItem divider />
                <Link to="/Changepassword"> <DropdownItem> <i className="iconsminds-security-settings" /> Change Password</DropdownItem></Link>


                <DropdownItem divider /> */}
                <DropdownItem onClick={() => this.handleLogout()}> 
                <i className="simple-icon-power" /> <IntlMessages id="topnav.signout" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    { setContainerClassnames, clickOnMobileMenu }
  )(TopNav)
);
