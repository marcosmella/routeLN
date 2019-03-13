import React, { Component } from 'react';
import Layout from './components/Layout'
import NewsAcum from './containers/NewsAcum';
import Detalle from './containers/Detalle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <Layout>
        <Switch>
          <Route exact path="/" component={NewsAcum} />
          <Route path="/url/" component={Detalle} />
        </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
