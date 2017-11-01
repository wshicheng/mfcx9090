<template>
<div>
	<div id="addpartner_form">
				<h1 id="addpartner_title">添加加盟商
					<span>
						<a style="color:#000;" @click="$router.push({path:'/index/partnerManager'})">
							<i class="el-icon-close"></i>		
						</a>
					</span>
				</h1>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder='长度不超过100字符'></el-input>
        </el-form-item>
        <el-form-item label="营业执照注册号" prop="businessLicense">
          <el-input v-model="ruleForm.businessLicense" placeholder='请输入营业执照注册号'></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder='请输入地址'></el-input>
        </el-form-item>
        <h1 class="form_table_h1">加盟与结算信息</h1>
        <div class="mutiFormSelect" v-bind:key="list.id" v-for="(list,index) of multiForm">
           <div class="menuIcon">
             <i style="cursor:pointer;" @click="addMutiCity" class="iconfont icon-jia"></i>
             <i v-show="multiForm.length>1" style="cursor:pointer;" @click="removeMutiCity(index)" class="iconfont icon-jian"></i>
              
            </div>
           <el-form-item label="加盟地区"
           >
            <el-select v-model="list.cityId" placeholder="请选择">
              <el-option
                v-for="item in ruleForm.options"
                :key="item.value"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
        </el-form-item>
        
        <!-- <el-form-item label="加盟地区" prop="cityName"  id='selectCity' style="width:700px">
            <el-select @change="handleChangeProvince"
              v-model="ruleForm.provinceName"
              loading-text
              placeholder="请选择省"
              :loading="proloading">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :value="(item.name)">
              </el-option>
            </el-select>
            <el-select @change="handleChangeCity"
              v-model="ruleForm.cityName"
              placeholder="请选择城市"
              :loading="proloading">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :value="(item.name)">
              </el-option>
            </el-select>
            <el-select
              @change="handleChangeArea"
              v-show="areaShow"
              v-model="ruleForm.areaName"
              placeholder="请选择区/县"
              :loading="proloading">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :value="item.name">
              </el-option>
            </el-select>
        </el-form-item> -->
          <!-- <el-form-item label="加盟地区" prop="cityName"  id='selectCity' style="width:700px">
            <city-list v-bind:joinCity="_cityList" v-on:listenToChildEvetn="showMsgFormChild"></city-list>
        </el-form-item> -->
        <el-form-item label="加盟日期">
            <el-date-picker
              v-model="list.joinTime"
              placeholder="选择日期">
            </el-date-picker>           
        </el-form-item>
        <el-form-item label="认购车辆">
          <el-input v-model.number="list.subscriptionNum" placeholder='请输入车辆数(单位：/辆)'></el-input><span style="margin-left:5px;">辆</span>
        </el-form-item>
        <el-form-item label="加盟资金">
          <el-input v-model.number="list.subscriptionMoney" placeholder='请输入加盟资金（元）'></el-input><span style="margin-left:5px;">元</span>
        </el-form-item>
        <el-form-item style="position: relative; top: -22px; margin-bottom: 7px;">
          <div class="el-form-item__error" v-show="areaError">该地区已经存在加盟商，请重新选择</div>
        </el-form-item>	
        <!-- <el-form-item label="加盟商分成比例" prop="percent">
          <el-input max="100" min="0" v-model="ruleForm.percent" placeholder='请输入分成比例(%)'></el-input><span style="margin-left:5px;">%</span>
        </el-form-item>	 -->
        <el-form-item label="授权费率">
          <el-input max="100" min="0" v-model="list.licenseFeeRate" placeholder='请输入授权费率'></el-input><span style="margin-left:5px;">%</span>
        </el-form-item>
        <el-form-item label="结算周期" >
          <el-radio-group v-model="list.wType">
            <el-radio label="自然月" value='0'></el-radio>
            <el-radio label="自然周(周一到周日)" value='1'></el-radio>
            <el-radio label="自定义" value='2'></el-radio>
            <el-input class="customInput" style="display:inline;width:200px;" v-show="list.wType=='自定义'"
              v-model="list.circleDays"
              placeholder="输入结算周期，正整数">
            </el-input>  
          </el-radio-group>
        </el-form-item>
        <h1 class="form_table_h2">次周期结算上一个结算周期的收益，如果第一个周期不满一个结算周期也进行结算</h1>
        <el-form-item label="第一次结算开始日期">
            <el-date-picker
              :readonly="isHaveSettleOrders"
              v-model="list.firstDealDate"
              placeholder="选择日期">
            </el-date-picker>           
        </el-form-item>
        <h1 class="form_table_h2">生成结算单后，此日期不允许修改</h1>
        </div>
        <h1 class="form_table_h1">联系人信息</h1> 
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder='请输入姓名'></el-input>
        </el-form-item>
        <el-form-item label="证件类别" prop="cardType">
          <el-select v-model="ruleForm.cardType" placeholder="请选择证件类别">
            <el-option label="居民身份证" value="居民身份证"></el-option>
            <el-option label="护照" value="护照"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="idCard">
          <el-input v-model="ruleForm.idCard" placeholder='请输入证件号码'></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder='请输入手机号'></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder='请输入邮箱'></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" @change="handleCheckbox" id="form_checkBox">同时添加联系人的平台账号</el-checkbox>
        <el-form-item label="用户名" prop="userId" v-show='add'>
          <el-input v-model="ruleForm.userId" placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-show='add'>
          <el-input type="password" v-model="ruleForm.password" placeholder='6-20位，可包括字母、数字、下划线'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class='addpartner_button' v-loading='loading8' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button class='addpartner_button' @click="$router.push({path:'/index/partnerManager'})">取消</el-button>
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
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <h3>点击上传营业执照</h3>
          <p style="font-size: 10px;color: #ccc; margin-left: 20px;">支持jpg、jpeg、png格式</p>
        </el-upload>
	</div>
