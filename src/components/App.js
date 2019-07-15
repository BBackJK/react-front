import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Home,
  Auth,
  Alarms,
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
      <Route path="/alarms" component={Alarms} />
      <Route path="/follow/:theme" component={FollowTheme} />
      <Route path="/follow" component={Follow} />
      <Route path="/profile/update" component={ProfileUpdate} />
      <Route path="/profile" component={Profile} />
      <Route path="/messages" component={Messages} />
      <Route component={NotPage} />
    </Switch>
  </React.Fragment>
);

export default App;
