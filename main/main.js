function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active')
}

// For play music

const music = new Audio('./song/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let seek = document.getElementById('seek')
let progress

const songs = [
    {
        id: `1`,
        filepath:  `song/1.mp3`,
        songName: 'Pasoori <br> <div class="subtitle">xyz</div>',
        poster: `./img`
    },
    {
        id: `2`,
        songName: 'Pasoori2 <br> <div class="subtitle">xyzd</div>',
        poster: `./img`
    },
    {
        id: `3`,
        songName: `Pasoori3 <br> <div class="subtitle">xyzd</div>`,
        poster: `./img`
    }
]


Array.from(document.getElementsByClassName('songsItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('p')[0].innerHTML = songs[i].songName;
})



// let wave = document.getElementById('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        // wave.classList.add('active2')
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        // wave.classList.remove('active');
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('play')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    })
}

// const makeAllBackgrounds = ()=>{
//     Array.from(document.getElementsByClassName('sondgItem')).forEach((element) =>{
//         element.style.background = "rgb(105,105,170,0)"
//     })
    
// }

let index = 0;
let Poster_master_play = document.getElementById("Poster_master_play");
let title = document.getElementById("title");

Array.from(document.getElementsByClassName('play')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `song/$(index).mp3`;
        Poster_master_play.src = `img/$(index).jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName;
        })

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        music.addEventListener('ended',()=> {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active'); 
        })
        // makeAllBackgrounds();
        // Array.from(document.getElementsByClassName('sondgItem'))[`$(index)`].style.background = "rgb(105,105,170,.1)"
    })
})

music.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progress;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
})

