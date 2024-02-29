import "./style.scss";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import Navbarlog from "./components/Navbar";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Profile from "./pages/Auth/Profile"
import Chating from "./pages/Auth/Chating";
import Products from "./pages/Products/Products";
import { Footer } from "./components/Footer/Footer";
import { ModalProvider } from "./ModalContext";
import ModalComponent from "./ModalComponent";
import Navbar2 from "./components/Navbar2";

function App() {
  return (
    <div className="App">
      <Router>
        <ModalProvider>
          <Navbarlog/>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Products/>}/>
          <Route element={<PrivateRoutes />}>
                <Route element={<Profile/>} path="/profile" exact/>
                <Route element={<Chating/>} path="/chats"/>
            </Route>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer/>
        </ModalProvider>
      </Router>
    </div>

  );
}

export default App;
