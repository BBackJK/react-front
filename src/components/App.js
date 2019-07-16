import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Home,
  Auth,
  Alarms,
  AlarmInfo,
  Messages,
  Follow,
  FollowTheme,
  NotPage,
  Profile,
  ProfileUpdate,
} from '../pages';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Auth} />
      <Route exact path="/alarms" component={Alarms} />
      <Route path="/alarms/info/:id" component={AlarmInfo} />
      <Route exact path="/follow" component={Follow} />
      <Route path="/follow/:theme" component={FollowTheme} />
      <Route path="/profile/update" component={ProfileUpdate} />
      <Route path="/profile" component={Profile} />
      <Route path="/messages" component={Messages} />
      <Route component={NotPage} />
    </Switch>
  </React.Fragment>
);

export default App;
