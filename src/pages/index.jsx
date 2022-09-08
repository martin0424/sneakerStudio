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
      Sneaker Studio
      {/* <pre>
        {JSON.stringify(finalProducts, undefined, 2)}
      </pre> */}
      <div className = "grid ">
        {
          finalProducts.map((shoe) => {
            return (
              <div key = {shoe._id}>
                {shoe.shoeName}
                {shoe.brand}
                <img src = {shoe.thumbnail} alt = {shoe.shoeName}/> 
                {shoe.retailPrice}
                {shoe.releaseDate}
                {shoe.lowestResellPrice && 
                <ul>
                  <li>StockX:{shoe.lowestResellPrice.stockX}</li>
                  <li>Flight Club:{shoe.lowestResellPrice.flightClub}</li>
                  <li>GOAT:{shoe.lowestResellPrice.goat}</li>
                </ul>}
              </div>
              
            )
          })
        }
      </div>
      <button onClick={() => {
        setShoeCount((prevShoeCount) => {
          return prevShoeCount + 10
        })
      }}>Show More</button>
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

// nav bar?

//search bar- type in brand or style of shoe a list generates of that shoe type (0-10) at a time, usually most popular

//news (use iFrame)
// https://sneakernews.com/

//links
// https://www.stockx.com, https://www.flightclub.com/, https://www.goat.com/. Use company logo for the link instead of just link. (click logo to transfer pages)
// click on link emblem or name to take you to the cite instead of just the link 

export default Home;
