import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateAgreement extends Component {
    constructor(props) {
        super(props);

        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeLandlord = this.onChangeLandlord.bind(this);
        this.onChangeRent = this.onChangeRent.bind(this);
        this.onChangeTenant = this.onChangeTenant.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            tenant: '',
            landlord: '',
            rent: 0,
            address: '',
            image: '',
            rentHiked: 0,
        }
    }

    componentDidMount() {
        this.setState({
            tenant: 'John Doe',
            landlord: 'Jane Doe',
            rent: 1000,
            address: '1234 Elm St',
            image: '',
            rentHiked: 0,
        })
    }

    onChangeTenant(e) {
        this.setState({
            tenant: e.target.value
        });
    }

    onChangeLandlord(e) {
        this.setState({
            landlord: e.target.value
        });
    }

    onChangeRent(e) {
        this.setState({
            rent: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();

        const agreement = {
            tenant: this.state.tenant,
            landlord: this.state.landlord,
            rent: parseInt(this.state.rent),
            address: this.state.address,
            image: this.state.image,
            rentHiked: this.state.rentHiked,
        }

        console.log(agreement);

        axios.post('http://localhost:5000/agreement/add', agreement)
            .then(res => console.log(res.data));

        this.setState({
            tenant: '',
            landlord: '',
            rent: 0,
            address: '',        
            image: '',
            rentHiked: ''
        })
    
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <img src="https://i.imgur.com/FsRZ6oq.png" alt="Policy Image" className="rounded" style={{ width: '30%', height: 'auto' }} />    
                </div>
                <h3>Create New Rental Agreement</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tenant: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.tenant}
                            onChange={this.onChangeTenant}
                        />
                    </div>
                    <div className="form-group">
                        <label>Landlord: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.landlord}
                            onChange={this.onChangeLandlord}
                        />
                    </div>
                    <div className="form-group">
                        <label>Rent: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.rent}
                            onChange={this.onChangeRent}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                    </div>
                    <br>
                    </br>
                    <div className="form-group">
                        <input type="submit" value="Create Agreement" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}