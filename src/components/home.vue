<template>
  <div>
    <el-button type="info" plain @click="logout">系统退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
