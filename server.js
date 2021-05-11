const express=require('express');
const bodyparser=require('body-parser');
const request=require('request');
const app=express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var cry=req.body.cry;
    var object={
        url:"https://www.alphavantage.co/query",
        method:"GET",
        qs:{
            function:"GLOBAL_QUOTE",
            symbol: cry,
            apikey:"your_own_api_key" // can be generated from logging in to alphavantage.co
        }
    }
    request(object,function(error,response,body){
        var obj=JSON.parse(body);
        res.set("Content-type","text/html");
        res.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">');
        res.write('<h1 class="title is-1"><center>'+cry+'</center></h1>')
        res.write('<h1 class="title is-2">Current Price: $'+obj["Global Quote"]["05. price"]+'</h1>')
        res.write('<h1 class="title is-2">Today\'s High: $'+obj["Global Quote"]["03. high"]+'</h1>')
        res.write('<h1 class="title is-2">Today\'s Low: $'+obj["Global Quote"]["04. low"]+'</h1>')
        res.write('<h1 class="title is-2">Volume: '+obj["Global Quote"]["06. volume"]+'</h1>')
        if(parseFloat(obj["Global Quote"]["10. change percent"])>0)
        res.write('<h1 class="title is-2">change: <font color="green">'+obj["Global Quote"]["10. change percent"]+' </font></h1>')
        else
        res.write('<h1 class="title is-2">change: <font color="red">'+obj["Global Quote"]["10. change percent"]+' </font></h1>')
        res.send();
    });
});

app.listen(3000,function(){
    console.log("SERVER STARTED");
})
