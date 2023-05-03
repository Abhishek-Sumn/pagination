import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
//2

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false)
    }

    fetchPosts();
  }, []);

  //

  const indexOfLastpost = currentpage * postsPerPage;
  const indexOfFirstpost = indexOfLastpost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstpost, indexOfLastpost)

  //

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPost} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
