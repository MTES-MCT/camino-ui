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

  return etape
}

export { etapeEditFormat }
