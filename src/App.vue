<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "./components/Header.vue";


export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      viewListBlock: true
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.control {
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 7rem;
  width: 100%;
}

.btn {
  cursor: pointer;
  outline: none;
}
.btn-show {
  padding: 1rem 2rem;
  color: #ffffff;
  border-radius: 01.5rem;
  border: none;
  background: rgb(3, 156, 207);
  font-size: 0.8rem;
  text-decoration: none;
}

</style>
