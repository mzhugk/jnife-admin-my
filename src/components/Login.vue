<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
    <img src="../assets/icon.png" alt="" style="position: absolute;left: 174px;top: -40px;">
    <h3 class="title">尖刀连数据管理系统</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item>
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import qs from "qs"
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: null,
          checkPass: null
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
      };
    },
    methods: {
      handleSubmit(ev) {
        let that = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //that.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            let loginParams = { username: this.loginForm.account, password: this.loginForm.checkPass };
            this.$ajax.post("https://www.jnife.com/admin/login/login",qs.stringify(loginParams))
              .then(function (res) {
                if(res.data.code==100000){
                    that.logining = false;
                    sessionStorage.setItem('user',that.loginForm.account);
                    sessionStorage.setItem('token_secret',res.data.token_secret);
                    sessionStorage.setItem('role_id',res.data.role_id);
                    let Lv=res.data.role_id;
//                    console.log(that.$router.options);
                    if(Lv>2){
                      that.$router.options.routes[3].children[3].hidden=true;
                      that.$router.options.routes[7].children[1].hidden=true;
                    }else{
                      that.$router.options.routes[3].children[3].hidden=false;
                      that.$router.options.routes[7].children[1].hidden=false;
                    }
                  that.$router.push({ path: '/main' });
                }else if(res.data.code==100001){
                    that.$message.error("密码错误");
                    that.logining = false;
                }
                else if(res.data.code==100002){
                    that.$message.error("不存在相关账号");
                    that.logining = false;
                }
              }).catch(function (err) {

            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    position: relative;
      -webkit-border-radius: 5px;
    border-radius: 5px;
      -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0 auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0 0 35px 0;
    }
  }
</style>
