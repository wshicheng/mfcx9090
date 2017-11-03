<template>
  <div style="margin-right:20px;">
    <div id="partner_header">
      <label>
        <span>关键字</span>
          <input type="text" v-on:input='inputChange' ref="val1" placeholder="企业名称\联系人姓名\证件号码" v-model="name" class="partner_my_input1">
      </label>
      <label>
        <span>联系方式</span>
          <input type="text" v-on:input='inputChange' ref="val2"  placeholder="手机号\邮箱" v-model="phone" class="partner_my_input2">
      </label>
    </div>

    <div id="partner_data_select">
      <label>
        <span>加盟日期</span>
        <el-date-picker
        v-model="startTime"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      </label>
      <label>
        <span>至</span>
        <el-date-picker
        v-model="endTime"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      </label>

      <button class="my_btn" @click="queryInfo">查询</button>
    </div>
  
    <div id="partner_table">
      <div id="partner_add">
        <button @click="$router.push({path:'/index/partnerManager/addpartner'})">添加加盟商</button>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100% font-size:13px;"
        :empty-text="emptyText"
        >
        <!-- <el-table-column
          prop="cityPartnerId"
          label="加盟商编号"
          min-width="70">
        </el-table-column> -->
        <el-table-column
          prop="cityPartnerId"
          label="加盟商编号"
          min-width="70">
          <template scope="scope">
            <!-- $router.push('/index/partnerDetail/' +  scope.row.id + '&' + scope.row.cityPartnerId) -->
                <router-link style="color:rgb(118, 103, 233); text-decoration: none; cursor: pointer;" target='_blank' v-bind:to="{
                  path: '/index/partnerDetail/' + scope.row.id + '&' + scope.row.cityPartnerId
                }">{{scope.row.cityPartnerId}}</router-link>   
          </template>
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="企业名称"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="cityList"
          label="加盟区域"
          min-width="65">
        </el-table-column>
        <el-table-column
          prop="joinMoneys"
          label="加盟资金(元)"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="joinDays"
          label="加盟日期"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="认购车辆数"
          min-width="80">
          <template scope="scope">
              <span>{{scope.row.subscriptionNumStr}}</span>
             <!-- @click='handleRowHandle(scope.row.subscription_id)'  -->
            <!-- <span><a  class="alliance_table_allocation">分配车辆</a></span> -->
            <router-link style="color:rgb(118, 103, 233); text-decoration: none; cursor: pointer;" target='_blank' v-bind:to="{
              path: '/index/vehicleDistribution/' + scope.row.id + '&' + scope.row.cityPartnerId
            }">分配车辆</router-link>
          </template>
        </el-table-column>    
        <el-table-column
          label="操作"
          prop="del">
          <template scope="scope">
            <!-- <a style="color:#444; margin-right:10px; cursor: pointer;" @click="goDetail(scope)" title="查看">
              <i class="el-icon-document"></i>
            </a> -->
            <a href="javascript:;" @click="openEdit(scope.row, scope.$index)" style="color:#444; margin-right:10px;" title="编辑">
              <i class="el-icon-edit"></i>
            </a>
            <a href="javascript:;" @click='delPartner(scope.row.id,scope.row.cityPartnerId, scope.$index)' style="color:#444; margin-right:10px;" title="删除">
              <i class="el-icon-close"></i>
            </a>
            <!--dialog 弹窗开始-->
            <el-dialog title="编辑加盟商信息" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
             <div id="editpartner_form">
              <el-form :model="editAccount" :rules="editRules"  ref="editAccount" label-width="110px" class="demo-ruleForm">
                <el-form-item label="企业名称" prop="companyName">
                  <el-input v-model="editAccount.companyName" placeholder='长度不超过100字符'></el-input>
                </el-form-item>
                <el-form-item label="营业执照号" prop="businessLicense">
                  <el-input v-model="editAccount.businessLicense" placeholder='请输入营业执照注册号'></el-input>
                </el-form-item>
                <el-form-item label="通讯地址" prop="address">
                  <el-input v-model="editAccount.address" placeholder='请输入地址'></el-input>
                </el-form-item>
               
                <h1 class="form_table_h1">加盟与结算信息</h1>
                <div class="mutiFormSelect" v-bind:key="list.cityName" v-for="list of multiForm">
                     <el-form-item label="加盟地区"  id='selectCity' style="width: 700px;">
                       <el-input v-model="list.cityName" readonly></el-input> 
                   <!-- <el-select disabled @change="handleEditProvince"
                      v-model="editAccount.provinceName"
                      loading-text
                      placeholder="请选择省"
                      :loading="proloading">
                      <el-option
                        v-for="item in provinceList"
                        :key="item.id"
                        :value="(item.name)">
                      </el-option>
                    </el-select>
                    <el-select disabled  @change="handleEditCity"
                      v-model="editAccount.cityName"
                      placeholder="请选择城市"
                      :loading="proloading">
                      <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :value="(item.name)">
                      </el-option>
                    </el-select>
                    <el-select
                    disabled
                      @change="handleEditArea"
                      v-model="editAccount.areaName"
                      placeholder="请选择区/县"
                      :loading="proloading">
                      <el-option
                        v-for="item in areaList"
                        :key="item.id"
                        :value="item.name">
                      </el-option>
                    </el-select> -->
                </el-form-item>
                 <el-form-item label="加盟日期" >
                    <el-date-picker
                      v-model="list.joinTime"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>           
                </el-form-item>
                <el-form-item label="车辆数" >
                  <el-input v-model.number="list.subscriptionNum" placeholder='请输入车辆数(单位：/辆)'></el-input>
                </el-form-item>
                <el-form-item label="加盟资金">
                  <el-input v-model.number="list.subscriptionMoney" placeholder='请输入加盟资金（元）'></el-input>
                </el-form-item>
                <!-- <el-form-item label="加盟分成比例" prop="percent">
                  <el-input v-model="editAccount.percent" placeholder='请输入分成比例(%)'></el-input><span style="margin-left:5px;">%</span>
                </el-form-item> -->
                <el-form-item label="授权费率" >
                  <el-input v-model="list.licenseFeeRate" placeholder='请输入授权费率'></el-input><span style="margin-left:5px;">%</span>
                </el-form-item>
                <el-form-item label="结算周期" >
                  <el-radio-group v-model="list.wType">
                    <!-- <el-radio label="自然月" value='0'></el-radio>
                    <el-radio label="自然周(周一到周日)" value='1'></el-radio> -->
                     <el-radio label="自然月" value='0'></el-radio>
                      <el-radio label="自然周(周一到周日)" value='1'></el-radio>
                      <el-radio label="自定义" value='2'></el-radio>
                      <el-input class="customInput" style="display:inline;width:200px;" v-show="list.wType=='自定义'"
                        v-model="list.circleDays"
                        placeholder="输入结算周期，正数">
                      </el-input> 
                  </el-radio-group>
                </el-form-item>
                 <h1 class="form_table_h2">次周期结算上一个结算周期的收益，如果第一个周期不满一个结算周期也进行结算</h1>
                <el-form-item label="第一次结算开始日期">
                    <el-date-picker
                      v-model="list.firstDealDate"
                      :disabled='list.isEdit'
                      placeholder="选择日期">
                    </el-date-picker>           
                </el-form-item>
                </div> 
               
                <h1 class="form_table_h1">联系人信息</h1> 
                <el-form-item label="姓名" prop="userName">
                  <el-input v-model="editAccount.userName" placeholder='请输入姓名'></el-input>
                </el-form-item>
                <el-form-item label="证件类别" prop="cardType">
                  <el-select v-model="editAccount.cardType" placeholder="请选择证件类别">
                    <el-option label="居民身份证" value="居民身份证"></el-option>
                    <el-option label="护照" value="护照"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="idCard">
                  <el-input v-model="editAccount.idCard" placeholder='请输入证件号码'></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="editAccount.phone" placeholder='请输入手机号'></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editAccount.email" placeholder='请输入邮箱'></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName" v-show='add'>
                  <el-input v-model="editAccount.userName" placeholder='请输入用户名'></el-input>
                </el-form-item>
              </el-form>
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :with-credentials='true'
                  action=''
                  :http-request = 'uploadWay'
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100%;">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <h3>点击更换营业执照</h3>
                </el-upload>
                
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button class="partner_button" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="submitForm('editAccount')">确定</el-button>
                <el-button class="partner_button" @click="dialogVisible = false">取消</el-button>
              </div>
            </el-dialog>
            <!--dialog 弹窗结束-->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalItems"
        v-show="pageShow"
        >
      </el-pagination>
    </div>
    <router-view id="partnerManager_router"></router-view>
  </div>
