import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Agreement = props => (

    
    <tr>
        <td className="align-middle">{props.agreement.landlord}</td>
        <td className="align-middle">${props.agreement.rent}</td>
        <td className="align-middle">{props.agreement.address}</td>
        <td className="align-middle">${props.agreement.rentHiked}</td>
        {/* <td>
            <Link to={"/edit/"+props.agreement._id}>Edit</Link> | <a href="#" onClick={() => { props.payRent(props.agreement._id) }}>Pay rent</a>
        </td> */}
        <td className="align-middle">
                {props.agreement.rentHiked === 0 ? (
                    <>
                        <input
                            type="number"
                            value={props.newRentValue}
                            onChange={(e) => props.onRentChange(e.target.value)}
                        />                        <br></br>
                        <button className="btn btn-danger ml-2" onClick={() => props.onSubmit(props.agreement._id, props.newRentValue)}>Raise Rent</button>
                    </>
                ) : (
                    <button className="btn btn-success">Rent Raised</button>
                )}
        </td>
        <td>
            <img src={props.agreement.image} alt="Agreement" className="rounded" style={{ width: '200px', height: '100px' }} />
        </td>
    </tr>
)

export default class EditAgreement extends Component {
    constructor(props) {
        super(props);

        this.onSubmit =  this.onSubmit.bind(this);
        this.state = {agreements: [], 
            targetAgreement: {}, 
            maxHikePercentage: 0,
            newRentValue: 0};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/agreement')
        .then(response => {
            this.setState({ agreements: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get('http://localhost:5000/policy')
        .then(response => {
            this.setState({ maxHikePercentage: response.data[0].maxPercentageIncrease })
        })
        this.setState({ newRentValue: 0 });
    }

    onSubmit(id, newRentValue) {
        console.log(id);
        axios.get(`http://localhost:5000/agreement/${id}`)
        .then(response => {
            console.log(response.data)
            this.setState({ targetAgreement: response.data})
            const numNewRentValue = parseInt(newRentValue);
            const tAgreement = response.data;
            const oldRent = tAgreement.rent;
            const rentHike = numNewRentValue 
            const newRent = numNewRentValue + oldRent

            if (newRent / oldRent > 1 + this.state.maxHikePercentage / 100) {
                return;
            }
            tAgreement.rent = newRent;
            tAgreement.rentHiked = rentHike;
            axios.post('http://localhost:5000/agreement/update/' + id, tAgreement)
            .then(response => {
                console.log(response.data);
                // Update the state or any other necessary action
                this.componentDidMount();
            })
        })
        .catch((error) => {
            console.log(error);
        })
        // console.log(this.state.targetAgreement.address);
        // const oldRent = this.state.targetAgreement.rent;
        // const rentHike = oldRent * (this.state.maxHikePercentage / 100);
        // const newRent = oldRent + rentHike;
        // this.state.targetAgreement.rent = newRent;
        // this.state.targetAgreement.rentHiked = rentHike;

        // axios.post('http://localhost:5000/agreement/update/' + id, this.state.targetAgreement)
        //     .then(response => {
        //         console.log(response.data);
        //         // Update the state or any other necessary action
        //         this.componentDidMount();
        //     })
        //     .catch(error => {
        //         console.error('Error updating rent:', error);
        //     });
    }

    handleRentChange = (value) => {
        this.setState({ newRentValue: value });
    
    }

    agreementList() {
        return this.state.agreements.map(currentagreement => {
            return <Agreement agreement={currentagreement} onRentChange={this.handleRentChange} newRentValue={this.state.newRentValue} onSubmit={this.onSubmit} key={currentagreement._id}/>;
        })
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <img src="https://i.imgur.com/FsRZ6oq.png" alt="Policy Image" className="rounded" style={{ width: '30%', height: 'auto' }} />    
                </div>
                <h3>Rent Hikes Capped at {this.state.maxHikePercentage}%. (Rent Stabilization Policy)</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th >Landlord</th>
                            <th >Rent</th>
                            <th >Address</th>
                            <th >Rent Hiked</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.agreementList() }
                    </tbody>
                </table>
            </div>
        );
    }
}