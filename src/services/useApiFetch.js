import { createFetch } from '@vueuse/core'

export default createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  combination: 'overwrite',
})
