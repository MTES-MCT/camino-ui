const paramsEventTrack = (params, definitions, matomo, category, action) => {
  if (matomo) {
    if (params) {
      definitions.forEach(({ type, id }) => {
        let values = []
        if (type === 'string' && params[id]) {
          values = params[id].split(' ').map(p => p.replace("'", ' '))
        } else if (type === 'strings' && params[id]) {
          values = params[id]
        } else if (type === 'objects' && params[id]) {
          values = params[id].map(e => e.typeId)
        }
        values.forEach(value => {
          matomo.trackEvent(
            `${category}-${action}`,
            `${category}-${action}-${id}`,
            value
          )
          matomo.trackSiteSearch(value, id)
        })
      })
    } else {
      matomo.trackEvent(category, action, `${action}-${category}`)
    }
  }
}

export default paramsEventTrack
