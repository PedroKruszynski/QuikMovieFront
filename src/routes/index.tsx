import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/index';
import Movie from '../pages/Movie/index';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/movie/:movie_id/:movie_name+" component={Movie} />
  </Switch>
);

export default Routes;
