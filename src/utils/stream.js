const streamToBlob = async (response, loadEventId, commit = null) => {
  let body

  if (response.body) {
    const total = response.headers.get('content-length')
    const reader = response.body.getReader()
    let loaded = 0
    const chunks = []

    if (commit) {
      commit('loadingRemove', loadEventId, { root: true })
    }

    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      chunks.push(value)
      loaded += value.length

      if (commit) {
        commit('fileLoad', { loaded, total }, { root: true })
      }
    }

    body = new Blob(chunks)
  } else {
    body = await response.blob()
  }

  return body
}

export { streamToBlob }
