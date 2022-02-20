const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('render engine', 'ejs');

//DATABASE

mongoose.connect('mongodb://localhost:27017/blogDB');

let db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(){
    console.log('connected to db successfully');
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

//ROUTES

let testPosts = [
    {title: "test1", desc: "test desc 1"},
    {title: "test2", desc: "test desc 2"}
];

app.get('/', async (req, res) => {
    await Post.find({}).sort([['createdAt', -1]]).exec(function(err, posts){
        if(err)
            res.render('index.ejs', {
                error: true
            });
        else{
            res.render('index.ejs',{
                posts: posts,
                error: false
            });
        }
    });
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, "create.html"));
});

app.get('/viewPost/:postID', async (req, res) => {
    await Post.findById(req.params.postID).exec(function(err, post){
        if(err){
            res.send('Error loading a post <a href="/">Home page</a>');
        }else{
            res.render('viewpost.ejs',{
                post: post
            });
        }
    });
});

app.post('/create', async (req, res) => {
    const newpost = new Post({title: req.body.postTitle, desc: req.body.postDesc, createdAt: Date()});
    try{
        await newpost.save();
        res.send('Post successfully created <a href="/">Home page</a>');
    }catch(error){
        res.status(500).send(error);
    }
});

app.post('/deletePost', async (req, res) => {
    let postID = req.body.postID;
    await Post.deleteOne({_id: postID}).then(function(){
        res.redirect('/');
    }).catch(function(err){
        res.send('Error deleting post <a href="/">Home page</a>');
    });
});

app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});