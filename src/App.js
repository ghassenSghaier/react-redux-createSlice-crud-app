import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import AddBudget from './pages/AddBudget';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addBudget" component={AddBudget} />
      </Switch>
    </div>
  );
}

export default App;
