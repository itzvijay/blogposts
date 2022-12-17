//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { Router } = require("express");
const _ = require("lodash");  //its someting tht visible in our route like new-post and can abble to done it lwercase and uppercase without changing the meaning

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
//he function signature is:
app.use(express.static("public"));

let posts = [];//is gloabal variable to access evrything we are trying to access

//its for accessing the ejs files and making the website dynamic
app.get("/",function(req,res){
  res.render("home",{homeSection:homeStartingContent,newpost:posts});  //render because we specified the view engine for ejs as app.set and inside that we specified object as key value pair
 // console.log(posts);  //and here we are console logiing it

});

app.get("/about",function(req,res){
  res.render("about",{aboutSection:aboutContent});
});

app.get("/contact",function(req,res){  //we are passing to the contact page that informatoin
  res.render("contact",{contactSection:contactContent});  //what we are sending file name and json objects ejs
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:id",function(req,res){
    const requestedRoute = _.lowerCase(req.params.id);  //here we are saving what is route typed by the user lodash is imp thing for the route so we will


    posts.forEach(function(post){   //in the posts array it will access all the elements using forEach method post means the values that have in the array
      const actualRoute = _.lowerCase(post.title); //here we use the lodash for theise
      if(actualRoute === requestedRoute){  
          res.render("post",{autoPost:post.title,autoContent:post.contents});
        }else{
          console.log("please try again later");
        }
    });
    res.redirect("/");
});

app.post("/compose",function(req,res){  //WE SPECIFI ED POST METHOD AND POST WHATEVER WE REICEIVE
  const textTyped = req.body.inputText;  //REQ,BODY RECIVE WHAT TYPED BY THE USER AND ACCESS IT WITH THE NAME..
  const largeTextTyped = req.body.largeText;
  const post = {

    title:textTyped,  //we can give any key that we wants but it should unique as well
    contents:largeTextTyped

  };
  posts.push(post);  //inside the posts array we are trying to push the constent of post
  res.redirect("/");  //its for the sending our user back to the home route
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
