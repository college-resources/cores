const fs = require('fs')
const path = require('path')

// Copy global configs to project
const globalCommon = path.join(__dirname, '../../common')
const localCommon = path.join(__dirname, '../common')

if (fs.existsSync(globalCommon)) {
  // For local use
  if (!fs.existsSync(localCommon)) fs.mkdirSync(localCommon)
  fs.readdirSync(globalCommon)
    .forEach(file => fs.copyFileSync(path.join(globalCommon, file), path.join(localCommon, file)))
} else if (fs.existsSync('/common')) {
  // For Docker
  fs.symlinkSync('/common', localCommon)
}
