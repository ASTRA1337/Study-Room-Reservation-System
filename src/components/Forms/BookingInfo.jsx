import React from 'react'
import './BookingInfo.css';

function BookingInfo() {
    /* This function will show the room list for selection by user once button is clicked */
    function displayRoom(){
        document.getElementById("dropMenu").classList.toggle("show");
    }

    //This will close out the menu if the user clicks outside of it

    window.onclick = function(event){
        if (!event.target.matches('.dropbtn')){
            var dropdowns = document.getElementsByClassName("drop-content");
            var i;
            for (i = 0; i < dropdowns.length; i++){
                var openDropdown = dropdowns[i];
                if(openDropdown.classList.contains('show')){
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
    
    return (
        <div className = "bookingInfo">
            <button onClick = "displayRoom()" className = "dropbtn">Select Room</button>
            <div id = "dropMenu" className = "drop-content">
                <a href = "#">Room Number</a>
                <a href = "#">Room Number</a>
                <a href = "#">Room Number</a>
                <a href = "#">Room Number</a>
                <a href = "#">Room Number</a>
                <a href = "#">Room Number</a>

            </div>
            
        </div>
    )
}

export default BookingInfo
