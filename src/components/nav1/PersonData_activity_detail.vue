<template>
  <section id="activity_detail">
    <!--表格-->
    <h2>活动信息</h2>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      max-height="600"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="活动名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="shop_name"
        label="活动店铺"
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
        prop="sign_time"
        label="报名时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="act_time"
        label="活动时间"
        align="center"
      >
      </el-table-column>
    </el-table>
    <hr style="height: 30px;background-color: #F2F4F5;border: 0;margin: 30px 0">
    <el-row style="text-align: center;" v-if="total">
        <el-col :span="6">
          <div class="tag"><span class="title">访客数</span></div>
          <div class="tag"><span class="con">{{total.uv}}</span></div>
        </el-col>
        <el-col :span="6">
          <div class="tag"><span class="title">订单数</span></div>
          <div class="tag"><span class="con">{{total.order_num}}</span></div>
        </el-col>
        <el-col :span="6">
          <div class="tag"><span class="title">成交件数</span></div>
          <div class="tag"><span class="con">{{total.volume}}</span></div>
        </el-col>
        <el-col :span="6">
          <div class="tag"><span class="title">总销售额</span></div>
          <div class="tag"><span class="con">{{total.amount}}</span></div>
        </el-col>
    </el-row>
    <hr style="height: 30px;background-color: #F2F4F5;border: 0;margin: 30px 0">
        <el-row>
          <el-col :span="14">
            <el-table
              v-loading="loading"
              :data="visit"
              stripe
              max-height="600"
              style="width: 100%">
              <el-table-column
                prop="type"
                label="访客类型"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="visitor"
                label="访客数量"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="sp"
                label="比重"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="atv"
                label="客单价"
                align="center"
              >
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="10"  style="height: 144px;background-color: #fff">
            <el-row style="text-align: center;" v-if="rate">
              <el-col :span="8">
                <div class="tag"><span class="title">平均客单价</span></div>
                <div class="tag"><span class="con">{{rate.a_atv}}</span></div>
              </el-col>
              <el-col :span="8">
                <div class="tag"><span class="title">转化率</span></div>
                <div class="tag"><span class="con">{{rate.transfer}}%</span></div>
              </el-col>
              <el-col :span="8">
                <div class="tag"><span class="title">退款率</span></div>
                <div class="tag"><span class="con">{{rate.refund_rate}}%</span></div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
    <hr style="height: 30px;background-color: #F2F4F5;border: 0;margin: 30px 0">
    <!--表格3-->
    <h2>商品信息</h2>
    <el-table
      v-loading="loading"
      :data="pro_tableData"
      stripe
      max-height="600"
      style="width: 100%">
      <el-table-column
        prop="goodsId"
        label="商品ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="thumb"
        label="商品图片"
        align="center"
      >
        <template slot-scope="scope">
          <img :src="scope.row.thumb" style="width: 40px">
        </template>
      </el-table-column>
      <el-table-column
        prop="zh"
        label="二级类目"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="couponPrice"
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
        prop="count"
        label="报名数量"
        align="center"
      >
      </el-table-column>
    </el-table>

  </section>
</template>

<script>
  import qs from "qs"
  export default{
    data(){
      return{
        loading:false,
        tableData: [],//活动表
        pro_tableData:[],//商品表
        total:null,
        visit:[],
        rate:null,
      }
    },
    methods:{
        init(){
          let that=this;
          that.loading=true;
          let data={
            token_secret:sessionStorage.getItem("token_secret"),
            active_id:sessionStorage.getItem("activeID")
          };
          this.$ajax.post("https://www.jnife.com/admin/statistic/getActivityDetail",qs.stringify(data))
            .then(function (res) {
              if(res.data.code==100000){
                that.tableData=res.data.object[0].activity_info;
                that.pro_tableData=res.data.object[0].goods;
                that.total=res.data.object[0].total[0];
                that.rate=res.data.object[0].rate[0];
                let temp=res.data.object[0].visit[0];
                let obj1={
                    type:"新访客",
                    visitor:temp.new_visitor,
                    sp:temp.uv_new+"%",
                    atv:temp.n_atv
                };
                let obj2={
                  type:"老顾客",
                  visitor:temp.old_visitor,
                  sp:temp.customer+"%",
                  atv:temp.o_atv
                };
                that.visit.push(obj1);
                that.visit.push(obj2);
                that.loading=false;
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
<style >
  #activity_detail .tag{
    margin-top: 20px;
  }
  #activity_detail .tag>.title{
    font-size:18px;
    color:rgba(102,102,102,1);
  }
  #activity_detail .tag>.con{
    font-size:28px;
    color:rgba(113,200,255,1);
  }
</style>
