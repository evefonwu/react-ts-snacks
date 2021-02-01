import { Switch, Route } from 'react-router-dom'
import Snacks from './Snacks'

function App() {
  return (
    <div>    
      <Switch>
        <Route exact path="/" component={Snacks} />
      </Switch>            
    </div>
  );
}

export default App;
