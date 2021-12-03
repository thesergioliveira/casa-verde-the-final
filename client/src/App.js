import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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
import Footer from "./components/Footer/Footer";
import Impressum from "./components/Footer/Impressum";
import Agb from "./components/Footer/Agb";
import Datenschutz from "./components/Footer/Datenschutz";
import Widerrufsbelehrung from "./components/Footer/Widerrufsbelehrung";
import ZahlungAndVersand from "./components/Footer/ZahlungAndVersand";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Basket from "./components/Shop/Basket";
import EditUser from "./components/EditUser";
import { DataProvider } from "./components/UserContext";
import { AuthContextProvider } from "./components/AuthContext";
import AdminDash from "./components/AdminDash";
import Checkout from "./components/Shop/Checkout";
import ItemDetails from "./components/Shop/ItemDetails";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyAccount from "./components/VerifyAccount";
import ReVerifyAccount from "./components/ReVerifyAccount";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import TotalBillProvider from "./components/Shop/TotalBillContext";

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
      <AuthContextProvider>
        <Router>
          <Nav logo={logo} />
          <main>
            <Switch>
              {/* Need to add public.env */}
              <Route path="/" exact render={Home}></Route>
              <Route path="/adminDash" exact component={AdminDash}></Route>
              <Route path="/shop" exact component={Shop}></Route>
              <Route path="/services" exact component={Services}></Route>
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
              <Route path="/impressum" exact render={Impressum}></Route>
              <Route path="/agb" exact render={Agb}></Route>
              <Route path="/datenschutzerklaerung" exact render={Datenschutz}></Route>
              <Route path="/widerrufsbelehrung" exact render={Widerrufsbelehrung}></Route>
              <Route path="/zahlung-versand" exact render={ZahlungAndVersand}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/forgetPassword" exact component={ForgetPassword}></Route>
              <Route path="/resetPassword/:id" exact component={ResetPassword}></Route>
              <Route path="/verifyAccount/:id" exact component={VerifyAccount}></Route>
              <Route path="/ReVerifyAccount" exact component={ReVerifyAccount}></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/settings" exact component={EditUser}></Route>
              <TotalBillProvider> 
              <Route path="/basket" exact component={Basket}></Route>
              <Route path="/basket/checkout" exact component={Checkout}></Route> 
              </TotalBillProvider>
              <Route path="/shop/product/:id" exact component={ItemDetails}></Route>
            </Switch>
          </main>
          <Footer logo={logo} />
        </Router>
      </AuthContextProvider>
    </DataProvider> 
  );
}

export default App;
