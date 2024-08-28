const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express();
app.use(cors());

const dbConfig = {
    host: 'database-1.ctai20qooer2.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'team32monash',
    database: 'my_database',
};

const connection = mysql.createConnection(dbConfig);

// Routes
app.get('/api/appliances', (req, res) => {
    const query = 'SELECT * FROM appliance_data';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Route to fetch energy provider data
app.get('/api/energy-providers', (req, res) => {
    const query = 'SELECT * FROM electricity_plans';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Route to fetch benchmark data
app.get('/api/benchmark-vic', (req, res) => {
    const query = 'SELECT * FROM benchmark_vic';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Other routes...

const PORT = process.env.PORT || 5000;
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);

// Check environment and use HTTPS in production
if (process.env.NODE_ENV === 'production') {
    const httpsOptions = {
        key: fs.readFileSync('/etc/letsencrypt/live/ta32.me/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/ta32.me/fullchain.pem'),
    };

    https.createServer(httpsOptions, app).listen(PORT, () => {
        console.log(`Server is running in production on port ${PORT} with HTTPS`);
    });
} else {
    http.createServer(app).listen(PORT, () => {
        console.log(`Server is running in development on port ${PORT} with HTTP`);
    });
}
