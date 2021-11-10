import ky from 'ky-universal';


const apiServer = "http://localhost:3003";
const LOGIN_API = "authenticate";
const CREATE_USER_API = "user/create";
function makeURL(host, api) {
    return host + "/" + api;
}

async function authenticate(user){
    const loginURL = makeURL(apiServer, LOGIN_API);
    console.log("running authenticate");
    try {
        const res = await ky.post(loginURL,
            {json: user}
        ).json();
        console.log(res);
        return {authenticated: res.authenticated, error: res.error ,userData: res.user};
    } catch (error) {
        return {authenticated: false, error: error};
    };
};

async function createUser(user){
    const createUserUrl = makeURL(apiServer, CREATE_USER_API);
    console.log("running createUser");
    try {
        const res = await ky.post(createUserUrl,
            {json: user}
        ).json();
        console.log(res);
        return {authenticated: res.authenticated, error: res.error ,userData: res.user};
    } catch (error) {
        return {authenticated: false, error: error};
    };
};
export {authenticate, createUser};

