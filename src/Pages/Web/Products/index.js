import React from 'react';
import axios from 'axios'
import { getUser } from 'Utils/Common';
import { Button } from 'bootstrap';
// import Axios from '../../../Utils/Common';


class ProductsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      product: [
        //   {
        //     "auctionExpireAt": null,
        //     "startingPrice": 100,
        //     "images": [
        //         "https://content.rolex.com/dam/2021/upright-bba-with-shadow/m116400gv-0002.png?impolicy=v6-upright&imwidth=420",
        //         "https://content.rolex.com/dam/watches/family-pages/milgauss/milgauss-m116400gv-0002-search.jpg"
        //     ],
        //     "confirmationCode": null,
        //     "status": "live",
        //     "_id": "61030092b3a176182f2b15f0",
        //     "userId": {
        //       "userType": "buyer",
        //       "watchList": [],
        //       "_id": "61053a98f8328c00174fb78e",
        //       "billingDetails": [],
        //       "invoiceAddresses": [],
        //       "bidsList": [],
        //       "created_at": "2021-07-31T11:57:12.245Z",
        //       "firstName": "Hassaan",
        //       "lastName": "Khan",
        //       "email": "hk@gmail.com",
        //       "password": "$2b$10$YYo8Grx/DIaoNtP1.Bq.ZO7WWXnd0IWRm/LNMsRO9ko78OdB.oDy2",
        //       "mobileNo": 69764415,
        //       "__v": 0,
        //       "userName": "hassaankhan0097"
        //     },
        //     "name": "Milgauss",
        //     "brand": "Rolex",
        //     "modelNo": "bluea2567",
        //     "bidHistory": [
        //         ""
        //     ],
        //     "created_at": "1970-01-19T20:06:27.128Z",
        //     "box ": true,
        //     "papers": true,
        //     "watchAge": "1627587442",
        //     "movement": "Automatic",
        //     "case": "Carbon",
        //     "bracelet": "Leather",
        //     "dial": "Skeleton",
        //     "lot": 63788,
        //     "location": "Time Square NY",
        //     "currency": "USD",
        //     "description": "Released at Baselworld 2016, the Rolex Air-King reference 116900 surprised enthusiasts and collectors with its unusual dial design and substantial size increase.",
        //     "updated_at": "2021-07-31T12:51:35.957Z",
        //     "updated": "2021-07-31T12:51:35.957Z"
        // }

      ],
      BidAmount: null,
      PlaceBidError: false,
      BtnPlaceBidDisabled: false,
      bidHistory: [],
    }
  }
  componentDidMount() {
    // Simple GET request using fetch
    fetch(window.$base_api + '/web/products/?_id='+this.props.match.params._id)
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ product: data }, this.bidHandling)
        console.log("Product -->",data);
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  bidHandling(){
    var bidHistory = this.state.product[0].bidHistory.sort( function ( a, b ) { return b.bidAmount - a.bidAmount; } );
    this.setState({bidHistory})
    console.log("bidHistory", bidHistory);

    if(getUser() == null){
      this.setState({BtnPlaceBidDisabled: true})
    } else {
      const checkMyBidInThisBidHistory = bidHistory.filter(bHistory => (bHistory.userId._id == getUser()._id ));
      console.log("checkMyBidInThisBidHistory",checkMyBidInThisBidHistory)
      checkMyBidInThisBidHistory.length > 0 && this.setState({BtnPlaceBidDisabled: true})
    }
  }

  calculateTimeLeft(){

    // get total seconds between the times
    var delta = Math.abs(new Date(1628404493002) - new Date()) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = Math.floor(delta % 60);  // in theory the modulus is not required

    var formattedHours = (hours < 10) ? "0"+hours : hours;
    var formattedMinutes = (minutes < 10) ? "0"+minutes : minutes;
    var formattedSeconds = (seconds < 10) ? "0"+seconds : seconds;

    if(days < 1 && hours < 60) { return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds } else { return days + " days" }
    // return  formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

  }

  handlePlaceBid = () => {

    console.log("handlePlaceBid")

		var data = JSON.stringify({
			'bidAmount': this.state.BidAmount,
			'productId': this.props.match.params._id
		});

		console.log(data)

		var config = {
			method: 'post',
			url: window.$base_api+'/products/addbids',
			headers: {
				'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+localStorage.getItem("token")
			},
			data: data
		};

    let that = this;
		axios(config)
		.then(function (response) {
			console.log("bid place success-->",response.data);
			if(!response.data.hasOwnProperty("success"))
			{
				window.location.reload()
			} else {
				that.setState({PlaceBidError: true})
			}

		})
		.catch(function (error) {
			console.log("bid place failed-->",error);
			that.setState({PlaceBidError: true})
		});





    // let that = this;
    // Axios.post(window.$base_api+'/products/addbids', {data: data})
    // .then(async response => {
      
    //   console.log("bid place success-->",response.data);
		// 	if(!response.data.hasOwnProperty("success"))
		// 	{
		// 		window.location.reload()
		// 	} else {
		// 		that.setState({PlaceBidError: true})
		// 	}
    // })
    // .catch(error => {

    //   console.log("bid place failed-->",error);
    //   that.setState({PlaceBidError: true})

    // });

  }

  
  render() {
    var { product, PlaceBidError, BtnPlaceBidDisabled, bidHistory } = this.state;

    //First product retreived & bidHistory
    if(product.length  == 0){
      return (<div></div>)
    } else {

    // var bidHistory = product[0].bidHistory.sort( function ( a, b ) { return b.bidAmount - a.bidAmount; } );
    // console.log("bidHistory", bidHistory);
    // const checkMyBidInThisBidHistory = bidHistory.filter(bHistory => (bHistory.userId._id == getUser()._id ));
    // console.log("checkMyBidInThisBidHistory",checkMyBidInThisBidHistory)
    // checkMyBidInThisBidHistory.length > 0 && this.setState({BtnPlaceBidDisabled: true})
    
    return (
      
        <React.Fragment>
          <div class="container-fluid pt-50 pb-50 bg-all dark-color">
            <div class="container">
              <div class="row">
                <div class="col-md-12 mb-30">
                  <p>
                    <a href="#">Auctions</a> <span class="slash">/</span> <a class="blue" href="#">{product[0].name}</a>
                  </p>
                </div>
                <div class="col-md-8 mb-50">
                  <div id="demo" class="carousel slide" data-ride="carousel">

                    <ul class="carousel-indicators">
                      <li data-target="#demo" data-slide-to="0" class="active"></li>
                      <li data-target="#demo" data-slide-to="1"></li>
                      <li data-target="#demo" data-slide-to="2"></li>
                    </ul>


                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src={product[0].images[0]} alt="Slider1" className="product-detail-img" />
                      </div>
                      <div class="carousel-item">
                        <img src={product[0].images[1]} alt="Slider2" className="product-detail-img" />
                      </div>
                      <div class="carousel-item">
                        <img src={product[0].images[1]} alt="Slider3" className="product-detail-img" />
                      </div>
                    </div>


                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                      <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                      <span class="carousel-control-next-icon"></span>
                    </a>
                  </div>
                </div>
                <div class="col-md-4 pl-30 pt-50 mb-50">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-12">
                        <h3 class="watch-detail-h2">{product[0].brand}</h3>
                        <img class="watch-detail-flag" src="/assets/images/flags/de.png" alt="Germany Flag" />
                        <p class="mb-10 dark-color">{product[0].name} - {product[0].modelNo}</p>
                      </div>
                      <div class="col-md-6 watch-detail-border">
                        <h3 class="fw-400 m-auto">${ (bidHistory.length > 0) ? (bidHistory[0].bidAmount) : (product[0].startingPrice) }</h3>
                        { (bidHistory.length > 0) ? (<p class="fs-12">bid placed by <a class="blue" href="#">@{ bidHistory[0] && bidHistory[0].userId.userName}</a></p>) : (<p class="fs-12">Starting Price</p>) }
                      </div>
                      <div class="col-md-6 pl-40">
                        {/* <h3 class="fw-400 m-auto">{this.calculateTimeLeft(product[0].auctionExpireAt, new Date())}</h3> */}
                        <h3 class="fw-400 m-auto">{this.calculateTimeLeft(product[0].auctionExpireAt, new Date())}</h3>
                        <p class="fs-12">Time Left</p>
                      </div>
                      <div class="col-md-12 mt-20">
                        <form action="#">
                          <input type="text" class="acc-input bg-white" onChange={(e) => this.setState({BidAmount: e.target.value})} placeholder={(bidHistory.length > 0) ? ("$"+ bidHistory[0].bidAmount +" or more") : ("$"+ product[0].startingPrice +" or more")} />
                          
                          { (BtnPlaceBidDisabled) ? (<input className="acc-profile-btn-one mt-10 disabled-btn" disabled type="button" onClick={this.handlePlaceBid} value="Place a Bid" />) : (<input className="acc-profile-btn-one mt-10"  type="button" onClick={this.handlePlaceBid} value="Place a Bid" />) }
                          

                          { PlaceBidError ? <div className="alert alert-danger mt-15" role="alert">
                            <i className="fa fa-exclamation-circle"></i> Bid Placement Failed! 
                          </div> : null }

                          <input class="acc-profile-btn-two mt-10" type="button" value="+ Add to Watchlist" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="container pl-0 pr-0">
                    <div class="row">
                      <div class="col-md-5 watch-detail-border">
                        <h3 class="mb-20 m-auto fw-300">Product Overview</h3>
                        <ul class="watch-detail-main-ul">
                          <li>
                            <ul class="ds-flex">
                              <li>Box:</li>
                              <li>{product[0].box ? 'Yes' : 'No'}</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Papers:</li>
                              <li>{product[0].papers ? 'Yes' : 'No'}</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Age:</li>
                              <li>since {Math.abs(new Date(Number(product[0].watchAge)).getFullYear())} ({Math.abs(new Date(Number(product[0].watchAge)).getFullYear() - new Date().getFullYear())} years)</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Movement:</li>
                              <li>{product[0].movement}</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Case:</li>
                              <li>{product[0].case}</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Bracelet:</li>
                              <li>{product[0].bracelet}</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Dial:</li>
                              <li>{product[0].dial}</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-7 pl-40">
                        <h3 class="mb-20 m-auto fw-300">Lot Overview</h3>
                        <ul class="watch-detail-main-ul">
                          <li>
                            <ul class="ds-flex">
                              <li>Lot:</li>
                              <li>#{product[0].lot}</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Location:</li>
                              <li>{product[0].location}m</li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Seller:</li>
                              <li>@{product[0].userId.userName} (Private) </li>
                            </ul>
                          </li>
                          <li>
                            <ul class="ds-flex">
                              <li>Currency:</li>
                              <li>{product[0].currency}</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="row mt-40 mb-20">
                      <div class="col-md-12 mb-50">
                        <p class="fs-12 text-left wd-70">{product[0].description}</p>
                      </div>
                      <div class="col-md-12">
                        <img src="/assets/images/xd/watch-detail/watch-1/detail-1.png" alt="" class="wd-100" />
                      </div>
                    </div>
                    <div class="row mt-60 mb-60">
                      <div class="col-md-6">
                        <p class="fs-12 text-left wd-95">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.</p>
                        <p class="fs-12 text-left wd-95">but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain.</p>
                      </div>
                      <div class="col-md-6">
                        <img src="/assets/images/xd/watch-detail/watch-1/detail-2.png" alt="" class="wd-100" />
                      </div>
                    </div>
                    <div class="row mt-60 mb-60">
                      <div class="col-md-6">
                        <img src="/assets/images/xd/watch-detail/watch-1/detail-3.png" alt="" class="wd-100" />
                      </div>
                      <div class="col-md-6 pl-40">
                        <p class="fs-12 text-left">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.</p>
                        <p class="fs-12 text-left">but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain.</p>
                      </div>

                    </div>
                    <div class="row mt-60 mb-60">
                      <div class="col-md-12">
                        <img src="/assets/images/xd/watch-detail/watch-1/detail-4.png" alt="" class="wd-100" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <p class="fs-12 text-left wd-70">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="container pl-30 pr-0">
                    <div class="row">
                      <div class="col-md-6 pl-0">
                        <h3>Bid History</h3>
                      </div>
                      <div class="col-md-6">
                        <p class="circle">{bidHistory.length}</p>
                      </div>
                      <div class="col-md-12 mt-10 h-500 watch-detail-overflow watch-detail-bid p-0" id="style-13">
                        
                        {
                          (bidHistory.length > 0) ? (
                            bidHistory.map((history, index) => (

                              <div key={"bidHistory"+index} class="row bid-history">
                                <div class="col-md-7 m-auto">
                                  <h3 class="mb-0 bid-active fw-400 pl-25">${history.bidAmount}</h3>
                                </div>
                                <div class="col-md-5">
                                  {/* <a class="blue" href="#">@{history.userId.userName}</a> */}
                                  <p class="fs-12">13 hours ago</p>
                                </div>
                                <div class="col-md-12">
                                  <hr></hr>
                                </div>
                              </div>
      
                            ))
                          ) : (<div class="row bid-history"><div class="col-md-12"><p class="fs-12">No bids found!</p></div><div class="col-md-12"><hr></hr></div></div>)
                        }


                      
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 mt-30 mb-30 pl-0 pr-0">
                        <hr class="watch-detail-hr-bold" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 pl-0">
                        <h3>Ask the Seller</h3>
                      </div>
                      <div class="col-md-6">
                        <p class="circle">15</p>
                      </div>
                      <div class="col-md-12 pl-0 pr-0">
                        <form action="#">
                          <textarea class="acc-input bg-white contact-div-color" name="askquestion" id="askquestion" cols="30" rows="10" placeholder="type your question here"></textarea>
                          <input class="acc-profile-btn-one" type="button" value="Ask a Question" />
                        </form>
                      </div>
                      <div class="col-md-12 mt-10 h-700 watch-detail-overflow watch-detail-bid p-0" id="style-13">
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div><div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div><div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>

                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div><div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                        <div class="row bid-quote mr-0 ml-0 mb-15">
                          <div>
                            <div class="col-md-12 text-center">
                              <img src="assets/images/xd/icons/quote.png" alt="" />
                              <p class="bid-quote-p">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the?</p>
                              <a href="#" class="blue">- @jackson50</a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
export default ProductsPage