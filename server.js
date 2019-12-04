const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/Angular_RPG-master'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/Angular_RPG-master/index.html'));
});

app.listen(process.env.PORT || 8080);