console.log('javascript suro bho');

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }

    }
    return songs
}

let playmusic = (track) => {
  let audio = new Audio("/songs/"+track)
  audio.play()
}


async function main(){
    let currentSong;
    let songs = await getSongs()
    
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    console.log(songUl)
    for(let song of songs) {
        songUl.innerHTML += `
                                <li>
                            <img src="music.svg" class="invert" alt="music">
                            <div class = "info">
                                <div>${ song.replaceAll("%20"," ")}</div>
                                
                            </div>
                            <img src="play2.svg" class="invert pointer" alt="">
                        </li>
                         `
    }
    //attach an event listener
   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=> {
        e.addEventListener("click",element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
        
    })

}

main()