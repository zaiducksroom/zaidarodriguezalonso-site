function randomVoices(){

if(Math.random() < 0.4){

let sounds=[
"/farra/audio/voice1.mp3",
"/farra/audio/voice2.mp3"
]

let v = new Audio(
sounds[Math.floor(Math.random()*sounds.length)]
)

v.volume = 0.15
v.play()

}

setTimeout(randomVoices,15000 + Math.random()*20000)

}

randomVoices()