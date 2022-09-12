import { useState } from "react";
import SneaksApi from "sneaks-api";

function Home(props) {
  const [shoeCount, setShoeCount] = useState (10)
    
  let finalProducts = [];
  const products = JSON.parse(props.products)
  
  
  for (let i = shoeCount-10; i < shoeCount; i++){
    finalProducts.push(products[i])
  }
  console.log(finalProducts);

  return (
    <main className="">
      <div className="uppercase text-center text-7xl font-serif tracking-wider border-b-4 border-black"> 
      Sneaker Studio
      </div>
      <button className="absolute right-2 top-20 rounded-none border-2 border-black  shadow-black outline-offset-4" onClick={() => {
        setShoeCount((prevShoeCount) => {
          return prevShoeCount + 10
        })
      }}>More</button>
      <br>
      {/* <pre>
        {JSON.stringify(finalProducts, undefined, 2)}
      </pre> */}
      </br>
      <div className = "grid gap-4 grid-cols-5 grid-rows-2">
        {
          finalProducts.map((shoe) => {
            return (
              <div key = {shoe._id} className= "shadow-xl">
                <div className="text-2xl text-center">{shoe.shoeName}</div>
                <img className = "w-48, h-40 mx-auto" src = {shoe.thumbnail} alt = {shoe.shoeName}/> 
                <div className="font-semibold text-xl text-center">{shoe.brand}</div>
                <div className="font-bold text-center">${shoe.retailPrice}</div>
                <div className="text-center">{shoe.releaseDate}</div>
                {shoe.lowestResellPrice && 
                <ul className="text-center">
                  <li>StockX:${shoe.lowestResellPrice.stockX}</li>
                  <li>Flight Club:${shoe.lowestResellPrice.flightClub}</li>
                  <li>GOAT:${shoe.lowestResellPrice.goat}</li>
                </ul>}
              </div>
              
            )
          })
        }
      </div>
      <br></br>
      <h2 className="text-center text-5xl underline underline-offset-2 font-serif">Latest News!</h2>
      <iframe className="mx-8"src="https://sneakernews.com/" width={1800} height={800} title="Latest News"></iframe>
      <br>
      </br>
      <div className="flex flex-row space-x-4 px-8 py-3">
        <img className="basis-1/3 h-48 w-80 border-double border-black" onClick= {() => {window.location.href='https://www.goat.com'}} src="/logos/goat-logo.png" alt="GOAT logo"/>
        <img className="basis-1/3 h-48 w-80" onClick= {() => {window.location.href='https://www.stockx.com'}} src="/logos/stockX_logo.png" alt="StockX logo" width={70} height={30}/> 
        <img className="basis-1/3 h-48 w-80" onClick= {() => {window.location.href='https://www.flightclub.com'}} src="/logos/flight-club-logo.png" alt="Flight Club logo" width={70} height={30}/>
      </div>
    </main>
  );
}
export const getStaticProps = async () => {
  const sneaks = new SneaksApi()
  const res = await new Promise((resolve, reject) => {
    sneaks.getMostPopular(600, (err, products) => {
      resolve( { 
        props: {
          products: JSON.stringify(products)
        },
        revalidate: 600
      })
    })
  })
  
  return res
}

export default Home;
