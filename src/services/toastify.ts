import { toast } from 'react-toastify'

export const toastSuccess = (message = '') =>
  toast.success(`${message}`, {
    theme: 'light',
  })

export const toastError = (message = '') =>
  toast.error(`${message}`, {
    theme: 'light',
  })

export const toastWarning = (message = '') =>
  toast.warning(`${message}`, {
    theme: 'light',
  })

export const toastInfo = (message = '') =>
  toast.info(`${message}`, {
    theme: 'light',
  })
