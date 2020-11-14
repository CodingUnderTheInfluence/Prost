# Prost
## Table of Contents
1. [About](#about)
2. [Details](#details)
3. [System Requirements](#details)
4. [Database](#database)
5. [Installation](#installation)
6. [Tech Stack](#tech-stack)
 
## About
**Prost:** Creating social environments for the consumption of alcohol while promoting both safety and local businesses.
### Details
Prost aims to create safe drinking environments to promote both relaxing with friends and those who are yet to be called friends all while having a delicious drink. Users can go solo or create parties and place themselves on our map to be seen by the public or only their friends.  Privacy is a big concern here and users have complete control over who they share their location with.  Users can create a friends list, plan events through private messages, check their area for new spots to frequent or curate a list of their favorite watering holes, view the varying status of any of the participating bars and restaurants including population, indoor / outdoor, masks or no masks, etc.
 
On the other hand, if you are a business owner, register with us and experience a new, fluid method of communication with your customers. Alert them to promotions, popup events, crowd numbers, and keep them up to date about the going-ons in your business.
 
Prost wants to help you find your next favorite watering hole while keeping you safe.
 
## The Team
**Product Owner, Developer**: Christopher Booth
<br>
**Scrum Master, Developer**: Lawerence Schwall
<br>
**Developer**: Jon Tenholder
<br>
**Developer**: Brianna Skinner
## System Requirements:
Use `node -v` to check your current version of Node. Upgrade to 12, if not currently on version 12.
 
 - Node version >= 8
 - npm >= 6
 
## Database
First, install PostgreSQL 12 on your machine:
https://www.postgresql.org/download/
 
Below are a few helpful commands to get started. You can find more [here](https://www.postgresqltutorial.com/psql-commands/).
 
### Starting Database:
**Mac**
```
brew services start postgresql
```
**Linux**
```
sudo service postgresql start
```
### Logging In:
**Mac**
```
psql -W {username}
```
**Linux**
```
sudo -u {username} psql // without the curly braces
```
### Create PostgreSQL Database
```
CREATE DATABASE prost;
```
### Test data
If you need test data after, first complete setting up the project. Next, start the server.
```
npm run start
```
Finally, use the command below to populate the test data.
```
npm run test-db
```
 
## Database for deployment
 
Install: 
``` 
sudo apt update
sudo apt install postgresql postgresql-contrib
```
Loggin In:
```
sudo -i -u postgres
```
## Installation
From the CodingUnderTheInfluence/Prost repository, fork your copy of the project. Next, clone your repository to your local machine by running the following code in your command prompt.
 
```
$ git clone {your GitHub project link}
 
$ cd Prost/
 
$ npm install
```
### Tools
#### Google
- Sign up with Google console and create, or go to an exisiting [project](https://cloud.google.com/resource-manager/docs/creating-managing-projects). 
- You will need to enable a few [Google Cloud APIs](https://cloud.google.com/apis/docs/getting-started). Google Translate API (Basic), Google Maps API (JavaScript), Google Places API, Google Geocoding API, Google GeoLocation API, and Google Directions API.
- Next, you'll need create [Google OAuth2.0](https://support.google.com/googleapi/answer/6158849) credentials, enable the [API Key](https://support.google.com/googleapi/answer/6158862), and get a [Service Account JSON key](https://cloud.google.com/iam/docs/service-accounts).
- The Service Account JSON should be placed in the root directory of the project as _serviceacc.json_. If the JSON file is not included in the _.gitignore_, please include it.
### Environmental Variables
Place in a .env file in the root directory containing the following variables.
```
SEQUEL_PASS= // Postgres password
SEQUEL_HOST= // Postgres host
SEQUEL_PORT= // Postgres port
SEQUEL_USER= // Postgres username
SEQUEL_DATABASE= // Postgres database name
```
### Environment Variables for Frontend
```
GOOGLE_MAPS_API_KEY= // API Key from your Google Console
GOOGLE_CLIENT_ID= // Client Id from Google OAuth2.0
GOOGLE_CLIENT_SECRET= // Client Secrete from Google OAuth2.0
```
### Environment Variables for Backend
```
REDIRECT= // The URL your project should redirect to after authentication 
jwtSecret= // String of your choice for the JSON Web Token
PROJECT_ID=// The project ID associated with your Google Service JSON Key 
```
### Starting the Server
```
npm start
```
### Compiling the Build
Development Build
```
npm run dev
```
Production Build
```
npm run build
```
## Tech Stack
![TechStack](images/prosttechstack.PNG)

## Database Schema
![Schema]()