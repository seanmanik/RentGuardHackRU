import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect, disconnect } from '@argent/get-starknet';



export default class AgreementList extends Component {
    constructor(props) {
        super(props);

        this.onChangeHash = this.onChangeHash.bind(this);
        this.payRent =  this.payRent.bind(this);

        this.state = {agreements: [], 
            connected: false, 
            account: null, 
            address: '', 
            landlordAddress: "",
            tenant: "",
            landlord: "",
            rent: 0,
            address: "",
            image: "",
            id: "",
            rentPaid: false,
            hash: "",
            rentHiked: 0
        };
    }

    async componentDidMount() {
        axios.get('http://localhost:5000/agreement')
        .then(response => {
            this.setState({ agreements: response.data })
            this.setState({ image: response.data[0].image })
            this.setState({ tenant: response.data[0].tenant })
            this.setState({ landlord: response.data[0].landlord })
            this.setState({ rent: response.data[0].rent })
            this.setState({ address: response.data[0].address })
            this.setState({ id: response.data[0]._id })
            this.setState({ rentPaid: response.data[0].rentPaid })
            this.setState({ hash: "" })
            this.setState({ rentHiked: response.data[0].rentHiked })
        })
        .catch((error) => {
            console.log(error);
        })

        try {
            const connection = await connect({
                webWalletUrl: "https://web.argent.xyz"
            });
            if (connection && connection.isConnected) {
                console.log(connection);                
            
            }

        } catch (error) {
            console.error(error);
        }

    }

    onChangeHash(e) {
        this.setState({
            hash: e.target.value
        });
    }


    async payRent(id) {
        try {
            axios.post(`http://localhost:5000/agreement/checkPayment/`, { hash: this.state.hash })
            .then(response => {
                if (response.data.success) {
                    this.setState({ rentPaid: true })
                    const agreement ={
                        rentPaid: true,
                        tenant: this.state.tenant,
                        landlord: this.state.landlord,
                        rent: this.state.rent,
                        address: this.state.address,
                        image: this.state.image,
                        rentHiked: this.state.rentHiked
                    }
                    console.log(agreement);
                    try {
                        axios.post(`http://localhost:5000/agreement/update/${id}`, agreement)
                    } catch (error) {
                        console.error(error);
                    }
                }
            })
            axios.get(`http://localhost:5000/agreement/${id}`)
            .then(response => {
                this.setState({ id: response.data.id })
            })
            
        } catch (error) {
            console.error(error);
        }


    }

    render() {
        return (
            
            <div className="container mt-4">
                <div className="text-center">
                    <img src="https://i.imgur.com/FsRZ6oq.png" alt="Policy Image" className="rounded" style={{ width: '30%', height: 'auto' }} />    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="details-container p-4">
                            <h3>Welcome Back, {this.state.tenant}</h3>
                            <h4>{this.state.address}</h4>
                            <div className="property-details">
                                <p><strong>Rent Due:</strong> ${this.state.rent}</p>
                                {/* Add other fields as needed */}
                                {!this.state.rentPaid ? (
                                    <>
                                        <input type="text" className="form-control" placeholder="Enter hash" aria-label="Enter amount" aria-describedby="basic-addon2" value={this.state.hash} onChange={this.onChangeHash}/>
                                        <button className="btn btn-danger" onClick={() => this.payRent(this.state.id)}>Confirm Payment</button>

                                    </>

                                ) : (
                                    <button className="btn btn-success">Rent Paid</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={this.state.image} alt="Agreement" className="img-fluid rounded" style={{ maxHeight: '400px' }} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="Image 1" />
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