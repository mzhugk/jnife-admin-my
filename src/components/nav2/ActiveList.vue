<template>
	<section>
        <el-form ref="searchForm" :model="form" :inline="true" style="width:100%;">
            <el-form-item >
              <el-date-picker type="date" placeholder="请选择开始时间" v-model="form.start_time" @change="search"></el-date-picker>
            </el-form-item>
            <el-form-item >
                <span>—</span>
            </el-form-item>
            <el-form-item >
              <el-date-picker type="date" placeholder="请选择截止时间" v-model="form.over_time" @change="search"></el-date-picker>
            </el-form-item>
            <el-form-item >
              <el-select v-model="form.shop_id" placeholder="请选择店铺" v-if="shop" @change="search" clearable>
                <el-option v-for="item in shop"
                           :key="item.id"
                           :label="item.shop_name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-select v-model="form.platform_id" placeholder="请选择平台" v-if="platformList" @change="search" clearable>
                <el-option v-for="item in platformList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.title" placeholder="请输入活动名称" @change="search" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="search">搜 索</el-button>
            </el-form-item>
        </el-form>
        <!--表格-->
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe

          style="width: 100%">
          <el-table-column
            prop="num"
            label="编号"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="活动名称"
            align="center"
           >
          </el-table-column>
          <el-table-column
            prop="shop"
            label="活动店铺"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="image"
            label="商品图片"
            align="center"
           >
              <template slot-scope="scope">
                <img :src="scope.row.image" style="width: 40px">
              </template>
          </el-table-column>
          <el-table-column
            prop="cate"
            label="二级类目"
            align="center"
           >
          </el-table-column>
          <el-table-column
            prop="platform"
            label="活动平台"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="开团时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="money"
            label="总销售额"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="handle"
            label="操作"
            align="center"
          >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
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
                shop:null,
                platformList:null,
                form:{
                  start_time:'',
                  over_time:'',
                  shop_id:'',
                  platform_id:'',
                  title:''
                },
                tableData: [
//                    {
//                      num: '2016-1',
//                      name: '王小虎',
//                      shop: '上海市普陀区金沙江路 1518 弄',
//                      image:"https://zhaoyuyuntest.oss-cn-hangzhou.aliyuncs.com/Goods/5a30e54877522.jpg",
//                      cate: '王小虎',
//                      platform: '上海市普陀区金沙江路 1518 弄',
//                      time: '王小虎',
//                      money: '王小虎',
//                  }
                ]
            }
        },
        methods:{
            handleCurrentChange(val) {
              let that=this;
              let {...formCopy}=this.form;
//              转成时间戳
              if(formCopy.start_time){
                formCopy.start_time=new Date(formCopy.start_time.getFullYear() + '-' + (formCopy.start_time.getMonth() + 1) + '-' + formCopy.start_time.getDate()).getTime()/1000;
              }
              if(formCopy.over_time){
                formCopy.over_time=new Date(formCopy.over_time.getFullYear() + '-' + (formCopy.over_time.getMonth() + 1) + '-' + formCopy.over_time.getDate()).getTime()/1000;
              }
              formCopy.page=val;//传当前页码
              this.$ajax.post("https://www.jnife.com/admin/activity/activity_list",qs.stringify(formCopy))
                .then(function (res) {
                  if(res.data.code==100000){
                    let data=res.data.data.activity;
                    that.tableData=[];
                    for (let i=0,len=data.length;i<len;i++){
                      let obj={};
                      obj.num=data[i].id;
                      obj.name=data[i].title;
                      obj.shop=data[i].shop;
                      obj.image=data[i].p_img;
                      obj.cate=data[i].cate;
                      obj.platform=data[i].platform;
                      obj.time=new Date(parseInt(data[i].start_time) * 1000).toLocaleDateString().replace(/年|月/g, "-").replace(/日/g, " ");
                      obj.money=data[i].amount;
                      that.tableData.push(obj);
                    }
                  }
                })
                .catch(function (err) {

                });

            },
          search(){
            let that=this;
            that.loading=true;
            let {...formCopy}=this.form;
//              转成时间戳
            if(formCopy.start_time){
              formCopy.start_time=new Date(formCopy.start_time.getFullYear() + '-' + (formCopy.start_time.getMonth() + 1) + '-' + formCopy.start_time.getDate()).getTime()/1000;
            }
            if(formCopy.over_time){
              formCopy.over_time=new Date(formCopy.over_time.getFullYear() + '-' + (formCopy.over_time.getMonth() + 1) + '-' + formCopy.over_time.getDate()).getTime()/1000;
            }
            this.$ajax.post("https://www.jnife.com/Admin/Activity/activity_list",qs.stringify(formCopy))
              .then(function (res) {
                if(res.data.code==100000){
                  that.$message.success("已为您筛选结果");
                  let data=res.data.data.activity;
                  that.tableData=[];
                  for (let i=0,len=data.length;i<len;i++){
                    let obj={};
                    obj.num=data[i].id;
                    obj.name=data[i].title;
                    obj.shop=data[i].shop;
                    obj.image=data[i].p_img;
                    obj.cate=data[i].cate;
                    obj.platform=data[i].platform;
                    obj.time=new Date(parseInt(data[i].start_time) * 1000).toLocaleDateString().replace(/年|月/g, "-").replace(/日/g, " ");
                    obj.money=data[i].amount;
                    that.tableData.push(obj);
                  }
                  that.total=res.data.data.totalPage;
                  that.pageSize=res.data.data.pageSize;
                  that.loading=false;
                }
              })
              .catch(function (err) {

              })
          },

           edit(row){
                this.$router.push("/ActiveEdit");
                sessionStorage.setItem("activeID",row.num);
           }
        },
        created:function () {
          let that=this;
          that.loading=true;
          this.$ajax.post("https://www.jnife.com/Admin/Activity/activity_list")
            .then(function (res) {
              if(res.data.code==100000){
                let data=res.data.data.activity;
                  for (let i=0,len=data.length;i<len;i++){
                      let obj={};
                      obj.num=data[i].id;
                      obj.name=data[i].title;
                      obj.shop=data[i].shop;
                      obj.image=data[i].p_img;
                      obj.cate=data[i].cate;
                      obj.platform=data[i].platform;
                      obj.time=new Date(parseInt(data[i].start_time) * 1000).toLocaleDateString().replace(/年|月/g, "-").replace(/日/g, " ");
                      obj.money=data[i].amount;
                      that.tableData.push(obj);
                  }
                      that.total=res.data.data.totalPage;
                      that.pageSize=res.data.data.pageSize;
                      that.loading=false;
              }
            })
            .catch(function (err) {

            });

          this.$ajax.get("https://www.jnife.com/admin/activity/activity_add")
            .then(function (res) {
              if(res.data.code==100000){
                that.shop=res.data.actData.shop;
                that.platformList=res.data.actData.platformList;
              }
            })
            .catch(function (err) {

            });


        }
    }
</script>
