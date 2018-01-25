<template>
  <section id="ProjectList">
    <!--新增项目-->
    <el-button type="primary"  @click.native="newProject()">新增项目</el-button>
    <!--表格-->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      max-height="600"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="项目名称"
        align="center"
      >
      </el-table-column>
      </el-table-column>
      <el-table-column
        prop="baseCharge"
        label="基础服务费"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="skillCharge"
        label="技术服务费(%)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="signTime"
        label="签约时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="截止时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button  @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增项目-->
    <el-dialog title="项目信息录入" :visible.sync="dialogFormVisible">
      <el-form  ref="projectForm" :model="projectForm"  :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectForm.name" placeholder="请输入平台名称" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="基础服务费" prop="baseCharge">
          <el-input v-model="projectForm.baseCharge" placeholder="请输入基础服务费" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="技术服务费" prop="skillCharge">
          <el-input v-model="projectForm.skillCharge" placeholder="请输入技术服务费" style="width:280px;"></el-input> %
        </el-form-item>
        <el-form-item label="签约日期" prop="signTime">
          <el-date-picker type="date" placeholder="签约日期" v-model="projectForm.signTime" ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" prop="endTime">
          <el-date-picker type="date" placeholder="截止日期" v-model="projectForm.endTime" ></el-date-picker>
        </el-form-item>
      </el-form>
      <div  style="text-align: center">
        <el-button type="primary" @click="submitprojectForm('projectForm')"  :status="status">确 定</el-button>
        <el-button @click="resetForm('projectForm')" v-if="!status">重 置</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import qs from "qs"
  export default{
    data(){
      return{
        loading:false,
        dialogFormVisible:false,
        status:0,//0表示初次提交  1表示再次编辑
        projectForm:{
          name:'',
          baseCharge:'',
          skillCharge:'',
          signTime:'',
          endTime:'',
        },
        rules: {
          name:[{ required: true, message: '请输入平台名称', trigger: 'blur' }],
          baseCharge:[{ required: true, message: '请输入基础服务费', trigger: 'blur' }],
          skillCharge:[{ required: true, message: '请输入技术服务费', trigger: 'blur' }],
          signTime:[{ type: 'date', required: true, message: '请选择签约时间', trigger: 'change' }],
          endTime:[{ type: 'date', required: true, message: '请选择截止时间', trigger: 'change' }],
        },
        tableData: [
//          {
//            name: "1221",
//            signTime: '王小虎',
//            endTime: '王小虎',
//            baseCharge: '上海市普陀区金沙江路 1518 弄',
//            skillCharge: '王小虎',
//          },
        ]
      }
    },
    methods:{
      submitprojectForm(formName) {
        switch (this.status){
          case 0:
            this.$refs[formName].validate((valid) => {
              if (valid) {
//                      转换时间戳
                let that=this;
                let {...formCopy}=this.projectForm;
                let date1=new Date(formCopy.signTime);
                let date2=new Date(formCopy.endTime);

                formCopy.sign_start=(new Date(date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate())).getTime()/1000;
                formCopy.sign_end=(new Date(date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate())).getTime()/1000;
                formCopy.base_fee=this.projectForm.baseCharge;
                formCopy.rate=this.projectForm.skillCharge;
                formCopy.name=this.projectForm.name;

                this.$ajax.post("https://www.jnife.com/Admin/project/project_add",qs.stringify(formCopy))
                  .then(function (res) {
                    if(res.data.code==100000){
                      that.$message.success("恭喜，平台创建成功");
                      that.resetForm("projectForm");
                      that.dialogFormVisible=false;
                      that.init();
                    }
                  }).catch(function (err) {

                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
            break;
          case 1:
//            this.$refs[formName].validate((valid) => {
//              if (valid) {
//                      转换时间戳
                let that=this;
                let {...formCopy}=this.projectForm;
//                let date1=new Date(formCopy.signTime);
//                let date2=new Date(formCopy.endTime);
//                console.log(formCopy.signTime);"2017-12-14"
                formCopy.sign_start=(new Date(formCopy.signTime)).getTime()/1000;
                formCopy.sign_end=(new Date(formCopy.endTime)).getTime()/1000;
                formCopy.base_fee=this.projectForm.baseCharge;
                formCopy.rate=this.projectForm.skillCharge;
                formCopy.name=this.projectForm.name;

                this.$ajax.post("https://www.jnife.com/Admin/project/project_edit",qs.stringify(formCopy))
                  .then(function (res) {
                    if(res.data.code==100000){
                      that.$message.success("恭喜，平台修改成功");
                      that.dialogFormVisible=false;
                      that.init();
                    }
                  }).catch(function (err) {

                });
//              } else {
//                console.log('error submit!!');
//                return false;
//              }
//            });

        }

      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      init(){
        let that=this;
        that.tableData=[];
        that.loading=true;
        this.$ajax.post("https://www.jnife.com/Admin/project/project_list")
          .then(function (res) {
            if(res.data.code==100000){
              let data=res.data.data;
              for (let i=0,len=data.length;i<len;i++){
                let obj={};
                obj.id=data[i].id;
                obj.name=data[i].name;
                obj.signTime=new Date(parseInt(data[i].sign_start) * 1000).toLocaleDateString().replace(/年|月/g, "-").replace(/日/g, " ");
                obj.endTime=new Date(parseInt(data[i].sign_end) * 1000).toLocaleDateString().replace(/年|月/g, "-").replace(/日/g, " ");
                obj.baseCharge=data[i].base_fee;
                obj.skillCharge=data[i].rate;
                that.tableData.push(obj);
              }
              that.loading=false;
            }
          })
          .catch(function (err) {

          });
      },
      newProject(){
        this.dialogFormVisible = true;
        this.status=0;
        this.projectForm={
          name:'',
          baseCharge:'',
          skillCharge:'',
          signTime:'',
          endTime:'',
        };
      },
      edit(row){
          this.dialogFormVisible=true;
          let {...rowCopy}=row;
          this.projectForm=rowCopy;
          this.status=1;
      },

    },
    created:function () {
      this.init();
    }
  }
</script>
<style>
  #ProjectList .el-dialog{
    width: 35%;
  }
</style>
