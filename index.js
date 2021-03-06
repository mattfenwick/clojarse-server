'use strict';

var P = require('clojarse-js'),
	express = require('express'),
	bodyParser = require('body-parser');


function dump(x) {
	return JSON.stringify(x, null, 2);
}

function parse(stage, text) {
	if ( stage === 'cst' ) {
		return P.parseCst(text);
	} else if ( stage === 'ast' ) {
		return P.parseAst(text);
	} else {
		throw new Error('invalid stage -- can only be "cst" or "ast", was ' + stage);
	}
}


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
});


app.get('/parse', function(req, res) {
	var text = req.query.text;
	if ( !text ) {
		throw new Error('missing text -- this should be an http error code of some kind TODO!');
	}
	res.send(dump(parse('ast', text)));
});

app.post('/parse', function(req, res) {
	var text = req.body.text;
	if ( !text ) {
		throw new Error('missing text -- this should be an http error code of some kind TODO!');
	}
	res.send(dump(parse('ast', text)));
});


// probably don't even need this
module.exports = {};
