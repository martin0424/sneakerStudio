import { useSession,signIn } from "next-auth/react"

function Nav() {
    const session = useSession()
    return(
        <nav className="tracking-wider border-b-4 border-black relative"> 
            <h1 className="uppercase text-center text-7xl font-serif" >Sneaker Studio</h1>
            <div>
                {session.status === "authenticated"? (
                    <span>
                        signed in as {session.data.user.name}
                    </span>
                ) 
            : (
            <div>
            <button onClick={() => {
                signIn("google")
            }}>Sign In Google</button>
            <button></button>
            </div>
            )}
            </div>
        </nav>
    )
}

export default Nav