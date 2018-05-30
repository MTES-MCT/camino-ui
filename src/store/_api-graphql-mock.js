import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import fileImport from './_file-import'

// Fill this in with the schema string
const titres = fileImport(__dirname, 'schemas/titres.gql')

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: titres })

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema })

const query = `
query tasksForUser {
  user(id: 6) { id, name }
}
`
const api = {
  async titresGet() {
    const titres = await graphql(schema, query)

    return titres
  }
}

export default api
