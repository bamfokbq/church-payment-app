import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditForm from './components/EditForm/EditForm';
// import Footer from './components/Footer/Footer';
import Form from './components/Form/Form';
import InfoPreview from './components/InfoPreview/InfoPreview';
import Record from './components/Record/Record';

const Home = () => {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              <Record />
            </Route>
            <Route path='/payment'>
              <Form />
            </Route>
            <Route exact path='/record'>
              <Record />
            </Route>
            <Route path='/record/:id'>
              <InfoPreview />
            </Route>
            <Route path='/edit/:id'>
              <EditForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default Home;
