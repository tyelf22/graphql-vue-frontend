# Top 25 NBA Players

## Project Details
This project was made to demonstrate my abilities to interact with both a GraphQL API as well as a RESTful API. There are 4 seperate routes, the first route is the landing page that gives more information about the project. The second route demonstrates full CRUD operations using GraphQL. The third route demonstrates full CRUD operation using a RESTful API. Both of these api's were built by me. The last route is the roster where players that you added to the roster will appear.

## Project Criteria
- [✓] Conditional logic and array methods render large lists 
- [✓] Front-end developed and functional
- [✓] NPM scripts and Node used to create and manage back-end
- [✓] Properly used Git with 4 days of commits per week
- [✓] Seed script populates datastore properly
- [✓] RESTful server properly CREATES, READS, UPDATES, and DELETES (This file contains the interaction with my REST API [PlayerService.js](./src/PlayerService.js)) 
    - Create [Rest.vue Line 227](./src/components/Rest.vue#L227)
    - Read [Rest.vue Line 184](./src/components/Rest.vue#L184)
    - Update [Rest.vue Line 250](./src/components/Rest.vue#L250)
    - Delete [Rest.vue Line 222](./src/components/Rest.vue#L222)
- [✓] GraphQL server properly CREATES, READS, UPDATES, and DELETES
    - Create [Graph.vue Line 29](./src/components/Graph.vue#L29)
    - Read [Graph.vue Line 12](./src/components/Graph.vue#L12)
    - Update [Graph.vue Line 286](./src/components/Graph.vue#L286)
    - Delete [Graph.vue Line 236](./src/components/Graph.vue#L236)
- [✓] App properly connects client and server using HTTP/HTTPS
- [✓] Detailed ReadMe provided which explains install and run instructions.
- [✓] App structured, documented, and deployed without errors
> **Note**: The Project Criteria section above is for grading purposes only.


## Project Requirements

[GraphQL Node Server](https://github.com/tyelf22/graphql-API-NodeServer.git)

Follow the README of the GraphQL Node Server project to setup the GraphQL Node server. This is required in order to recieve full functionality of this project.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
