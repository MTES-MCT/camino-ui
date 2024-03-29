<template>
  <div class="mb">
    <Accordion
      v-if="stepType"
      id="step-type"
      :step="stepType"
      :opened="opened['type']"
      :complete="typeComplete"
      :en-construction="enConstruction"
      @toggle="toggle('type')"
    >
      <TypeEdit
        v-model:etape="etape"
        :user-is-admin="userIsAdmin"
        :etapes-types="etapesTypes"
        :etape-type="etapeType"
        :etape-is-demande-en-construction="etapeIsDemandeEnConstruction"
        @type-update="typeUpdate"
        @complete-update="typeCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepFondamentales"
      id="step-fondamentales"
      :step="stepFondamentales"
      :opened="opened['fondamentales']"
      :complete="stepFondamentalesComplete"
      :en-construction="enConstruction"
      @toggle="toggle('fondamentales')"
    >
      <FondamentalesEdit
        v-model:etape="etape"
        :domaine-id="domaineId"
        :titre-type-id="titreTypeId"
        :user-is-admin="userIsAdmin"
        :user-is-super="userIsSuper"
        :substances="substances"
        @complete-update="fondamentalesCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepPoints"
      id="step-points"
      :step="stepPoints"
      :opened="opened['points']"
      :complete="stepPerimetreComplete"
      :en-construction="enConstruction"
      @toggle="toggle('points')"
    >
      <PointsEdit
        v-model:etape="etape"
        v-model:events="events"
        :show-title="false"
        @complete-update="perimetreCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepSections"
      id="step-sections"
      :step="stepSections"
      :opened="opened['sections']"
      :complete="stepSectionsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('sections')"
    >
      <SectionsEdit
        v-model:etape="etape"
        :sections="etape.type.sections"
        @complete-update="sectionsCompleteUpdate"
        @sections-update="sectionsUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepDocuments"
      id="step-documents"
      :step="stepDocuments"
      :opened="opened['documents']"
      :complete="stepDocumentsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('documents')"
    >
      <DocumentsEdit
        v-model:documents="etape.documents"
        :add-action="{ name: 'titreEtapeEdition/documentAdd' }"
        :remove-action="{ name: 'titreEtapeEdition/documentRemove' }"
        repertoire="demarches"
        :document-popup-title="documentPopupTitle"
        :parent-type-id="etapeType.id"
        :documents-types="documentsTypes"
        @complete-update="documentsCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepJustificatifs"
      id="step-justificatifs"
      :step="stepJustificatifs"
      :opened="opened['justificatifs']"
      :complete="stepJustificatifsComplete"
      :en-construction="enConstruction"
      @toggle="toggle('justificatifs')"
    >
      <JustificatifsEdit
        v-model:justificatifs="etape.justificatifs"
        :justificatifs-types="etape.type.justificatifsTypes"
        :entreprises="entreprises"
        @complete-update="justificatifsCompleteUpdate"
      />
    </Accordion>

    <Accordion
      v-if="stepDecisionsAnnexes"
      id="step-decisionsAnnexes"
      :step="stepDecisionsAnnexes"
      :opened="opened['decisionsAnnexes']"
      :complete="stepDecisionsAnnexesComplete"
      :en-construction="enConstruction"
      @toggle="toggle('decisionsAnnexes')"
    >
      <DecisionsAnnexesEdit
        :etape="etape"
        @complete-update="decisionsAnnexesComplete = $event"
      />
    </Accordion>
  </div>
</template>

<script>
import Accordion from './accordion.vue'
import TypeEdit from './type-edit.vue'
import FondamentalesEdit from './fondamentales-edit.vue'
import PointsEdit from './points-edit.vue'
import SectionsEdit from './sections-edit.vue'
import DocumentsEdit from '../document/multi-edit.vue'
import JustificatifsEdit from './justificatifs-edit.vue'
import DecisionsAnnexesEdit from './decisions-annexes-edit.vue'

