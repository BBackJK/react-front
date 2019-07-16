import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Home,
  Auth,
  Alarms,
  AlarmInfo,
  Messages,
  MessageWrite,
  MessageInfo,
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
      <Route exact path="/profile" component={Profile} />
      <Route path="/profile/update" component={ProfileUpdate} />
      <Route exact path="/messages" component={Messages} />
      <Route path="/messages/write" component={MessageWrite} />
      <Route path="/messages/info/:id" component={MessageInfo} />
      <Route component={NotPage} />
    </Switch>
  </React.Fragment>
);

export default App;
