const fs = require('fs')
const cp = require("child_process");
module.exports = (hermione) => {
  let selenium
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  hermione.on(hermione.events.RUNNER_START, async () => {
    const file = fs.openSync('selenium.log', 'w')

    selenium = cp.spawn('selenium-standalone', ['start'], {
      stdio: ['ignore', file, file], shell: true
    })

    await delay(4000)
  })

  hermione.on(hermione.events.RUNNER_END, () => {
    return new Promise((resolve => {
      selenium.on('exit', () => resolve())

      selenium.kill()
    }))
  })
}