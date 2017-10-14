const express = require('express'),
	app = express();

// express.static()

app.use(express.static('view'));

app.get('/', (req, res) => {
	res.sendFile('index.html', {
		root: __dirname + '/view/'
	});
});


console.log('started to listen at 3000');
app.listen(3000);