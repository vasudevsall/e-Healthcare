import React from 'react';

function SideBar(props) {
    return(
        <div id="sidebar" className='is-active'>
            {props.children}
        </div>
    );
}

export default SideBar;