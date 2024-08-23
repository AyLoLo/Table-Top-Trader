import React, {useState, useEffect} from "react";
import {Post} from "components/post";
import {Pagination} from "components/pagination";
import { URL } from "../constants";


const Posts = () => {
  
  const [posts, setPosts] = useState([]); 
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1)
  
  const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${URL}posts?page=${currentPage}`)
          const data = await response.json();
          setPosts(data.posts);
          setPageCount(data.total_pages)
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);
  

  const handlePagination = (pageNumber : number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="bg-hero-background bg-center bg-no-repeat bg-cover h-screen w-screen overflow-y-scroll">
      <div className="grid grid-flow-row gap-10 pt-5">
        {posts.map((post: any, index: number) =>
          <Post post={post} key={post.id} />
        )}
      </div>
      <div className="border-4 border-blue-700 flex justify-center w-16 m-auto mt-5 bg-white">
          <Pagination length={posts.length} pageCount={pageCount} currentPage={currentPage} handlePagination={handlePagination}/>
      </div>
    </div>
  );
};


export default Posts;