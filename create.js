import { navbar } from "./components/navbar.js";

let navbar_div= document.getElementById("navbar");
navbar_div.innerHTML=navbar();

//let apikey= `5c0189e4e50d8a33b88d41bcfedf7e48`;
//https://api.imgbb.com/1/upload


let create_btn= document.getElementById("create_btn");
create_btn.onclick= () => {
// submitting a post to server
    createPost();
};

let delete_btn= document.getElementById("delete_btn");

delete_btn.onclick = () => {
    deletePost();
};

let update_btn= document.getElementById("update_btn");

update_btn.onclick = () => {
    updatePost();
};

let input_img = document.getElementById("image");
input_img.onchange  = () => {

    handleImage();


};

let image_url;

const handleImage = async () => {

    let img=document.getElementById("image");

    let actual_img=img.files[0];
        //console.log(actual_img);

    let from= new FormData();

     from.append("image", actual_img);

     let res = await fetch(`https://api.imgbb.com/1/upload?key=5c0189e4e50d8a33b88d41bcfedf7e48`,{
        method: "POST",
        body: from,
     });

     let data= await res.json();

     console.log(data);

     image_url=data.data.display_url;

};


const createPost = async () => {
    // grab all the data
    let id = document.getElementById("id").value;

    let caption = document.getElementById("caption").value;
   // pick all data to be sent in obj;
    let send_this_data = {
        id,
        caption,
        image_url,
    };

    let res =  await fetch(`http://localhost:3000/posts`,{
        method: 'POST',
        body: JSON.stringify(send_this_data),

        headers: {
            'Content-Type': 'application/json'
        },

    });

    let data = await res.json();
    console.log(data);

};

const deletePost = async () =>{

    let delete_id = document.getElementById("delete_id").value;

    let res = await fetch(`http://localhost:3000/posts/${delete_id}`,{

        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json',
        },

    });

    let data = await res.json();
    console.log(data);


};

//PATCH request
const updatePost = async () =>{
    try{
        let update_id= document.getElementById("update_id").value;

        let new_caption = document.getElementById("update_caption").value;

        let send_this_data = {
            caption: new_caption

        }

        let res = await fetch(`http://localhost:3000/posts/${update_id}`,{

            method: 'PATCH',

            body: JSON.stringify(send_this_data),

            headers: {
                'Content-Type': 'application/json',
            },


        })


        let data = await res.json();
        console.log(data);

    }
    catch(err){
        console.log(err);
    }
}























