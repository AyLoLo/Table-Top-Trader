import React, {useState, useEffect} from "react";

export const Post = ({post, loading}) => {
    if (loading) {
        return <h1>Loading...</h1>;
    }
    
    return (
        <div className="text-white border-red-900 md:border 4 grid grid-rows-3 pl-5 pt-5 relative">
            <h1 className="text-green-600 grid grid-rows-2">
                <span>{post.title}</span>
                <span>{post.price}</span>
                <span>{post.date_created}</span>
            </h1>
            <span>
                {post.description}
            </span>
        </div>
    );
}
