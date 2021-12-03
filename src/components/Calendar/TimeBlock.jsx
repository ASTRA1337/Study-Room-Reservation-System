import React from 'react';
import "./timeblock.css";

function TimeBlock({timeBlock, blockStatus}) {
    const selectTimeBlock = (e, toggleClass) => {
        e.preventDefault();
        var row = e.target;
        console.log(e.target);
        if (row && row.parentElement) {
            var classList = row.parentElement.classList;
            if (classList.contains(toggleClass)) {
                classList.remove(toggleClass);
            } else {
                classList.add(toggleClass);
            }
            var timeValue = row.parentElement.firstElementChild.innerHTML;
            console.log("time row", timeValue);
            
        }
    }
    var rowStyle = "time-block";
    if (blockStatus != "Available") {
        rowStyle = "reserved-time";
    }
    return (
        <tr className={rowStyle} onClick={(e) => selectTimeBlock(e, "time-selected")}>
            <td>{timeBlock}</td>
            <td>{blockStatus}</td>
        </tr>
    );
}

export default TimeBlock;