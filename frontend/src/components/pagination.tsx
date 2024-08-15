import React, { useState, useEffect} from "react";
import { PostProp } from "interfaces/PostProp"


export const Pagination = (props : {posts : PostProp[]}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    const handlePagination = (pageNumber : number) => {
    setCurrentPage(pageNumber);
    };
    const paginationNumber = [];
    const length = props.posts.length

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i);
    }

    return (
        <div>
            {
                paginationNumber.map((pageNumber) => (
                    <button key={pageNumber} onClick={() => handlePagination(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>
                        {pageNumber}
                    </button>
                ))
            }
        </div>
    );
};
