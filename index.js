// SERVER

// importation module express
require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// port utilisé pour l'écoute
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:3000/go' }));

// obtient le chemin vers index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// obtient chemin vers backend.html
app.get('/backend', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'backend.html'));
});

// obtient chemin vers frontend.html
app.get('/frontend', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend.html'));
});

// obtient chemin vers marketing.html
app.get('/marketingDigital', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'marketing.html'));
});

// obtient chemin vers uxui.html
app.get('/uxui', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'uxui.html'));
});

// obtient chemin vers frontend.html
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// obtient chemin vers signup.html
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// poste les informations réçu par Client
app.post('/go', (req, res) => {
    const clients = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avis: req.body.avis,
        note: req.body.note,
        formation: req.body.formation
    };

    // insère donnée dans la base de donnée
    postData(
        clients.firstname,
        clients.lastname,
        clients.avis,
        parseInt(clients.note),
        clients.formation
    );

    // const final_data = JSON.parse(clients);
    console.log(clients);
});

app.get("/home", (req,res)=>{
    home(res);
})

function home(resultat){
    database.query('SELECT * FROM contact order by note desc', (error, result) => {
        if (error) throw error;
        resultat.json(result)
    })
    
}



app.get("/back", (req, res) =>{
    back(res);
})

function back(resultat){
    database.query('SELECT * FROM contact WHERE formation = "backend"', (error, result) => {
        if (error) throw error;
        resultat.json(result);
    })
}



app.get("/front", (req, res) =>{
    front(res);
})

function front(resultat){
    database.query('SELECT * FROM contact WHERE formation="Frontend"', (error, result) => {
        if (error) throw error;
        resultat.json(result)
    })
    
}



app.get("/mark", (req, res) =>{
    mark(res);
})

function mark(resultat){
    database.query('SELECT * FROM contact WHERE formation = "Marketing-Digital"', (error, result) => {
        if (error) throw error;
        resultat.json(result)
    })
    
}



app.get("/ux", (req, res) =>{
    ux(res);
})

function ux(resultat){
    database.query('SELECT * FROM contact WHERE formation = "ux-ui"', (error, result) => {
        if (error) throw error;
        resultat.json(result)
    })
    
}
// app écoute sur le port spécifié
app.listen(PORT, () => {console.log('localhost:', PORT, 'çava')});




// API

// initialise la connection entre server et base de donnée
const database = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS,
    port: process.env.MYSQLPORT,
    database: process.env.MYSQLDATABASE
});

console.log(process.env)
// essaie de connecter la base de donnée
database.connect((error) => {
    if (error) throw error;
    console.log('Database OK');
});


// Insertion des données
function postData(firstname, lastname, avis, note, formation) {
    let data = {
        firstname,
        lastname,
        avis,
        note,
        formation
    };

    database.query('INSERT INTO contact SET ?', data, (error, result) => {
        if (error) throw error;
        console.log('Valeur OK');
    });

}