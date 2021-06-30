import { demarcheOrTravauxEtapeSaveFormat } from './titre-etape-save'

const travauxEtapeEditFormat = etape => {
  etape.typeId = etape.type?.id
  delete etape.type

  etape.statutId = etape.statut?.id
  delete etape.statut

  etape.duree = {
    ans: etape.duree ? Math.floor(etape.duree / 12) : null,
    mois: etape.duree ? Math.floor(etape.duree % 12) : null
  }

  return etape
}

const travauxEtapeSaveFormat = etape => {
  etape = JSON.parse(JSON.stringify(etape))

  etape = demarcheOrTravauxEtapeSaveFormat(etape)

  delete etape.travaux

  return etape
}

export { travauxEtapeEditFormat, travauxEtapeSaveFormat }
