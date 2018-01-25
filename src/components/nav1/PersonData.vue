<template>
  <section id="PersonData">
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

    <el-row>
      <el-col :span="24" >
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          max-height="600"
          style="width: 100%">
          <el-table-column
            prop="username"
            label="花名"
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
        tableData: [
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
          ]
      }
    },
    methods:{
      view(row){
          this.$router.push("PersonData_activity");
          sessionStorage.setItem("adminID",row.id);
      },
      change(){
        let that=this;
        let data={
          index:this.tabPosition,
        };
        this.$ajax.post("https://www.jnife.com/admin/statistic/allUserList",qs.stringify(data))
          .then(function (res) {
            if(res.data.code==100000){
              that.tableData=res.data.object[0];
            }
          })
          .catch(function (err) {

          });
      },
    },
    created:function () {
      let that=this;
      that.loading=true;
      this.$ajax.post("https://www.jnife.com/admin/statistic/allUserList")
        .then(function (res) {
          if(res.data.code==100000){
            that.tableData=res.data.object[0];
            that.loading=false;
          }
        })
        .catch(function (err) {

        });


    },
  }
</script>
<style>
  #PersonData .el-row{
    margin-bottom: 30px;
  }
</style>
