<template>
  <div class="page-digimon">
    <h2>Digimons</h2>

    <DigimonFilter :levels="levels" @filter="onFilter" />

    <div v-if="loading">Cargando digimons...</div>
    <div v-else>
      <DigimonList :digimons="filtered" />
    </div>
  </div>
</template>

<script>
import DigimonFilter from 'components/digimon/DigimonFilter.vue'
import DigimonList from 'components/digimon/DigimonList.vue'

export default {
  name: 'DigimonPage',
  components: { DigimonFilter, DigimonList },
  data() {
    return {
      all: [],
      filter: { query: '', level: '' },
      loading: false,
      error: null,
    }
  },
  computed: {
    levels() {
      const s = new Set(this.all.map((d) => d.level))
      return Array.from(s).sort()
    },
    filtered() {
      const q = this.filter.query.toLowerCase()
      return this.all.filter((d) => {
        const matchName = q ? d.name.toLowerCase().includes(q) : true
        const matchLevel = this.filter.level ? d.level === this.filter.level : true
        return matchName && matchLevel
      })
    },
  },
  methods: {
    onFilter(payload) {
      this.filter = payload
    },
    load() {
      this.loading = true
      this.error = null
      // Usamos la API pública de Digimon
      this.$axios
        .get('https://digimon-api.vercel.app/api/digimon')
        .then((res) => {
          // res.data es un array con { name, img, level }
          this.all = res.data || []
        })
        .catch((err) => {
          console.error(err)
          this.error = 'Error cargando digimons'
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    this.load()
  },
}
</script>

<style scoped>
.page-digimon {
  padding: 16px;
}
.page-digimon h2 {
  margin-bottom: 12px;
}
</style>
