import { CONFIRMATION_STATUS} from './types'

export default function setConfirmationStatus(key,action) {
  return {
    type : CONFIRMATION_STATUS,
    payload : action,
    key
  }
}