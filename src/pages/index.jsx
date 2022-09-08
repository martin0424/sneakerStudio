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
    <main>
      <div className="uppercase text-center text-7xl"> 
      Sneaker Studio
      </div>
      <button className="absolute right-2 top-12 rounded-none border-2 border-black" onClick={() => {
        setShoeCount((prevShoeCount) => {
          return prevShoeCount + 10
        })
      }}>Show More</button>
      <br>
      {/* <pre>
        {JSON.stringify(finalProducts, undefined, 2)}
      </pre> */}
      </br>
      <div className = "grid gap-3 grid-cols-5 grid-rows-2">
        {
          finalProducts.map((shoe) => {
            return (
              <div key = {shoe._id}>
                <div className="text-2xl">{shoe.shoeName}</div>
                <img className = "w-48, h-40" src = {shoe.thumbnail} alt = {shoe.shoeName}/> 
                <div className="font-semibold text-xl">{shoe.brand}</div>
                <div className="font-bold">${shoe.retailPrice}</div>
                {shoe.releaseDate}
                {shoe.lowestResellPrice && 
                <ul>
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
      <iframe className= "hw-48, h-64" src="https://sneakernews.com/" title="LATEST NEWS"></iframe>
    </main>
  );
}
export const getStaticProps = async () => {
  const sneaks = new SneaksApi()
  const res = await new Promise((resolve, reject) => {
    sneaks.getMostPopular(200, (err, products) => {
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


//search bar- type in brand or style of shoe a list generates of that shoe type (0-10) at a time, usually most popular

//news (use iFrame)
// https://sneakernews.com/

//links
// https://www.stockx.com, https://www.flightclub.com/, https://www.goat.com/. Use company logo for the link instead of just link. (click logo to transfer pages)
// click on link emblem or name to take you to the cite instead of just the link 

export default Home;
