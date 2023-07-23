console.log("Welcome to Jio Saavn");


let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Kesariya- Brahmastra", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Phir Kabhi- MS Dhoni: The Untold Story", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Tere Pyaar Mein- Tu Jhooti Main Makkar", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Deva Deva- Brahmastra", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Mere Dholna- Bhool Bhulaiyya 2", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Kahani- Laal Singh Chadda", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Chota Sa Fasana- Karwaan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Atak Gaya- Badhaai Do", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Dhaagon Se Baandha- RakshaBandhan", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Mitra Re- Runway 34", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{ 
    
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    const currentMinutes = Math.floor(audioElement.currentTime / 60);
    const currentSeconds = Math.floor(audioElement.currentTime % 60);
    const durationMinutes = Math.floor(audioElement.duration / 60);
    const durationSeconds = Math.floor(audioElement.duration % 60);

    const currentTimeString = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    const durationTimeString = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;

    document.getElementById('currentTime').innerText = currentTimeString;
    document.getElementById('duration').innerText = durationTimeString;
});


myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})