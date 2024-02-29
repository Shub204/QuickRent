// import { signOut } from 'firebase/auth';
// import { auth } from '../pages/Auth/firebase.config';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { useContext } from "react";
import Modal from 'react-modal';
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { BiLogoQuora } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { SetShopContext } from "../context/set-shop-context";
import { useModal } from "../ModalContext";
import SignIn from "../pages/Auth/SignIn";

function Navbarlog() {
  const { openModal, closeModal, modalContent } = useModal();
  const { userAuth, LogOut, userdata } = useContext(UserContext);
  // const [userAuth, setUserAuth] = useState(false);
  const { getTotalCartItems } = useContext(SetShopContext);
  const nav = useNavigate();

  const SingOut = () => {
    LogOut();
    nav("/");
  };

  const customModalStyles = {
    content: {
      width: '460px', // Adjust the width as needed
      height: '510px', // Adjust the height as needed
      margin: 'auto',
      backgroundColor: 'white', // Adjust the background color
      borderRadius: '8px', // Add border-radius for rounded corners
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Add box shadow for a subtle effect
      padding: '0'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the overlay background color and transparency
    },
  };

  return (
    <>
      <Navbar
        key="xxl"
        expand="xxl"
        fixed="top"
        className="bg-body-tertiary mb-3"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <BiLogoQuora size={"50"} /> QuickRent
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xxl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`}>
                Profile
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/Cart">Cart</Nav.Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                {userAuth ? (
                  <MDBDropdown>
                    <MDBDropdownToggle
                      tag="a"
                      className="nav-link d-flex align-items-center"
                      href="#"
                    >
                      {userdata ? (
                        <img
                          src={userdata.photoURL}
                          className="rounded-circle"
                          height="22"
                          alt="Avatar"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src="https://seekicon.com/free-icon-download/user_21.svg"
                          className="rounded-circle"
                          height="22"
                          alt="Avatar"
                          loading="lazy"
                        />
                      )}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu
                      className="row justify-content-md-center"
                      style={{ borderRadius: "0.2rem" }}
                    >
                      <MDBDropdownItem>
                        <NavDropdown.Item href="/profile">
                          Profile
                        </NavDropdown.Item>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                          <NavDropdown.Item onClick={SingOut}>SignOut</NavDropdown.Item>
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                ) : (
                  <button onClick={() => openModal(<SignIn/>)}>Login</button>  
                )}
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <CiSearch
                  onClick={() => {
                    console.log("search");
                  }}
                  size={"40"}
                />
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
        <Modal
        isOpen={!!modalContent}
        onRequestClose={closeModal}
        contentLabel="Sign Up Modal"
        style={customModalStyles}
      >
        {modalContent}
      </Modal>
      </Navbar>
    </>
  );
}

export default Navbarlog;
