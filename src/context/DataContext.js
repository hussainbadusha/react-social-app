import {createContext, useState, useEffect} from 'react'
import useAxiosFetch from '../hooks/useAxiosFetch'
import useWindowSize from '../hooks/useWindowSize'
import { format } from 'date-fns'
import api from '../api/post';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({})

export const DataProvider = ({children})=>{

  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const {width} = useWindowSize();
  const {data, fetchError ,isLoading} = useAxiosFetch('http://localhost:3500/posts')

  useEffect(()=>{
    setPosts(data);
  }, [data]);

  // Below line are commented because we've created a custom hook doing the same thing
  /*useEffect(() => {
    const fetchPosts = async ()=> {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }else{
          console.log(err.message)
        }
      }
    }

    fetchPosts();
  }, [])*/

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
        await api.post('/posts', newPost);
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate("/")
    } catch (err) {
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      }else{
        console.log(err.message)
      }
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id === id ? { ...response.data } : post)); // We can use "updatedPost" as well without using ...ress
        setEditTitle('');
        setEditBody('');
        navigate("/")
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
  }

  return (
    <DataContext.Provider value={{
      width, search, setSearch, searchResults, fetchError, isLoading,
      handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
      handleEdit, editTitle, editBody, setEditTitle, setEditBody, posts, setPosts
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;