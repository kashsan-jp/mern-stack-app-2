import React, { useContext, useEffect, useState } from 'react'
import { getPosts } from '../../controllers/postController';
import { PostContext } from '../../contexts/PostContext';
import Post from '../../components/posts';


function Home() {

    const { posts, setPosts } = useContext(PostContext)

    // Loading state
    const [ loading, setLoading ] = useState(true);

    // Grab all the posts on page load
    useEffect(() => {
        setTimeout( async() => { 
            const data = await getPosts();
            //Update posts state
            setPosts(data.posts)
            // Remove the loading
            setLoading(false)
            console.log(data);
        },1000);
    },[]) 

    console.log(posts)
  return (
    <section className='card'>
        <h1 className='title'>Latest posts</h1>

        { loading && (
            <i className="fa-solid fa-spinner animate-spin text-3xl text-center block ml-50"></i>
        )}

        { posts && posts.map((post) => <div key={posts._id}>
            <Post post={post}/>
        </div>)}
    </section>
  );
}; 

export default Home