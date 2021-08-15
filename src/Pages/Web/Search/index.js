import React from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeLeft } from 'Utils/Common';
import Pagination from "react-js-pagination";
import { Fragment } from 'react';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      products: [],
      filterShow: false,
      activePage: 1,
      itemsPerPage: 4,

      filterDropdown: "live",
      filterKeyword: "",
    }


  }


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  handleSearch = () => {
    //Do filter logic here


    //redirect with data
    this.props.history.push("/search")
  }



  componentDidMount() {
    // Simple GET request using fetch
    fetch(window.$base_api + '/web/products')
      .then(async response => {
        const data = await response.json();
        console.log("Data======>", data);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ products: data })
        // console.log(data);
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });


    //Saving search keyword from homepage
    this.setState({
      filterKeyword: this.props.location.state.filterKeyword
    }, () => { console.log("State updated", this.state.filterKeyword) })
  }

  filterProductsByDropdown = (products) => {

    return this.state.filterDropdown == "live"
      ? products.filter(product => product.status == this.state.filterDropdown)
      : products.filter(product => product.status == this.state.filterDropdown)

  }

  filterProductsByKeyword = (products) => {
    console.log("filterProductsByKeyword called")
    debugger
    return products.filter(product => product.name.toLowerCase().includes(this.state.filterKeyword.toLowerCase()))

  }


  render() {

    var { products, filterShow, activePage, itemsPerPage, filterKeyword } = this.state;
    products = this.filterProductsByDropdown(products)

    console.log(filterKeyword)
    filterKeyword !== "" ? console.log("Ab main filter honga") : console.log("filter nahi honga")

    products = filterKeyword !== "" ? this.filterProductsByKeyword(products) : products

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedItems = products.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="bg-all">


        <div className="container">


          {/* Row Start */}
          <div className="row pt-30">


            <div className="col-12">
              <div class="form-group has-search index-form-group">
                <span class="fa fa-search form-control-feedback"></span>
                <input type="text" class="form-control" placeholder="Search" value={filterKeyword} onChange={(e) => { this.setState({ filterKeyword: e.target.value }) }} />
                <button class="srch-btn" onClick={this.handleSearch}>Search</button>
                <a onClick={() => { this.setState({ filterShow: !this.state.filterShow }) }} className="filter">Filter</a>
                <i onClick={() => { this.setState({ filterShow: !this.state.filterShow }) }} className="fa fa-filter" aria-hidden="true"></i>
              </div>
            </div>


          </div>
          {/* Row End */}








          {/* Filter Popup */}


          <div className="search-content-wrapper search-page">


            <div className={filterShow ? "row search-content filter-active" : "row search-content"}>

              <div className="row">
                <div className="col-6 text-left p-5">
                  <h4 className="pb-30">Manufactures</h4>

                  <div className="row">


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Rolex
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Benson
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Cartier
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Piaget
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Audemars Piguet
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Langines
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Piaget
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Langines
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Benson
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-6 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Rolex
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                  </div>

                </div>
                <div className="col-3 text-left p-5">
                  <h4 className="pb-30">Location</h4>



                  <div className="row">


                    <div class="col-12 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Australia
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-12 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Belgium
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-12 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Canada
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-12 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Germany
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-12 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        United States
                      </label>
                      <span class="price-circle">02</span>
                    </div>



                  </div>


                </div>
                <div className="col-3 text-left p-5">
                  <h4 className="pb-30">User Type</h4>



                  <div className="row">


                    <div class="col-12 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Default checkbox
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                    <div class="col-12 form-check pb-20">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label class="form-check-label" for="defaultCheck1">
                        Default checkbox
                      </label>
                      <span class="price-circle">02</span>
                    </div>


                  </div>



                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-md-2 col-sm-12"><input class="acc-profile-btn-one" type="button" value="Apply Filters"></input></div>
                <div className="col-md-2 col-sm-12"><input class="acc-profile-btn-three" type="button" value="Clear"></input></div>
              </div>
            </div>
          </div>


          {/* Filter Popup End */}




          {

            products.length > 0 ?
              (<div className="row pt-30">

                <div className="col-12">





                  <div className="product-area pb-60 search-page">
                    <div className="container index-pro-con">
                      <div className="product-tab-list nav pt-30 pb-55 text-center">
                        <a className="active" href="#product-1" data-toggle="tab">
                          <h4 className="index-new-arrivals">New Arrivals </h4>
                        </a>
                      </div>
                      <div className="tab-content jump">
                        <div className="tab-pane active" id="product-1">
                          <div className="row">
                            <div className="col-md-6 mb-20">
                              <i className="fas fa-search"></i>
                              <h3 className="index-hot-auction">Search Results</h3>
                            </div>
                            <div className="col-md-6 top-nav mb-20 text-right">
                              <h6 className="watch-auction-h6">{products.length} Watch Auctions</h6>
                              <select name="filterDropdown" id="filterDropdown" onChange={(e) => this.setState({ filterDropdown: e.target.value })} className="watchaction ml-3">
                                <option value="live">Live</option>
                                {/* <option value="#">Buy Now</option>
                                    <option value="#">Coming Soon</option> */}
                                <option value="finished">Sold</option>
                              </select>
                            </div>

                            {
                              paginatedItems.length > 0 ?
                                paginatedItems.map((product, index) => (
                                  // console.log(product.bidHistory[product.bidHistory.length-1].bidAmount)
                                  <div key={"product" + index} className="col-xl-3 col-md-3 col-lg-3 col-sm-6 mb-2">
                                    <div>
                                      <h3 className="index-title"><a href="#">{product.brand}</a></h3>
                                      <img className="flags" src="/assets/images/flags/de.png" alt="Germany Flag" />
                                      <p className="mb-10 index-title-p">{product.name} - {product.modelNo}</p>
                                    </div>

                                    <div className="product-wrap mb-25 scroll-zoom">
                                      <div className="product-img">
                                        <Link to={{
                                          pathname: `/product/${product._id}`,
                                        }}>

                                          <img className="default-img" src={product.images[0]} alt="" />
                                          <img className="hover-img" src={product.images[1]} alt="" />

                                        </Link>
                                        <span className="pink">{calculateTimeLeft(product.auctionExpireAt)}</span>
                                        <div className="product-action">
                                          {/* <div className="pro-same-action pro-wishlist">
                                                              <a title="Wishlist" href="wishlist.html"><i className="pe-7s-like"></i></a>
                                                          </div> */}
                                          <div className="pro-same-action pro-cart">
                                            <a title="Add To Cart" href="#"><i className="pe-7s-plus"></i> Add to watchlist</a>
                                          </div>
                                          {/* <div className="pro-same-action pro-quickview">
                                                              <a title="Quick View" href="#" data-toggle="modal"
                                                                  data-target="#exampleModal"><i className="pe-7s-look"></i></a>
                                                          </div> */}
                                        </div>
                                      </div>
                                      <div className="product-content">
                                        <div className="product-price">
                                          <span>${(product.bidHistory.length > 0) ? (product.bidHistory[product.bidHistory.length - 1].bidAmount) : (product.startingPrice)}</span> <span className="price-circle">0{product.bidHistory.length}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                                : <h5>No products found!</h5>
                            }

                          </div>
                        </div>
                      </div>

                      <div className="pro-pagination-style text-center mt-30 mb-30">
                        <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={this.state.itemsPerPage}
                          totalItemsCount={products.length}
                          pageRangeDisplayed={2}
                          hideNavigation={true}
                          onChange={this.handlePageChange.bind(this)}
                          activeClass={"page-item-active"}
                          itemClass={"page-item"}

                          firstPageText={"Previous"}
                          lastPageText={"Next"}

                          // itemClassPrev={"prev haha"}
                          // itemClassNext={"next hahaha"}

                          itemClassFirst={"page-prev"}
                          itemClassLast={"page-next"}

                        />
                      </div>
                    </div>

                  </div>




                </div>

              </div>) :
              (<Fragment>
                <div className="row pt-30">


                  <div className="col-12">
                    <div class="w-70" style={{ margin: '0 auto' }}>
                      <h5>You searched for <b>{filterKeyword}</b> with 0 results</h5>
                    </div>
                  </div>


                </div>




                <div className="row pt-30">


                  <div className="col-12">
                    <div class="w-70 bg-noWatch" style={{ margin: '0 auto' }}></div>
                  </div>


                </div>





                <div className="row pt-30 pb-30">


                  <div className="col-12">
                    <div class="w-70 text-center" style={{ margin: '0 auto' }}>
                      <h4>No watch on the list of auctions</h4>
                      <input class="acc-profile-btn-one" type="button" value="Sell a Watch" style={{ width: 150 }}></input>
                    </div>
                  </div>


                </div>
              </Fragment>

              )


          }




        </div>



      </div>
    );
  }
}
export default SearchPage