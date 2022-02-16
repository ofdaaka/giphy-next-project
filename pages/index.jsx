import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'


export default function Home(initialData) {
const [formInputs, setFormInputs] = useState({})
const [searchResults, setSearchResults] = useState([])
const [searchTerm, setSearchTerm] = useState('basketball')

  useEffect(() =>{
    setSearchResults(initialData.bballGiphys.data)
  }, [initialData])

  const handleInputs = () => {
    let {name, value} = event.target
    setFormInputs({ ...formInputs, [name]: value })
  }

  const search = async (events) => {
    event.preventDefault()
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=vAmyA777gGswF4iSCOfoxXhDervw1Vv9&limit=6`)
    giphys = await giphys.json()
    setSearchResults(giphys.data)
    setSearchTerm(formInputs.searchTerm)
  }

  

  return (
    <>
    <div className='container'>
      <Head>
        <title>Whats Your Giphy App</title>
        <meta name="description" content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>
        WHATS YOUR GIPHY
      </h1>
      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInputs} type="text" required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>
      <p> Share this search with others:

      <Link href="/search/[pid]"
      as={`/search/${searchTerm}`}>
        <a>
          {`http://localhost:3000/search/${searchTerm}`}
        </a>
      </Link>
      </p>
      
      <div className="giphy-search-results-grid">
      {searchResults.map((each, ballers) => {
        return(
          <div key="ballers">
            <h3>{each.title}</h3>
            <img src={each.images.original.url} alt={each.title}/>
            </div>
        )
      })}
      </div>
    </div>
    <Footer />
    </>
  )
}

// statically generated page 
/* export async function getStaticProps(){
  let bballGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=basketball&api_key=vAmyA777gGswF4iSCOfoxXhDervw1Vv9&limit=6')
  bballGiphys = await bballGiphys.json()
  return {props: {bballGiphys: bballGiphys}}
} */

//page being load it server side
 export async function getServerSideProps(){
  let bballGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=basketball&api_key=vAmyA777gGswF4iSCOfoxXhDervw1Vv9&limit=6')
  bballGiphys = await bballGiphys.json()
  return {props: {bballGiphys: bballGiphys}}
}