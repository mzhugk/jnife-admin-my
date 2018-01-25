<template>
  <section id="TeamData">
    <el-row>
      <!--<el-col :span="20"></el-col>-->
      <el-col :span="4" :push="20">
        <el-radio-group v-model="tabPosition" @change="change()"  size="mini" style="float: right">
          <el-radio-button label="1">上周</el-radio-button>
          <el-radio-button label="2">本月</el-radio-button>
          <el-radio-button label="3">年度</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <el-row :gutter="20" v-for="item in AllData" :key="item.id" v-loading="loading">
      <el-col :span="3" class="team_left">
        <div class="team_left">
          <img src="../../assets/icon.png" alt="">
          <p><span style="font-size: 18px">{{item.group_name}}</span></p>
          <p><span>总销售额</span></p>
          <p><span style="font-size: 24px">{{item.g_amount}}</span></p>
          <p><span>KPI 完成率</span></p>
          <p><span style="font-size: 24px">{{item.total_kpi}}%</span></p>
        </div>
      </el-col>
      <el-col :span="21" >
        <el-table
          :data="item.shop"
          stripe
          max-height="600"
          style="width: 100%">
          <el-table-column
            prop="shop_name"
            label="店铺"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="负责人"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            label="总销售额"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="kpi"
            label="KPI"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="j_num"
            label="聚划算场次"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="j_avg"
            label="聚划算均坑产出"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="t_num"
            label="抢购场次"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="t_avg"
            label="抢购均坑产出"
            align="center"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </section>
</template>

<script>
  import qs from 'qs';
  export default{
    data(){
      return{
          loading:false,
          tabPosition: '3',
          AllData:null,
//          tableData: [
//            {
//              "shop_name": "playboy格为专卖",
//              "username": "寻欢",
//              "kpi": "0%",
//              "amount": 0,
//              "t_num": 0,
//              "t_avg": 0,
//              "j_num": 0,
//              "j_avg": 0
//            }
//          ]
      }
    },
    methods:{
        change(){
            let that=this;
            let data={
                index:this.tabPosition,
            };
          this.$ajax.post("https://www.jnife.com/admin/statistic/getGroupDatas",qs.stringify(data))
            .then(function (res) {
              if(res.data.code==100000){
                that.AllData=res.data.data;
              }
            })
            .catch(function (err) {

            });
        },
    },
    created:function () {
      let that=this;
      that.loading=true;
      this.$ajax.post("https://www.jnife.com/admin/statistic/getGroupDatas")
        .then(function (res) {
          if(res.data.code==100000){
              that.AllData=res.data.data;
              that.loading=false;
          }
        })
        .catch(function (err) {

        });


    },
  }
</script>
<style>
    #TeamData .team_left{
      padding-top: 20px;
      text-align: center;
      color: #333;
    }
    #TeamData .el-row{
      margin-bottom: 30px;
    }
    #TeamData .team_left{
      background-color: #FAFAFA;
    }
</style>
