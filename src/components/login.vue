<template>
  <div class="login_box">
    <div class="login_form">
      <div class="logo">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586965467959&di=06e9a2f513fea3d8d0ff441fb26fcd9e&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F480%2Fw640h640%2F20181225%2F2O4m-hqtwzec1701687.jpg"
          alt
        />
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginFromRef')">登录</el-button>
          <el-button type="info" @click="resetLoginForm('loginFromRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) {
            this.$message.error(res.meta.msg)
          } else {
            window.sessionStorage.setItem('token', res.data.token)
            this.$message.success(res.meta.msg)
            this.$router.push('/home')
          }
        } else {
          console.error('请输入相应的校验信息')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_box {
  height: 100%;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587899278484&di=5083a8dfd736dc7b9f955f7533cf82e0&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F02%2F98%2Fdbce360dd8cabe2cb620d72d3d85ac39.jpg');
  object-fit: fill;
}
.login_form {
  width: 450px;
  height: 300px;
  background-color: rgba(255,255,255, 0.5);
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form .logo {
  position: absolute;
  left: 50%;
  width: 140px;
  height: 140px;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 10px #dddddd;
  }
}
.login_form .el-form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
</style>
