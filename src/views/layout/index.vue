<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
        <AppAside :is-collapse='isCollapse'/>
    </el-aside>
    <el-container>
      <el-header class="header"><AppHeader v-bind:collapse='isCollapse' v-on:changeCollapse='changeCollapse($event)'/></el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './component/aside'
import AppHeader from './component/header'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: [],
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    changeCollapse (newdata) {
      this.isCollapse = newdata
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #FF9999;
}

.header {
  background-color:#99CCCC;
}

.main {
  background-color: #FFFFFF;
}
</style>
