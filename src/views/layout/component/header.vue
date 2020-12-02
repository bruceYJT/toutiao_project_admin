<template>
  <div class="header-container">
    <div>
      <i
      :class="{
        'el-icon-s-fold': isCollapse,
        'el-icon-s-unfold': !isCollapse
      }"
      @click="changeCollspase()"></i>
      <span>xxxx有限公司</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" :src="user.photo" alt="">
        <span>{{ user.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'AppHeader',
  components: {},
  props: ['collapse'],
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    getUserProfile().then(res => {
      this.user = res.data.data
    }).catch(error => {
      alert(error)
    })
  },
  mounted () {},
  methods: {
    changeCollspase () {
      this.$emit('changeCollapse', !this.collapse)
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  color: #fff;
  .avatar-wrap {
    display: flex;
    align-items: center;
    color: #FFDDAA;
    font-weight: 550;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
