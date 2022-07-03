import { shuffle } from './functions'
/**
 * convert icons into array that has objects with (id and icon) repeated 2 times
 */
// function that return an object with id and icon
function iconObj(id, icon) {
  const currId = id
  const currIcon = icon
  return {
    id: currId,
    content: currIcon,
  }
}

function getIcons(yourIcons) {
  const icons = yourIcons
  const tmp = [] // init empty arrays
  icons.forEach((icon, index) => {
    // push evey icon with its index as object into it
    tmp.push(iconObj(index, icon))
  })
  return shuffle([...tmp, ...tmp]) // dublicate icons
}

export default getIcons
