import React, {useState} from 'react'


function Welcome() {
    return (
        <div className="Hello">
        <h2>Hello</h2>
        {/* So this is a template for the welcome page. 
        Just wanted to keep the overall design simple by having a small message and the two buttons.
        The two button should route to the respective components. 
        We could refactor using a high res background image to display the message over and maybe some animation as well. */}
        <input type="submit" value="Log In"></input>
        <input type="submit" value="Create Account"></input> 
        </div>
        
    )
}

export default Welcome
