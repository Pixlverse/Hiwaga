export function formatDate(dateLike) {
  if (!dateLike) return ''
  const d = new Date(dateLike)
  if (isNaN(d)) return ''
  return d
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase()
}
