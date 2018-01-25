<template>
  <section  id="orderlog">
    <el-upload
      class="upload-demo"
      :show-file-list="false"
      :on-success="upload_success"
      :before-upload="before_upload"
      :on-progress="progressing"
      action="https://www.jnife.com/Admin/Order/order_import"
    >
      <el-button size="small" type="primary">上传订单</el-button>
      <div slot="tip" class="el-upload__tip">只能上传后缀为.xls/.xlsx的Excel文件</div>
    </el-upload>
    <!--表格-->
    <div style="position: relative;">
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        max-height="600"
        style="width: 100%">
        <el-table-column
          label="日志"
          type="index"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="file_name"
          label="上传文件名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="shop_name"
          label="店铺名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="order_num"
          label="订单总数"
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
          prop="upload_at"
          label="上传时间"
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
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="circle_con" v-show="progress">
      <el-progress type="circle" :percentage="percentage" class="circle" :status="status"></el-progress>
    </div>


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
        progress:false,
        percentage:0,
        status:null,
        tableData: []
      }
    },
    methods:{
      init(){
        let that=this;
        that.loading=true;
        this.$ajax.post("https://www.jnife.com/Admin/Order/order_import")
          .then(function (res) {
            if(res.data.code==100000){
              that.tableData=res.data.record;
              that.total=res.data.total;
              that.pageSize=res.data.pagesize;
              }
              that.loading=false;
          })
          .catch(function (err) {

          });

      },
      handleCurrentChange(val) {
        let that=this;
        let data={
          page:val,
        };//传当前页码
        this.$ajax.post("https://www.jnife.com/Admin/Order/order_import",qs.stringify(data))
          .then(function (res) {
            if(res.data.code==100000){
              that.tableData=[];
              that.tableData=res.data.record;
            }
          })
          .catch(function (err) {

          });

      },
      upload_success(response, file, fileList){
        let that=this;
        this.tableData.unshift(response.add_record);
        this.percentage=100;
        this.status="success";
        setTimeout(function () {
          that.progress=false
        },600);
      },
      progressing(event, file, fileList){
          this.progress=true;
          this.percentage=parseInt(file.percentage);
      },
      before_upload(file){
        this.percentage=0;
        this.status=null;
        const isXLS = file.type === 'application/vnd.ms-excel'||file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isXLS) {
          this.$message.error('上传的Excel文件只能是 xls/xlsx 格式!');
        }
        return isXLS ;
      },
      view(row){
          this.$router.push("OrderDetail");
          sessionStorage.setItem("order_id",row.upload_mark);
      },
      del(row){
          let that=this;
          if(row.active==1){
            this.$confirm('确认删除吗?', '提示', {
//					type: 'warning'
            }).then(() => {
              this.$ajax.get("https://www.jnife.com/Admin/Order/deleteOrder?upload_mark="+row.upload_mark)
                .then(function (res) {
                  if(res.data.code==100000){
                    that.tableData=res.data.record;
                    that.$message.success("删除成功!");
                  }
                })
                .catch(function (err) {

                });
            }).catch(() => {

            });
          }else{
            this.$message.error("无权操作!");
          }
      },
    },
    created:function () {
      this.init();//表格初始化
    }
  }
</script>
<style>
    #orderlog .circle_con{
      position: absolute;
      z-index: 10000;
      background-color: rgba(255,255,255,.9);
      margin: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
    }
    #orderlog .circle{
      top: 30%;
      left: 50%;
      transform: translate(-50%);
      -webkit-transform: translate(-50%);
    }
</style>
