import useApiFetch from '../useApiFetch.js'

export const createEmployeeInvitation = ({ botId, adminUserId }) => {
  const url = '/shops/invitations/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).post({
    admin_user_id: adminUserId,
  }).json()
}

export const deleteEmployee = ({ botId, employeeId }) => {
  const url = `/shops/employees/${employeeId}/`
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).delete().json()
}

export const getEmployees = ({ botId }) => {
  const url = '/shops/employees/'
  return useApiFetch(url, {
    headers: {
      'bot-id': botId,
    },
  }).json()
}
