var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
var bodyParser=require('body-parser');
var Pool=require('pg').Pool;
var session=require('express-session');
var config=
{
    user:'pratik1rn13cs064',
    database:'pratik1rn13cs064',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    //password:'db-pratik1rn13cs064-7655'
};

var pool= new Pool(config);

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());//telling the express framework for every incoming request if it sees a content type json it uses body-parser
/*app.use(session(
    {
        secret : "somerandomsecretvalue",
        cookie : {
            maxAge : 1000*60*60*24*30
        }
    }))*/

function hash(input,salt)
{
    //crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','sha512',salt,'10000',hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res)
{
    var hashString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashString);
});

app.post('/create-user',function(req,res)
{
    //through json request
    var username = req.body.username;
    var password = req.body.password;
    
    //generate salt
    var salt = crypto.randomBytes(128).toString('hex');
    //username,password
    var dbString = hash(password,salt);
    pool.query('insert into "user"(username,password) values($1,$2)',[username,dbString],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
           
            res.send('user successfully created! '+username);
        }
    });
});

app.post('/user-login',function(req,res)
{
    var username=req.body.username;
    var password=req.body.password;
    pool.query('select * from "user" where "username" =$1',[username],function(err,result)
    {
         if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
           var dbString = result.rows[0].password;
           var salt = dbString.split('$')[2];
           var hashed =  hash(password,salt);
           if(hashed === dbString)
           {
               //set session id
              /* req.session.auth={
                   userId : result.rows[0].id
               };*/
               //set cookie with session id
               //internally the server maps the session id to the object
               //which has value {auth:{userid}}
               res.send("credentials verified!!");
               
           }
           else
           {
               res.send("invalid password!!");
               
           }
            
        }
        
        
    });
});

app.get('/check-login',function(req,res)
{
    if(req.session && req.session.auth && req.session.useId)
    {
        res.send("you are logged in: "+ req.session.userId.toString());
    }
    else
    {
        res.send("you are not logged in!!");
    }
});



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var counter=0; 
app.get('/counter',function(req,res)
{
    counter+=1;
    res.send(counter.toString());
});

app.get('/articles/:articlename',function(req,res)
{
    //var articlename=req.params.articlename;
    pool.query("select * from article where title='"+req.params.articlename+"'",function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(404).send("article not found");
            }
            else
            {   
                var articledata=result.rows[0];
                res.send(articledata);
            }
        }
    });

    
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
 
app.get('/article-one',function(req,res){
    res.sendFile(path.join(__dirname,'article-one.html'));
});

app.get('/article-two',function(req,res){
    res.send("article two requested");
});

app.get('/article-three',function(req,res){
    res.send("article three requested");
});

var names=[];
app.get('/submit-name',function(req,res)//:name,then req.params.name
{
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
});

app.get('/test-db',function(req,res)
{
    //make a select request
    pool.query('SELECT * FROM test',function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
    //return a response with the result
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
    app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});