export default {
  components: {
    DecisionsAnnexesEdit,
    Accordion,
    TypeEdit,
    FondamentalesEdit,
    PointsEdit,
    SectionsEdit,
    DocumentsEdit,
    JustificatifsEdit
  },

  props: {
    etape: { type: Object, required: true },
    etapeType: { type: Object, default: null },
    domaineId: { type: String, required: true },
    titreTypeId: { type: String, required: true },
    events: { type: Object, required: true },
    user: { type: Object, required: true },
    etapeIsDemandeEnConstruction: { type: Boolean, required: true },
    documentPopupTitle: { type: String, required: true }
  },

  emits: ['complete-update', 'type-complete-update', 'change'],

  data() {
    return {
      fondamentalesComplete: false,
      perimetreComplete: false,
      sectionsComplete: false,
      documentsComplete: false,
      justificatifsComplete: false,
      decisionsAnnexesComplete: false,
      typeComplete: false,
      justificatifs: false,
      opened: {
        type: true,
        fondamentales: false,
        points: false,
        sections: false,
        documents: false,
        justificatifs: false,
        decisionsAnnexes: false
      },
      help: {}
    }
  },

  computed: {
    etapesTypes() {
      return this.$store.state.titreEtapeEdition.metas.etapesTypes.filter(
        t => t.etapesCreation
      )
    },

    documentsTypes() {
      return this.$store.getters['titreEtapeEdition/documentsTypes']
    },

    entreprises() {
      const titulaireIds = this.etape.titulaires.map(({ id }) => id)
      const amodiatairesIds = this.etape.amodiataires.map(({ id }) => id)

      return this.$store.state.titreEtapeEdition.metas.entreprises.filter(
        ({ id }) => titulaireIds.includes(id) || amodiatairesIds.includes(id)
      )
    },

    heritageLoaded() {
      return this.$store.state.titreEtapeEdition.heritageLoaded
    },

    enConstruction() {
      return this.etape.statutId === 'aco'
    },

    complete() {
      return (
        this.typeComplete &&
        this.stepFondamentalesComplete &&
        this.stepPerimetreComplete &&
        this.stepSectionsComplete &&
        this.stepDocumentsComplete &&
        this.stepJustificatifsComplete &&
        this.stepDecisionsAnnexesComplete
      )
    },

    stepFondamentalesComplete() {
      return !this.stepFondamentales || this.fondamentalesComplete
    },

    stepPerimetreComplete() {
      return !this.stepFondamentales || this.perimetreComplete
    },

    stepSectionsComplete() {
      return !this.stepSections || this.sectionsComplete
    },

    stepDocumentsComplete() {
      return !this.stepDocuments || this.documentsComplete
    },

    stepJustificatifsComplete() {
      return !this.stepJustificatifs || this.justificatifsComplete
    },

    stepDecisionsAnnexesComplete() {
      return !this.stepDecisionsAnnexes || this.decisionsAnnexesComplete
    },

    steps() {
      const steps = []

      if (this.userIsAdmin) {
        steps.push({
          id: 'type',
          name: 'Type'
        })
      }

      if (this.heritageLoaded && this.etapeType?.fondamentale) {
        steps.push({
          id: 'fondamentales',
          name: 'Propriétés'
        })
        steps.push({
          id: 'points',
          name: 'Périmètre'
        })
      }

      if (this.heritageLoaded && this.etape.type.sections?.length) {
        steps.push({ id: 'sections', name: 'Propriétés spécifiques' })
      }

      if (this.heritageLoaded && this.etape.type.documentsTypes?.length) {
        steps.push({
          id: 'documents',
          name: `Documents liés à l’étape ${this.etape.type.nom}`
        })
      }

      if (this.heritageLoaded && this.etape.type.justificatifsTypes?.length) {
        steps.push({ id: 'justificatifs', name: 'Justificatifs d’entreprise' })
      }

      if (this.etape.decisionsAnnexesSections) {
        steps.push({ id: 'decisionsAnnexes', name: 'Décisions annexes' })
      }

      const titreTypeHelp = this.help[this.titreTypeId + this.domaineId]
      if (titreTypeHelp) {
        steps.forEach(step => {
          step.help = titreTypeHelp[step.id]
        })
      }

      return steps
    },

    stepType() {
      return this.steps.find(s => s.id === 'type')
    },

    stepFondamentales() {
      return this.steps.find(s => s.id === 'fondamentales')
    },

    stepPoints() {
      return this.steps.find(s => s.id === 'points')
    },

    stepSections() {
      return this.steps.find(s => s.id === 'sections')
    },

    stepDocuments() {
      return this.steps.find(s => s.id === 'documents')
    },

    stepJustificatifs() {
      return this.steps.find(s => s.id === 'justificatifs')
    },

    stepDecisionsAnnexes() {
      return this.steps.find(s => s.id === 'decisionsAnnexes')
    },

    userIsAdmin() {
      return this.$store.getters['user/userIsAdmin']
    },

    userIsSuper() {
      return this.$store.getters['user/userIsSuper']
    },

    substances() {
      return this.$store.state.titreEtapeEdition.metas.substances.filter(su =>
        su.legales.find(sl => sl.domaine.id === this.domaineId)
      )
    }
  },

  watch: {
    complete: 'completeUpdate',

    etape: {
      handler: function () {
        this.$emit('change')
      },
      deep: true
    }
  },

  created() {
    this.typeCompleteUpdate()
    this.completeUpdate()

    if (this.etapeType?.id === 'mfr') {
      this.help.arm = {
        fondamentales:
          'Le renseignement d’une ou plusieurs substances est obligatoire.',
        points:
          'Pour la Guyane, le système géographique de référence est le RGFG95 / UTM zone 22N (2972). Pour le renseigner, cliquez sur « ajouter un système géographique » et choisissez le système RGFG95. Vous pouvez ensuite cliquer sur « ajouter un point », renseigner le nom, (le décrire si besoin) et renseigner les coordonnées (l’abscisse « X » en coordonnées cartésiennes correspond à la longitude en coordonnées géographiques et l’ordonnée « Y » correspond à une  latitude ). Vous devez reproduire cette étape pour tous les sommets du ou des périmètres du titre. La surface du titre est calculée automatiquement d’après les sommets renseignés.',
        sections:
          'Ce bloc permet de savoir si la prospection est mécanisée ou non et s’il y a des franchissements de cours d’eau (si oui, combien ?)',
        documents:
          'Toutes les pièces obligatoires, spécifiques à la demande, doivent être déposées dans cette rubrique en format pdf.',
        justificatifs:
          "Les justificatifs sont des documents propres à l'entreprise, et pourront être réutilisés pour la création d'un autre dossier et mis à jour si nécessaire. Ces justificatifs sont consultables dans la fiche entreprise de votre société. Cette section permet de protéger et de centraliser les informations d'ordre privé relatives à la société et à son personnel."
      }

      this.help.axm = this.help.arm
    }
  },

  methods: {
    fondamentalesCompleteUpdate(complete) {
      this.fondamentalesComplete = complete
    },

    perimetreCompleteUpdate(complete) {
      this.perimetreComplete = complete
    },

    documentsCompleteUpdate(complete) {
      this.documentsComplete = complete
    },

    justificatifsCompleteUpdate(complete) {
      this.justificatifsComplete = complete
    },

    sectionsCompleteUpdate(complete) {
      this.sectionsComplete = complete
    },

    async sectionsUpdate() {
      await this.$store.dispatch(
        'titreEtapeEdition/documentInit',
        this.etape.documents
      )
    },

    typeCompleteUpdate(complete) {
      this.typeComplete = complete || !this.stepType
      this.$emit('type-complete-update', this.typeComplete)
    },

    async typeUpdate(typeId) {
      await this.$store.dispatch('titreEtapeEdition/heritageGet', { typeId })
    },

    completeUpdate() {
      this.$emit('complete-update', this.complete)
    },

    toggle(stepId) {
      this.opened[stepId] = !this.opened[stepId]

      if (this.opened[stepId]) {
        this.scrollToStep(stepId)
      }

      this.$emit('change')
    },

    scrollToStep(stepId) {
      setTimeout(() => {
        document
          .getElementById(`step-${stepId}`)
          .scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }
}
</script>
