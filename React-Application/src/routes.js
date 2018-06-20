import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import NotFound from '././components/NotFound/NotFound';
import Post from './components/ReduxExample/Posts';


const Routes = () => (
<BrowserRouter>
    <Switch>
        <Route exact path='/' component={Post} />
        <Route  path='*' component={NotFound} />
    </Switch>
</BrowserRouter>
);

export default Routes;