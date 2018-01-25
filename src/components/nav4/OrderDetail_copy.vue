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
        prop="order_no"
        label="订单号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_title"
        label="商品名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goods_num"
        label="购买数量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="real_payprice"
        label="实付款"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="order_status"
        label="订单状态"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        align="center"
      >
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
          let shop_name=sessionStorage.getItem("shop_name");
          this.$ajax.get("https://www.jnife.com/Admin/Order/getOrderForShop?shop_name="+shop_name)
              .then(function (res) {
                if(res.data.code==100000){
                  that.tableData=res.data.order;
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
            shop_name:sessionStorage.getItem("shop_name")
        };//传当前页码
        this.$ajax.post("https://www.jnife.com/Admin/Order/getOrderForShop",qs.stringify(data))
          .then(function (res) {
            if(res.data.code==100000){
              that.tableData=[];
              that.tableData=res.data.order;
            }
          })
          .catch(function (err) {

          });

      },
    },
    created:function () {
        this.init();//表格初始化
    }
  }
</script>
