import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Home,
  Auth,
  Alarms,
  Messages,
  Friends,
  NotPage,
  Profile,
} from '../pages';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Auth} />
      <Route path="/alarms" component={Alarms} />
      <Route path="/friends" component={Friends} />
      <Route path="/messages" component={Messages} />
      <Route path="/profile" component={Profile} />
      <Route component={NotPage} />
    </Switch>
  </React.Fragment>
);

export default App;
