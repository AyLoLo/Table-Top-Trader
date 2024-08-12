import React from "react";

export const Pagination = ({ handlePagination, postsPerPage, length}) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }


    // Implement a OnClick event for each page button. Call the handlePagiantion function with the appropriate page number

    return (
        <div>
            {paginationNumbers.map((pageNumber) => (
                <button key={pageNumber} className={currentPage === pageNumber? 'active' : ''}>{pageNumber}</button>
            ))}
        </div>
    );
};
