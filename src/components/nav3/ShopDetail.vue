<template>
    <section id="shopDetail" v-loading="loading">
      <el-row :gutter="20" type="flex" align="middle" v-if="user_data">
        <el-col :span="4">
          <div  style="height:120px;text-align: right">
            <img :src="imageUrl" style="height: 100%; border-radius: 8px">
          </div>
        </el-col>
        <el-col :span="5">
          <div >
            <p><span style="color: #71C8FF;font-size: 24px">{{user_data.shop_name}}</span></p>
            <p><span style="color: #666;font-size: 14px">主营：{{user_data.cate}}</span></p>
            <p><span style="color: #999;font-size: 12px">合同期限：{{user_data.sign_start}}—{{user_data.sign_end}}</span></p>
            <p style="width: 200px"><el-progress :percentage="user_data.day_rate"></el-progress></p>
          </div>
        </el-col>
        <el-col :span="5" >
          <div class="grid-content ">
            <div class="tag"><span class="title">负责人</span></div>
            <div class="tag"><span class="con">{{user_data.admin}}</span></div>
          </div>
        </el-col>
        <el-col :span="5" >
          <div class="grid-content ">
            <div class="tag"><span class="title">总销售额</span></div>
            <div class="tag"><span class="con">{{user_data.almoney}}</span></div>
          </div>
        </el-col>
        <el-col :span="5"  >
          <div class="grid-content ">
            <i class="fa fa-pencil-square-o" aria-hidden="true" style="color: #409EFF"></i>
            <el-button type="text" @click="edit()">编辑店铺信息</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="pro_data">
        <el-col :span="6"  >
          <div class="grid-content ">
            <div class="tag"><span class="title">聚划算场次</span></div>
            <div class="tag"><span class="con">{{pro_data[1].num}}</span></div>
          </div>
        </el-col>
        <el-col :span="6"  >
          <div class="grid-content ">
            <div class="tag"><span class="title">聚划算产出</span></div>
            <div class="tag"><span class="con">{{pro_data[1].amount}}</span></div>
          </div>
        </el-col>
        <el-col :span="6"  >
          <div class="grid-content ">
            <div class="tag"><span class="title">抢购场次</span></div>
            <div class="tag"><span class="con">{{pro_data[0].num}}</span></div>
          </div>
        </el-col>
        <el-col :span="6"  >
          <div class="grid-content ">
            <div class="tag"><span class="title">抢购产出</span></div>
            <div class="tag"><span class="con">{{pro_data[0].amount}}</span></div>
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
        imageUrl:null,
        user_data:null,
        pro_data:null,
        form:{
          year:"",
        },
      }
    },
    methods:{
      edit(){
        this.$router.push("ShopList")
      },
      selectTime(){
          let that=this;
          let shopID=sessionStorage.getItem("shopID");
          let token_secret=sessionStorage.getItem('token_secret');
          let data={
              year:new Date(this.form.year).getFullYear(),
              token_secret:token_secret,
              shop_id:shopID
          };
          this.$ajax.post("https://www.jnife.com/Admin/Shop/getShopInfo",qs.stringify(data))
            .then(function (res) {
              if(res.data.code==100000){
                that.month_amount=res.data.shopData.mon;
                that.total=res.data.shopData.year_total;
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
      let shopID=sessionStorage.getItem("shopID");
      let token_secret=sessionStorage.getItem('token_secret');
      let data={
          token_secret:token_secret,
          shop_id:shopID,
          year:this.form.year,
      };
      this.$ajax.post("https://www.jnife.com/Admin/Shop/getShopInfo",qs.stringify(data))
        .then(function (res) {
          if(res.data.code==100000){
            that.imageUrl=res.data.shopData.sh.shop_logo;
            that.user_data=res.data.shopData.sh;
            that.pro_data=res.data.shopData.pro;
            that.month_amount=res.data.shopData.mon;
            that.total=res.data.shopData.year_total;
            that.loading=false;
            that.drawColumnChart();
          }
        }).catch(function (err) {

      });


    },

  }
</script>
<style>
  #shopDetail .tag{
    margin-top: 20px;
  }
  #shopDetail .tag>.title{
    font-size:18px;
    color:rgba(102,102,102,1);
  }
  #shopDetail .tag>.con{
    font-size:28px;
    color:rgba(113,200,255,1);
  }







  #shopDetail .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  #shopDetail .grid-content {
    text-align: center;
  }
</style>
