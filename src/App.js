import React from 'react';
import ModelDesigner from './components/ModelDesigner';
import { Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={() =>
            <ModelDesigner width={900} height={500} />
          } />
          <Route component={() =>
            <h1>Error 404: Page not found</h1>
          } />
        </Switch>
      </React.Fragment>
    );
  }
}