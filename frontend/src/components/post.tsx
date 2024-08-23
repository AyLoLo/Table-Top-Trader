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

    return (
        <div className="bg-white m-auto w-2/5 px-16 pt-5 pb-2 border-4 border-red-700">
            <div className="flex items-start">
                <img className="w-10 h-10"src={TTTUser}/> 
                <span className="mt-4 ml-4">Posted by <span className="font-bold text-blue-700">{post.user.username}</span></span>
            </div>
            <div className="grid grid-cols-2">
                <span className="font-bold ">{post.title}</span> 
                <span className="col-end-13 font-bold">${post.price}</span>
            </div>
            <div className="my-4">
                <span>{post.description}</span>
            </div>
            <div className="">
                <img src={post.images}/>
                <Carousel images={post.images}/>
            </div>
        </div> 
    );
}
