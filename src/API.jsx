import ky from 'ky-universal';


const apiServer = "http://localhost:3003";
const LOGIN_API = "authenticate";
const CREATE_USER_API = "user/create";
const RESERVATION_API = "user/schedule";
const ROOM_RESERVATION = "room/reservation";
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
        if (res.authenticated == false) {
            throw new Error(res.error);
        }
        return {authenticated: res.authenticated, error: res.error ,userData: res.user};
    } catch (error) {
        return {authenticated: false, error: error};
    };
};

//Response data if success {"created": true, "user_id": user_id}
async function createUser(user){
    const createUserUrl = makeURL(apiServer, CREATE_USER_API);
    console.log("running createUser");
    try {
        const res = await ky.post(createUserUrl,
            {json: user}
        ).json();
        console.log(res);
        if (res.created == false) {
            throw new Error(res.error);
        }
        
        return {created: res.created, userId: res.user_id};
    } catch (error) {
        return {created: false, error: error};
    };
};

//Response data if success {"created": true, "booking_id": booking_id}
async function makeReservation(reservation){
    const reservationUrl = makeURL(apiServer, RESERVATION_API);
    console.log("running createUser");
    try {
        const res = await ky.post(reservationUrl,
            {json: reservation}
        ).json();
        console.log(res);
        if (res.created == false) {
            throw new Error(res.error);
        }
        
        return {created: res.created,  bookingId: res.booking_id};
    } catch (error) {
        return {created: false, error: error};
    };
};

//Response data if success {"status": true, "reservations": {room_id: {date: [{timeblocks}]}}}
function process(room_id, reservations) {
    //room_id, date
    // {
    //     room_id: {
    //         date: [{start: end: user_id}]
    //     }
    // }
    var res = {};
    for (var booking of reservations) {        
        var {user_id,start,end} = booking;
        if (res[room_id] === undefined) {
            res[room_id] = {};
        }
        var startDate = new Date(start);
        var endDate = new Date(end);
        if (startDate === undefined || endDate === undefined) {
            console.log(start, end);
            continue;
        }
        var month = startDate.getMonth() + 1;
        var date = startDate.getFullYear() + "/" + month + "/" + startDate.getDate();
        if (res[room_id][date] === undefined) {
            res[room_id][date] = [];
        }
        var start_time = startDate.toLocaleTimeString();
        var end_time = endDate.toLocaleTimeString(); 
        res[room_id][date].push ({user_id: user_id, start: start_time, end: end_time});
    }
    return res;
}

async function getRoomReservation(room_id){
    const reservationUrl = makeURL(apiServer, ROOM_RESERVATION) + "/" + room_id;
    console.log("running getRoomReservation");
    try {
        const res = await ky.get(reservationUrl).json();
        console.log("received room reservation",res);
        if (res.status == false) {
            throw new Error(res.error);
        }
        var reservations = process(room_id, res.reservations[room_id]);
        return {status: res.status,  reservations: reservations};
    } catch (error) {
        return {status: false, error: error};
    };
};


export {authenticate, createUser, makeReservation, getRoomReservation};

