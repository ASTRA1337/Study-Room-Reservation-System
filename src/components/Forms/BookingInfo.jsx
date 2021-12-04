import React, {useState} from 'react'
import './BookingInfo.css';

function BookingInfo({updateRoom}) {
    /* This function will show the room list for selection by user once button is clicked */
    const [room, setRoom] = useState("Select Room");
    function displayRoom(){
        document.getElementById("dropMenu").classList.toggle("show");
    }
    function selectRoom(roomNumber, roomId) {
        setRoom(roomNumber);
        updateRoom(roomNumber, roomId);
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
                <a href = "#N430" onClick={() => selectRoom("N430",1)}>N430</a>
                <a href = "#N443" onClick={() => selectRoom("N443",2)}>N443</a>
                <a href = "#N445" onClick={() => selectRoom("N445",3)}>N445</a>
                <a href = "#N447" onClick={() => selectRoom("N447",4)}>N447</a>
                <a href = "#N449" onClick={() => selectRoom("N449",5)}>N449</a>
                <a href = "#N453" onClick={() => selectRoom("N453",6)}>N453</a>
            </div>
            
        </div>
    )
}

export default BookingInfo
