import React, { useContext, useState } from 'react'
import { updatePost } from '../../controllers/postController';
import Alert from '../../components/Alert';
import { PostContext } from '../../contexts/PostContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Update() {
    const { posts, setPosts } = useContext(PostContext);

    // Use navigate hook
    const navigate = useNavigate();
    const { state } = useLocation();

    //console.log(state);

    // Error state
    const [ error, setError ] = useState(null);

    // Form data state
    const [ title, setTitle ] = useState(state.title);
    const [ body, setBody ] = useState(state.body);

    const handleUpdate = async(e) => {
        e.preventDefault(); 
        
        console.log(title, body)

        try {
            // Update a post
            const data = await updatePost(state._id, title, body);
            // Update the posts state
            setPosts([...posts, data.post])
            // Navigate to dashboard
            navigate("/dashboard");
            //console.log(data)
        } catch(error) {
            setError(error.message);
        }

    }



  return (
    <section className='card'>
        <h1 className='title'>Update your post</h1>

        <form onSubmit={handleUpdate}>
            <input 
                type='text' 
                placeholder='Post Title' 
                className='input' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
            />
            <textarea 
                rows='6'
                placeholder='Text Content' 
                className='input'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                >  
            </textarea>
            <button className='btn'>Update</button>
        </form>

        {error && <Alert msg={error}/>}
    </section>
  )
} 

export default Update;