</template>

<style>
.form_table_h2 {
  width: 100%;
  padding: 0px 0 10px 153px;
  height: 30px;
  line-height: 0px;
  font-size: 10px;
  font-weight: 400;
  color: #ddd;
}
.alliance_table_allocation {
  color: #f60;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 6px;
}

#partnerManager_router {
  width: 100%;
  height: 100%;
  background: rgba(68, 68, 68, 0.6);
  position: fixed;
  z-index: 10000000000000000;
  left: 0;
  top: 0;
}

#partner_header {
  /*width: 100%;*/
  height: 70px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-bottom: none;
}

#partner_header .partner_my_input1 {
  width: 192px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  text-indent: 10px;
  display: inline-block;
}

#partner_header .partner_my_input2 {
  width: 181px;
  border-radius: 4px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  text-indent: 10px;
  border: 1px solid #ddd;
  display: inline-block;
}

#partner_header label:nth-of-type(1) {
  height: 70px;
  width: 280px;
  line-height: 70px;
  margin-left: 30px;
  font-size: 14px;
  float: left;
}

#partner_header label:nth-of-type(1) > span {
  margin-right: 20px;
}

#partner_header label:nth-of-type(2) {
  height: 70px;
  font-size: 14px;
  width: 400px;
  line-height: 70px;
  /*margin-left: 20px;*/
  float: left;
}

