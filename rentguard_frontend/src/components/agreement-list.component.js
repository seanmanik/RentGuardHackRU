import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect, disconnect } from '@argent/get-starknet';
import { Provider } from 'starknet';
import { Contract } from 'starknet';

const Agreement = props => (
    <tr>
        <td className="align-middle">{props.agreement.tenant}</td>
        <td className="align-middle">${props.agreement.rent}</td>
        <td className="align-middle">{props.agreement.address}</td>
        <td className="align-middle">${props.agreement.rentHiked}</td>
        {/* <td>
            <Link to={"/edit/"+props.agreement._id}>Edit</Link> | <a href="#" onClick={() => { props.payRent(props.agreement._id) }}>Pay rent</a>
        </td> */}
        <td className="align-middle">
            {!props.agreement.rentPaid ? (
                <button className="btn btn-danger ml-2" onClick={() => props.payRent(props.agreement._id)}>Pay Rent</button>
            ) : (
                <button className="btn btn-success">Rent Paid</button>
            )}
        </td>
        <td>
            <img src={props.agreement.image} alt="Agreement" className="rounded" style={{ width: '200px', height: '100px' }} />
        </td>
    </tr>
)

export default class AgreementList extends Component {
    constructor(props) {
        super(props);

        this.payRent =  this.payRent.bind(this);

        this.state = {agreements: [], 
            connected: false, 
            account: null, 
            address: '', 
            contractAddress: "", 
            contractAbi: "",
            contract: null,
            landlordAddress: "",
        };
    }

    async componentDidMount() {
        axios.get('http://localhost:5000/agreement')
        .then(response => {
            this.setState({ agreements: response.data })
        })
        .catch((error) => {
            console.log(error);
        })

        try {
            const connection = await connect({
                webWalletUrl: "https://web.argent.xyz"
            });
            if (connection && connection.isConnected) {
                this.setState({connected: true, account: connection.account, address: connection.selectedAddress});
                this.setState({
                        landlordAddress:"0x07C0246Cb97D624db76058690Fc00999512d56e8b06550f5aC63462996f416E8",
                        contractAddress:"0x0534a6311f9ed35b11484ac6ab76abdfd0775294721f7ec7ffdcf890f094ca9c",
                        contractAbi: JSON.stringify([{
                        "name": "transfer",
                        "type": "function",
                        "inputs": [
                        {
                            "name": "recipient",
                            "type": "core::starknet::contract_address::ContractAddress"
                        },
                        {
                            "name": "amount",
                            "type": "core::integer::u256"
                        }
                        ],
                        "outputs": [
                        {
                            "type": "core::bool"
                        }
                        ],
                        "state_mutability": "external"
                    }])
                    }
                ); 
                const contract = new Contract(this.state.contractAbi, this.state.contractAddress, this.account);
                this.setState({contract: contract});
                
            
            }

        } catch (error) {
            console.error(error);
        }

    }

    async payRent(id) {
        try {
            if (this.state.connected && this.state.contract) {
                let rent = 0;
                axios.get(`http://localhost:5000/agreement/${id}`)
                .then(response => {
                    rent = response.data.rent;
                    console.log(response.data);
                })
                const result = await this.state.contract.transfer(this.state.landlordAddress, rent* 1000);
                console.log(result);

            }
        } catch (error) {
            console.error(error);
        }


    }

    agreementList() {
        return this.state.agreements.map(currentagreement => {
            return <Agreement agreement={currentagreement}  payRent={this.payRent} key={currentagreement._id}/>;
        })
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <img src="https://i.imgur.com/FsRZ6oq.png" alt="Policy Image" className="rounded" style={{ width: '30%', height: 'auto' }} />    
                </div>
                <h3>Agreements</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th >Tenant</th>
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