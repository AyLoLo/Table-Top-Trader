import React from "react";
import TTTUser from "../assets/TTTUser.png"
import {Carousel} from "./carousel"

export const Post = (props : any) => {
    
    const {
        post,
        loading
    } = props;
    
    if (loading) {
         return <h1>Loading...</h1>;
    }

    console.log(post.images.length)

    return (
        <div className="px-16">
            <div className="flex items-start">
                <img className="w-10 h-10"src={TTTUser}/> 
                <span className="pt-4 pl-4">Posted by <span className="font-bold">{post.user.username}</span></span>
            </div>
            <div className="grid grid-cols-2">
                <span>{post.title}</span> 
                <span className="col-end-13">${post.price}</span>
            </div>
            <div>
                <span>{post.description}</span>
                <Carousel/>
            </div>
        </div> 
    );
}
