const express = require('express');
const app = express();
const https = require('https');
const cookieParser = require('cookie-parser');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', (req, res) => {
	collection.insertOne(req.body, (err, result) => {  
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/thankyou');
   })

  function formv3(){
    // Create the new request 
    var xhr = new XMLHttpRequest();
    var url = 'https://api.hsforms.com/submissions/v3/integration/submit/5688787/95ccc060-5fa3-4b63-a9cf-4001f3219a23'
    
    // Example request JSON:
    var data = {
      "fields": [
        {
          "name": "firstname",
          "value": req.body.user_name
        },
        {
          "name": "email",
          "value": req.body.user_email
        }
        {
          "name": "message",
          "value": req.body.user_message
        }
      ],
      "context": {
        "hutk": req.cookies.hubspotutk,
        "pageUri": "https://nameless-taiga-86741.herokuapp.com/",
        "pageName": "Portfolio App"
      }
    }

    var final_data = JSON.stringify(data)

    xhr.open('POST', url);
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) { 
            console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
        } else if (xhr.readyState == 4 && xhr.status == 400){ 
            console.log(xhr.responseText); // Returns a 400 error the submission is rejected.          
        } else if (xhr.readyState == 4 && xhr.status == 403){ 
            console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.           
        } else if (xhr.readyState == 4 && xhr.status == 404){ 
            console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found     
        }
       }


    // Sends the request 
    
    xhr.send(final_data)
 }

 formv3();
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/thankyou', (req, res) => {
	res.render('thankyou');
});

const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = "mongodb+srv://rachelrc:Mn6k7f*3@cluster0.frxw3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DATABASE_NAME = "newdb"; // you can change the database name
var database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
  if(error) throw error;

  database = client.db(DATABASE_NAME);
  collection = database.collection("newcollection"); // you can change the collection name

  // Start the application after the database connection is ready
  app.listen(port, () => {
    console.log('This app is running on port ' + port)
  });
});