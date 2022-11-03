import { navbar } from "./components/navbar.js";

import { append } from "./scripts/append.js";

let navbar_div= document.getElementById("navbar");
navbar_div.innerHTML=navbar();


//append will need 2 thinggs
//1. data 

let posts_div = document.getElementById("posts");

const getData = async () =>{

    let res = await fetch (`http://localhost:3000/posts`);
//heroku do this 
    let data =await res.json(); 

    append(data, posts_div);


};

getData();



