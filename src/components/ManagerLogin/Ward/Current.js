import React, {useState} from 'react';
import {TabContent, TabPane, NavItem, NavLink, Nav} from 'reactstrap';
import classnames from 'classnames';
import CurrentRoom from './CurrentRoom';
import CurrentIcu from './CurrentIcu';
import CurrentOt from './CurrentOt';


const Current = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if(activeTab !== tab) 
            setActiveTab(tab);
    }

    return(
        <div className='container-fluid ward-info'>
            <div className='row mb-2'>
                <div className='col-12'>
                    <h4>Patients Admitted</h4>
                    <hr/>
                </div>
            </div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1'})}
                        onClick={() => {toggle('1')}}
                    >
                        Ward
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2'})}
                        onClick={() => {toggle('2')}}
                    >
                        ICU
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '3'})}
                        onClick={() => {toggle('3')}}
                    >
                        Operation Theatre
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <CurrentRoom url = {props.url}/>
                </TabPane>
                <TabPane tabId="2">
                    <CurrentIcu url = {props.url}/>
                </TabPane>
                <TabPane tabId="3">
                    <CurrentOt url = {props.url}/>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Current;