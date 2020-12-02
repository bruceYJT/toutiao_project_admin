<template>
    <div class="login-container">
      <div class="login-form-wrap">
        <div class='login-head'>
          <div class="logo">
          </div>
        </div>
        <el-form class="login-form" ref="loginForm" :model= 'user' :rules= 'formRules'>
          <el-form-item prop= 'mobile'>
            <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop= 'code'>
            <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item prop= 'agree'>
            <el-checkbox v-model="user.agree"
              >我已阅读并同意用户协议和隐私条款</el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 协议是否同意
      },
      loginLoading: false,
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error())
              }
            },
            message: '请同意用户协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created: {},
  mounted: {},
  methods: {
    onLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login_ceil()
        }
      })
    },
    login_ceil () {
      this.loginLoading = true
      login(this.user).then(res => {
        console.log(res)
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 本地存储返回信息（jwt）
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.png') no-repeat;
    background-size: cover;
    .login-form-wrap {
      min-width: 300px;
      padding: 30px 50px 10px;
      background-color: #fff;
      .login-head {
        display: flex;
        justify-content: center;
        .logo {
          width: 200px;
          height: 57px;
          padding-bottom: 20px;
          background: url('./logo_index.png') no-repeat;
          background-size: contain;
        }
      }
      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
