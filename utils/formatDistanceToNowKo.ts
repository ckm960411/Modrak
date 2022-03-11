import { formatDistanceToNowStrict } from "date-fns"

const formatDistanceToNowKo = (date: number) => {
  const formattedString = formatDistanceToNowStrict(date)

  const strArray = formattedString.split(' ')
  strArray.map(str => {
    switch (str) {
      case 'second':
        let finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '초')
        break
      case 'seconds':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '초')
        break
      case 'minute':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '분')
        break
      case 'minutes':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '분')
        break
      case 'hour':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '시간')
        break
      case 'hours':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '시간')
        break
      case 'day':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '일')
        break
      case 'days':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '일')
        break
      case 'month':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '달')
        break
      case 'months':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '달')
        break
      case 'year':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '년')
        break
      case 'years':
        finded = strArray.findIndex(v => v === str)
        strArray.splice(finded, 1, '년')
        break
      default:
        break
    }
  })

  return strArray.join('')
}

export default formatDistanceToNowKo