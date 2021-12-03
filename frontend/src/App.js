import { useContext, createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAuth } from './utils/authContext'

import Header from './components/Header';
import TaskPage from './pages/TaskPage';
import StatsPage from './pages/StatsPage';
import RoutesPage from './pages/RoutesPage';
import LoginPage from './pages/LoginPage';
import BotPage from './pages/BotPage';
import IndexPage from './pages/IndexPage';
import Dashboard from './components/Dashboard';

import HistoryThief from "./components/utils/HistoryThief";

import './App.css';
import './media/normalize.scss';
import './media/style.scss';
import {ProvideAuth} from "./utils/authContext";
import botPage from "./pages/BotPage";


const App = () => {
    let auth = useAuth();

    const headerParam = {
        is_superuser: auth.user ? auth.user.is_superuser : false,
        is_support: auth.user ? auth.user.is_support : false
    };

    return (
        <ProvideAuth>
            <Router>
                <HistoryThief/>
                <Switch>
                    <Route exact path="/login" >
                        <LoginPage />
                    </Route>
                    <Route exact path="/" >
                        <Header params={headerParam}/>
                        <TaskPage itemId={0} />
                    </Route>
                    <Route exact path="/bot" >
                        <BotPage/>
                    </Route>
                    <Route exact path="/tasks/:id"
                           render={({ match }) => {
                               const { id } = match.params;
                               return (<>
                                       <Header params={headerParam}/>
                                       <TaskPage itemId={id} />
                                   </>
                               )
                           }}
                    />
                    <Route exact path="/dashboard" >
                        <Header params={headerParam}/>
                        <Dashboard/>
                    </Route>
                    <Route exact path="/tasks">
                        <Header params={headerParam}/>
                        <TaskPage itemId={0} />
                    </Route>
                    <Route exact path="/stats" >
                        <Header params={headerParam}/>
                        <StatsPage/>
                    </Route>
                    <Route exact path="/routes" >
                        <Header params={headerParam}/>
                        <RoutesPage/>
                    </Route>
                    <Route exact path="/forecast" >
                        <Header params={headerParam}/>
                        <Dashboard/>
                    </Route>
                    <Route exact path="/reglament" >
                        <Header params={headerParam}/>
                        <TaskPage itemId={1} />
                    </Route>
                </Switch>
            </Router>
        </ProvideAuth>
    );
};

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();

  const [load, setLoad] = useState(true);

  useEffect(() => {
      if(auth.user === null) {
          auth.getCurrent().then(() => {
              setLoad(false)
          });
      } else {
          setLoad(false)
      }
  }, [auth.user]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          !load ? <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          /> : <></>
        )
      }
    />
  );
}


export default App;
