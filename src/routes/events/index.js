import { Router } from 'express'
import { getEventsTask, updateEventByIdTask, deleteEventByIdTask, createEventTask } from './model.js'
import { getErrorCode } from '../../utils.js'
const router = Router()

router.get('/', (_, res) => {
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on getting all events', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }
  console.log('?')
  return getEventsTask().fork(onError, onSuccess)
})


router.post('/', (req, res) => {
  const event = req.body
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on updating event', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return createEventTask(event).fork(onError, onSuccess)
})

router.put('/:eventId', (req, res) => {
  const eventId = req.params.eventId
  const event = req.body
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on updating event', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return updateEventByIdTask(eventId, event).fork(onError, onSuccess)
})


router.delete('/:eventId', (req, res) => {
  const eventId = req.params.eventId
  const onSuccess = (events) => res.json(({ results: events }))
  const onError = (error) => {
    console.log('errror on deleteing event', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return deleteEventByIdTask(eventId).fork(onError, onSuccess)
})



export default router
