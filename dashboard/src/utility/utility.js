import moment from 'moment'
import { ClientEnum } from '../config/ClientEnum'

function roleCheck(userRole, accessRole) {
  // Formatting the data as per ClientEnum Key, So that I can access the number value
  // of the admin Power
  const accessRolePower = 'ROLE_' + accessRole.split(' ').join('_') + '_POWER'
  const userRolePower = 'ROLE_' + userRole.split(' ').join('_') + '_POWER'

  if (ClientEnum[userRolePower] >= ClientEnum[accessRolePower]) return true

  return false
}

function isInt(data) {
  if (data === '') return true
  var regex = /^[0-9]+$/
  if (data.match(regex)) return true
  return false
}

function isFloat(data) {
  if (data === '') return true
  const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/
  if (rx_live.test(data)) return true
  return false
}

function isValidDate(data) {
  if (isNaN(data.getTime())) return false

  return true
}

function convertTimeStampToDate(timeStamp) {
  return moment(timeStamp).format('MM/DD/YYYY h:mm A')
}

function convertToDate(data) {
  const newDate = moment(data, ['h:mm A']).toDate()
  return newDate
}

function get12HourFormateTime(date) {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}

function compareTwoDate(date1, date2) {
  return date2 > date1
}

function dateAsString(date) {
  return moment(date).format('DD/MM/yy') // 22/10/2021
}

function convertStringToDate(dateString) {
  // 22/10/2021
  dateString = dateString.split('/')
  var newDate = new Date(dateString[2], dateString[1] - 1, dateString[0])
  return newDate
}

function getTomorrowDate() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

function getYesterdayDate() {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday
}

// 29th August, 2021, 12:00 AM / 00.00 convert it to timestamp
function getStartTimeStampOfADate(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  return d.getTime()
}

// 29th August, 2021, 11:59 PM convert it to timestamp
function getEndTimeStampOfADate(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 0, 0)
  return d.getTime()
}

function removeDuplication(objectList) {
  const objectMap = {}

  const newList = objectList.filter((singleObject) => {
    if (objectMap[JSON.stringify(singleObject)] == true) return false

    objectMap[JSON.stringify(singleObject)] = true
    return true
  })

  return newList
}

function removeSpace(str) {
  if (!str) return
  return str.replace(/\s+/g, '')
}

function jsonToBlob(obj) {
  const str = JSON.stringify(obj)
  const bytes = new TextEncoder().encode(str)
  const blob = new Blob([bytes], {
    type: 'application/json;charset=utf-8',
  })
  return blob
}

async function awaitSomeTime(awaitTimeInMilli) {
  await new Promise((resolve) => setTimeout(resolve, awaitTimeInMilli))
}

export default {
  isInt,
  isFloat,
  compareTwoDate,
  isValidDate,
  convertToDate,
  removeDuplication,
  get12HourFormateTime,
  removeSpace,
  dateAsString,
  awaitSomeTime,
  getTomorrowDate,
  getYesterdayDate,
  roleCheck,
  getStartTimeStampOfADate,
  getEndTimeStampOfADate,
  convertTimeStampToDate,
  jsonToBlob,
}
