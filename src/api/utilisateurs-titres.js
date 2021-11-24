import gql from 'graphql-tag'
import { apiGraphQLFetch } from './_client'

export const utilisateurTitreAbonner = apiGraphQLFetch(gql`
  mutation UtilisateurTitreAbonner($titreId: String!, $abonner: Boolean!) {
    utilisateurTitreAbonner(titreId: $titreId, abonner: $abonner)
  }
`)
