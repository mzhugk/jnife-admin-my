<template>
    <section id="NewActive"  v-loading="loading">
        <el-form ref="NewActiveForm" :model="form" :inline="true" :rules="rules" label-width="91px" label-position="right" style="width:100%;min-width:1000px;">
            <h2>活动信息录入</h2>
            <div>
                <el-form-item label="报名时间" prop="sign_time">
                  <el-date-picker type="date" placeholder="报名时间" v-model="form.sign_time" ></el-date-picker>
                </el-form-item>
                <el-form-item label="活动店铺" prop="shop_id" v-if="shop">
                  <el-select v-model="form.shop_id" placeholder="请选择活动店铺">
                    <el-option v-for="item in shop"
                               :key="item.id"
                               :label="item.shop_name"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="活动名称" prop="title">
                    <el-input v-model="form.title" placeholder="请输入活动名称"  style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="活动平台" prop="platform_id" v-if="platformList">
                    <el-select v-model="form.platform_id" placeholder="请选择活动平台" >
                        <el-option v-for="item in platformList"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="活动开始" prop="start_time">
                    <el-date-picker type="date" placeholder="开始日期" v-model="form.start_time" ></el-date-picker>
                </el-form-item>
                <el-form-item label="活动结束" prop="end_time">
                    <el-date-picker type="date" placeholder="结束日期" v-model="form.end_time" ></el-date-picker>
                </el-form-item>
            </div>
            <h2>商品信息录入</h2>
            <el-button type="text"  @click.native="proNew()">新增商品信息</el-button>
            <el-table
                    :data="tableData"
                    stripe
                    max-height="600"
                    style="width: 100%">
                <el-table-column
                        prop="cate"
                        label="二级类目"
                        align="center"
                        >
                </el-table-column>
                <el-table-column
                        prop="ID"
                        label="商品ID"
                        align="center"
                       >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="商品名称"
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
                        prop="num"
                        label="报名数量"
                        align="center"
                        >
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="活动价"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="cost"
                        label="货值"
                        align="center"
                        >
                </el-table-column>
                <el-table-column
                  prop="handle"
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="proEdit(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="proDel(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <h2>活动数据录入</h2>
            <div>
                <el-form-item label="访客数" prop="uv">
                    <el-input v-model="form.uv" placeholder="请输入访客数"  ></el-input>
                </el-form-item>
                <el-form-item label="新客客单价" prop="n_atv">
                    <el-input v-model="form.n_atv" placeholder="请输入新客客单价"  ></el-input>
                </el-form-item>
                <el-form-item label="成交件数" prop="volume">
                    <el-input v-model="form.volume" placeholder="请输入成交件数"  ></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="新顾客数" prop="uv_new">
                    <el-input v-model="form.uv_new" placeholder="请输入新顾客数"  ></el-input>
                </el-form-item>
                <el-form-item label="老客客单价" prop="o_atv">
                    <el-input v-model="form.o_atv" placeholder="请输入老客客单价"  ></el-input>
                </el-form-item>
                <el-form-item label="总销售额" prop="amount">
                    <el-input v-model="form.amount" placeholder="请输入总销售额"  ></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="新客占比" prop="n_cust_rate">
                    <el-input v-model="n_cust_rate" placeholder="请输入新客占比"  ></el-input>
                </el-form-item>
                <el-form-item label="平均客单价" prop="a_atv">
                    <el-input v-model="a_atv" placeholder="请输入平均客单价"  ></el-input>
                </el-form-item>
                <el-form-item label="订单退款率" prop="refund_rate">
                    <el-input v-model="form.refund_rate" placeholder="请输入订单退款率"  ></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="老访客数" prop="customer">
                    <el-input v-model="customer" placeholder="请输入老访客数" ></el-input>
                </el-form-item>
                <el-form-item label="订单数" prop="order_num">
                    <el-input v-model="form.order_num" placeholder="请输入订单数"  ></el-input>
                </el-form-item>
                <el-form-item label="活动链接" prop="activity_src">
                    <el-input v-model="form.activity_src" placeholder="请输入活动链接"  ></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="老客占比" prop="o_cust_rate">
                    <el-input v-model="o_cust_rate" placeholder="请输入老客占比"  ></el-input>
                </el-form-item>
                <el-form-item label="转化率" prop="transfer">
                    <el-input v-model="transfer" placeholder="请输入转化率"  ></el-input>
                </el-form-item>
                <el-form-item label="宝贝链接" prop="product_src">
                    <el-input v-model="form.product_src" placeholder="请输入宝贝链接"  ></el-input>
                </el-form-item>
            </div>
            <div style="text-align: center">
                <el-form-item>
                    <el-button type="primary" @click.native="submitForm('NewActiveForm')">保 存</el-button>
                    <el-button @click.native="resetForm('NewActiveForm')">重 置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <!--新增商品信息-->
        <el-dialog title="商品信息录入" :visible.sync="dialogFormVisible">
            <el-form  ref="goodsForm" :model="goodsForm" :inline="true" :rules="rules" label-width="90px" label-position="right">
                <el-form-item label="二级类目" prop="secondSort" v-if="options">
                    <el-cascader
                      style="width: 202px"
                      placeholder="请选择二级类目"
                      expand-trigger="hover"
                      :show-all-levels="false"
                      :options="options"
                      v-model="goodsForm.secondSort"
                      >
                    </el-cascader>
                </el-form-item>
                <el-form-item label="报名数量" prop="count">
                    <el-input v-model="goodsForm.count" placeholder="请输入报名数量" ></el-input>
                </el-form-item>
                <el-form-item label="商品ID" prop="goodsId">
                    <el-input v-model="goodsForm.goodsId" placeholder="请输入商品ID" ></el-input>
                </el-form-item>
                <el-form-item label="活动价" prop="couponPrice">
                    <el-input v-model="goodsForm.couponPrice" placeholder="请输入活动价" ></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="goodsName">
                    <el-input v-model="goodsForm.goodsName" placeholder="请输入商品名称" ></el-input>
                </el-form-item>
                <el-form-item label="货值" prop="cost">
                    <el-input v-model="goodsForm.cost" placeholder="请输入货值" ></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                            class="avatar-uploader"
                            action="nothing"
                            :auto-upload="false"
                            :on-change="onChange"
                            :show-file-list="false"
                            >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div  style="text-align: center">
                <el-button type="primary" @click="submitGoodsForm('goodsForm')" :status="status">确 定</el-button>
                <el-button @click="resetForm('goodsForm')">重 置</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
  import qs from "qs"
  export default {
      data() {
          return {
              loading:false,
              imageUrl:'',
              dialogFormVisible: false,
//              newProject:[],//新增商品信息的ID放这里
              activeID:null,//活动ID
              id:null,//编辑商品信息时的ID
              status:0,//商品信息录入弹窗的确定按钮
              shop:null,
              platformList:null,
              options:[],
              goodsForm:{
                  secondSort:'',
                  count:'',
                  goodsId:'',
                  couponPrice:'',
                  goodsName:'',
                  cost:'',
                  file:''
              },
              form: {
                  sign_time:'',
                  shop_id:'',
                  title:'',
                  platform_id:'',
                  start_time:'',
                  end_time:'',
                  uv:'',
                  n_atv:'',
                  volume:'',
                  uv_new:'',
                  o_atv:'',
                  amount:'',
                  refund_rate:'',
                  order_num:'',
                  activity_src:'',
                  product_src:''
              },
              rules: {
                  sign_time:[{ type: 'date', required: true, message: '请选择报名时间', trigger: 'change' }],
                  shop_id:[{ required: true, message: '请选择活动店铺', trigger: 'change' }],
                  title:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                  platform_id:[{ required: true, message: '请选择活动平台', trigger: 'change' }],
                  start_time:[{ type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }],
                  end_time:[{ type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }],
                  uv:[{ required: true, message: '请输入访客数', trigger: 'blur' }],
                  n_atv:[{ required: true, message: '请输入新客客单价', trigger: 'blur' }],
                  volume:[{ required: true, message: '请输入成交件数', trigger: 'blur' }],
                  uv_new:[{ required: true, message: '请输入新顾客数', trigger: 'blur' }],
                  o_atv:[{ required: true, message: '请输入老客客单价', trigger: 'blur' }],
                  amount:[{ required: true, message: '请输入总销售额', trigger: 'blur' }],
//                  n_cust_rate:[{ required: true, message: '请输入新客占比', trigger: 'blur' }],
//                  a_atv:[{ required: true, message: '请输入平均客单价', trigger: 'blur' }],
                  refund_rate:[{ required: true, message: '请输入订单退款率', trigger: 'blur' }],
//                  customer:[{ required: true, message: '请输入老访客数', trigger: 'blur' }],
                  order_num:[{ required: true, message: '请输入订单数', trigger: 'blur' }],
                  activity_src:[{ required: true, message: '请输入活动链接', trigger: 'blur' }],
//                  o_cust_rate:[{ required: true, message: '请输入老客占比', trigger: 'blur' }],
//                  transfer:[{ required: true, message: '请输入转化率', trigger: 'blur' }],
                  product_src:[{ required: true, message: '请输入宝贝链接', trigger: 'blur' }],
                  secondSort:[{ required: true, message: '请选择二级类目', trigger: 'change' }],
                  count:[{ required: true, message: '请输入报名数量', trigger: 'blur' }],
                  goodsId:[{ required: true, message: '请输入商品ID', trigger: 'blur' }],
                  couponPrice:[{ required: true, message: '请输入活动价', trigger: 'blur' }],
                  goodsName:[{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                  cost:[{ required: true, message: '请输入货值', trigger: 'blur' }]
              },
              tableData: []
          }
      },
      methods: {
          submitForm(formName) {
//              this.$refs[formName].validate((valid) => {
//                  if (valid) {
//                      转换时间戳
                    let that=this;
                    let {...formCopy}=this.form;
                    let date1=new Date(formCopy.sign_time);
                    let date2=new Date(formCopy.start_time);
                    let date3=new Date(formCopy.end_time);

                    formCopy.sign_time=(new Date(date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate())).getTime()/1000;
                    formCopy.start_time=(new Date(date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate())).getTime()/1000;
                    formCopy.end_time=(new Date(date3.getFullYear() + '-' + (date3.getMonth() + 1) + '-' + date3.getDate())).getTime()/1000;
                    formCopy.customer=this.customer;
                    formCopy.n_cust_rate=this.n_cust_rate;
                    formCopy.o_cust_rate=this.o_cust_rate;
                    formCopy.a_atv=this.a_atv;
                    formCopy.transfer=this.transfer;
                    formCopy.id=this.activeID;

                    this.$ajax.post("https://www.jnife.com/admin/activity/activity_edit",qs.stringify(formCopy))
                      .then(function (res) {
                          if(res.data.code==100000){
                              that.$message.success("恭喜，活动修改成功");
//                              that.tableData=[];
//                              that.resetForm("NewActiveForm");
                              that.$router.push("ActiveList");
                          }
                      }).catch(function (err) {

                    });
//                  } else {
//                      console.log('error submit!!');
//                      return false;
//                  }
//              });
          },
          submitGoodsForm(formName) {
            let that=this;
            if(this.status==0){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  let formData=new FormData();
                  formData.append("secondSort",this.goodsForm.secondSort[2]);
                  formData.append("count",this.goodsForm.count);
                  formData.append("goodsId",this.goodsForm.goodsId);
                  formData.append("couponPrice",this.goodsForm.couponPrice);
                  formData.append("goodsName",this.goodsForm.goodsName);
                  formData.append("cost",this.goodsForm.cost);
                  formData.append("thumb",this.goodsForm.file);
                  formData.append("from",this.activeID);//修改中的新增商品
                  let config = {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  };
                  this.$ajax.post("https://www.jnife.com/index.php/admin/activity/addProduct",formData,config)
                    .then(function (res) {
                      if(res.data.code==100000){
                        that.$message.success('恭喜，商品信息录入成功');
                        let obj={};
////                      obj.cate=that.goodsForm.secondSort[2];
                        obj.cate=res.data.object[0].secondSort;
                        obj.ID=that.goodsForm.goodsId;
                        obj.name=that.goodsForm.goodsName;
                        obj.image=URL.createObjectURL(that.goodsForm.file);
                        obj.num=that.goodsForm.count;
                        obj.price=that.goodsForm.couponPrice;
                        obj.cost=that.goodsForm.cost;
                        obj.id=res.data.object[0].pid;
////                        that.newProject.push(res.data.object[0].pid);//保存新增商品ID
                        that.tableData.push(obj);
                        that.resetForm("goodsForm");
                        that.dialogFormVisible=false;
                      }
                    }).catch(function (err) {

                  });
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }else if(this.status==1){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  let formData=new FormData();
                  formData.append("secondSort",this.goodsForm.secondSort[2]);
                  formData.append("count",this.goodsForm.count);
                  formData.append("goodsId",this.goodsForm.goodsId);
                  formData.append("couponPrice",this.goodsForm.couponPrice);
                  formData.append("goodsName",this.goodsForm.goodsName);
                  formData.append("cost",this.goodsForm.cost);
                  formData.append("thumb",this.goodsForm.file);
                  formData.append("id",this.id);
                  formData.append("activeID",this.activeID);
                  let config = {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  };
                  this.$ajax.post("https://www.jnife.com/index.php/admin/activity/goodsEdit",formData,config)
                    .then(function (res) {
                      if(res.data.code==100000){
                        that.$message.success('恭喜，商品信息修改成功');
//                        let obj={};
////                      obj.cate=that.goodsForm.secondSort[2];
//                        obj.cate=res.data.object[0].secondSort;
//                        obj.ID=that.goodsForm.goodsId;
//                        obj.name=that.goodsForm.goodsName;
//                        obj.image=URL.createObjectURL(that.goodsForm.file);
//                        obj.num=that.goodsForm.count;
//                        obj.price=that.goodsForm.couponPrice;
//                        obj.cost=that.goodsForm.cost;
//                        that.newProject.push(res.data.object[0].pid);
//                        that.tableData.push(obj);
                        that.tableData=[];
                        that.tableData=res.data.shopData;
                        that.resetForm("goodsForm");
                        that.dialogFormVisible=false;
                      }
                    }).catch(function (err) {

                  });
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }

        },
        proNew(){
          this.dialogFormVisible = true;
          this.status=0;
          this.resetForm('goodsForm');
        },
        proEdit(row){
          this.status=1;
          let that=this;
          this.dialogFormVisible=true;
          this.id=row.id;
          this.$ajax.get("https://www.jnife.com/admin/activity/goodsEdit?id="+this.id)
            .then(function (res) {
              if(res.data.code==100000){
                that.goodsForm=res.data.good;
                that.imageUrl=res.data.good.imageUrl;
              }
            })
            .catch(function (err) {

            });
        },
        proDel(row){
          let that=this;
          this.id=row.id;
          this.$confirm('确认删除吗?', '提示', {
//					type: 'warning'
          }).then(() => {
            this.$ajax.get("https://www.jnife.com/admin/activity/goodsDelete?id="+this.id+"&activeID="+this.activeID)
              .then(function (res) {
                if(res.data.code==100000){
                    that.$message.success("该商品删除成功");
                    that.tableData=[];
                    that.tableData=res.data.object[0];
                }
              })
              .catch(function (err) {

              });
          }).catch(() => {

          });

        },
          resetForm(formName){
              this.$refs[formName].resetFields();
              this.imageUrl='';
          },
         onChange(file){
            this.goodsForm.file=file.raw;
            this.imgLimit(this.goodsForm.file,800,800);
         },
         imgLimit(file,x,y){//img上传限制
          let that=this;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            let res = e.target.result;
            let width,height;
            let image = new Image();
            image.src = res;
            image.onload = function() {
              width=this.width;
              height=this.height;
              if(width!== x && height!== y){
                that.$message.error(file.name+"尺寸必须为"+x+'x'+y+"像素");
              }else if(width!== x && height== y){
                that.$message.error(file.name+"尺寸宽必须为"+x+"像素");
              }else if(height!== y&& width== x){
                that.$message.error(file.name+"尺寸高必须为"+y+"像素");
              }else {
                that.imageUrl = URL.createObjectURL(file);
              }
            };
          };
        },
      },
      computed:{
        customer:function () {
          return   (this.form.uv-this.form.uv_new)==0?null:(this.form.uv-this.form.uv_new);
        },
        n_cust_rate:function () {
          return isNaN((this.form.uv_new/this.form.uv*100).toFixed(2))?null:(this.form.uv_new/this.form.uv*100).toFixed(2)+"%";
        },
        o_cust_rate:function () {
          return isNaN((this.customer/this.form.uv*100).toFixed(2))?null:(this.customer/this.form.uv*100).toFixed(2)+"%";
        },
        a_atv:function () {
          return isNaN((parseFloat(this.form.n_atv)+parseFloat(this.form.o_atv)))?null:(parseFloat(this.form.n_atv)+parseFloat(this.form.o_atv))/2
        },
        transfer:function () {
          return isNaN((this.form.order_num/this.form.uv*100).toFixed(2))?null:(this.form.order_num/this.form.uv*100).toFixed(2)+"%"
        },
      },
      created:function () {
          let that=this;
          that.loading=true;
          this.$ajax.get("https://www.jnife.com/index.php/admin/activity/activity_add")//活动店铺和活动平台下拉框选项
              .then(function (res) {
                if(res.data.code==100000){
                    that.shop=res.data.actData.shop;
                    that.platformList=res.data.actData.platformList;
                }
              })
              .catch(function (err) {

              });

            this.$ajax.get("https://www.jnife.com/index.php/admin/shop/shop_add")//二级类目下拉框
              .then(function (res) {
                if(res.data.code==100000){
                  that.options=res.data.data.three_cateList;
                }
              })
              .catch(function (err) {

              });
        this.activeID=sessionStorage.getItem('activeID');
        this.$ajax.get("https://www.jnife.com/admin/activity/activity_edit?id="+this.activeID)//传id,获取所有数据
          .then(function (res) {
            if(res.data.code==100000){
              that.form=res.data.actData.activity;
              that.tableData=res.data.actData.goods;
              that.loading=false;
            }
          })
          .catch(function (err) {

          });
      }
  }

</script>

<style>
    #NewActive .el-dialog{
        width: 35%;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
