<template>
  <section id="OverviewData"  v-loading="loading">
    <el-row>
      <el-col :span="20">
        <div id="chartColumn" style="width:100%; min-height:400px;">

        </div>
        <hr style="height: 30px;background-color: #F2F4F5;border: 0;margin: 30px 0">
        <el-row style="margin-bottom: 30px">
            <el-col :span="10">
              <span style="font-size: 18px;">排行榜</span>
              <el-select v-model="value" placeholder="请选择" size="mini" style="width: 80px;margin-left: 30px" @change="selectCate">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="14" >
              <el-radio-group v-model="tabPosition" @change="change()"  size="mini" style="float: right;margin-left: 30px">
                <el-radio-button label="1">昨日</el-radio-button>
                <el-radio-button label="2">上周</el-radio-button>
                <el-radio-button label="3">本月</el-radio-button>
                <el-radio-button label="4">年度</el-radio-button>
              </el-radio-group>
              <el-date-picker
                style="width: 126px;float: right;"
                @change="selectTime"
                size="mini"
                v-model="date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
        </el-row>
        <el-table
          :default-sort = "{prop: 'shop_amount', order: 'descending'}"
          :data="tableData"
          stripe
          max-height="600"
          style="width: 100%">
          <el-table-column
            label="排名"
            type="index"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="shop_name"
            label="名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="shop_amount"
            label="总销售额"
            align="center"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="activity_num"
            label="活动场次"
            align="center"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="average"
            label="均坑产出"
            align="center"
            sortable
          >
          </el-table-column>
        </el-table>


      </el-col>
      <el-col :span="3" :push="1" style="padding-left:10px; height: 1148px; text-align: center;border-left: 1px solid #ddd" v-if="right_data">
          <el-row>
            <div class="tip">年度销售额</div>
            <div class="tip_con">{{right_data.all_amount}}</div>
          </el-row>
          <el-row>
            <div class="tip">年度KPI完成率</div>
            <el-progress type="circle" :percentage="right_data.kpi_rate" :stroke-width="12"></el-progress>
          </el-row>
          <el-row>
            <div class="tip">聚划算场次</div>
            <div class="tip_con">{{right_data.plat[1].pla}}</div>
          </el-row>
          <el-row>
            <div class="tip">聚划算均坑产出</div>
            <div class="tip_con">{{right_data.plat[1].amount}}</div>
          </el-row>
          <el-row>
            <div class="tip">抢购场次</div>
            <div class="tip_con">{{right_data.plat[0].pla}}</div>
          </el-row>
          <el-row>
            <div class="tip">抢购均坑产出</div>
            <div class="tip_con">{{right_data.plat[0].amount}}</div>
          </el-row>
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
        right_data:null,
        date:null,
        value:'shop',
        tabPosition: '4',
        chartColumn: null,
        series:null,
        selected:null,
        legend:null,
        options: [{
          value: 'shop',
          label: '店铺'
        }, {
          value: 'group',
          label: '小组'
        },
          {
            value: 'person',
            label: '个人'
          }
        ],
        tableData: []
      }
    },
    methods:{
        search(){
            let that=this;
            let token_secret=sessionStorage.getItem('token_secret');
            let data={
              token_secret:token_secret,
              cate:this.value,
              daytime:new Date(this.date).getTime()/1000,
              index:this.tabPosition
            };
            this.$ajax.post("https://www.jnife.com/admin/person/dataView",qs.stringify(data))
              .then(function (res) {
                if(res.data.code==100000){
                  that.tableData=res.data.groupData.down;
                }
              }).catch(function (err) {

            });
        },
      selectCate(){
        this.search();
      },
      selectTime(){
        this.tabPosition=null;
        this.search();
      },
      change(){
        this.date=null;
        this.search();
      },

      drawColumnChart() {
        this.chartColumn = echarts.init(document.getElementById('chartColumn'),"walden");
        this.chartColumn.setOption({
          title: {
            text: '年度销售额',
            left:"left"
          },
          legend: {
            data:this.legend,
            selected: this.selected
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
          series: this.series,

        });
      },

    },
    created:function () {
      let that=this;
      that.loading=true;
      let token_secret=sessionStorage.getItem('token_secret');
      let data={
        token_secret:token_secret,
      };
      this.$ajax.post("https://www.jnife.com/admin/person/dataView",qs.stringify(data))
        .then(function (res) {
          if(res.data.code==100000){
            that.series=res.data.groupData.top.series;
            that.legend=res.data.groupData.top.group;
            that.selected=res.data.groupData.top.selected;
            that.tableData=res.data.groupData.down;
            that.right_data=res.data.groupData.right;
            that.loading=false;
            that.drawColumnChart();
          }
        }).catch(function (err) {

      });


    },
  }
</script>
<style>
  #OverviewData .tip{
    font-size:16px;
    color:#409EFF;
    margin: 22px 0;
  }
  #OverviewData .tip_con{
    font-size:30px;
    color:#333;
    margin: 22px 0;
  }
</style>
