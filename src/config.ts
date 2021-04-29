
/** @description the default theme returned by /api/theme */
export const DEFAULT_THEME_ID = 'f4b657c4e3b99c63281b079f66d4dc34' // css Zen Garden submission 217

/** @description the default file returned when fetching theme gist by /api/theme/[gistid] */
export const DEFAULT_THEME_FILE = 'theme.css'

/** @description default themes built on site generation for /theme */
export const DEFAULT_BUILD_THEMES = [
    DEFAULT_THEME_ID,
    '5486806e35e68e5e001940ff35b11b37', // css Zen Garden submission 215
    '71d17f307d1d5481e280c9ee3739bf1c', // css Zen Garden submission 220
]

/**
 * @description Theme of index are always revalidated instantly.
 *     This is for themes in /theme/[id].
 */
export const THEME_REVALIDATION_INTERVAL = 600 // seconds

export const LANDING_THRESHOLD = 3500 // milliseconds

export const FETCH_GIST_CACHE_LIFETIME = 60 // seconds

export const FETCH_GISTS_CACHE_LIFETIME = 60 // seconds

export const SUBMIT_CHANNEL = 'submit-channel'
