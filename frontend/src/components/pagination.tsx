import React, { useState, useEffect} from "react";
import { PostProp } from "interfaces/PostProp"


export const Pagination = (props : any) => {

    const {
        length,
        currentPage,
        pageCount
    } = props;
    
    let paginationNumber = []
    
    let lastPage = pageCount

    if (lastPage <= 1) {
        return [];
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
        ...(paginationNumber.length > 0 && paginationNumber[size - 1] < lastPage ? ["lastPage"] : [])
    ];

    const onNext = () => {
        currentPage(currentPage + 1)
    };

    const onPrevious = () => {
        currentPage(currentPage - 1)
    }

    const onPage = (e : any) => {
        currentPage(Number(e.target.id))
    }
    
    return (
        <div>
            {currentPage > 1 && <a onClick={onPrevious}>Previous</a>}
            {paginationNumber.map(num => <a onClick={onPage}>{num}</a>)}
            {currentPage < lastPage && <a onClick={onNext}>Next</a>}
        </div>
    );
};
