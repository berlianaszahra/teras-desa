/**
 * DEPRECATED — axios.ts
 *
 * File ini hanya tersisa sebagai re-export compatibility layer.
 * Semua logic API kini ada di `src/lib/api.ts`.
 *
 * Jika ada komponen yang masih mengimport dari sini, arahkan ke:
 *   import { getProjects, getProjectById } from '@/lib/api'
 */

export { getProjects, getProjectById, getCurrentUser } from '@/lib/api';