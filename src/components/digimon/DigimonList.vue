<template>
  <div class="digimon-list">
    <div v-if="!digimons || digimons.length === 0">No hay digimons</div>
    <div class="grid">
      <div class="card" v-for="d in digimons" :key="d.name">
        <img :src="d.img" :alt="d.name" />
        <div class="card-body">
          <h4>{{ d.name }}</h4>
          <p>Level: <strong>{{ d.level }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigimonList',
  props: {
    digimons: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
.card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  text-align: center;
}
.card img {
  width: 100%;
  height: 120px;
  object-fit: contain;
}
.card-body h4 {
  margin: 8px 0 4px;
  font-size: 14px;
}
.card-body p {
  margin: 0;
  font-size: 13px;
  color: #444;
}
</style>
