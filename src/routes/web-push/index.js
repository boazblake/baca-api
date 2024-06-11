import { Router } from 'express'
import webpush from 'web-push'
import { getErrorCode } from '../../utils.js'
const router = Router()

router.post('/', (req, res) => {
  const dues = req.body

  const onSuccess = (dues) => res.json(({ results: dues }))
  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }
  return saveDuesTask(dues).fork(onError, onSuccess)
})



router.get('/', (_, res) => {
  const onSuccess = (dues) => res.json(({ results: dues }))
  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return getDuesTask().fork(onError, onSuccess)
})

router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  const encodedId = encodeURI(`where={"userId":"${userId}"}`)
  const onSuccess = (dues) => res.json(({ results: dues }))
  const onError = (error) => {
    console.log('errror on login', error)
    res.status(getErrorCode(error))
    return res.json(error)
  }

  return findUserDuesByEncodedIdTask(encodedId).fork(onError, onSuccess)
})

export default router
