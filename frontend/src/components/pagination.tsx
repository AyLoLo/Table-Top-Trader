import React, { useState, useEffect} from "react";

const [currentPage, setCurrentPage] = useState(true)
const [postsPerPage, setPostsPerPage] = useState(10)

export const Pagination = (length : number, postsPerPage : number, handelePagination : any) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }


    const handlePagination = (pageNumber) => {
    setCurrentPage (pageNumber);
    };



    // Implement a OnClick event for each page button. Call the handlePagiantion function with the appropriate page number

    return (
        <div>
            {paginationNumbers.map((pageNumber) => (
                <button key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>{pageNumber}</button>
            ))}
        </div>
    );
};
