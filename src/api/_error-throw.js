const graphqlErrorThrow = e => {
  const errorMessage =
    (e.graphQLErrors && e.graphQLErrors[0] && e.graphQLErrors[0].message) ||
    (e.message && e.message)

  throw errorMessage === 'Network error: undefined' ? null : errorMessage
}

export default graphqlErrorThrow
