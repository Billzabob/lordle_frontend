import md5 from 'md5'

export function getImagePath(code, width) {
  const image = code + '.png'
  const hash = md5(image)
  const p1 = hash.slice(0, 1)
  const p2 = hash.slice(0, 2)
  return `https://static.wikia.nocookie.net/leagueoflegends/images/${p1}/${p2}/${image}/revision/latest/scale-to-width-down/${width}`
}