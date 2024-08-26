import React, { useState, useEffect} from "react";

export const Pagination = (props : any) => {

    const {
        length,
        pageCount,
        setCurrentPage,
        currentPage,
        handlePagination
    } = props;
    
    let paginationNumber = []
    
    let lastPage = pageCount

    if (lastPage <= 1) {
        return null;
    }

    paginationNumber = [
        ...(currentPage - 2 > 0 ? [currentPage - 2] : []),
        ...(currentPage - 1 > 0 ? [currentPage - 1] : []),
        currentPage,
        ...(currentPage + 1 > 0 ? [currentPage + 1] : []),
        ...(currentPage + 2 > 0 ? [currentPage + 2] : []),
    ];

    let size = paginationNumber.length

    paginationNumber = [
        ...(paginationNumber.length > 0 && paginationNumber[0] > 1 ? [1] : []),
        ...(paginationNumber.length > 0 && paginationNumber[0] > 2 ? ["..."] : []),
        ...paginationNumber,
        ...(paginationNumber.length > 0 && paginationNumber[size - 1] + 1 < lastPage ? ["..."] : []),
        ...(paginationNumber.length > 0 && paginationNumber[size - 1] < lastPage ? [lastPage] : [])
    ];

    const onNext = () => {
        setCurrentPage(currentPage + 1)
    };

    const onPrevious = () => {
        setCurrentPage(currentPage - 1) 
    }

    const onPage = (e : any) => {
       setCurrentPage((Number(e.target.id)))
    }
    
    return (
        <div className="flex justify-between m-auto">
            {currentPage > 1 && <button onClick={onPrevious} className="text-blue-700 font-semibold">Previous</button>}
            {paginationNumber.map(num => <button key={num.id} id={num} onClick={onPage}>{num}</button>)}
            {currentPage < lastPage && <button onClick={onNext} className="text-blue-700 font-semibold">Next</button>}
        </div>
    );
};
