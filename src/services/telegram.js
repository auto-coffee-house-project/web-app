export const getTelegramWebApp = () => {
  const webApp = window?.Telegram?.WebApp
  if (webApp === undefined) {
    console.log('Telegram WebApp not found')
  }
  return webApp
}


export const getColorScheme = () => getTelegramWebApp()?.colorScheme || 'light'

const getTelegramUserFromWebApp = () => getTelegramWebApp()?.initDataUnsafe?.user

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