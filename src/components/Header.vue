<template>
  <header>
    <h1>Student Registration</h1>
    <router-link
      :to="getIsAddStudent ? '/' : '/students'"
      @click="toggleAddStudent"
      class="btn-show"
    >
      {{ getIsAddStudent ? "Add Student" : "View Students" }}
      </router-link>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Header",
  components: {},
  methods: {
    ...mapMutations(["toggleAddStudent"]),
  },
  computed: {
    ...mapGetters(["getIsAddStudent"]),
  },
};
</script>

<style scoped>
header {
  padding: 1.5rem 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #000000;
}

</style>