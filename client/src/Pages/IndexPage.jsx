import React, { useState, useEffect } from 'react';
import Post from '../Post';

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    try {
      const resp = await fetch("https://my-blogs-baclkend.onrender.com/post");
      const data = await resp.json();

      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
     {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default IndexPage;
