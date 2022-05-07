# How to use Kapsi


## Start with

- Clone this repository
- Install dependencies by running ```npm install``` in locations with file ```package.json```, i.e.:
  - root folder
  - client/
- Create file ```.env``` with variables:
  - ```PORT=3001```
  - ```MONGODB_URI=<uri_here>```
  - ```TEST_MONGODB_URI=<uri_here>```
  - ```SECRET=<secret_here>```

## Locally

Start the app by running ```npm start``` in root folder.

Kapsi is now running. Open ```http://localhost:3001``` to view it in your browser.


## Development

- SERVER: In root folder
    - Start the app by running:
    ```npm run dev```
    - Server is now listening on port 3001
- CLIENT: in another tab navigate to folder ```client```
    - Start the app by running:
    ```npm start```

Kapsi is now running. 
Open ```http://localhost:3000``` to view the client in your browser. 


## Testing

- 2e2 (cypress):
  - in root start server with ```npm run start:test```
  - in ```client/``` start client with ```npm start```
  - in ```client/``` run tests with ```npm run test:e2e```

- client unit tests
  - in ```/client``` run ```npm run test```

- server integration tests
  - in root run ```npm run test```
