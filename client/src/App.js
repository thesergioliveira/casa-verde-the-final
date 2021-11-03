import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./sass/main.scss";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Shop from "./components/Shop/Shop";
import Events from "./components/Events";
import Rent from "./components/Rent";
import BalletAndPilates from "./components/BalletAndPilates";
import TechnicalConsulting from "./components/TechnicalConsulting";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Basket from "./components/Shop/Basket";
import { DataProvider } from "./components/Context";

function App() {
  return (
    <DataProvider>
<<<<<<< HEAD
    <Router
     
    >
      <Nav />
      <main>
        <p>
          <b>**Mobile page is under construction**</b>
        </p>
        <Switch>
          {/* Need to add public.env */}
          <Route path="/" exact render={Home}></Route>
          <Route path="/shop" exact component={Shop}></Route>
          <Route path="/services" exact render={Services}></Route>
          <Route path="/events" exact render={Events}></Route>
          <Route path="/rent" exact render={Rent}></Route>
          <Route path="/ballet-pilates" exact render={BalletAndPilates}></Route>
          <Route path="/technic" exact render={TechnicalConsulting}></Route>
          <Route path="/about" exact render={About}></Route>
          <Route path="/contact" exact render={Contact}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/basket" exact component={Basket}></Route>
        </Switch>
      </main>
      <Footer />
    </Router></DataProvider>
=======
      <Router>
        <Nav />
        <main>
          <p>
            <b>**Mobile page is under construction**</b>
          </p>
          <Switch>
            {/* Need to add public.env */}
            <Route path="/" exact render={Home}></Route>
            <Route path="/shop" exact component={Shop}></Route>
            <Route path="/services" exact render={Services}></Route>
            <Route path="/events" exact render={Events}></Route>
            <Route path="/rent" exact render={Rent}></Route>
            <Route
              path="/ballet-pilates" exact render={BalletAndPilates}></Route>
            <Route path="/technic" exact render={TechnicalConsulting}></Route>
            <Route path="/about" exact render={About}></Route>
            <Route path="/contact" exact render={Contact}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/basket" exact component={Basket}></Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </DataProvider>
>>>>>>> caa0a87e122caec20e24bec41fe745262563e08c
  );
}

export default App;
