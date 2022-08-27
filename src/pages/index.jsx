import { useSession } from "next-auth/react";
import SneaksApi from "sneaks-api";

function Home(props) {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }
  const products = JSON.parse(props.products)

  return (
    <main>
      This is the home page
      <pre>
        {JSON.stringify(products, undefined, 2)}
      </pre>
    </main>
  );
}
export const getStaticProps = async () => {
  const sneaks = new SneaksApi()
  const res = await new Promise((resolve, reject) => {
    sneaks.getMostPopular(10, (err, products) => {
      resolve( { 
        props: {
          products: JSON.stringify(products)
        }
      })
    })
  })
  console.log(res)
  return res
}
// nav bar

//search bar

//nike page

//adidas page

//jordan page

//news

//links

export default Home;