#partner_header label:nth-of-type(2) > span {
  margin-right: 6px;
}

/*partner_data_select*/
#partner_data_select {
  padding: 0px 30px 20px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
}

#partner_data_select label:nth-child(1) span {
  font-size: 14px;
  margin-right: 6px;
}

#partner_data_select label:nth-child(2) span {
  font-size: 16px;
  margin: 0 25px;
}

#partner_data_select button:hover {
  color: #20a0ff;
  border-color: #20a0ff;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #bfcbd9;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #bfcbd9;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #bfcbd9;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #bfcbd9;
}

/*#partner_header button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    float: right;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 17px 33px;
    padding: 10px 15px;
    border-radius: 4px;
  }

  #partner_header button:hover {
    color: #20a0ff;
    border-color: #20a0ff;
  }*/

/*  #partner_table  */

#partner_table {
  padding: 0 30px 800px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  /* border-bottom: none; */
  margin-top: 20px;
}

#partner_table .el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #48576a;
  margin-top: 10px;
  margin-left: -5px;
  border: none;
  background: #fff;
  /* border-left: 1px solid #f3f3f5; */
}

#partner_add {
  width: 90%;
  height: 68px;
  line-height: 68px;
}

#partner_add button {
  width: 100px;
  height: 30px;
  line-height: 25px;
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  background: rgba(66, 66, 66, 0.8);
  transition: all 0.2s linear 0s;
}

#partner_add button:hover {
  background: rgb(66, 66, 66);
  cursor: pointer;
}

#partner_page {
  padding: 4px 10px 0 20px;
  padding-bottom: 100px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 230px;
}

.partner_button:nth-of-type(1) {
  background: #f87e2b;
  border: none;
  color: #fff;
  margin-left: 110px;
  margin-top: -30px;
  margin-bottom: 20px;
}

.partner_button:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

.partner_button:nth-of-type(2) {
  background: #fff;
  color: #444;
  margin-top: -30px;
  margin-bottom: 20px;
  border: 1px solid rgba(196, 196, 196, 1);
}

.partner_button:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

.partner_button {
  width: 120px;
  height: 50px;
  float: left;
  margin-top: -30px;
  margin-bottom: 20px;
}

