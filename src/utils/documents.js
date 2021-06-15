import { TODAY } from './index'

const documentsRequiredAdd = (documents, documentsTypes, userIsAdmin) => {
  const typeGet = document =>
    document.type ? document.type.id : document.typeId

  // supprime tous les documents temporaires
  documents = documents?.filter(d => d.id !== typeGet(d))

  // supprime les documents dont le documentType n'existe pas
  const newDocuments =
    documents?.filter(d => {
      const documentsTypesIds = documentsTypes.map(({ id }) => id)
      return documentsTypesIds.includes(typeGet(d))
    }) || []

  // crée les documents dont le type est obligatoires si ils n'existent pas
  documentsTypes?.forEach(documentType => {
    if (
      !documentType.optionnel &&
      !newDocuments.find(d => typeGet(d) === documentType.id)
    ) {
      newDocuments.push({
        id: documentType.id,
        typeId: documentType.id,
        type: documentType,
        entreprisesLecture: userIsAdmin,
        publicLecture: false,
        fichier: null,
        fichierNouveau: null,
        fichierTypeId: null,
        date: TODAY,
        modification: true,
        suppression: false
      })
    }
  })

  // on interdit la suppression des documents obligatoires et imcomplets
  documents?.forEach(d => {
    d.suppression = d.id !== typeGet(d)
  })

  return newDocuments
}

export { documentsRequiredAdd }
