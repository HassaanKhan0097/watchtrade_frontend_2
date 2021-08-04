import React from 'react';  
import axios from 'axios'




  class SellPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            mobileNo: "",
            email: "",
            country: "",
            brand: "",
            modelNo: "",
            details: "",

            SellError: false,
            SellSuccess: false
        }
    }

    handleSubmit = () => {

        console.log("handleSubmit")
    
            var data = JSON.stringify({
                'firstName': this.state.firstName,
                'lastName': this.state.lastName,
                'mobileNo': this.state.mobileNo,
                'email': this.state.email,
                'country': this.state.country,
                'brand': this.state.brand,
                'modelNo': this.state.modelNo,
                'details': this.state.details,
            });
    
            console.log(data)
    
            var config = {
                method: 'post',
                url: window.$base_api+'/web/sell/create',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };
    
            let that = this;
            axios(config)
            .then(function (response) {
                console.log("sell success-->",response.data);
                if(!response.data.hasOwnProperty("success"))
                {
                    document.getElementById("form-sellnow").reset();
                    that.setState({SellError: false, SellSuccess: true})
                } else {
                    that.setState({SellError: true, SellSuccess: false})
                }
    
            })
            .catch(function (error) {
                console.log("sell failed-->",error);
                that.setState({SellError: true, SellSuccess: false})
            });
    
      }


    render() {

        var { SellError, SellSuccess } = this.state;

      return ( 
        <React.Fragment>
        <div class="container-fluid sell-watch-main-cont">
          <div class="container">
              <div class="row">
                  <div class="col-md-12">
                      <h1 class="white pt-400">Sell a Watch</h1>
                  </div>
              </div>
          </div>
      </div>

      <div class="container-fluid pt-50 pb-50 bg-all">
        <div class="container">
            <div class="row">
            <div class="col-md-6">
                <form id="form-sellnow">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="ml-0 sell-watch-personal">Personal Details:</h5>
                        </div>
                        <div class="col-md-6 mb-15">
                            <input type="text" onChange={(e) => this.setState({firstName: e.target.value})} class="acc-input bg-white" placeholder="First Name" />
                        </div>
                        <div class="col-md-6 mb-15">
                            <input type="text" onChange={(e) => this.setState({lastName: e.target.value})} class="acc-input bg-white" placeholder="Last Name" />
                        </div>
                        <div class="col-md-6 mb-15">
                            <input type="number" onChange={(e) => this.setState({mobileNo: e.target.value})} class="acc-input bg-white" placeholder="Mobile #" />
                        </div>
                        <div class="col-md-6 mb-15">
                            <input type="text" onChange={(e) => this.setState({email: e.target.value})} class="acc-input bg-white" placeholder="Email address" />
                        </div>
                        <div class="col-md-6 mb-15">
                            <select name="Country" onChange={(e) => this.setState({country: e.target.value})} id="Country" class="sell-watch-select acc-input">
                                <option value="Country" selected disabled>Country</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="India">India</option>
                            </select>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="ml-0 sell-watch-personal">Watch Details:</h5>
                        </div>
                        <div class="col-md-6 mb-15">
                            <input type="text" class="acc-input bg-white" onChange={(e) => this.setState({brand: e.target.value})} placeholder="Brand" />
                        </div>
                        <div class="col-md-6 mb-15">
                            <input type="text" class="acc-input bg-white" onChange={(e) => this.setState({modelNo: e.target.value})} placeholder="Watch Model/Number" />
                        </div>
                    </div>
                    <hr></hr>
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="ml-0 sell-watch-personal">Additional Details:</h5>
                        </div>
                        <div class="col-md-12 mb-15">
                            <textarea onChange={(e) => this.setState({details: e.target.value})} class="acc-input bg-white sell-watch-textarea" name="sell-watch-detail" id="sell-watch-detail" cols="30" rows="10" placeholder="type your question here."></textarea>
                        </div>
                        <div class="col-md-3">
                            <input class="acc-profile-btn-one" type="button" onClick={this.handleSubmit} value="Submit" />
                        </div>
                    </div>

                    { SellError ? <div className="alert alert-danger mt-15" role="alert">
                    <i className="fa fa-exclamation-circle"></i> Failed! 
                    </div> : null }

                    { SellSuccess ? <div className="alert alert-success mt-15" role="alert">
                    <i className="fa fa-exclamation-circle"></i> Success! 
                    </div> : null }

                </form>

            </div>
              <div class="col-md-1">
              </div>
              <div class="col-md-5">
                  <div class="row">
                      <div class="col-md-12">
                          <h3 class="mb-30 fw-100">How does "Watch Trade" works? and how fast &amp; easy it is?</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                          <input class="learn-more mt-30 wd-30" type="button" value="Learn more" />
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
export default SellPage  