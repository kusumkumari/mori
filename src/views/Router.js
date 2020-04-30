/* eslint-disable */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { isLoggedIn } from './ApiIntegration';
// Brand Routings
import DefaultDashboard from './app/dashboards/default';
import Device from './device/DeviceCard';
import Login from './user/login';
import AppLayout from '../layout/AppLayout';
import UserLayout from '../layout/UserLayout';
import Maintanance from './maintanance/MaintananceCard';
import Task from './task/TaskCard';
import Location from './location/LocationCard';
import AccountHistory from './accountHistory/AccountHistoryCard';
import TaskStatusList from './taskStatus/TaskStatusList';
import TaskHistoryList from './taskHistory/TaskHistoryList';
import ServerDown from './server/ServerDown';


const MainRoutes = () => (
  <AppLayout >
    <Route exact path="/" component={DefaultDashboard} />
    <Route exact path="/device/" component={Device} />
    <Route exact path="/maintanance-person/" component={Maintanance} />
    <Route exact path="/task-creation/" component={Task} />
    <Route exact path="/location/" component={Location} />
    <Route exact path="/account-history/:id" component={AccountHistory} />
    <Route exact path="/task_status/" component={TaskStatusList} />
    <Route path="/server" component={ServerDown} />


  </AppLayout>
);


const WrappedWithoutLoginRoutes = () => (
  <UserLayout>
    <Route exact path="/" component={Login} />
    <Route exact path="/person_today_history/:id" component={TaskHistoryList} />
    <Route exact path="/server" component={ServerDown} />

  </UserLayout>
);

const Router = () => (
  <Switch>
    <Route
      path="/"
      render={() => {
        const loggedIn = isLoggedIn();
        if (loggedIn) {
          return <MainRoutes />;
         
        } else {
          return <WrappedWithoutLoginRoutes />;
        }
      }
      } />
  </Switch>
);

export default Router;
