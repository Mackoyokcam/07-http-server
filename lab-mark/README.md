![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Code-401-Javascript lab-7: HTTP-Server
===
This is the day 7 lab with Code Fellows. The purpose of the lab is to teach students to use vanilla HTTP requests to create a server.

# Modules
Description of exported values of each module defined in lib/ directory, along with airity and expected input/return values.
### Server.js
Houses the code for the server. It exports an object with start and stop methods which either starts or stops the server. Currently only start is being invoked in index.js.
* #### start
    * Has an arity of two, which takes in a port number and callback function. Port number is preset to 3000 and the callback is a success function which logs to the server which port the server is running on.
* #### stop
    * Has an arity of one, which takes in a callback function. Currently not being utilized.    
### request-parser.js
Exports a function with an arity of one, that takes in a request and returns a new promise. It parses the data depending if its a GET or POST request.
