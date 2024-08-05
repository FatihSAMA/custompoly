import {createClient} from '@sanity/client'

const client = createClient({
  projectId: import.meta.env.VITE_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-05-03',
  projectId: import.meta.env.VITE_TOKEN,
  useCdn: true,
})

export default client