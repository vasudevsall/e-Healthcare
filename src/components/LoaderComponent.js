import React from 'react';

export const Loader = (props) => {
    return(
        <>
            <div className={'loader-full'}>
                <div className="loader-container">
                    <div className="center"/>

                    <div className="inner">
                        <div className="inner__item" id="inner__item1"/>
                        <div className="inner__item" id="inner__item3"/>
                        <div className="inner__item" id="inner__item2"/>
                        <div className="inner__item" id="inner__item4"/>
                    </div>

                    <div className="outer">
                        <div className="outer__item" id="outer__item1"/>
                        <div className="outer__item" id="outer__item2"/>
                        <div className="outer__item" id="outer__item3"/>
                        <div className="outer__item" id="outer__item4"/>
                    </div>
                </div>
                <div className="loading">
                    Loading
                    <span className="loading__dot">.</span>
                    <span className="loading__dot">.</span>
                    <span className="loading__dot">.</span>
                </div>
            </div>
        </>
    );
}