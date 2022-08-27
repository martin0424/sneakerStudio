import { useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }

  return (
    <main>
      This is the home page
    </main>
  );
}

// nav bar

//search bar

//nike page

//adidas page

//jordan page

//news

//links

export default Home;
