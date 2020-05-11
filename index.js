const robot = require("robotjs")
robot.setMouseDelay(1)

/* xy positions on screen for right disenchant movement */ 
const cardPosition = [405, 347]
const disenchantButtonPos = [797, 894]
const confirmButtonPos = [803, 650]

/* order of movement mouse should follow */ 
const order = [cardPosition, disenchantButtonPos, confirmButtonPos, disenchantButtonPos, cardPosition]

/* call a stack of promises */ 
const callStack = ([fn, ...rest]) => fn().then(() => rest.length && callStack(rest))
const sleep = s => new Promise(resolve => setTimeout(resolve, s))

/* create stack of functions */ 
const stack = order.map(([x, y], i) => () => { 
  robot.moveMouse(x, y) 
  robot.mouseClick(i == 0 ? 'right' : 'left')
  return sleep(1000) 
})

/* disenchant/init */ 
const disenchant = () => {
  callStack(stack).then(disenchant)
}

sleep(2000).then(disenchant)