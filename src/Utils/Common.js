import axios from 'axios'

// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

// return the token from the session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
}


// return if logged user is admin
export const isAdmin = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        let loggedUser = JSON.parse(userStr);
        if(loggedUser.userType == "admin" || loggedUser.userType == "both") { return true; } else { return false; }
    }
    else return null;
}



export default axios.create({
    headers: {
        'Content-Type'  : 'application/x-www-form-urlencoded',
        'Authorization' : 'Bearer '+localStorage.getItem("token")
    }
});








// Utils
export const calculateTimeLeft = (auctionExpireAt) => {

    if( new Date(auctionExpireAt) > new Date() ){

        // get total seconds between the times
        var delta = Math.abs(new Date(auctionExpireAt) - new Date()) / 1000;
        //1629412325929

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
        
    } else {
        return "Expired";
    }


}



export const timeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
    
  }



