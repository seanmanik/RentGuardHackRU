![RentGuard Logo](https://github.com/seanmanik/RentGuardHackRU/assets/148640712/d3e13899-1dc9-498c-9d2d-21e2609cbb33)

## Inspiration
The housing crisis in the US is unbelievable; rent prices are spirally out of control. The average American renter is now paying more than 30 percent of their income on housing, as wages have failed to keep up with rent hikes and affordable units remain scarce. While municipal governments such as in dense city centers like New York City have implemented rent stabilization programs to safeguard economically disadvantaged tenants against excessive rent hikes by landlords, their enforcement is reactive. This means the authorities address breaches after they have been reported, through penalties imposed on violators, instead of preventing breaches in the first place.

## What it does
RentGuard leverages blockchain smart contracts to proactively enforce rent-stabilized prices for designated apartments, safeguarding economically disadvantaged populations from displacement. The platform ensures compliance by employing trustless automatic enforcement protocols, preventing landlords from setting rent increases that exceed government-mandated percentages. If a tenant is forced to pay an amount exceeding the regulated rent maximum, the transaction on the blockchain will automatically fail.

## How the RentGuard portal works
1) Relevant regulatory officials from the municipal Rent Guidelines Board will input the permitted % rent increase ceilings per rent-stabilized building.
2) Landlords will input their desired percentage rent hike per annum (up to the maximum allowable increase set by the government).
3) Renters will make their monthly rent payments to their landlords via the blockchain.

## How we built it
Front End: React.js
Back End: Javascript 
Database: MongoDB
Smart Contract: Cairo, Starknet

## Challenges we ran into
We were completely unfamiliar with the Cairo programming languages - the only one compatible with Starknet. Learning these languages for Starknet from scratch and in the tight timeframe we had was extremely difficult because the terminologies were non-intuitive and available documentation was scarce. 

## Accomplishments that we're proud of
Learning how to deploy smart contracts on Starknet despite extremely scarce documentation.

## What we learned
- Front-end development with React.js
- How to integrate front-end with MongoDB database
- How to deploy smart contracts on Starknet
- How to read the Cairo programming language


