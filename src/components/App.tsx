import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Snacks from './Snacks'

function App() {
  return (
    <div>   
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Snacks} />
        </Switch>      
      </BrowserRouter>       
    </div>
  );
}

export default App;
