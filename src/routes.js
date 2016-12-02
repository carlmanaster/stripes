import React from 'react'
import { Router, Route } from 'react-router';

import App from './components/App';
import Examples from './components/Examples';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/examples" component={Examples} />
  </Router>
);

export default Routes;
