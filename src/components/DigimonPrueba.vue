<template>
  <div class="pantalla-digimons">
    <h2 class="titulo-general">📘 Explorador de Digimons</h2>

    <div class="layout-digimons">
      <!-- Panel lateral -->
      <aside class="panel-filtros">
        <h4 class="titulo-filtros">Filtros</h4>

        <!-- Buscar por nombre -->
        <q-input v-model="filtroNombre" label="Buscar por nombre" dense outlined />

        <div class="fila-botones q-mt-sm">
          <q-btn color="primary" label="Buscar" @click="buscarPorNombre" />
          <q-btn flat color="secondary" label="Limpiar" class="q-ml-sm" @click="limpiarFiltros" />
        </div>

        <!-- Filtrar por nivel -->
        <q-select
          v-model="filtroNivel"
          :options="nivelesDisponibles"
          label="Filtrar por nivel"
          dense
          outlined
          emit-value
          map-options
          @update:model-value="buscarPorNivel"
          class="q-mt-sm"
        />

        <!-- (Limpiar moved next to Buscar) -->
      </aside>

      <!-- Cards -->
      <section class="contenedor-cards q-gutter-md">
        <q-card v-for="digimon in digimons" :key="digimon.name" class="card-digimon">
          <q-img :src="digimon.img" :alt="digimon.name" class="imagen-digimon" />
          <q-card-section>
            <div class="nombre-digimon">{{ digimon.name }}</div>
            <div class="nivel-digimon">Nivel: {{ digimon.level }}</div>
          </q-card-section>
        </q-card>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigimonFilter',

  data() {
    return {
      digimons: [],
      filtroNombre: '',
      filtroNivel: null,
      nivelesDisponibles: [],
    }
  },

  mounted() {
    this.cargarTodos()
  },

  methods: {
    async cargarTodos() {
      const response = await fetch('https://digimon-api.vercel.app/api/digimon')
      const data = await response.json()

      this.digimons = data

      // niveles únicos
      this.nivelesDisponibles = [...new Set(data.map((d) => d.level))]
        .sort()
        .map((n) => ({ label: n, value: n }))
    },

    // --- FILTRO POR NOMBRE (usa endpoint) ---
    async buscarPorNombre() {
      if (this.filtroNombre.trim() === '') {
        this.cargarTodos()
        return
      }

      try {
        const response = await fetch(
          `https://digimon-api.vercel.app/api/digimon/name/${this.filtroNombre}`,
        )
        const data = await response.json()
        this.digimons = Array.isArray(data) ? data : []
      } catch (err) {
        console.error(err)
        this.digimons = []
      }
    },

    // --- FILTRO POR NIVEL (usa endpoint) ---
    async buscarPorNivel() {
      if (!this.filtroNivel) {
        this.cargarTodos()
        return
      }

      try {
        const response = await fetch(
          `https://digimon-api.vercel.app/api/digimon/level/${this.filtroNivel}`,
        )
        const data = await response.json()
        this.digimons = Array.isArray(data) ? data : []
      } catch (err) {
        console.error(err)
        this.digimons = []
      }
    },

    // --- LIMPIAR TODO ---
    limpiarFiltros() {
      this.filtroNombre = ''
      this.filtroNivel = null
      this.cargarTodos()
    },
  },
}
</script>

<style scoped>
.pantalla-digimons {
  padding: 20px;
}

.titulo-general {
  text-align: center;
  font-size: 32px;
  margin-bottom: 25px;
}

.layout-digimons {
  display: flex;
  gap: 30px;
}

/* Panel a la izquierda */
.panel-filtros {
  width: 250px;
  flex: 0 0 250px;
  min-width: 250px;
  position: sticky;
  top: 20px;
  background: #fdfdfd;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contenedor-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex: 1 1 auto;
  min-width: 0;
  overflow: auto;
}

.fila-botones {
  display: flex;
  align-items: center;
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
