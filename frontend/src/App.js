import { useState, useEffect } from 'react';
import './App.css';
import './media/normalize.scss';
import './media/style.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import TaskListPage from './pages/TaskListPage';
import Dashboard from './components/Dashboard';
//import { useAuth } from './utils/authContext'
import HistoryThief from "./components/utils/HistoryThief";


const App = () => {
    //let auth = useAuth();
    //useEffect(() => {}, [auth.user]);

    return (
        <>
            <Router>
                <HistoryThief/>
                <Switch>
                    <Route exact path="/" >
                        <Header/>
                        <TaskListPage/>
                    </Route>
                    <Route exact path="/dashboard" >
                        <Header/>
                        <Dashboard/>
                    </Route>
                    <Route exact path="/login" >
                        <LoginPage />
                    </Route>
                    <Route exact path="/task/:id"
                           render={({ match }) => {
                               const { id } = match.params;
                               return (<>
                                       <Header/>
                                       <TaskPage itemId={id} />
                                   </>
                               )
                           }}
                    />
                </Switch>
            </Router>

        </>
    );
};

export default App;
