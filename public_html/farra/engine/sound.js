if(!window.clubSound){

window.clubSound = new Audio("/farra/audio/clubloop.mp3")

clubSound.loop = true
clubSound.volume = 0.25

document.addEventListener("click",()=>{
clubSound.play().catch(()=>{})
},{once:true})

}