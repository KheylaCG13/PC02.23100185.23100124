<template>
  <div class="digimon-filter">
    <input type="text" placeholder="Buscar por nombre" v-model="query" @input="onChange" />

    <select v-model="level" @change="onChange">
      <option value="">Todos los niveles</option>
      <option v-for="lvl in levels" :key="lvl" :value="lvl">{{ lvl }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'DigimonFilter',
  props: {
    levels: { type: Array, default: () => [] },
    value: { type: String, default: '' },
  },
  data() {
    return {
      query: '',
      level: '',
      timer: null,
    }
  },
  methods: {
    onChange() {
      // debounce rápido
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('filter', { query: this.query.trim(), level: this.level })
      }, 200)
    },
  },
}
</script>

<style scoped>
.digimon-filter {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}
.digimon-filter input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #0b0b0b;
  color: #fff;
}
.digimon-filter input::placeholder {
  color: #bbb;
}
.digimon-filter select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #0b0b0b;
  color: #fff;
}
.digimon-filter select option {
  background: #0b0b0b; /* ensure dropdown options match dark theme where supported */
  color: #fff;
}
.digimon-filter input:focus,
.digimon-filter select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.06);
}
</style>
