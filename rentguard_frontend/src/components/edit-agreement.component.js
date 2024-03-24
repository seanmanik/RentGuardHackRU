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
            newRentValue: 0,
            tenant: "",
            landlord: "",
            rent: 0,
            address: "",
            image: "",
            rentHiked: false,
            _id: ""
        };

    }

    componentDidMount() {
        axios.get('http://localhost:5000/agreement')
        .then(response => {
            this.setState({ agreements: response.data })
            this.setState({ tenant: response.data[0].tenant,
                            landlord: response.data[0].landlord,
                            rent: response.data[0].rent,
                            address: response.data[0].address,
                            image: response.data[0].image,
                            rentHiked: response.data[0].rentHiked,
                            _id: response.data[0]._id
                        })
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


    render() {
        return (
            
            <div className="container mt-4">
                <div className="text-center">
                    <img src="https://i.imgur.com/FsRZ6oq.png" alt="Policy Image" className="rounded" style={{ width: '30%', height: 'auto' }} />    
                </div>

                <h3 >Rent Hikes Capped at {this.state.maxHikePercentage}%. (Rent Stabilization Policy)</h3>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="details-container p-4">
                            <h3>Welcome Back, {this.state.landlord}</h3>
                            <h4>{this.state.address}</h4>
                            <div className="property-details">
                                <p><strong>Current rent:</strong> ${this.state.rent}</p>
                                <p><strong>Maximum rent hike:</strong>${Math.round(this.state.rent * (this.state.maxHikePercentage) / 100)}</p>
                                {/* Add other fields as needed */}
                                
                                {!this.state.rentHiked ? (
                                    <>
                                    <input
                                    type="number"
                                    value={this.state.newRentValue}
                                    onChange={(e) => this.handleRentChange(e.target.value)}
                                    />                                        
                                    <button className="btn btn-danger" onClick={() => this.onSubmit(this.state._id, this.state.newRentValue)}>Update Rent</button>
                                    
                                    </>

                                ) : (
                                    <button className="btn btn-success">Rent Raised</button>
                                )}
                                

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src="https://plus.unsplash.com/premium_photo-1672252617591-cfef963eeefa?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Agreement" className="img-fluid rounded" style={{ maxHeight: '400px' }} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Image 1" />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Image 2" />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Image 3" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}