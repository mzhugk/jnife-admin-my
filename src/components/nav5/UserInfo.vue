<template>
    <section id="userInfo" v-loading="loading">
      <el-row :gutter="20" >
        <el-col :span="6" >
          <div class="grid-content bg-purple">
            <el-upload
              class="avatar-uploader"
              action="https://www.jnife.com/admin/person/editUserIcon"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <i class="fa fa-pencil-square-o" aria-hidden="true" style="color: #409EFF"></i>
            <el-button type="text" @click="dialogFormVisible=true">修改登录密码</el-button>
          </div>
        </el-col>
        <el-col :span="6" style="height: 123px;" v-if="user_data">
          <div class="grid-content bg-purple" >
              <div class="tag"><span class="title">成员</span></div>
              <div class="tag"><span class="con">{{user_data.username}}</span></div>
          </div>
        </el-col>
        <el-col :span="6" style="height: 123px;" v-if="user_data">
          <div class="grid-content bg-purple">
            <div class="tag"><span class="title">年度销售额</span></div>
            <div class="tag"><span class="con">{{user_data.real_total}}</span></div>
          </div>
        </el-col>
        <el-col :span="6" style="height: 123px;" v-if="user_data">
          <div class="grid-content bg-purple">
            <div class="tag"><span class="title">KPI</span></div>
            <div class="tag"><span class="con">{{user_data.kpi}}</span></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="6" style="height: 123px;" v-if="pro_data">
          <div class="grid-content bg-purple">
            <div class="tag"><span class="title">聚划算场次</span></div>
            <div class="tag"><span class="con">{{pro_data[0].num}}</span></div>
          </div>
        </el-col>
        <el-col :span="6" style="height: 123px;" v-if="pro_data">
          <div class="grid-content bg-purple">
            <div class="tag"><span class="title">聚划算产出</span></div>
            <div class="tag"><span class="con">{{pro_data[0].amount}}</span></div>
          </div>
        </el-col>
        <el-col :span="6" style="height: 123px;" v-if="pro_data">
          <div class="grid-content bg-purple">
            <div class="tag"><span class="title">抢购场次</span></div>
            <div class="tag"><span class="con">{{pro_data[1].num}}</span></div>
          </div>
        </el-col>
        <el-col :span="6" style="height: 123px;" v-if="pro_data">
          <div class="grid-content bg-purple">
            <div class="tag"><span class="title">抢购产出</span></div>
            <div class="tag"><span class="con">{{pro_data[1].amount}}</span></div>
          </div>
        </el-col>
      </el-row>
      <hr style="height: 30px;background-color: #F2F4F5;border: 0;margin: 30px 0">
      <!--图表-->
      <el-row>
        <el-col :span="24" >
          <div style="position: absolute;right: 0;z-index: 999;">
            <el-form :model="form">
              <el-form-item label="">
                <el-date-picker
                  style="width: 100px"
                  @change="selectTime"
                  v-model="form.year"
                  type="year"
                  placeholder="选择年份">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div style="position: absolute;font-size: 18px"><span style="color: #393C40">年度总销售额 </span> <span style="color: #71C8FF">¥ {{total}}元</span></div>
          <div id="chartColumn" style="width:100%; min-height:400px;">

          </div>
        </el-col>
      </el-row>
      <!--修改密码-->
      <el-dialog title="修改登录密码" :visible.sync="dialogFormVisible">
        <el-form  ref="signForm" :model="signForm" :rules="rules" label-width="100px" label-position="right">
          <el-form-item label="原密码" prop="password">
            <el-input v-model="signForm.password" placeholder="请输入原密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password">
            <el-input v-model="signForm.new_password" placeholder="请输入新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="password_again">
            <el-input v-model="signForm.password_again" placeholder="请确认新密码" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div  style="text-align: center">
          <el-button type="primary" @click="submitForm('signForm')">确 定</el-button>
          <el-button @click="resetForm('signForm')">重 置</el-button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
  import qs from 'qs';
  import echarts from 'echarts';
  import walden from 'echarts/theme/walden';
  export default{
    data(){
      return{
        loading:false,
        chartColumn: null,
        month_amount:null,
        total:null,
        dialogFormVisible:false,
        imageUrl: '',
        user_data:null,
        pro_data:null,
        form:{
          year:"",
        },
        signForm:{
          password:null,
          new_password:null,
          password_again:null
        },
        rules: {
          password: [{required: true, message: '请输入原密码', trigger: 'blur'}],
          new_password: [{required: true, message: '请输入新密码', trigger: 'blur'}],
          password_again: [{required: true, message: '请确认新密码', trigger: 'blur'}],
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(this.signForm.new_password!==this.signForm.password_again){
                  this.$message.error("确认密码和新密码不一致");
              }else{
                let that=this;
                this.$ajax.post("https://www.jnife.com/admin/person/editUserPwd",qs.stringify(this.signForm))
                  .then(function (res) {
                    if(res.data.code==100000){
                      that.$message.success("恭喜，密码修改成功");
                      that.resetForm(formName);
                      that.dialogFormVisible=false;
                    }else if(res.data.code==100002){
                      that.$message.error("原密码输入错误");
                    }
                  }).catch(function (err) {

                });
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message.success("恭喜，头像修改成功");
        this.$store.commit('head_icon');//        这里修改头像状态
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      selectTime(){
          let that=this;
          let token_secret=sessionStorage.getItem('token_secret');
          let data={
              year:new Date(this.form.year).getFullYear(),
              token_secret:token_secret
          };
          this.$ajax.post("https://www.jnife.com/admin/Person/personDataForMonth",qs.stringify(data))
            .then(function (res) {
              if(res.data.code==100000){
                that.month_amount=res.data.object[0].month_amount;
                that.total=res.data.object[0].user.real_total;
                that.drawColumnChart();
              }
            }).catch(function (err) {

          });
      },
      drawColumnChart() {
        this.chartColumn = echarts.init(document.getElementById('chartColumn'),"walden");
        this.chartColumn.setOption({
          title: {
//              text: '年销售额',
//              left:"middle"
          },
          tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月", "10月", "11月", "12月"]
          },
          yAxis: {
            name: '单位（元）',
          },
          series: [
            {
              name: '销售额',
              type: 'bar',
              data:this.month_amount
            }
          ]
        });
      },
    },
    created:function () {
      this.form.year=JSON.stringify(new Date().getFullYear());
      let that=this;
      that.loading=true;
      let token_secret=sessionStorage.getItem('token_secret');
      let data={
          token_secret:token_secret,
          year:this.form.year,
      };
      this.$ajax.post("https://www.jnife.com/admin/Person/personDataForMonth",qs.stringify(data))
        .then(function (res) {
          if(res.data.code==100000){
              that.imageUrl=res.data.object[0].user.user_icon;
              that.user_data=res.data.object[0].user;
              that.pro_data=res.data.object[0].pro_data;
              that.month_amount=res.data.object[0].month_amount;
              that.total=res.data.object[0].user.real_total;
              that.loading=false;
              that.drawColumnChart();
          }
        }).catch(function (err) {

      });


    },
  }
</script>
<style>
  #userInfo .el-dialog{
    width: 26%;
  }
  #userInfo .tag{
    margin-top: 20px;
  }
  #userInfo .tag>.title{
    font-size:18px;
    color:rgba(102,102,102,1);
  }
  #userInfo .tag>.con{
    font-size:28px;
    color:rgba(113,200,255,1);
  }

  #userInfo .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 40px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #userInfo .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #userInfo .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  #userInfo .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }





  #userInfo .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  #userInfo .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
  }
</style>
