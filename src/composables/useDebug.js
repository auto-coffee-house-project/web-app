export const useDebug = () => {
  return { isDebug: import.meta.env.VITE_DEBUG === 'true' }
}
