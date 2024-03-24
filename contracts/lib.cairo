

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts for Cairo ^0.10.0
#[starknet::interface]
trait IHello<T> {
    fn get_rent(self: @T) -> u128;
    fn set_rent(ref self: T, rent: u128);
}

#[starknet::contract]
mod GovtUSD {
    use openzeppelin::token::erc20::ERC20Component;
    use openzeppelin::access::ownable::OwnableComponent;
    use starknet::ContractAddress;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl ERC20MetadataImpl = ERC20Component::ERC20MetadataImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20CamelOnlyImpl = ERC20Component::ERC20CamelOnlyImpl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableCamelOnlyImpl = OwnableComponent::OwnableCamelOnlyImpl<ContractState>;

    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        tenant: ContractAddress,
        landlord: ContractAddress,
        rent: u128,
        hike_percentage: u128,
        rent_updated: bool,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState, recipient: ContractAddress, owner: ContractAddress) {
        self.erc20.initializer("Govt USD", "GUSD");
        self.ownable.initializer(owner);

        self.erc20._mint(recipient, 10000000000000000000000000);
    }

    #[generate_trait]
    #[abi(per_item)]
    impl ExternalImpl of ExternalTrait {
        #[external(v0)]
        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
            self.ownable.assert_only_owner();
            self.erc20._mint(recipient, amount);
        }
    }
    
    #[abi(embed_v0)]
    impl HelloImpl of super::IHello<ContractState> {
        fn get_rent(self: @ContractState) -> u128 {
            self.rent.read()
        }

        fn set_rent(ref self: ContractState, rent: u128) {
            self.rent.write(rent);
        }
    }



}
