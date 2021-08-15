import React from 'react';  
import { Fragment } from 'react';
import { removeUserSession, getToken, isAdmin } from '../../../Utils/Common';


  class ProfilePage extends React.Component {

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

    handleLogout = (e) =>{ 
      e.preventDefault();
      removeUserSession()
      this.props.history.push("/");
    };

    handleRedirectToAdmin = (e) =>{ 
      e.preventDefault();
  
      window.open(window.$admin_api+"/login/"+getToken(), '_blank');
    };

    render() {
      
      const isLoggedUserAdmin = isAdmin();

      return ( 
        <Fragment>
        <label>Profile</label>

        { isLoggedUserAdmin && <button onClick={this.handleRedirectToAdmin}>Administration</button>}
        <button onClick={this.handleLogout}>Logout</button>
       </Fragment>
      );
    }
  }
export default ProfilePage  