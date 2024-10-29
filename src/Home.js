import React, { useContext } from 'react'
import Feed from './Feed'
import { LuLoader2 } from "react-icons/lu";
import DataContext from './context/DataContext';

const Home = () => {
  const {searchResults, fetchError, isLoading} = useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg' style={{textAlign: 'center', fontSize: '30px'}}><LuLoader2 size={50} color='green' className='spin' /><br></br>Please wait...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResults.length ? (
        <Feed posts={searchResults} /> 
      ) : (
        <p style={{marginTop: '2rem'}}>
          No posts to display
        </p>
      ))}
    </main>
  )
}

export default Home