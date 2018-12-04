export default function (options) {
  const { host, trackerFileName } = options
  const filename = `${host}/${trackerFileName}.js`

  const scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = filename

    const head = document.head || document.getElementsByTagName('head')[0]
    head.appendChild(script)

    script.onload = resolve
    script.onerror = reject
  })

  scriptPromise.catch(error => {
    console.log(
      `An error occurred trying to load ${
        error.target.src
      }. If the file exists, you may have a tracking blocker enabled.`
    )
  })

  return scriptPromise
}
