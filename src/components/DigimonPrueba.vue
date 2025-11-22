<template>
  <div class="contenedor-filtros">
    <h6>Filtros</h6>

    <!-- Filtro por nombre -->
    <q-input
      v-model="filtroNombre"
      label="Buscar por nombre"
      dense
      outlined
      debounce="300"
      @input="filtrarDigimons"
    />

    <!-- Filtro por nivel -->
    <q-select
      v-model="filtroNivel"
      :options="nivelesDisponibles"
      label="Filtrar por nivel"
      dense
      outlined
      emit-value
      map-options
      @update:model-value="filtrarDigimons"
    />
  </div>

  <div class="contenedor-cards q-gutter-md q-mt-md">
    <q-card v-for="digimon in digimonsFiltrados" :key="digimon.name" class="card-digimon">
      <q-img :src="digimon.img" :alt="digimon.name" class="imagen-digimon" />
      <q-card-section>
        <div class="nombre-digimon">{{ digimon.name }}</div>
        <div class="nivel-digimon">Nivel: {{ digimon.level }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'DigimonFilter',
  data() {
    return {
      digimons: [],
      digimonsFiltrados: [],
      filtroNombre: '',
      filtroNivel: null,
      nivelesDisponibles: [],
    }
  },
  mounted() {
    this.cargarDigimons()
  },
  methods: {
    async cargarDigimons() {
      try {
        const response = await fetch('https://digimon-api.vercel.app/api/digimon')
        const data = await response.json()
        this.digimons = data
        this.digimonsFiltrados = data

        // Extraer niveles únicos
        const niveles = [...new Set(data.map((d) => d.level))].sort()
        this.nivelesDisponibles = niveles.map((nivel) => ({
          label: nivel,
          value: nivel,
        }))
      } catch (error) {
        console.error('Error al cargar Digimons:', error)
      }
    },
    filtrarDigimons() {
      this.digimonsFiltrados = this.digimons.filter((d) => {
        const coincideNombre = d.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
        const coincideNivel = this.filtroNivel ? d.level === this.filtroNivel : true
        return coincideNombre && coincideNivel
      })
    },
  },
}
</script>

<style scoped>
.contenedor-filtros {
  max-width: 400px;
  margin: auto;
}
.contenedor-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-digimon {
  width: 200px;
}
.imagen-digimon {
  height: 150px;
}
.nombre-digimon {
  font-weight: bold;
  font-size: 18px;
}
.nivel-digimon {
  font-size: 14px;
  color: #666;
}
</style>
