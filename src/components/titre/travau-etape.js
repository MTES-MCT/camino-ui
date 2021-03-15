import { cloneAndClean } from '../../utils/index'

const etapeEditFormat = (etape, travauxId) => {
  etape = cloneAndClean(etape)

  etape.titreTravauxId = travauxId

  etape.typeId = etape.type.id
  delete etape.type

  etape.statutId = etape.statut.id
  delete etape.statut

  etape.duree = {
    ans: etape.duree ? Math.floor(etape.duree / 12) : null,
    mois: etape.duree ? Math.floor(etape.duree % 12) : null
  }

  delete etape.documents
  delete etape.modification
  delete etape.suppression
  delete etape.documentsCreation

  if (etape.documents) {
    etape.documents.forEach(document => {
      document.titreEtapeId = etape.id

      document.typeId = document.type.id
      document.fichierNouveau = null

      delete document.type
      delete document.modification
      delete document.suppression
    })
  } else {
    etape.documents = []
  }

  return etape
}

export { etapeEditFormat }
