const getTelegramUserFromWebApp = () => window?.Telegram?.WebApp?.initDataUnsafe?.user

const getTestTelegramUser = () => ({ id: 896678539, first_name: 'Eldos' })


export const getTelegramUser = () => {
  if (import.meta.env.VITE_DEBUG === 'true') {
    return getTestTelegramUser()
  }
  const user = getTelegramUserFromWebApp()
  if (!user) {
    throw new Error('Telegram user not found')
  }
  return user
}