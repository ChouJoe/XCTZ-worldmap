<template>
  <v-app id="app" v-cloak>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
body{
/*background: url("~@/assets/images/bg.png") 0 0 / 100% 100% no-repeat;*/
background: url("./assets/img/background.png") 0 0 / 100% 100% no-repeat;
}
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
