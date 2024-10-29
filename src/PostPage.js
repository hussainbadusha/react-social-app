import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';
import api from './api/post'
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const navigate = useNavigate()
    const {posts, setPosts} = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  const handleDelete = async (id)=>{
    await api.delete(`/posts/${id}`);
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate("/")
  }

  return (
    <main className="PostPage">
        <article className="post">
            {post &&
                <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={`/post/${post.id}/edit`}><button className="editButton">Edit Post</button></Link>
                    <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                        Delete Post
                    </button>
                </>
            }
            {!post &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </article>
    </main>
  )
}

export default PostPage