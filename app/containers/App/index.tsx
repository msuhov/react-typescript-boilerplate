import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