</div>
</template>
<style scoped>
@media screen and (min-width: 1367px) {
  #addpartner_form {
    /*  适配好的样式 */
    height: 50%;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 57%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    position: fixed;
    display: block;
    top: 62%;
    left: 50%;
    margin-left: -28%;
    margin-top: -25%;
    padding: 70px 80px 80px 50px;
    margin-right: 20px;
    border: 1px solid #ccc;
    background: #fff;
    z-index: 1;
    border-radius: 6px;
  }
}

@media screen and (max-width: 1367px) {
  #addpartner_form {
    height: 78%;
    width: 63%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    position: fixed;
    display: block;
    overflow-y: scroll;
    top: 62%;
    left: 50%;
    margin-left: -41%;
    margin-top: -27%;
    padding: 70px 150px 0px 144px;
    margin-right: 20px;
    z-index: 1;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 6px;
  }
}
div.menuIcon{text-align: right;
   
    margin-bottom: 10px;
   position:relative;}
div.menuIcon i.iconfont{position:absolute;right:0;z-index:99;}
div.menuIcon i.icon-jian{right:-36px;}    
#form_checkBox {
  margin-left: 129px;
  margin-bottom: 20px;
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

.form_table_h2 {
  width: 100%;
  padding: 0px 0 10px 153px;
  height: 30px;
  line-height: 0px;
  font-size: 10px;
  font-weight: 400;
  color: #ddd;
}

.el-form {
  width: 62%;
  float: left;
}

.addpartner_button:nth-of-type(1) {
  background: #f87e2b;
  border: none;
}

.addpartner_button:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

.addpartner_button:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

.addpartner_button {
  width: 120px;
  height: 50px;
}

#addpartner_title {
  position: absolute;
  left: 0px;
  top: 0px;
  padding-left: 20px;
  width: 98%;
  height: 40px;
  font-size: 20px;
  overflow-x: hidden;
  line-height: 40px;
  color: #444;
  border-bottom: 1px solid #eee;
}

#addpartner_title span {
  float: right;
  margin-right: 14px;
  cursor: pointer;
}

.avatar-uploader {
  border-radius: 6px;
  cursor: pointer;
  height: 200px;
  width: 300px;
  float: left;
  border: 1px dashed #ddd;
  position: relative;
  text-align: center;
  left: 2%;
  top: 0;
}

