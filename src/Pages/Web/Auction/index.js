import React from 'react';  


  class AuctionPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = 
        {
            products : []
        }
    }

    componentDidMount() {
      // Simple GET request using fetch
      fetch(window.$base_api+'/web/products')
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
    }

    render() {
      return ( 
       <label>Auction</label>
      );
    }
  }
export default AuctionPage  