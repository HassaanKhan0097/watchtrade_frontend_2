import React, { useState, Fragment } 	from "react"; //useEffect
import { Route, Link  } 			from 'react-router-dom';  
import { Modal, Button } 	from 'react-bootstrap';
import axios 				from 'axios'
import qs    				from 'qs';

import "./assets/css/bootstrap.min.css"
// import "./assets/js/vendor/jquery-1.12.4.min.js"
import 'bootstrap/dist/js/bootstrap.js';
// import "./assets/js/popper.min.js"
// import "./assets/js/bootstrap.min.js"
import "./assets/css/icons.min.css"
import "./assets/css/plugins.css"
// import "./assets/css/plugins.css"
import "./assets/css/style.css"
import { setUserSession, getToken, removeUserSession, isAdmin, getUser, timeSince } from '../../Utils/Common';


const WebLayout = ({ children }) => {
	const [show, setLoginShow] = useState(false);
	const handleLoginClose = () => setLoginShow(false);
	const handleLoginShow = (e) =>{ 
		e.preventDefault();
		setLoginShow(true)
	};
	const [registerShow, setRegisterShow] = useState(false);
	const handleRegisterClose = () => setRegisterShow(false);
	const handleRegisterShow = (e) =>{ 
		e.preventDefault();
		setRegisterShow(true)
	};

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [loginError, setLoginError] = useState(false);

	

	const [registerFirstname, setRegisterFirstname] = useState("");
	const [registerLastname, setRegisterLastname] = useState("");
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerError, setRegisterError] = useState(false);


	const handleRedirectToAdmin = (e) =>{ 
		e.preventDefault();

		window.open(window.$admin_api+"/login/"+getToken(), '_blank');
	};

	
	
	
	function loggin() {

		console.log("loggin")
		var data = JSON.stringify({
			'email': loginEmail,
			'password': loginPassword
		});
		console.log(data)
		var config = {
			method: 'post',
			url: window.$base_api+'/api/authentication',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};
		axios(config)
		.then(function (response) {
			debugger
			console.log("loggin success-->",response.data);
			if(!response.data.hasOwnProperty("success"))
			{
				setUserSession(response.data)
				window.location.reload()
			} else {
				setLoginError(true);
			}

		})
		.catch(function (error) {
			console.log("loggin failed-->",error);
			setLoginError(true)
		});
		
	}

	function register() {

		console.log("register")
		var data = JSON.stringify({
			'firstName': registerFirstname,
			'lastName': registerLastname,
			'userName': registerUsername,
			'email': registerEmail,
			'password': registerPassword,
			'mobileNo': Math.floor(Math.random() * 100000000) //Need to change
		});
		console.log(data);
		var config = {
			method: 'post',
			url: window.$base_api+'/api/signupauth',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		};
		axios(config)
		.then(function (response) {
			console.log("register success-->",response.data);
			debugger
			if(!response.data.hasOwnProperty("success"))
			{
				//setUserSession(response.data)
				window.location.reload()
			} else {
				setRegisterError(true);
			}

		})
		.catch(function (error) {
			console.log("register failed-->",error);
			setRegisterError(true);
		});
	}

    // this.state = { value: 'Hello World' };
	const isLoggedIn = getToken();
	const isLoggedUserAdmin = isAdmin();
	const loggedUser = getUser();
	const notiList = loggedUser && loggedUser.notiList.sort(function(a,b){
					// Turn your strings into dates, and then subtract them
					// to get a value that is either negative, positive, or zero.
					return new Date(b.time) - new Date(a.time);
				});
	console.log(notiList)
	return (                         
	<>
    	<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
		<header className="header-area header-padding-1 sticky-bar header-res-padding clearfix">
			<div className="container-fluid">
				<div className="container">
					<div className="row">
					<div className="col-xl-2 col-lg-2 col-md-4 col-4">
						<div className="logo">
						<a href="/">
							<h5 className="logo-heading">WatchTrade</h5>
						</a>
						</div>
					</div>
					<div className="col-xl-10 col-lg-10 d-none d-lg-block">
						<div className="main-menu">
						<nav>
							<ul>
								<li className={(children.props.match.path == "/") ? "menu-active" : ""}><a href="/"> Auctions </a></li>
								<li className={(children.props.match.path == "/sell") ? "menu-active" : ""}><a href="/sell"> Sell Now </a></li>
								{
									isLoggedIn == null &&
									<li onClick={handleRegisterShow}><a href="#"> Register </a></li>
								}

								{/* {
									<li>
										<div class="dropdown" style={{float: 'right'}}>
											<button class="dropbtn">Right</button>
											<div class="dropdown-content">
											<a href="#">Link 1</a>
											<a href="#">Link 2</a>
											<a href="#">Link 3</a>
											</div>
										</div>
									</li>
								} */}

								{
									isLoggedIn != null &&
									<li style={{cursor: 'pointer'}}>
									
									<div class="dropdown show">
										<i className="fas fa-bell noti-icon" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>

										<div class="dropdown-menu dropdown-menu-right" style={{translate: 'translateX(-50%) !important'}} aria-labelledby="dropdownMenuLink">
											<span class="list-group-item">Notifications</span>

											{
												(loggedUser && notiList.length > 0) ?
												( notiList.map((noti)=>(
													<a class="dropdown-item" href="#">

													<div class="container-noti row">
														<div class="container__img col-3">
														<img
															src={noti.productImage}
															alt="Product Image"
														/>
														</div>
														<div class="container__text col-9">
															<h6> <b>{noti.text}</b> </h6>
															<h6>{noti.productFullname}</h6>
															<p className="text-muted" style={{fontSize: '0.7rem'}}>{timeSince(new Date(noti.time))}</p>
														</div>
													</div>

													</a>
												)) ) :
												(<a class="dropdown-item" href="#">

												<div class="container-noti row">
													<span>No new notifications!</span>
												</div>

											</a>)

											}


										</div>
									

									</div>

								</li>
								}
								
								{/* {
									isLoggedUserAdmin &&
									<li onClick={handleRedirectToAdmin}><Link> Administration </Link ></li>
								} */}
								
								{ isLoggedIn == null ?
								<li onClick={handleLoginShow}><a href="#" > Login </a></li>
								:
								// <li onClick={handleLogout}><a href="#"> Logout </a></li>
								<li><a href="/profile"><i className="far fa-user noti-icon" ></i></a></li>
								}
								
							</ul>

							{/* <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
    
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div> */}
						</nav>
						</div>
					</div>
					</div>
					<div className="mobile-menu-area">
					<div className="mobile-menu">
						<nav id="mobile-menu-active">
						<ul className="menu-overflow">
							<li><a href="#"> Auctions </a></li>
							<li><a href="#"> Sell Now </a></li>
							<li><a href="#"> Register </a></li>
							<li><a href="#"> Login </a></li>
						</ul>
						</nav>
					</div>
					</div>
				</div>
			</div>
		</header>
		
		{children} 
		
		<footer className="footer-area bg-gray">
			<div className="container-fluid footer-cont">
				<div className="container pt-100 pb-40">
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-3">
							<div className="copyright mb-30 ">
								<div className="footer-logo">
									<a href="index.html">
										<h5 className="logo-heading footer-logo-heading">WatchTrade</h5>
									</a>
								</div>
								<p className="pt-60">But I must explain to you how all this mistaken idea of
									denouncing pleasure and praising pain was born and I will give you a complete account of
									the system, and expound the actual teachings of the great explorer of the truth.</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3">
							<div className="footer-widget mb-30 text-center">
								<div className="footer-title">
									<h3>Auctions</h3>
								</div>
								<div className="footer-list pt-50">
									<ul>
										<li><a href="#">Live Auctions</a></li>
										<li><a href="#">Coming Soon</a></li>
										<li><a href="#">Recently Sold</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3">
							<div className="footer-widget mb-30 ml-30">
								<div className="footer-title">
									<h3>Company</h3>
								</div>
								<div className="footer-list pt-50">
									<ul>
										<li><a href="#">Privacy Policy</a></li>
										<li><a href="#">Terms & Conditions</a></li>
										<li><a href="#">Cookie Policy</a></li>
										<li><a href="/contact">Contact us</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-3">
							<div className="footer-widget mb-30 ">
								<div className="footer-title">
									<h3>Sell with WatchTrade</h3>
								</div>
								<div className="footer-list pt-50">
									<ul>
										<li><a href="#">Sell Now</a></li>
										<li><a href="/about">About Watch Trade</a></li>
										<li><a href="#">Sell Now</a></li>
										<li><a href="/faq">FAQ's</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid footer-end-cont">
				<div className="container m-auto">
					<div className="row">
						<div className="col-md-4">
							<p className="white footer-end-p">WatchTrade ?? 2021</p>
						</div>
						<div className="col-md-8">
							<div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>      
		
		<Modal show={show} onHide={handleLoginClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="col-md-12 col-sm-12 col-xs-12">
						<h4 className="mb-60 text-center login-modal-sign">Sign in to WatchTrade</h4>
					</div>
					<div className="col-md-12 col-sm-12 col-xs-12">
						<form className="form-control login-modal-form">
							<input type="text" className="form-control login-email" onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email Address" />
							<div className="form-group mt-20">
								<div className="input-group" id="show_hide_password">
									<input className="form-control login-password" onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password"
										type="password" />
									<div className="input-group-addon">
										<a href=""><i className="fa fa-eye-slash" aria-hidden="true"></i></a>
									</div>
								</div>
							</div>
							<a href="#">Forget Password?</a>

							{ loginError ? <div className="alert alert-danger mt-15" role="alert">
								<i className="fa fa-exclamation-circle"></i> Email or password incorrect! 
							</div> : null }

							<button className="login-btn mt-30 mb-25" onClick={loggin} type="button">Login to Account</button>
							<div className="sideline">OR</div>
							<div className="social-login-content mt-30 mb-25">
								<div className="social-button">
									<button className="google-btn mb-15"><i className="fab fa-google mr-20"></i>Login with
										Google</button>
									<button className="facebook-btn"><i className="fab fa-facebook mr-20"></i>Login with
										Facebook</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button variant="secondary" onClick={handleLoginClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleLoginClose}>
					Save Changes
				</Button> */}
			</Modal.Footer>
		</Modal>
		
		<Modal show={registerShow} onHide={handleRegisterClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="col-md-12 col-sm-12 col-xs-12">
						<h4 className="mb-60 text-center login-modal-sign">Sign up to WatchTrade</h4>
					</div>
					<div className="col-md-12 col-sm-12 col-xs-12">
						<form className="form-control login-modal-form">
							<div className="form-group mt-20">
								<input type="text" className="form-control login-email" onChange={(e) => setRegisterFirstname(e.target.value)} placeholder="Firstname" />
							</div>
							<div className="form-group mt-20">
								<input type="text" className="form-control login-email" onChange={(e) => setRegisterLastname(e.target.value)} placeholder="Lastname" />
							</div>
							<div className="form-group mt-20">
								<input type="text" className="form-control login-email" onChange={(e) => setRegisterUsername(e.target.value)} placeholder="Username" />
							</div>
							<input type="text" className="form-control login-email" onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Email Address" />
							<div className="form-group mt-20">
								<div className="input-group" id="show_hide_password">
									<input className="form-control login-password" onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Password"
										type="password" />
									<div className="input-group-addon">
										<a href=""><i className="fa fa-eye-slash" aria-hidden="true"></i></a>
									</div>
								</div>
							</div>
							<a href="#">Forget Password?</a>

							{ registerError ? <div className="alert alert-danger mt-15" role="alert">
								<i className="fa fa-exclamation-circle"></i> Registration Failed! 
							</div> : null }

							

							<button className="login-btn mt-30 mb-25" type="button" onClick={register}>Create New Account</button>
							<div className="sideline">OR</div>
							<div className="social-login-content mt-30 mb-25">
								<div className="social-button">
									<button className="google-btn mb-15"><i className="fab fa-google mr-20"></i>Login with
										Google</button>
									<button className="facebook-btn"><i className="fab fa-facebook mr-20"></i>Login with
										Facebook</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button variant="secondary" onClick={handleLoginClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleLoginClose}>
					Save Changes
				</Button> */}
			</Modal.Footer>
		</Modal>
   	</>
)};  
  
const WebLayoutRoute = ({component: Component, ...rest}) => {  
	
    return (  
      <Route {...rest} render={matchProps => (  
        <WebLayout>  
            <Component {...matchProps} />  
        </WebLayout>  
      )} />  
    )  
};  
  
export default WebLayoutRoute; 