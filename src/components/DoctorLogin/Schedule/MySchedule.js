import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import DocService from "../../../services/DocService";
import {Table} from 'reactstrap';

class MySchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            scheduleAvailable: false,
            errMess: ''
        };
        this.renderSchedule = this.renderSchedule.bind(this);
    }

    componentDidMount() {
        this.toUnmount = false;
        DocService.getSchedule()
            .then((resp) => {
                if(!this.toUnmount) {
                    this.setState({
                        schedule: resp.data,
                        scheduleAvailable: true
                    });
                }
            }).catch((err) => {
                if(!this.toUnmount) {
                    this.setState({
                        errMess: 'Error fetching schedule details'
                    });
                }
        })
    }

    renderSchedule() {
        if(!this.state.scheduleAvailable) {
            return (
                <div className='full-flex-span'>
                    <span className='fa fa-spin fa-circle-o-notch fa-lg'/>
                </div>
            );
        }
        let obj = this.state.schedule;
        return(
            <Table size={'sm'} responsive bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Day</th>
                        <th>Morning Shift</th>
                        <th>Evening Shift</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Monday</td>
                        <th>{(obj.t0 === '')?'Holiday':obj.t0}</th>
                        <th>{(obj.t1 === '')?'Holiday':obj.t1}</th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Tuesday</td>
                        <th>{(obj.t2 === '')?'Holiday':obj.t2}</th>
                        <th>{(obj.t3 === '')?'Holiday':obj.t3}</th>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Wednesday</td>
                        <th>{(obj.t4 === '')?'Holiday':obj.t4}</th>
                        <th>{(obj.t5 === '')?'Holiday':obj.t5}</th>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Thursday</td>
                        <th>{(obj.t6 === '')?'Holiday':obj.t6}</th>
                        <th>{(obj.t7 === '')?'Holiday':obj.t7}</th>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Friday</td>
                        <th>{(obj.t8 === '')?'Holiday':obj.t8}</th>
                        <th>{(obj.t9 === '')?'Holiday':obj.t9}</th>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Saturday</td>
                        <th>{(obj.t10 === '')?'Holiday':obj.t10}</th>
                        <th>{(obj.t11 === '')?'Holiday':obj.t11}</th>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Sunday</td>
                        <th>{(obj.t12 === '')?'Holiday':obj.t12}</th>
                        <th>{(obj.t13 === '')?'Holiday':obj.t13}</th>
                    </tr>
                </tbody>
            </Table>
        );
    }

    componentWillUnmount() {
        this.toUnmount = true;
    }

    render() {
        const renderSchedule = this.renderSchedule();
        return(
            <div className='fluid-container'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <h4>My Schedule</h4>
                        <hr/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12 table-div'>
                        {renderSchedule}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MySchedule);