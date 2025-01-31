import NavBar from "./NavBar";
import Main from "./Main";

function Home(){
    return(
        <div>
            <header>
                <NavBar/>
            </header>
            <main>
                <Main/>
            </main>

        </div>
    
    );
}

export default Home;