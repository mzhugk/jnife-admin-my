<template>
  <section  v-loading="loading">
    <!--图表-->
    <el-row>
      <el-col :span="24" style="position: relative;">
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
        <div style="position: absolute;font-size: 18px"><span style="color: #393C40">年度收益 </span> <span style="color: #71C8FF">¥ {{total}}元</span></div>

        <div id="chartColumn" style="width:100%; min-height:400px;">

        </div>
      </el-col>
    </el-row>
    <hr style="height: 30px;background-color: #F2F4F5;border: 0;margin: 30px 0">
    <el-table
      :data="tableData"
      stripe
      max-height="600"
      style="width: 100%"
      :default-sort = "{prop: 'all', order: 'descending'}"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="shop_name"
        label="店铺"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="all"
        label="总收益"
        align="center"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="latest"
        label="上月收益"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="rate"
        label="上月收益占比"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="view(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        chart:null,
        total:null,
        form:{
          year:"",
        },
        tableData: []
      }
    },
    methods:{
      view(row){
        this.$router.push("ShopDetail");
        sessionStorage.setItem("shopID",row.id);
      },
      selectTime(){
        let that=this;
        let token_secret=sessionStorage.getItem('token_secret');
        let data={
          year:new Date(this.form.year).getFullYear(),
          token_secret:token_secret
        };
        this.$ajax.post("https://www.jnife.com/Admin/Statistic/incomeView",qs.stringify(data))
          .then(function (res) {
            if(res.data.code==100000){
              that.chart=res.data.object[0].chart;
              that.total=res.data.object[0].total;
              that.drawColumnChart();
            }
          }).catch(function (err) {

        });
      },
      drawColumnChart() {
        this.chartColumn = echarts.init(document.getElementById('chartColumn'),"walden");
        this.chartColumn.setOption({
          title: {
//            text: '年度收益',
//            left:"middle"
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
              type: 'line',
              data:this.chart
            },
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
      this.$ajax.post("https://www.jnife.com/Admin/Statistic/incomeView",qs.stringify(data))
        .then(function (res) {
          if(res.data.code==100000){
            that.chart=res.data.object[0].chart;
            that.total=res.data.object[0].total;
            that.tableData=res.data.object[0].shoplist;
            that.loading=false;
            that.drawColumnChart();
          }
        }).catch(function (err) {

      });


    },
  }
</script>
