
/** @description the default theme returned by /api/theme */
export const DEFAULT_THEME_ID = 'f4b657c4e3b99c63281b079f66d4dc34'

/** @description the default file returned when fetching theme gist by /api/theme/[gistid] */
export const DEFAULT_THEME_FILE = 'theme.css'

/** @description default themes built on site generation for /theme */
export const DEFAULT_BUILD_THEMES = [
    DEFAULT_THEME_ID,
]

/**
 * @description Theme of index are always revalidated instantly.
 *     Themes in /theme/[id] revalidation time here.
 */
export const THEME_REVALIDATION_INTERVAL = 60 // seconds

export const LANDING_THRESHOLD = 3500 // milliseconds

export const FETCH_GIST_CACHE_LIFETIME = 60 // seconds

export const FETCH_GISTS_CACHE_LIFETIME = 60 // seconds
