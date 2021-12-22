import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import AddBudget from './pages/AddBudget';
import EditBudget from './pages/EditBudget';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addBudget" component={AddBudget} />
        <Route exact path="/editBudget/:id" component={EditBudget} />
      </Switch>
    </div>
  );
}

export default App;
