import React from 'react';
import "./timeblock.css";

function TimeBlock({timeBlock, blockStatus, reserve}) {
    const selectTimeBlock = (e, toggleClass) => {
        e.preventDefault();
        var row = e.target;
        if (row && row.parentElement) {
            var parent = row.parentElement;
            if (row.tagName.toLowerCase() == "tr") {
                parent = row;
            }
            var classList = parent.classList;
            if (classList.contains(toggleClass)) {
                classList.remove(toggleClass);
            } else {
                classList.add(toggleClass);    
            }
            var timeValue = parent.firstElementChild.innerHTML;
            reserve(timeValue);
        }
    }
    var rowStyle = "time-block";
    if (blockStatus != "Available") {
        rowStyle = "reserved-time";
        return (
            <tr className={rowStyle}>
                <td>{timeBlock}</td>
                <td>{blockStatus}</td>
            </tr>
        );
    }
    return (
        <tr className={rowStyle} onClick={(e) => selectTimeBlock(e, "time-selected")}>
            <td>{timeBlock}</td>
            <td>{blockStatus}</td>
        </tr>
    );
}

export default TimeBlock;