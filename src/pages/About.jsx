import logo from '../images/LR.png'

export default function About(){
    return (
        <div className="siteDiv">
            <div className="siteDesc">
            <img src={logo} width={200} />
            <h1>About LOR</h1>
            <h3>LOR is a fan-made project, made by a very new Developer used for League of Legends enjoyoors
                to spice up their experience. Using the League of legends API this site will
                generate you random builds, some more spicy than others, and sometimes choosing
                the champion for you. Check out the other tabs to get a taste!
            </h3>
            <h2>Dont know who to play?? Head to the <a href='/random'>Elo Demolisher</a></h2>
            <h2>Know who to play but not what to build? Check out <a href='/cyc'>Choose Your Champ</a></h2>
            <h3>As of current, there will be a bug or two such as melee champions getting suggested Runaan's Hurricane, I will be looking into this</h3>
            <h3>Coming soon.. The ability to save builds and make custom ones</h3>
            <p>For any inquiries feel free to reach out to me on <a href="https://github.com/PorkyPorkensen">GitHub</a></p>
            </div>
        </div>
    )
}