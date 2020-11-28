import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import { Route, Switch} from "react-router-dom";
import Orders from "./containers/Orders/Orders";

function App(): React.ReactElement {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={CheckOut} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuilder} exact />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
