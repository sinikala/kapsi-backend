const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})







//Kyselypohja puistoille, puuttuu uusin puisto: salla


// SELECT ?park ?label ?cos
// WHERE {
//   VALUES ?type {wd:Q14545628 wd:Q14545620}
//   ?park wdt:P814  ?type;
//         wdt:P17 wd:Q33 ;
//         wdt:P625 ?cos ;
//         rdfs:label ?label.
//     FILTER(LANG(?label) = 'fi').
//   FILTER(STRENDS(?label, 'ansallispuisto')).
// }
// ORDER BY ?label



//Code for doing the above query with JS
//(Compiled automatically from the above query with Wikidata Query Service)

// class SPARQLQueryDispatcher {
// 	constructor( endpoint ) {
// 		this.endpoint = endpoint;
// 	}

// 	query( sparqlQuery ) {
// 		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
// 		const headers = { 'Accept': 'application/sparql-results+json' };

// 		return fetch( fullUrl, { headers } ).then( body => body.json() );
// 	}
// }

// const endpointUrl = 'https://query.wikidata.org/sparql';
// const sparqlQuery = `SELECT ?park ?label ?cos ?locatedInLabel (year(xsd:dateTime(?inception)) as ?inceptionYear) ?image
// WHERE {
//   VALUES ?type {wd:Q14545628 wd:Q14545620}
//    ?park wdt:P814  ?type;
//         wdt:P17 wd:Q33 ;
//          wdt:P625 ?cos ;
//          rdfs:label ?label.
//   OPTIONAL {?park wdt:P18 ?image.}
//    OPTIONAL {?park wdt:P131 ?locatedIn.}
//    OPTIONAL {?park wdt:P571 ?inception.}

//    FILTER(LANG(?label) = 'fi').
//    FILTER(STRENDS(?label, 'ansallispuisto')).
//    SERVICE wikibase:label { bd:serviceParam wikibase:language 'fi' }
//  }

//  ORDER BY ?label`;

// const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
// queryDispatcher.query( sparqlQuery ).then( console.log );
