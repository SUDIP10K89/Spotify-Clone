console.log('javascript suro bho');
let currentSong = new Audio();

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
//   let audio = new Audio("/songs/"+track)
  currentSong.src = "/songs/"+track
  currentSong.play()
  play.src = "pause.svg"
  document.querySelector(".songInfo").innerHTML = track
  document.querySelector(".timer").innerHTML = "00:00 / 00:00"
}

    function secondsToMinutesSeconds(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
      
        return `${minutes.toString().padStart(2, '0')}:${Math.floor(remainingSeconds.toString().padStart(2, '0'))}`;
      }

async function main(){
   
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

    //Attach event listener to play pause and next
    play.addEventListener("click",() => {
      if (currentSong.paused) {
        currentSong.play()
        play.src = "pause.svg"
      } else {
        currentSong.pause()
        play.src = "play2.svg"
      }
    })

    //timeupdate event
    currentSong.addEventListener("timeupdate",() => {
      console.log(currentSong.currentTime,currentSong.duration)
      document.querySelector(".timer").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
      document.querySelector(".circle").style.left = `${(currentSong.currentTime/currentSong.duration)*100}%`
    }
    )
}

main()