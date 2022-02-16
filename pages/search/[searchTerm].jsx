import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../components/footer";

export default function Search(initialData) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title >Search results for: {router.query.searchTerm} </title>
        <meta name="description" content={initialData.giphys.map((each, index) => each.title + '')}></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <p>Go <Link href="/"><a>Home</a></Link></p>
      <h1> Search results for: {router.query.searchTerm} </h1>

      <div className="giphy-search-results-grid">
        {initialData.giphys.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

//this function is grabbing the data from the api using the search term that was entered
export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}l&api_key=vAmyA777gGswF4iSCOfoxXhDervw1Vv9&limit=6'`
  );
  giphys = await giphys.json();
  return { props: { giphys: giphys.data } };
}
