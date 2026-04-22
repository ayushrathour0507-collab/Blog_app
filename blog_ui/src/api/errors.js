export const getApiErrorMessage = (error, fallbackMessage) => {
  const detail = error?.response?.data?.detail
  if (typeof detail === 'string' && detail.trim()) return detail
  return error?.response?.data?.message || fallbackMessage
}

export const getFastApiFieldErrors = (error) => {
  const detail = error?.response?.data?.detail
  if (!Array.isArray(detail)) return {}

  const mapped = {}
  detail.forEach((item) => {
    const field = Array.isArray(item?.loc) ? item.loc[item.loc.length - 1] : null
    if (typeof field === 'string') {
      mapped[field] = item?.msg || 'Invalid value'
    }
  })
  return mapped
}
