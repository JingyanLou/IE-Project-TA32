const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

const dbConfig = {
    host: 'database-1.ctai20qooer2.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'team32monash',
    database: 'my_database',
};

const connection = mysql.createConnection(dbConfig);

// Function to ping the database
const pingDatabase = () => {
    console.log('Pinging the database...');
    connection.ping((err) => {
        if (err) {
            console.error('Database ping failed:', err);
        } else {
            console.log('Database ping successful');
        }
    });
};

// Ping the database every 30 minutes (1800000 ms)
setInterval(pingDatabase, 1800000);

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

// Route to fetch data for app_brand_data_iter2
app.get('/api/app_brand_data_iter2', (req, res) => {
    const query = 'SELECT * FROM app_brand_data_iter2';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Route to fetch data for app_brand_data_iter2
app.get('/api/app_recomm_iter2', (req, res) => {
    const query = 'SELECT * FROM app_recomm_iter2';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

//for buynew.js 
app.get('/api/brand-data', (req, res) => {
    const appliance = req.query.appliance;
    console.log(`Received request for appliance: ${appliance}`);
    const query = 'SELECT * FROM app_brand_data_iter2 WHERE Device = ?';
    console.log(`Executing query: ${query} with parameter: ${appliance}`);
    connection.query(query, [appliance], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: error.message });
        }
        //console.log(`Query results:`, results);
        res.json(results);
    });
});

app.get('/api/historical-trend', (req, res) => {
    const query = 'SELECT * FROM historical_trend_iter3';
    console.log(`Executing query: ${query}`);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.get('/api/household-consumption', (req, res) => {
    const query = 'SELECT * FROM household_consumption_iter3';
    console.log(`Executing query: ${query}`);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Route for price demand data
app.get('/api/price-demand', (req, res) => {
    const query = 'SELECT * FROM price_demand';
    console.log(`Executing query: ${query}`);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Route for forecast results data
app.get('/api/forecast-results', (req, res) => {
    const query = 'SELECT * FROM forecast_results';
    console.log(`Executing query: ${query}`);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.get('/api/model-data', (req, res) => {
    const appliance = req.query.appliance;
    const brand = req.query.brand; // This will be undefined when fetching all models
    let query = 'SELECT * FROM app_recomm_iter2 WHERE Device = ?';
    let params = [appliance];

    if (brand) {
        query += ' AND Brand = ?';
        params.push(brand);
    }

    connection.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Proxy requests to /iteration1 to the Iteration 1 frontend running on port 3001
app.use('/iteration1', createProxyMiddleware({
    target: 'http://localhost:3001',  // Iteration 1 frontend
    changeOrigin: true,
}));

// Serve the main website (Iteration 2) on the default route
app.use(express.static('public')); // Make sure the public directory contains the Iteration 2 frontend build

const PORT = process.env.PORT || 5000;
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);
console.log("Meow")

// Check environment and use HTTPS in production
if (process.env.NODE_ENV === 'production') {
    const httpsOptions = {
        key: fs.readFileSync('/usr/src/app/ssl/privkey.pem'),
        cert: fs.readFileSync('/usr/src/app/ssl/fullchain.pem'),
    };

    https.createServer(httpsOptions, app).listen(PORT, () => {
        console.log(`Server is running in production on port ${PORT} with HTTPS`);
    });
} else {
    http.createServer(app).listen(PORT, () => {
        console.log(`Server is running in development on port ${PORT} with HTTP`);
    });
}
