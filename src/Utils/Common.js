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