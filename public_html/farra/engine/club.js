let clubTime = 0

function clubBreathing(){

clubTime += 0.01

let breathe = (Math.sin(clubTime)+1)/2

document.body.style.filter =
`brightness(${0.95 + breathe*0.05})`

requestAnimationFrame(clubBreathing)

}

clubBreathing()