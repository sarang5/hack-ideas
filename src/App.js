import Home from './Home/Home';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const NoAuthRoute = ({ component: Component, ...rest }) => 
(  
  <Route {...rest} render={props => 
  (
    sessionStorage.getItem('hackUser') ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
  )}/>
);

const AuthRoute = ({ component: Component, ...rest }) => 
(  
  <Route {...rest} render={props => 
  (
    sessionStorage.getItem('hackUser') ? <Redirect to={{pathname: '/'}}/> : <Component {...props} />
  )}/>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <NoAuthRoute exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
