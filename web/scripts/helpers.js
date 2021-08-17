/**
 * Get the value of a cookie
 * Source: https://vanillajstoolkit.com/helpers/getcookie/
 * @param name - The name of the cookie
 * @return The cookie value
 */
export function getCookie(name) {
  // `process.browser` is set by nextjs where we only use `getCookie`
  // but this file is imported from nodejs scripts so TypeScript complains for that environment.
  if (process.browser) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts[1].split(';').shift()
    }
  }
  return undefined
}
