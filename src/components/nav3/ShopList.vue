<template>
  <section  id="shoplist">
    <!--表格-->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      max-height="600"
      style="width: 100%">
      <el-table-column
        prop="LOGO"
        label="LOGO"
        align="center"
      >
          <template slot-scope="scope">
            <img :src="scope.row.LOGO" style="width: 40px">
          </template>
      </el-table-column>
      <el-table-column
        prop="project_id"
        label="品牌"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="店铺名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="cate"
        label="主营类目"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="session"
        label="活动场次"
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
        prop="person"
        label="负责人"
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
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog title="店铺修改" :visible.sync="dialogFormVisible">
      <el-form ref="NewShopForm" :model="form"  :rules="rules" label-width="80px" label-position="right" style="width:100%;min-width:600px;">
        <el-form-item label="所属品牌" prop="project_id" v-if="brand">
          <el-select v-model="form.project_id" placeholder="请选择品牌">
            <el-option v-for="item in brand"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主营类目" prop="cate_id">
          <!--<el-cascader-->
            <!--v-if="options"-->
            <!--placeholder="请选择类目"-->
            <!--expand-trigger="hover"-->
            <!--:show-all-levels="false"-->
            <!--:options="options"-->
            <!--v-model="form.cate_id"-->
          <!--&gt;-->
          <!--</el-cascader>-->
          <el-select v-model="form.cate_id" placeholder="请选择类目" v-if="options">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺名称" prop="shop_name">
          <el-input v-model="form.shop_name" placeholder="请输入店铺名称"  style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="操作人员" prop="admin_id">
          <el-select v-model="form.admin_id" placeholder="请选择操作人员" v-if="adminList">
            <el-option v-for="item in adminList"
                       :key="item.id"
                       :label="item.nickname"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约日期" prop="sign_time">
          <el-date-picker type="date" placeholder="签约日期" v-model="form.sign_time" ></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="end_time">
          <el-date-picker type="date" placeholder="终止日期" v-model="form.end_time" ></el-date-picker>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            ref="upLoad"
            :auto-upload="false"
            :on-change="onChange"
            action="nothing"
            class="avatar-uploader"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('NewShopForm')">保 存</el-button>
          <el-button @click.native="resetForm('NewShopForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import Bus from "../../bus.js"
  export default{
    data(){
      return{
        loading:false,
        dialogFormVisible:false,
        id:'',//店铺ID
        imageUrl: '',
        brand:null,
        adminList:null,
        options:[],
        form: {
          project_id: '',
          cate_id: '',
          shop_name:'',
          admin_id:'',
          sign_time: '',
          end_time: '',
          file:''
        },
        rules: {
          project_id: [
            { required: true, message: '请选择品牌', trigger: 'change' },
          ],
          cate_id: [
            { required: true, message: '请选择类目', trigger: 'change' }
          ],
          shop_name: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' }
          ],
          admin_id: [
            { required: true, message: '请选择操作人员', trigger: 'change' }
          ],
          sign_time: [
            { type: 'date', required: true, message: '请选择签约日期', trigger: 'change' }
          ],
          end_time: [
            { type: 'date', required: true, message: '请选择终止日期', trigger: 'change' }
          ]
        },
        tableData: [
//          {
//            LOGO: "https://zhaoyuyuntest.oss-cn-hangzhou.aliyuncs.com/Goods/5a30e54877522.jpg",
//            project_id:'淘宝',
//            name: '王小虎',
//            cate: '上海市普陀区金沙江路 1518 弄',
//            session:'2016-1',
//            money: '上海市普陀区金沙江路 1518 弄',
//            person: '王小虎',
//          },
        ]
      }
    },
    methods:{
        init(){
          let that=this;
          that.tableData=[];
          that.loading=true;
          this.$ajax.post("https://www.jnife.com/Admin/shop/shop_list")
            .then(function (res) {
              if(res.data.code==100000){
                let data=res.data.shop;
                for (let i=0,len=data.length;i<len;i++){
                  let obj={};
                  obj.id=data[i].id;
                  obj.LOGO=data[i].shop_logo;
                  obj.project_id=data[i].project;
                  obj.name=data[i].shop_name;
                  obj.session=data[i].act_num;
                  obj.cate=data[i].cate;
                  obj.person=data[i].admin;
                  obj.money=data[i].amount;
                  that.tableData.push(obj);
                }
                that.loading=false;
              }
            })
            .catch(function (err) {

            });

        },
        view(row){
            this.$router.push("ShopDetail");
            sessionStorage.setItem("shopID",row.id);
        },
        edit(row){
            this.dialogFormVisible=true;
            let that=this;
            this.id=row.id;
            this.$ajax.get("https://www.jnife.com/Admin/shop/shop_edit?id="+this.id)
              .then(function (res) {
                  if(res.data.code==100000){
                    that.form=res.data.shop.shop;
                    that.imageUrl=res.data.shop.shop.shop_logo;
                  }
              }).catch(function (err) {

            });
        },
      submitForm(formName) {
        let that=this;
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
            let formData=new FormData();
            formData.append("id",this.id);
            formData.append("project_id",this.form.project_id);
            formData.append("cate_id",this.form.cate_id);
            formData.append("shop_name",this.form.shop_name);
            formData.append("admin_id",this.form.admin_id);
            formData.append("sign_time",(new Date(this.form.sign_time)).getTime()/1000);
            formData.append("end_time",(new Date(this.form.end_time)).getTime()/1000);
            formData.append("shop_logo",this.form.file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };
            this.$ajax.post("https://www.jnife.com/index.php/admin/shop/shop_edit",formData,config)
              .then(function (res) {
                if(res.data.code==100000){
                  that.$message.success('恭喜，店铺修改成功');
                  that.resetForm("NewShopForm");
                  that.dialogFormVisible=false;
                  that.init();
                }
              }).catch(function () {

            });
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.imageUrl='';
      },
      onChange(file){
        this.form.file=file.raw;
        this.imgLimit(this.form.file,500,500);
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
    created:function () {
        let that=this;
        this.init();//表格初始化
        //下拉选项初始化
      this.$ajax.get("https://www.jnife.com/index.php/admin/shop/shop_add")
        .then(function (res) {
          if(res.data.code==100000){
            that.options=res.data.data.cateList;
            that.brand=res.data.data.brand;
            that.adminList=res.data.data.adminList;
          }
        })
        .catch(function (err) {

        });

    }
  }
</script>
<style >

  #shoplist .el-dialog{
    width: 30%;
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
