import { useContext, useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../controllers/postController";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/posts";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Dashboard = () => {

    //Use user context
    const{ user, setUser } = useContext(UserContext);
    
    // Loading state
    const [ loading, setLoading ] = useState(true);

    // Error state
    const [ error,  setError ] = useState(null);

    // Success state
    const [ success,  setSuccess ] = useState(null);

    useEffect(() => {
        setTimeout(async() => { 
            // Get user's posts
            const { userPosts, email } = await getUserPosts();
            // Update user posts
            setUser({email, posts: userPosts})
            // Remove the loading
            setLoading(false);
        },1000);
    },[]);
    
    // console.log(user); 

    // Handle delete post
    const handleDelete = async(_id) => {
        if(confirm("Confirm delete?")) {
            try {
                const data = await deletePost(_id);
                setSuccess(data.success)
            } catch(error) {
                setError(error.message)
                // console.log(error.message);
            }
            const newPosts = user.posts.filter(post => post._id !== _id )
            setUser({...user, posts: newPosts});
            // console.log(id
        }
    };


    return (
        <section className="card">
            <p>{user.email}</p>
            <h1 className="title">User Dashboard</h1>

            { loading && (
            <i className="fa-solid fa-spinner animate-spin text-3xl text-center block ml-50"></i>
            )}

            { success && <Success msg={success}/>}
            { error && <Alert msg={error}/>}

            { user.posts && user.posts.map((post) => (<div key={post._id}>
                <Post post={post}>
                    <div className="flex items-center gap-2">
                        <Link className="
                            fa-solid fa-pen-to-square nav-link 
                            text-green-500 hover:bg0-green-200"
                            title="Update"
                            state={post}
                            to="/update"
                         />
                        <button className="
                            fa-solid fa-trash-can  
                            text-red-500 hover:bg0-red-200"
                            title="delete"
                            onClick={() => handleDelete(post._id)}>
                        </button>
                    </div>
                </Post>
            </div>))}
        </section>
    );
};

export default Dashboard