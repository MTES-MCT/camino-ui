const errorLog = (e, functionName) => {
  console.log(functionName, { e })
  throw (e.graphQLErrors && e.graphQLErrors[0] && e.graphQLErrors[0].message) ||
    (e.message && e.message)
}

export default errorLog
