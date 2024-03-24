import React, { Component } from 'react';
import axios from 'axios';

export default class EditPolicy extends Component {

    constructor(props) {
        super(props);

        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeMaxPercentageHike = this.onChangeMaxPercentageHike.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            year: 2024,
            maxPercentageHike: 5
        }
    }

    componentDidMount() {
        this.setState({
            year: 2024,
            maxPercentageHike: 0
        })
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    onChangeMaxPercentageHike(e) {
        this.setState({
            maxPercentageHike: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const policy = {
            year: this.state.year,
            maxPercentageIncrease: parseInt(this.state.maxPercentageHike)
        }

        console.log(policy);

        axios.post('http://localhost:5000/policy/update/65ffad6f7202b469ae5d3a2d', policy)
            .then(res => console.log(res.data));

        this.componentDidMount();
    
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <img src="https://i.imgur.com/FsRZ6oq.png" alt="Policy Image" className="rounded" style={{ width: '30%', height: 'auto' }} />    
                </div>
                <h3>Update Rent Stabilization Policy</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>New Max Rental Hike Percentage: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.maxPercentageIncrease}
                            onChange={this.onChangeMaxPercentageHike}
                        />
                    </div>
                    <div className="form-group">
                        <label>Year: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.year}
                            onChange={this.onChangeYear}
                        />
                    </div>
                    <br />
                   <div className="form-group">
                        <input type="submit" value="Update Rent Stabilization Policy" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}