.el-input__inner {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.el-input__inner::-webkit-input-placeholder {
  color: #ddd;
}

.el-date-table td.current:not(.disabled),
.el-date-table td.end-date,
.el-date-table td.start-date {
  background: black !important;
  color: #fff !important;
}

.el-input__inner:hover {
  border: 1px solid #bbb;
}

/**华丽的分割线**/
.demo-ruleForm {
  position: relative;
}
.avatar-uploader {
  border-radius: 6px;
  cursor: pointer;
  height: 200px;
  width: 300px;
  float: left;
  border: 1px dashed #ddd;
  position: absolute;
  text-align: center;
  right: 10%;
  top: 0;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #ccc;
  width: 10px;
  height: 10px;
  line-height: 200px;
}
.avatar-uploader h3 {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  margin-left: 14px;
  color: #ccc;
}
.form_table_h1 {
  width: 100%;
  line-height: 30px;
  padding: 10px 0 10px 3px;
  height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
.avatar {
  height: 200px;
  width: 300px;
  display: block;
  box-shadow: content-box;
  overflow: hidden;
}

.avatar img {
  width: 100%;
}
div#editpartner_form {
  position: relative;
}

.my_btn {
  width: 80px;
  float: right;
  height: 36px;
  line-height: 11px;
  color: #fff;
  /*margin-top: 10px;*/
  outline: none;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: rgba(52, 52, 67, 0.8);
}

.my_btn:hover {
  background: rgba(52, 52, 67, 0.9);
  color: #fff !important;
}
</style>

<script>
import $ from "jquery";
import request from "superagent";
import moment from "moment";
import { host } from "../../../config/index";
import { isCardNo, isPassportNo } from "../../../../utils/index.js";
export default {
  data() {
    var checkTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择加盟日期"));
      } else {
        callback();
      }
    };
    var checkSubscriptionNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写认购车辆数"));
      } else {
        request
          .post(host + "beepartner/admin/cityPartner/checkBikeNum")
          .withCredentials()
          .set({
            "content-type": "application/x-www-form-urlencoded"
          })
          .send({
            cityPartnerId: this.editAccount.cityPartnerId,
            subscriptionNum: this.editAccount.subscriptionNum
          })
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              var code = JSON.parse(res.text).resultCode;
              var message = JSON.parse(res.text).message;
              if (code === 0) {
                callback();
              } else {
                callback(new Error(message));
              }
            }
          });
      }
    };
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("证件号码不能为空"));
      }
      setTimeout(() => {
        console.log(this.editAccount.cardType);

        if (this.editAccount.cardType === "护照") {
          if (isPassportNo(value) === false) {
            callback(new Error("请输入正确的护照号"));
          } else {
            callback();
          }
        } else {
          if (isCardNo(value) === false) {
            callback(new Error("请输入正确的身份证号"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      multiForm:[],
      newFormObject:{cityName:'',cityId:'',joinTime:'',subscriptionNum:'',subscriptionMoney:'',licenseFeeRate:'',wType:'',firstDealDate:'',circleDays:''}, 
      areaShow: true,
      proloading: false,
      provinceList: [],
      cityList: [],
      areaList: [],
      emptyText: " ",
      name: "",
      phone: "",
      startTime: "",
      endTime: "",
      currentPage3: 1,
      totalItems: 1,
      pageShow: false,
      tableData: [],
      userIDID: "",
      loading: false,
      options: [
        {
          value: "0",
          label: ">"
        },
        {
          value: "1",
          label: "<"
        },
        {
          value: "2",
          label: "="
        },
        {
          value: "3",
          label: "<="
        },
        {
          value: "4",
          label: "=>"
        }
      ],
      value: "",
      pagetotal: "",
      dialogVisible: false,
      formLabelWidth: "70px",
      editAccount: {
        provinceId: "",
        cityId: "",
        areaId: "",
        provinceName: "",
        cityName: "",
        areaName: "",
        joinTime: "",
        companyName: "",
        businessLicense: "",
        address: "",
        subscriptionNum: "",
        subscriptionMoney: "",
        percent: "",
        userName: "",
        cardType: "",
        idCard: "",
        phone: "",
        email: "",
        userId: "",
        password: "",
        file: "",
        licenseFeeRate: "",
        wType: "",
        cityPartnerId: ''
      },
      editRules: {
        companyName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        businessLicense: [
          { required: true, message: "请输入营业执照号", trigger: "blur" }
        ],
        address: [{ message: "请输入正确的地址", trigger: "blur" }],
        joinTime: [{ validator: checkTime, required: true, trigger: "blur" }],
        subscriptionNum: [
          {
            validator: checkSubscriptionNum,
            type: "number",
            required: true,
            trigger: "blur"
          }
        ],
        subscriptionMoney: [
          {
            type: "number",
            required: true,
            message: "输入正确的金额",
            trigger: "blur"
          }
        ],
        cityName: [{ required: true, message: "请选择加盟城市", tigger: "change" }],
        cardType: [{ required: true, message: "请选择证件类型", trigger: "blur" }],
        percent: [{ required: true, message: "请输入加盟比例", trigger: "blur" }],
        userName: [{ message: "请输入姓名", trigger: "blur" }],
        idCard: [{ validator: checkId, required: true, trigger: "blur" }],
        phone: [
          { message: "请填写手机号", trigger: "blur" },
          { min: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        email: [{ message: "请填写正确邮箱", trigger: "blur" }],
        licenseFeeRate: [
          { required: true, message: "请输入授权费率", trigger: "blur" }
        ],
        wType: [{ required: true, message: "请选择结算周期", tigger: "blur" }]
      },
      add: false,
      imageUrl: "",
      fullscreenLoading: false,
      searchDate1: "",
      searchDate2: "",
      search_Number: "",
      date1: "",
      date2: "",
      imageUrl: "",
      isSearch: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      isSettleList: []
    };
  },
  mounted() {
    $(".sign").removeClass("is-active");
    $('.sign[name="20"]').addClass("is-active");
    document.title = "加盟商管理";
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      var that = this;
      request
        .post(host + "beepartner/admin/cityPartner/findCityPartner")
        .withCredentials()
        .set({
          "content-type": "application/x-www-form-urlencoded"
        })
        .send({
          name: that.name,
          phone: that.phone,
          startTime: that.startTime,
          endTime: that.endTime
        })
        .end((err, res) => {
          if (err) {
            this.loading = false;
            this.emptyText = "暂无数据";
            console.log("err:" + err);
          } else {
            this.checkLogin(res);
            this.loading = false;
            var code = JSON.parse(res.text).resultCode;
            if (code === 1) {
              var newArr = JSON.parse(res.text).data;
              var result = newArr.map(item => {
                return Object.assign({}, item, {
                  joinTime:
                    item.joinTime === null
                      ? ""
                      : moment(item.joinTime).format("YYYY-MM-DD")
                  
                });
              });
              var pageNumber = Number(JSON.parse(res.text).totalPage);
              this.totalItems = Number(JSON.parse(res.text).totalItems);
              that.$store.state.users.keepParnterAccount = [];
              result.reverse().map(item => {
                that.$store.commit("keepParnterAccount", item);
              });
              this.tableData = that.$store.state.users.keepParnterAccount;
              if (pageNumber > 1) {
                that.pageShow = true;
              } else {
                that.pageShow = false;
                that.emptyText = "暂无数据";
              }
            } else {
              that.emptyText = "暂无数据";
              return;
            }
          }
        });
    },
    handleEditProvince(val) {
      if (this.provinceList.length > 0) {
        this.provinceList.map(item => {
          if (val === item.name) {
            this.editAccount.provinceId = item.id;
          }
        });
        // this.editAccount.cityName = ''
        this.filterCityMethod();
      }
    },
    handleEditCity(val) {
      if (this.cityList.length > 0) {
        this.cityList.map(item => {
          if (val === item.name) {
            this.editAccount.cityId = item.id;
          }
        });
        // this.editAccount.areaName = ''
        this.filterAreaMethod();
      }
    },
    handleEditArea(val) {
      if (this.areaList.length > 0) {
        this.areaList.map(item => {
          if (val === item.name) {
            this.editAccount.areaId = item.id;
            this.editAccount.cityId = item.code;
          }
        });
        //this.ruleForm.areaName = ''
        //this.filterAreaMethod()
      }
    },
    filterProvinceMethod() {
      request
        .post(host + "beepartner/admin/cityPartner/getProvince")
        .withCredentials()
        .set({
          "content-type": "application/x-www-form-urlencoded"
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            this.checkLogin(res);
            var result = JSON.parse(res.text).data;
            var provinceList = result.map(item => {
              var obj = {};
              obj.id = item.id;
              obj.name = item.name;
              return obj;
            });
            this.provinceList = provinceList;
          }
        });
    },
    filterCityMethod() {
      if (this.editAccount.provinceId) {
        request
          .post(host + "beepartner/admin/cityPartner/getChildrenArea")
          .withCredentials()
          .set({
            "content-type": "application/x-www-form-urlencoded"
          })
          .send({
            id: this.editAccount.provinceId
          })
          .end((error, res) => {
            if (error) {
              console.log(error);
            } else {
              this.checkLogin(res);
              var result = JSON.parse(res.text).data;
              var cityList = result.map(item => {
                var obj = {};
                obj.id = item.id;
                obj.name = item.name;
                return obj;
              });
              this.cityList = cityList;
            }
          });
      }
    },
    filterAreaMethod() {
      if (this.editAccount.provinceId) {
        request
          .post(host + "beepartner/admin/cityPartner/getChildrenArea")
          .withCredentials()
          .set({
            "content-type": "application/x-www-form-urlencoded"
          })
          .send({
            id: this.editAccount.cityId
          })
          .end((error, res) => {
            if (error) {
              console.log(error);
            } else {
              this.checkLogin(res);
              var result = JSON.parse(res.text).data;
              if (result.length === 0) {
                this.areaShow = false;
              } else {
                this.areaShow = true;
              }
              var areaList = result.map(item => {
                var obj = {};
                obj.id = item.id;
                obj.name = item.name;
                obj.code = item.code;
                return obj;
              });
              this.areaList = areaList;
            }
          });
      }
    },
    handleAvatarSuccess(res, file) {
      // console.log(file)
      // console.log(URL.createObjectURL(file.raw))
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 2048 / 2048 < 2;
      if (!isJPG) {
        this.$message.error("上传营业执照图片只能是 jpg、jpeg、png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadWay(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file.file);
      var data;
      var that = this;
      reader.onload = function(e) {
        data = this.result;
        that.imageUrl = data;
        that.editAccount.file = JSON.stringify(data);
      };
    },
    queryInfo() {

      this.isSearch = true

      var name = this.name.trim();
      var phone = this.phone.trim();
      var startTime = this.startTime;
      var endTime = this.endTime;
      if (
        name.length === 0 &&
        phone.length === 0 &&
        startTime.toString().length === 0 &&
        endTime.toString().length === 0
      ) {
        this.$message({
          type: "warning",
          message: "查询条件不能为空！"
        });
      } else {
        request
          .post(host + "beepartner/admin/cityPartner/findCityPartner")
          .withCredentials()
          .set({
            "content-type": "application/x-www-form-urlencoded"
          })
          .send({
            name: this.name.trim(),
            phone: this.phone.trim(),
            startTime:
              this.startTime === ""
                ? ""
                : moment(this.startTime).format("YYYY-MM-DD"),
            endTime:
              this.endTime === ""
                ? ""
                : moment(this.endTime).format("YYYY-MM-DD")
          })
          .end((err, res) => {
            if (err) {
              this.loading = false;
              console.log("err:" + err);
            } else {
              this.checkLogin(res);
              this.loading = false;
              var newArr = JSON.parse(res.text).data || [];
              var result = newArr.map(item => {
                return Object.assign({}, item, {
                  joinTime: moment(item.joinTime).format("YYYY-MM-DD")
                });
              });
              if (JSON.parse(res.text).data === "") {
                this.emptyText = "暂无数据";
              }
              var pageNumber = Number(JSON.parse(res.text).totalPage);
              this.totalItems = Number(JSON.parse(res.text).totalItems);
              this.tableData = result;
              if (pageNumber > 1) {
                this.pageShow = true;
              } else {
                this.pageShow = false;
              }
            }
          });
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.loading = true;
      request
        .post(host + "beepartner/admin/cityPartner/findCityPartner")
        .withCredentials()
        .set({
          "content-type": "application/x-www-form-urlencoded"
        })
        .send({
          currentPage: val,
          name: this.isSearch === false?'':this.name.trim(),
          phone: this.isSearch === false?'':this.phone.trim(),
          startTime:
            this.startTime === ""
              ? ""
              : moment(this.startTime).format("YYYY-MM-DD"),
          endTime:
            this.endTime === "" ? "" : moment(this.endTime).format("YYYY-MM-DD")
        })
        .end((err, res) => {
          if (err) {
            this.loading = false;
            this.emptyText = "暂无数据";
            console.log("err:" + err);
          } else {
            this.checkLogin(res);
            this.loading = false;
            var newArr = JSON.parse(res.text).data;
            var result = newArr.map(item => {
              return Object.assign({}, item, {
                joinTime:
                  item.joinTime === null
                    ? ""
                    : moment(item.joinTime).format("YYYY-MM-DD")
              });
            });
            var pageNumber = Number(JSON.parse(res.text).totalPage);
            this.totalItems = Number(JSON.parse(res.text).totalItems);
            this.tableData = result;
            if (pageNumber > 1) {
              this.pageShow = true;
            } else {
              this.pageShow = false;
            }
          }
        });
    },
    delPartner(id, cityPartnerId, index) {
      this.$confirm("此操作将永久删除该加盟商信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request
            .post(host + "beepartner/admin/cityPartner/delCityPartner")
            .withCredentials()
            .set({
              "content-type": "application/x-www-form-urlencoded"
            })
            .send({
              id: id,
              cityPartnerId: cityPartnerId
            })
            .end((err, res) => {
              if (err) {
                console.log("err:" + err);
              } else {
                this.checkLogin(res);
                var message = JSON.parse(res.text).message;
                if (JSON.parse(res.text).resultCode === 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.$store.state.users.keepParnterAccount.splice(index, 1);
                } else {
                  this.$message({
                    type: "error",
                    message: message
                  });
                }
              }
            });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        });
    },
    goDetail(scope) {
      this.$router.push(
        "/index/partnerDetail/" + scope.row.id + "&" + scope.row.cityPartnerId
      );
    },
    checkSettleTime (id) {
      var newArr = []
      request
        .post(host + "beepartner/admin/withDraw/findWithdrawsCount")
        .withCredentials()
        .set({
          "content-type": "application/x-www-form-urlencoded"
        })
        .send({
          'cityPartnerId': id
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            this.checkLogin(res);
            // console.log("settle", res)
            var list = JSON.parse(res.text).data
            var arr = []
            list.map( item => {
              var obj = {}

              if (Number(item.withDrawCount) > 0) {
                obj.isEdit = false
              } else {
                obj.isEdit = true
              }
              obj.cityPartnerId = item.cityPartnerId
              arr.push(obj)

              return arr
            })
            console.log(this.isSettleList)
            this.isSettleList = arr
          }
        });
    },
    openEdit(row, index) {
      request
        .post(host + "beepartner/admin/withDraw/findWithdrawsCount")
        .withCredentials()
        .set({
          "content-type": "application/x-www-form-urlencoded"
        })
        .send({
          'cityPartnerId': row.cityPartnerId
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            this.checkLogin(res);
            var newArr = []
            // console.log("settle", res)
            var list = JSON.parse(res.text).data
            var arr = []
            list.map( item => {
              var obj = {}

              if (Number(item.withDrawCount) > 0) {
                obj.isEdit = true
              } else {
                obj.isEdit = false
              }

              obj.cityId = item.cityId
              arr.push(obj)

              return arr
            })
            newArr = arr
            this.dialogVisible = true
            var newMultForm = row.areaList.map((item)=>{
                  var wType,joinTime,firstDealDate,isEdit
                  if(item.wType==0){
                    wType = '自然月'
                  }else if(item.wType==1){
                    wType = '自然周(周一到周日)'
                  }else{
                    wType = '自定义'
                  }
                  for (var i = 0; i < newArr.length; i++) {
                    if (Number(item.cityId) === Number(newArr[i].cityId)) {
                       isEdit = newArr[i].isEdit
                    }
                  }
                  return Object.assign({},item,{wType:wType},{isEdit: isEdit})
                })

            this.multiForm = newMultForm
            console.log(this.multiForm)
            this.imageUrl = row.businessLicenseIconUrl
            this.userIDID = row.id;
            this.editAccount.companyName = row.companyName
            this.editAccount.businessLicense = row.businessLicense
            this.editAccount.address = row.address
            this.editAccount.userName = row.userName
            this.editAccount.cardType = row.cardType==0?'居民身份证':'护照'
            this.editAccount.phone = row.phone
            this.editAccount.email = row.email
            this.editAccount.userId = row.userId
            this.editAccount.idCard = row.idCard 
            this.editAccount.password = row.password
            this.editAccount.cityPartnerId = row.cityPartnerId
          }
        });
    },
    editConfim() {
      var that = this;
      //this.fullscreenLoading = true
      var newMultForm = this.multiForm.map((item)=>{

            var cityName = item.cityId.label
            var cityId = item.cityId.value 
            var wType,joinTime,firstDealDate
            if(item.wType==='自然月'){
               wType = 0
            }else if(item.wType==='自然周(周一到周日)'){
              wType = 1
            }else{
              wType = 2
            }
            joinTime = moment(item.joinTime).format('YYYY-MM-DD')
            firstDealDate = moment(item.firstDealDate).format('YYYY-MM-DD')
            return Object.assign({},item,{wType:wType},{joinTime:joinTime},{firstDealDate:firstDealDate},{cityName: cityName},{cityId: cityId})
          })

      delete this.editAccount.areaId
      delete this.editAccount.areaName
      delete this.editAccount.cityId
      delete this.editAccount.cityName
      delete this.editAccount.joinTime
      delete this.editAccount.licenseFeeRate
      delete this.editAccount.percent
      delete this.editAccount.subscriptionMoney
      delete this.editAccount.subscriptionNum
      delete this.editAccount.wType

      var obj = Object.assign(
            {},
            this.editAccount,
            {cityList:JSON.stringify(newMultForm)},
            { cardType: this.editAccount.cardType === "居民身份证" ? 0 : 1 }
          );
      request
        .post(host + "beepartner/admin/cityPartner/updateCityPartner")
        .withCredentials()
        .set({
          "content-type": "application/x-www-form-urlencoded"
        })
        .send(obj)
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            this.checkLogin(res);
          }
        });
      that.$store.state.users.keepParnterAccount.splice(
        this.editAccount.editIndex,
        1,
        this.editAccount
      );
      that.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editAccount.file === "" && this.imageUrl === null) {
            this.$message({
              message: "请上传营业执照",
              type: "warning"
            });
            return;
          }
          var that = this;
      //this.fullscreenLoading = true
      var newMultForm = this.multiForm.map((item)=>{
            var wType,joinTime,firstDealDate
            if(item.wType==='自然月'){
               wType = 0
            }else if(item.wType==='自然周(周一到周日)'){
              wType = 1
            }else{
              wType = 2
            }
            joinTime = moment(item.joinTime).format('YYYY-MM-DD')
            firstDealDate = moment(item.firstDealDate).format('YYYY-MM-DD')
            return Object.assign({},item,{wType:wType},{joinTime:joinTime},{firstDealDate:firstDealDate})
          })
    delete this.editAccount.provinceId
    delete this.editAccount.provinceName      
    delete this.editAccount.areaId
    delete this.editAccount.areaName
    delete this.editAccount.cityId
    delete this.editAccount.cityName
    delete this.editAccount.joinTime
    delete this.editAccount.licenseFeeRate
    delete this.editAccount.percent
    delete this.editAccount.subscriptionMoney
    delete this.editAccount.subscriptionNum
    delete this.editAccount.wType
      var obj = Object.assign(
            {},
            {id:this.userIDID},
            this.editAccount,
            {cityList:JSON.stringify(newMultForm)},
            { cardType: this.editAccount.cardType === "居民身份证" ? 0 : 1 }
          );
        that.dialogVisible = false;
          //this.fullscreenLoading = true
          // var obj  = Object.assign({},this.editAccount,{cardType:this.editAccount.cardType==='居民身份证'?0:1, file:this.editAccount.file })
          request
            .post(host + "beepartner/admin/cityPartner/updateCityPartner")
            .withCredentials()
            .set({
              "content-type": "application/x-www-form-urlencoded"
            })
            .send(obj)
            .end((error, res) => {
              if (error) {
                console.log(error);
              } else {
                var code = JSON.parse(res.text).resultCode;
                if (code === 0) {
                  // that.tableData.splice(
                  //   this.editAccount.editIndex,
                  //   1,
                  //   Object.assign({}, this.editAccount, {
                  //     joinTime: moment(this.editAccount.joinTime).format(
                  //       "YYYY-MM-DD"
                  //     )
                  //   })
                  // );
                  that.dialogVisible = false;
                  that.loadData();
                  that.currentPage3 = 1;
                  this.checkLogin(res);
                  that.$message.success("修改成功");
                } else {
                  that.$message.error("修改失败");
                  that.dialogVisible = false;
                }
              }
            });
        } else {
          // console.log('error submit!!')
          return false;
        }
      });
    },
    show_detail(row, column) {
      if (column.label === "加盟商编号") {
        this.$router.push("/index/partnerDetail/" + row.id);
      }
    },
    checkLogin(res) {
      if (JSON.parse(res.text).message === "用户登录超时") {
        this.$router.push("/login");
      }
    },
    inputChange() {
      if (this.$refs.val1.value === "" && this.$refs.val2.value === "") {
        this.loadData();
        this.isSearch = false
      }
    }
  },
  watch: {
    "$store.state.users.isOpenAddAccount": "loadData",
    startTime: {
      handler: function(val, oldVal) {
        if (val === "" && this.endTime === "") {
          this.loadData();
        }
        var startTime = new Date(val).getTime();
        var endTime = new Date(this.startTime).getTime();
        endTime = isNaN(endTime) ? 0 : endTime;
        // if ((startTime > endTime) && endTime.toString().length > 1) {
        //   this.$message({
        //     type: 'warning',
        //     message: '开始日期不能大于结束日期'
        //   })
        // } else if ((startTime > endTime) && endTime.toString().length === 1) {
        //   // this.$message({
        //   //   type: 'warning',
        //   //   message: '请输入结束日期'
        //   // })
        // } else {
        //   return
        // }
      },
      deep: true
    },
    endTime: {
      handler: function(val, oldVal) {
        if (val === "" && this.startTime === "") {
          this.loadData();
        }
        var endTime = new Date(val).getTime();
        var startTime = new Date(this.startTime).getTime();
        startTime = isNaN(startTime) ? 0 : startTime;
        // if ((endTime < startTime) && startTime.toString().length > 1) {
        //   this.$message({
        //     type: 'warning',
        //     message: '开始日期不能大于结束日期'
        //   })
        // } else if ((endTime > startTime) && startTime.toString().length === 1) {
        //   this.$message({
        //     type: 'warning',
        //     message: '请选择开始日期'
        //   })
        // } else {
        //   return
        // }
      },
      deep: true
    }
  }
};
</script>
