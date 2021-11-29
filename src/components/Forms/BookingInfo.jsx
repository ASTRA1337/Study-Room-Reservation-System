import React, {useState} from 'react'
import './BookingInfo.css';

function BookingInfo({updateRoom}) {
    /* This function will show the room list for selection by user once button is clicked */
    const [room, setRoom] = useState("Select Room");
    function displayRoom(){
        console.log("clicked displayRoom");
        document.getElementById("dropMenu").classList.toggle("show");
    }
    function selectRoom(roomNumber) {
        updateRoom(roomNumber);
        setRoom(roomNumber);
        displayRoom();
        
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
        <div className = "dropdown">
            <button onClick = {displayRoom} className = "dropbtn">{room}</button>
            <div id = "dropMenu" className = "dropdown-content">
                <a href = "#N430" onClick={() => selectRoom("N430")}>N430</a>
                <a href = "#N443" onClick={() => selectRoom("N443")}>N443</a>
                <a href = "#N445">N445</a>
                <a href = "#">N447</a>
                <a href = "#">N449</a>
                <a href = "#">N453</a>
            </div>
            
        </div>
    )
}

export default BookingInfo
