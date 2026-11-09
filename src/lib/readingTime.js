const WORDS_PER_MINUTE = 220

/**
 * @param {string} html
 * @returns {number} whole minutes, at least 1
 */
export function getReadingTime(html) {
  const wordCount = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}
