import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./sass/main.scss";
import LogoData from "./JSON/logo.json";
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
import EditUser from "./components/Settings/EditUser"
import { DataProvider } from "./components/Context";
import AdminDash from "./components/AdminDash";
function App() {

   // Logo setup
  const logo = LogoData.map((obj) => {
    const { id, name, path, img } = obj;
    return (
        <Link to={path}>
          <img src={img} alt={name} key={id} className={name} />
        </Link>
    );
  });

  return (
    <DataProvider>
      <Router>
        <Nav logo={logo}/>
        <main>
          <p>
            <b>**Mobile page is under construction**</b>
          </p>
          <Switch>
            {/* Need to add public.env */}
            <Route path="/" exact render={Home}></Route>
            <Route path="/admindash" exact component={AdminDash}></Route>
            <Route path="/shop" exact component={Shop}></Route>
            <Route path="/services" exact render={Services}></Route>
            <Route path="/events" exact render={Events}></Route>
            <Route path="/rent" exact render={Rent}></Route>
            <Route
              path="/ballet-pilates"
              exact
              render={BalletAndPilates}
            ></Route>
            <Route path="/technic" exact render={TechnicalConsulting}></Route>
            <Route path="/about" exact render={About}></Route>
            <Route path="/contact" exact render={Contact}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/basket" exact component={Basket}></Route>
            <Route path="/settings" exact component={EditUser}></Route>
          </Switch>
        </main>
        <Footer logo={logo}/>
      </Router>
    </DataProvider>
  );
}

export default App;
