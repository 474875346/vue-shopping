<template>
  <el-container class="home_box">
    <!-- 页面头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt srcset />
        <span>某某公司电商后台管理</span>
      </div>
      <el-button type="info" plain @click="logout">系统退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="asideWidth">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
        @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isToggle"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu :index="item.path" v-for="item in menulist" :key="item.id" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconsObj: {},
      isToggle: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status === 200) {
        this.menulist = res.data
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse () {
      this.isToggle = !this.isToggle
    }
  },
  filters: {
    idStr (idx) {
      return '' + idx
    }
  },
  computed: {
    asideWidth () {
      return this.isToggle ? '64px' : '200px'
    }
  }
}
</script>
<style lang="less" scoped>
.home_box {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #ffffff;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    font-size: 20px;
    span {
      margin-left: 10px;
    }
    img {
      width: 60px;
    }
  }
}
.el-aside {
  background-color: #373d47;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button{
  background-color: #4a5064;
  color: #ffffff;
  widows: 100%;
  text-align: center;
}
</style>