.avatar-uploader h3 {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  margin-left: 14px;
  color: #ccc;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #ccc;
  width: 10px;
  height: 10px;
  line-height: 200px;
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

/* #selectCity .el-select {
    display: inline-block;
    float: left;
    width: 50px;
  }

  #selectCity .el-select input.el-input__inner {
    width: 50px;
  } */
</style>
          
<script>
import $ from "jquery";
import request from "superagent";
import moment from "moment";
import { host } from "../../../config/index";
import { isCardNo, isPassportNo } from "../../../../utils/index.js";
import { mapActions } from "vuex";
import cityList from "../../../components/cityList.vue";
export default {
  data() {
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("证件号码不能为空"));
      }
      setTimeout(() => {
        console.log(this.ruleForm.cardType);
        if (this.ruleForm.cardType === "护照") {
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
      initNum:0,
      multiForm:[
       
        ],
      newFormObject:{cityId:'',joinTime:new Date(),subscriptionNum:'',subscriptionMoney:'',licenseFeeRate:'',wType:'',firstDealDate:new Date(),circleDays:''}, 
      isHaveSettleOrders: false,
      _cityList: [],
      areaShow: true,
      loading8: false,
      proloading: false,
      provinceList: [],
      cityList: [],
      areaList: [],
      ruleForm: {
        companyName: "",
        businessLicense: "",
        address: "",
        userName: "",
        cardType: "",
        idCard: "",
        phone: "",
        email: "",
        userId: "",
        password: "",
        file: "",
        options: [
        ],
        value: "",
      },
      rules: {
        firstDealDate: [
          { required: true, message: "请输入第一次结算日期", trigger: "blur" }
        ],
        companyName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        businessLicense: [
          { required: true, message: "请输入营业执照号", trigger: "blur" }
        ],
        address: [{ message: "请输入正确的地址", trigger: "blur" }],
        joinTime: [
          {  required: true, message: "请选择加盟日期", tigger: "blur" }
        ],
        subscriptionNum: [
          {
            type: "number",
            required: true,
            message: "请选择输入认购车辆数",
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
        wType: [{ required: true, message: "请选择结算周期", tigger: "blur" }],
        userId: [{ message: "请输入用户名", trigger: "blur" }],
        password: [
          { message: "请输入密码", trigger: "blur" },
          { min: 6, max: 19, message: "密码格式不正确", trigger: "blur" }
        ]
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      date1: "",
      checked: false,
      add: false,
      imageUrl: "",
      areaError: false
    };
  },
  components: {
    cityList
  },
  updated() {
    if (this.checked === true) {
      this.add = true;
    } else {
      this.add = false;
    }
  },
  created() {
      // 初始化调用查询可加盟城市的接口,动态渲染数据
    request.post(host + 'beepartner/admin/city/findAreaAlreadyOpen')
    .withCredentials()
    .set({
      "content-type": "application/x-www-form-urlencoded"
    })
    .send({
      unUsed: 1
    })
    .end((error,res)=>{
      if(error){
        console.log(error)
      }else{
        var result = JSON.parse(res.text)
        this.ruleForm.options = result.map((item)=>{
          return {
            value:item.code,
            label:item.name
          }
        })
      }
    })
    // 初始化调用查询加盟商是否生成结算单，若已生成，则第一次结算周期 input 不可编辑
    this.isHaveSettleOrders = false; // true 不可编辑
  },
  mounted: function() {
   // var newFormObject =  {id:this.initNum++,joinTime:'',subscriptionNum:'',subscriptionMoney:'',licenseFeeRate:'',wType:'',firstDealDate:'',customTime:''}
    this.multiForm.push(Object.assign({},this.newFormObject,{id:this.initNum++}))
    document.title = "添加加盟商";
   
    // this.filterProvinceMethod();
  },
  methods: {
    ...mapActions(["setAccountOpendState"]),
    showMsgFormChild(data) {
      // 子组件像父组件传值,目的是获取被选中的cityCode
      this.ruleForm._cityName = data;
      this.ruleForm.cityName = data.join();
      console.log(this.ruleForm._cityName);
    },
    addMutiCity(){
     this.multiForm.push(Object.assign({},this.newFormObject,{id:this.initNum++}))
    },
    removeMutiCity(index){
      console.log(index)
      this.multiForm.splice(index,1)
    },
    handleCheckbox(e) {
      if (!this.checked) {
        this.ruleForm.username = "";
        this.ruleForm.password = "";
      }
    },
    handleChangeProvince(val) {
      if (this.provinceList.length > 0) {
        this.provinceList.map(item => {
          if (val === item.name) {
            this.ruleForm.provinceId = item.id;
          }
        });
        this.ruleForm.cityName = "";
        this.filterCityMethod();
      }
    },
    handleChangeCity(val) {
      if (this.cityList.length > 0) {
        this.cityList.map(item => {
          if (val === item.name) {
            this.ruleForm.cityId = item.id;
          }
        });
        this.ruleForm.areaName = "";
        this.filterAreaMethod();
      }
    },
    handleChangeArea(val) {
      if (this.areaList.length > 0) {
        this.areaList.map(item => {
          if (val === item.name) {
            this.ruleForm.areaId = item.id;
            // 这是坑！！！！
            this.ruleForm.cityId = item.areaId;
            request
              .post(host + "beepartner/admin/cityPartner/checkBeforeSelectCity")
              .withCredentials()
              .set({
                "content-type": "application/x-www-form-urlencoded"
              })
              .send({
                cityId: this.ruleForm.cityId
              })
              .end((error, res) => {
                if (error) {
                  console.log(error);
                } else {
                  this.checkLogin(res);
                  if (JSON.parse(res.text).success === false) {
                    this.areaError = true;
                  } else {
                    this.areaError = false;
                  }
                }
              });
          }
        });
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
      if (this.ruleForm.provinceId) {
        request
          .post(host + "beepartner/admin/cityPartner/getChildrenArea")
          .withCredentials()
          .set({
            "content-type": "application/x-www-form-urlencoded"
          })
          .send({
            id: this.ruleForm.provinceId
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
      if (this.ruleForm.provinceId) {
        request
          .post(host + "beepartner/admin/cityPartner/getChildrenArea")
          .withCredentials()
          .set({
            "content-type": "application/x-www-form-urlencoded"
          })
          .send({
            id: this.ruleForm.cityId
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
                obj.areaId = item.code;
                return obj;
              });
              this.areaList = areaList;
            }
          });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.file === "") {
            this.$message({
              message: "请上传营业执照",
              type: "warning"
            });
            return;
          }
          this.loading8 = true;

          var obj = {};
          // obj = Object.assign({},this.ruleForm,{cardType:this.ruleForm.cardType==='居民身份证'?0:1},{percent:parseFloat(this.ruleForm.percent)},{licenseFeeRate:this.ruleForm.licenseFeeRate},{wType:this.ruleForm.wType ==='自然月'?0:1},{joinTime: moment(this.ruleForm.joinTime).format('YYYY-MM-DD')})
          delete this.ruleForm.options
          delete this.ruleForm.value
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
          obj = Object.assign(
            {},
            this.ruleForm,
            {cityList:JSON.stringify(newMultForm)},
            { cardType: this.ruleForm.cardType === "居民身份证" ? 0 : 1 }
          );
          console.log('obj', obj)
          return
          request
            .post(host + "beepartner/admin/cityPartner/addCityPartner")
            .withCredentials()
            .set({
              "content-type": "application/x-www-form-urlencoded"
            })
            .send(obj)
            .end((error, res) => {
              if (error) {
                console.log(error);
                this.loading8 = false;
              } else {
                this.checkLogin(res);
                this.loading8 = false;
                var newAccount = JSON.parse(res.text).data;
                var code = JSON.parse(res.text).resultCode;
                var message = JSON.parse(res.text).message;
                if (code === 0) {
                  this.setAccountOpendState();
                  this.$router.push("/index/partnerManager");
                  this.$message({
                    type: "success",
                    message: message
                  });
                  this.$store.commit("keepParnterAccount", newAccount);
                } else {
                  this.$message({
                    type: "error",
                    message: message
                  });
                }
              }
            });
        } else {
          this.loading8 = false;
          return false;
        }
      });
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
        this.$message.error("上传的图片格式只能是 jpg、jpeg、png 格式!");
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
        that.ruleForm.file = JSON.stringify(data);
      };
    },
    checkLogin(res) {
      if (JSON.parse(res.text).message === "用户登录超时") {
        this.$router.push("/login");
      }
    },
    transformType(type) {
      if (type == "自然月") {
        return 0;
      } else if (type == "自然周") {
        return 1;
      } else {
        return 2;
      }
    }
  },
  watch: {
    "ruleForm.wType": {
      handler: function(n, o) {
        this.transformType(n);
      },
      deep: true
    }
  }
};
</script>
