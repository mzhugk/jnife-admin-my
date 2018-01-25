<template>
  <section  id="orderlist">
    <!--表格-->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      max-height="600"
      style="width: 100%">
      <el-table-column
        prop="shop_name"
        label="店铺名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="订单总数"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="latest"
        label="最近更新时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="操作人"
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


    <!--分页-->
    <div style="text-align: right;margin-top: 30px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<script>
  import qs from "qs"
  export default{
    data(){
      return{
        pageSize:null,
        total:null,
        currentPage: 1,
        loading:false,
        tableData: []
      }
    },
    methods:{
        init(){
          let that=this;
          that.loading=true;
          this.$ajax.get("https://www.jnife.com/Admin/Order/showAllShop")
            .then(function (res) {
              if(res.data.code==100000){
                  that.tableData=res.data.shop;
                  that.total=res.data.total;
                  that.pageSize=res.data.pagesize;
                  that.loading=false;
              }
            })
            .catch(function (err) {

            });

        },
        handleCurrentChange(val) {
        let that=this;
        let data={
            page:val,
        };//传当前页码
        this.$ajax.post("https://www.jnife.com/Admin/Order/showAllShop",qs.stringify(data))
          .then(function (res) {
            if(res.data.code==100000){
              that.tableData=[];
              that.tableData=res.data.shop;
            }
          })
          .catch(function (err) {

          });

      },
        view(row){
          this.$router.push("OrderDetail_copy");
          sessionStorage.setItem("shop_name",row.shop_name);
        },
    },
    created:function () {
        this.init();//表格初始化
    }
  }
</script>
