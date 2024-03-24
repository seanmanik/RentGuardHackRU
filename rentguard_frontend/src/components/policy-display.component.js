import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Policy = props => (
    <tr>
        <td style={{ fontSize: '20px'}} className="align-middle">{props.policy.maxPercentageIncrease}%</td>
        <td style={{ fontSize: '20px'}} className="align-middle">{props.policy.year}</td>
    </tr>
)

export default class PolicyDisplay extends Component {

    constructor(props) {
        super(props);
        
        this.state = {policies: []};
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/policy')
        .then(response => {
            this.setState({ policies: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

 
    
    policyList() {
        return this.state.policies.map(currentpolicy => {
            return <Policy policy={currentpolicy} key={currentpolicy._id}/>;
        })
    }
    
    render() {
        return (
            <div>
                <div className="text-center">
                    <img src="https://i.imgur.com/FsRZ6oq.png" alt="Policy Image" className="rounded" style={{ width: '30%', height: 'auto' }} />    
                </div>
                <img src="https://images.unsplash.com/photo-1641757728612-8d777dd1a251?q=80&w=2230&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Policy Image" className="rounded" style={{ width: '80%', height: 'auto' }} />    
                <br />
                <br />

                <h1 style={{ fontSize: '2rem' }}>Rent Stabilization Policy</h1>
                <p style={{ fontSize: '1.1rem' }}>Rent stabilization is a crucial tool in our efforts to ensure affordable housing for all citizens. As the government, we recognize the challenges faced by tenants in high-cost areas, where rapid rent increases can lead to displacement and housing instability.</p>
                <h2 style={{ fontSize: '1.5rem' }}>Balancing Interests</h2>
                <p style={{ fontSize: '1.1rem' }}>Our rent stabilization policy aims to strike a balance between the interests of landlords and tenants. By limiting rent hikes to reasonable levels, we help protect tenants from unaffordable increases while ensuring that landlords can earn a fair return on their investment.</p>
                <h2 style={{ fontSize: '1.5rem' }}>Preserving Communities</h2>
                <p style={{ fontSize: '1.1rem' }}>Rent stabilization also plays a vital role in preserving diverse and vibrant communities. It allows long-term residents to remain in their homes, maintaining social connections and neighborhood cohesion.</p>
                <h2 style={{ fontSize: '1.5rem' }}>Ensuring Stability</h2>
                <p style={{ fontSize: '1.1rem' }}>Additionally, rent stabilization contributes to economic stability by reducing the risk of homelessness and housing instability. Stable housing is essential for individuals and families to thrive and contribute to our society.</p>
                <h2 style={{ fontSize: '1.5rem' }}>Our Commitment</h2>
                <p style={{ fontSize: '1.1rem' }}>In conclusion, our rent stabilization policy is a key component of our commitment to ensuring that housing remains affordable and accessible for all citizens. We will continue to work towards creating a fair and equitable housing market that benefits both tenants and landlords.</p>
    
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th style={{ fontSize: '20px'}}>Maximum Rent Hike Percentage</th>
                            <th style={{ fontSize: '20px'}}>Effective Till End Of</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.policyList() }
                    </tbody>
                </table>
            </div>
        );
    }
}