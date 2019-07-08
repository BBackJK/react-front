import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, SignIn, Alarms, Messages, Friends, NotPage } from '../pages';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/alarms" component={Alarms} />
      <Route path="/friends" component={Friends} />
      <Route path="/messages" component={Messages} />
      <Route component={NotPage} />
    </Switch>
  </React.Fragment>
);

export default App;
