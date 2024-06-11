import http from '../../http.js'
import { prop, map, reverse } from 'ramda'
import { log, formatDate } from '../../utils.js'

const saveDuesTask = (dues) =>
  http.back4App.postTask({ url: `classes/Dues`, body: JSON.stringify(dues) }).map(prop('results'))

const toDuesVM = ({ date, createdAt, status, full_name, address, email }) => {
  return date
    ? {
      date: formatDate(date),
      status,
      name: full_name,
      email,
      address,
    }
    : {
      date: formatDate(createdAt),
      status: "ERROR - contact administrator",
      full_name: JSON.stringify(full_name),
      email: JSON.stringify(email),
      address: JSON.stringify(address),
    }
}

const findUserDuesByEncodedIdTask = (encodeId) =>
  http.back4App
    .getTask({ url: `classes/Dues?${encodeId}`, })
    .map(prop("results"))
    .map(map(toDuesVM))
    .map(reverse)

const getDuesTask = () =>
  http.back4App.getTask({ url: 'classes/Dues' })
    .map(prop("results"))


export { saveDuesTask, findUserDuesByEncodedIdTask, getDuesTask }
