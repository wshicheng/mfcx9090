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
    <!-- 表单部分 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="加盟对象">
        <el-radio-group v-model="radio" v-on:change='clickChange'>
          <el-radio label="1" value="1">企业</el-radio>
          <el-radio label="2" value="2">个人</el-radio>
        </el-radio-group>
      </el-form-item>
        <!-- 加盟对象为企业时头部 -->
      <div v-if="radio=='1'">    
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder='长度不超过100字符'></el-input>
        </el-form-item>
        <el-form-item label="营业执照注册号" prop="businessLicense">
          <el-input v-model="ruleForm.businessLicense" placeholder='请输入营业执照注册号'></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder='请输入地址'></el-input>
        </el-form-item>
      </div>
      
        <!-- 加盟对象为个人时头部 -->
      <div v-if="radio=='2'">
        <el-form-item label="姓名" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder='请输入姓名'></el-input>
        </el-form-item>
        <el-form-item label="证件类别">
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
        <el-form-item label="通讯地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder='请输入地址'></el-input>
        </el-form-item>
      </div>

        <!-- 加盟与结算信息部分 -->
      <h1 class="form_table_h1">加盟与结算信息</h1>
        
        <!-- 选择加盟方式 -->
      <div class="mutiFormSelect" v-bind:key="list.id" v-for="(list,index) of ruleForm.multiForm">
        <div class="menuIcon">
          <i style="cursor:pointer;" @click="addMutiCity" class="iconfont icon-jia"></i>
          <i v-show="ruleForm.multiForm.length>1" style="cursor:pointer;" @click="removeMutiCity(index)" class="iconfont icon-jian"></i>
        </div>
        <el-form-item label="加盟模式" 
          :rules="[
              { required: true, message: '请选择加盟模式', trigger: 'blur' },
            ]"
            :id="'joinMode'+index"
          >
          <el-radio-group v-model="list.joinMode" @change="checkJoinMode" id="only">
            <!-- 此处修改，判断是个人时，独家除了禁用，且不被选中 -->
            <el-radio :label="radio=='1'?'1':''" :disabled="radio=='2'" value="1">独家</el-radio>
            <!-- <el-radio :label="onlyOne" :disabled="radio=='2'" value="1">独家</el-radio> -->
            <!-- <el-radio label="1" :disabled="radio=='2'" value="1">独家</el-radio> -->
            <el-radio label="2" value="2">非独家</el-radio>
          </el-radio-group>
          <span style="font-size:12px;color:#ccc;display:block;line-height:1.5">加盟模式是独家时，一个地区只允许一个企业加盟；非独家时，一个地区允许多个个人(或企业)加盟</span>
        </el-form-item>

        <!-- 独家时显示 -->
        <!-- 1、当页面第一次加载打开时，从后台拿到数据list.joinMode的值为1，此时独家的内容显示出来
              2、当页面切换到个人时，即radio=='2'，需要加载的非独家内容,但是如果此时
              设置添加一个加盟信息，发现独家的信息也在，所以判断添加加盟信息radio=='2'时，
              需要将list.joinMode的值改为2，具体操作在addMutiCity方法中
              3、当页面再次切换到企业时，此时可以显示独家信息正常，但是如果再添加一个加盟信息，发现又多了
              一个独家的信息，因为切换回来之前list.joinMode的值为2，所以判断这种情况下，将独家信息隐藏
              || (radio=='2'||list.joinMode=='2'?false:true)
        
          -->
        <div v-if="list.joinMode=='1' || (radio=='2'||list.joinMode=='2'?false:true)">
          <el-form-item label="加盟地区" :id="'cityId'+ index" :rules="[
                { required: true, message: '请选择加盟地区', trigger: 'blur' },
              ]">
            <el-select v-model="list.cityId" placeholder="请选择">
              <el-option
                v-for="item in ruleForm.options"
                :key="item.value"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="加盟日期" :id="'joinTime'+ index" :rules="[
                  { required: true, message: '请选择加盟日期', trigger: 'blur' },
                ]">
            <el-date-picker
              v-model="list.joinTime"
              placeholder="选择日期">
            </el-date-picker>            
          </el-form-item>
          <el-form-item label="认购车辆" :id="'subscriptionNum'+ index" :rules="[
                  { required: true, message: '请输入认购车辆', trigger: 'blur' },
                ]">
            <el-input v-model="list.subscriptionNum" placeholder='请输入车辆数(单位：/辆)'></el-input><span style="margin-left:5px;">辆</span>
          </el-form-item>
          <el-form-item label="加盟资金" :id="'subscriptionMoney'+ index" :rules="[
                { required: true, message: '请输入加盟资金', trigger: 'blur' },
              ]">
            <el-input v-model="list.subscriptionMoney" placeholder='请输入加盟资金（元）'></el-input><span style="margin-left:5px;">元</span>
          </el-form-item>
          <el-form-item style="position: relative; top: -22px; margin-bottom: 7px;">
            <div class="el-form-item__error" v-show="areaError">该地区已经存在加盟商，请重新选择</div>
          </el-form-item>	
          <el-form-item label="授权费率" :id="'licenseFeeRate'+ index" :rules="[
                { required: true, message: '请输入授权费率', trigger: 'blur' },
              ]">
            <el-input max="100" min="0" v-model="list.licenseFeeRate" placeholder='请输入授权费率'></el-input><span style="margin-left:5px;">%</span>
          </el-form-item>
          <el-form-item label="结算周期" :id="'wType'+ index" :rules="[
                { required: true, message: '请选择结算周期', trigger: 'blur' },
              ]">
            <el-radio-group v-model="list.wType" @change="checkSettleType">
              <el-radio label="自然月" value='0'></el-radio>
              <el-radio label="自然周(周一到周日)" value='1'></el-radio>
              <el-radio label="自定义" value='2'></el-radio>
              <el-input :id="'circleDays'+ index" class="customInput" style="display:inline;width:200px;" v-show="list.wType=='自定义'"
                v-model="list.circleDays"
                placeholder="请输入正整数（天）">
              </el-input>  
            </el-radio-group>
          </el-form-item>
          <h1 class="form_table_h2">次周期结算上一个结算周期的收益，如果第一个周期不满一个结算周期也进行结算</h1>
          <el-form-item label="首次结算开始日期" :id="'firstDealDate'+ index" :rules="[
                  { required: true, message: '请选择首次结算开始日期', trigger: 'blur' },
                ]">
                <el-date-picker
                  :readonly="isHaveSettleOrders"
                  v-model="list.firstDealDate"
                  placeholder="选择日期">
                </el-date-picker>           
          </el-form-item>
          <h1 class="form_table_h2">生成结算单后，此日期不允许修改</h1>
        </div>

        <!-- 个人或者非独家时 -->
        <div v-if="list.joinMode=='2'|| radio=='2'">
          <el-form-item label="加盟地区" :id="'cityId'+ index" :rules="[
                { required: true, message: '请选择加盟地区', trigger: 'blur' },
                ]">
              <el-select v-model="list.cityId" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="加盟日期" :id="'joinTime'+ index" :rules="[
                { required: true, message: '请选择加盟日期', trigger: 'blur' },
              ]">
              <el-date-picker
                v-model="list.joinTime"
                placeholder="选择日期">
              </el-date-picker> 
                        
          </el-form-item>
          <el-form-item label="认购车辆" :id="'subscriptionNum'+ index" :rules="[
                { required: true, message: '请输入认购车辆数', trigger: 'blur' },
              ]">
              <el-input v-model="list.subscriptionNum" placeholder='请输入车辆数(单位：/辆)'></el-input><span style="margin-left:5px;">辆</span>
          </el-form-item>
          <el-form-item label="加盟资金" :id="'subscriptionMoney'+ index" :rules="[
                { required: true, message: '请输入加盟资金', trigger: 'blur' },
              ]">
            <el-input v-model.number="list.subscriptionMoney" placeholder='请输入加盟资金（元）'></el-input><span style="margin-left:5px;">元</span>
          </el-form-item>
          <el-form-item style="position: relative; top: -22px; margin-bottom: 7px;">
            <div class="el-form-item__error" v-show="areaError">该地区已经存在加盟商，请重新选择</div>
          </el-form-item>
          <el-form-item label="运营管理费" :id="'manageFee'+ index" :rules="[
                { required: true, message: '请输入运营管理费', trigger: 'blur' },
              ]">
              <el-input v-model.number="list.manageFee" placeholder='请输入运营管理费'></el-input><span style="margin-left:5px;">元</span>
          </el-form-item>
          <el-form-item label="结算日"
            :id="'settleDays'+index"
            :rules="[
                { required: true, message: '请选择结算日', trigger: 'blur' },
              ]"
              >
        
            <el-checkbox-group v-model="list.dayList"  @change="checkSettleDays">
              <el-checkbox label="1">每月1号</el-checkbox>
              <el-checkbox label="16">每月16号</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <h1 class="form_table_h2">次周期结算上一个结算周期的收益，如果第一个周期不满一个结算周期也进行结算</h1>
          <el-form-item label="首次结算开始日期" :id="'firstDealDate'+ index" :rules="[
                { required: true, message: '请选择结算日期', trigger: 'blur' },
              ]">
              <el-date-picker
                :readonly="isHaveSettleOrders"
                v-model="list.firstDealDate"
                placeholder="选择日期">
              </el-date-picker>           
          </el-form-item>
          <h1 class="form_table_h2">生成结算单后，此日期不允许修改</h1>
          <el-form-item label="后期分成比例" :id="'divisionPercent'+ index" :rules="[
                { required: true, message: ' ', trigger: 'blur' },
              ]">
            <el-input v-model.number="list.divisionPercent" placeholder='请输入后期分成比例'></el-input><span style="margin-left:5px;">%</span>
          </el-form-item>
        </div>
      </div>
        

        <!-- 非独家时显示 -->
        <!-- <div v-if="isOnly=='2'">
          <div class="mutiFormSelect" v-bind:key="list.id" v-for="(list,index) of ruleForm.multiForm">
                <div class="menuIcon">
                  <i style="cursor:pointer;" @click="addMutiCity" class="iconfont icon-jia"></i>
                  <i v-show="ruleForm.multiForm.length>1" style="cursor:pointer;" @click="removeMutiCity(index)" class="iconfont icon-jian"></i>  
                </div>
                <el-form-item label="加盟模式" 
                  :rules="[
                      { required: true, message: '请选择加盟模式', trigger: 'blur' },
                    ]"
                  >
                <el-radio-group v-model="list.joinMode" @change="checkJoinMode" id="">
                  <el-radio label="1" :disabled="list.joinMode=='2'" value="1">独家</el-radio>
                  <el-radio label="2" value="2">非独家</el-radio>
                </el-radio-group>
                <span style="font-size:12px;color:#ccc;display:block;line-height:1.5">加盟模式是独家时，一个地区只允许一个企业加盟；非独家时，一个地区允许多个个人(或企业)加盟</span>
              </el-form-item>
                <div v-if="list.joinMode=='1'">
                  <el-form-item label="加盟地区" :id="'cityId'+ index" :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]">
                  <el-select v-model="list.cityId" placeholder="请选择">
                    <el-option
                      v-for="item in ruleForm.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="加盟日期" :id="'joinTime'+ index" :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]">
                  <el-date-picker
                    v-model="list.joinTime"
                    placeholder="选择日期">
                  </el-date-picker> 
                            
              </el-form-item>
              <el-form-item label="认购车辆" :id="'subscriptionNum'+ index" :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]">
              <el-input v-model="list.subscriptionNum" placeholder='请输入车辆数(单位：/辆)'></el-input><span style="margin-left:5px;">辆</span>
            </el-form-item>
              <el-form-item label="加盟资金" :id="'subscriptionMoney'+ index" :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]">
              <el-input v-model.number="list.subscriptionMoney" placeholder='请输入加盟资金（元）'></el-input><span style="margin-left:5px;">元</span>
            </el-form-item>
              <el-form-item style="position: relative; top: -22px; margin-bottom: 7px;">
                <div class="el-form-item__error" v-show="areaError">该地区已经存在加盟商，请重新选择</div>
              </el-form-item>
              <el-form-item label="运营管理费" :id="'manageFee'+ index" :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]">
              <el-input v-model.number="list.manageFee" placeholder='请输入运营管理费'></el-input><span style="margin-left:5px;">元</span>
            </el-form-item>
              <el-form-item label="结算日"
                :id="'settleDays'+index"
                :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]"
              >
            
                <el-checkbox-group v-model="list.dayList"  @change="checkSettleDays">
                  <el-checkbox label="每月1号"></el-checkbox>
                  <el-checkbox label="每月16号"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <h1 class="form_table_h2">次周期结算上一个结算周期的收益，如果第一个周期不满一个结算周期也进行结算</h1>
              <el-form-item label="首次结算开始日期" :id="'firstDealDate'+ index" :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]">
                  <el-date-picker
                    :readonly="isHaveSettleOrders"
                    v-model="list.firstDealDate"
                    placeholder="选择日期">
                  </el-date-picker>           
              </el-form-item>
              <h1 class="form_table_h2">生成结算单后，此日期不允许修改</h1>
              <el-form-item label="后期分成比例" :id="'divisionPercent'+ index" :rules="[
                    { required: true, message: ' ', trigger: 'blur' },
                  ]">
                <el-input v-model.number="list.divisionPercent" placeholder='请输入后期分成比例'></el-input><span style="margin-left:5px;">%</span>
              </el-form-item>
                </div>
                
          </div>
        </div> -->
        <!-- 添加加盟商尾部 -->
      <div>
        <h1 class="form_table_h1">结算账号</h1>
        <el-form-item label="支付宝账号" prop="alipayAccount">
            <el-input v-model="ruleForm.alipayAccount" placeholder='请输入支付宝号码'></el-input>
        </el-form-item>
        <el-form-item label="结算银行" prop="settleBank">
            <el-input v-model="ruleForm.settleBank" placeholder='请输入结算银行'></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
            <el-input v-model="ruleForm.bankAccount" placeholder='请输入银行账号'></el-input>
        </el-form-item>
        <el-form-item label="银行户名" prop="accountName">
            <el-input v-model="ruleForm.accountName" placeholder='请输入银行户名'></el-input>
        </el-form-item>
        <h1 class="form_table_h1">联系人信息</h1> 
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder='请输入姓名'></el-input>
        </el-form-item>
        <el-form-item label="证件类别">
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
        <el-checkbox v-model="ruleForm.isChecked" @change="handleCheckbox" id="form_checkBox">同时添加联系人的平台账号</el-checkbox>
        <div v-if="ruleForm.isChecked">
          <el-form-item label="用户名" prop="userId">
            <el-input v-model="ruleForm.userId" placeholder='请输入用户名'></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder='6-20位，可包括字母、数字、下划线'></el-input>
          </el-form-item>
        </div>
        

        <!-- 提交表单部分 -->
        <el-form-item>
          <el-button class='addpartner_button' v-loading='loading8' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button class='addpartner_button' @click="$router.push({path:'/index/partnerManager'})">取消</el-button>
        </el-form-item>

      </div>

    </el-form>

    <!-- 上传营业执照部分 -->
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :with-credentials='true'
      action=''
      :http-request = 'uploadWay'
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      v-if="radio=='1'">
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

</style>
          
<script>
import $ from "jquery";
import request from "superagent";
import moment from "moment";
import { host } from "../../../config/index";
import { isCardNo, isPassportNo} from "../../../../utils/index.js";
import { mapActions } from "vuex";
import cityList from "../../../components/cityList.vue";
export default {
  data() {

    // 验证证件号码
    var checkId = (rule, value, callback) => {
      
      if (!value) {
        return callback(new Error(" "));
      }
      setTimeout(() => {
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
    }
    
    return {
 
      joinMode:"1",
      radio:"1",
      checkList:[],
      
      initNum:0,
      newFormObject:{id:"",cityId:'',joinTime:new Date(),subscriptionNum:'',subscriptionMoney:'',licenseFeeRate:'',wType:'',firstDealDate:new Date(),circleDays:'',manageFee:"",settleDays:'',divisionPercent:"",dayList:[],joinMode:"1"}, 
      isHaveSettleOrders: false,
      _cityList: [],
      areaShow: true,
      loading8: false,
      proloading: false,
      provinceList: [],
      cityList: [],
      areaList: [],
      ruleForm: {
        joinTarget:this.radio,
        isChecked:false,
        multiForm:[
        //  {id:"",cityId:'',joinTime:new Date(),subscriptionNum:'',subscriptionMoney:'',licenseFeeRate:'',wType:'',firstDealDate:new Date(),circleDays:'',manageFee:"",settleDays:'',divisionPercent:"",dayList:[],joinMode:""},
        ],
        // subscriptionNum:'',
        companyName: "",
        businessLicense: "",
        address: "",
        userName: "",
        cardType: "居民身份证",
        idCard: "",
        phone: "",
        email: "",
        userId: "",
        password: "",
        file: "",
        options: [
        ],
        value: "",
        alipayAccount:"",
        settleBank:"",
        bankAccount:"",
        accountName:"",
      },
      rules: {
        companyName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        businessLicense: [
          { required: true, message: "请输入营业执照号码", trigger: "blur" }
        ],
        // cityId:[{ required: true, message: "请选择加盟地区", trigger: "blur" }],
        // joinTime:[{ required: true, message: "请选择加盟日期", trigger: "blur" }],
        address: [{ message: "请输入地址", trigger: "blur" }],
        cardType: [{ required: true, message: "请选择证件类型", trigger: "change" }],
        cardNum: [{ required: true, message: "请输入证件号码", trigger: "blur" }],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [{ validator: checkId, required: true, trigger: "blur" }],
        phone: [
          { required: true,message: "请输入正确的手机号", trigger: "blur" },
          { min: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        email: [{ message: "请填写正确邮箱", trigger: "blur" }],
        // licenseFeeRate: [{message: " ",required: true,trigger: "blur" }],
        // firstDealDate: [{message: "请选择首次结算日期",required: true,trigger: "change" }],
        // divisionPercent:[{ required: true,message: " ", trigger: "blur" }],
        // subscriptionMoney:[{required: true,message: " ", trigger: "blur" }],
        // subscriptionNum:[{required: true,message: " ", trigger: "blur" }],
        // manageFee:[{required: true,message: " ", trigger: "blur" }],
        // alipayAccount:[{required: true,message: " ", trigger: "blur" }],
        // wType: [{ required: true, message: "请选择结算周期", tigger: "change" }],
        userId: [{required:true, message: "请输入姓名", trigger: "blur" }],
        password: [
          { required:true,message: "请输入密码", trigger: "blur" },
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
  created() {
    // 初始化调用查询可加盟城市的接口,动态渲染数据
      this.getJoinAreaList();
    // 初始化调用查询加盟商是否生成结算单，若已生成，则第一次结算周期 input 不可编辑
      this.isHaveSettleOrders = false; // true 不可编辑
  },
  updated() {
      if (this.checked === true) {
        this.add = true;
      } else {
        this.add = false;
      }
    },
  mounted: function() {
     this.$refs['ruleForm'].resetFields();
     // var newFormObject =  {id:this.initNum++,joinTime:'',subscriptionNum:'',subscriptionMoney:'',licenseFeeRate:'',wType:'',firstDealDate:'',customTime:''}
     this.ruleForm.multiForm.push(Object.assign({},this.newFormObject,{id:this.initNum++}))
     document.title = "添加加盟商";
    // this.filterProvinceMethod();

    console.log("打印出返回的数据-----------");
    console.log(this.ruleForm.multiForm);
    console.log("-----------");
  },
  methods:{
    // 改变加盟对象 企业、个人
    clickChange(){
      if(this.radio=='1'){
       this.newFormObject.joinMode='1'
      }else{
        this.newFormObject.joinMode='2'
      }
    
      var that = this
      // this.$refs['ruleForm'].resetFields();

      if($(".is-required").find("input").val()==""){
        $(".is-required").removeClass("is-error")
        $(".el-form-item").removeClass("is-error")
      }
      // 改变加盟模式时清空表单数据
      this.ruleForm =  {
        multiForm:[{id:"",cityId:'',joinTime:new Date(),subscriptionNum:'',subscriptionMoney:'',licenseFeeRate:'',wType:'',firstDealDate:new Date(),circleDays:'',manageFee:"",settleDays:'',divisionPercent:"",dayList:[],joinMode:this.radio}],
        subscriptionNum:'',
        companyName: "",
        businessLicense: "",
        address: "",
        userName: "",
        cardType: "居民身份证",
        idCard: "",
        phone: "",
        email: "",
        userId: "",
        password: "",
        file: "",
        options: [
        ],
        value: "",
        alipayAccount:"",
        settleBank:"",
        bankAccount:"",
        accountName:"",
      }
      this.imageUrl = ""
      this.checked = false
      this.getJoinAreaList();
    },
    // 改变加盟模式 独家、非独家
    checkJoinMode(joinMode){
     // 清空中间重复部分数据
      this.joinMode = joinMode;
      console.log(this.joinMode)
      this.getJoinAreaList()
    },    
    // 添加多个加盟区域
    addMutiCity(){
       request
        .post(host + "beepartner/admin/city/findAreaAlreadyOpen")
        .withCredentials()
        .set({
          "content-type": "application/x-www-form-urlencoded"
        })
        .send({
          unUsed: 1,
          joinTarget:this.radio,
        })
        .end((error, res) => {
          if (error) {
            console.log(error);
          } else {
            var result = JSON.parse(res.text);
          console.log(result)
            if (result.length == 0) {
              this.$message({
                type: "error",
                message: "对不起，暂时无可加盟地区"
              });
            } else {
              
               this.ruleForm.multiForm.push(Object.assign({},this.newFormObject,{id:this.initNum++}))
              // -------------当是个人加盟，且需要添加加盟信息时，需要判断radio=="2"时，
              // 将个人加盟时的加盟方式限定为非独家-------------------
               if(this.radio == "2"){
                 this.ruleForm.multiForm.forEach(item => {
                   item.joinMode = "2";
                 });
               }
            }
          }
        });
    
    },
    // 改变结算周期
    checkSettleType(val){
       $('.el-radio-group').find('.error-list').remove()
        $('.el-radio-group').find('.error-list-circle').remove()
     if(val==='自定义'){
       $('.el-radio-group').find('.el-input__inner').css({
         borderColor:'#ddd'
       })
       
     }
    },
    checkSettleDays(){

    },
    // 是否同时添加联系人的平台账号
    handleCheckbox(){

    },
    // 上传图片
    handleAvatarSuccess(res, file) {
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
    // 获取可加盟城市的列表
    getJoinAreaList(){
      request.post(host + 'beepartner/admin/city/findAreaAlreadyOpen')
      .withCredentials()
      .set({
        "content-type": "application/x-www-form-urlencoded"
      })
      .send({
        unUsed: 1,
        joinMode:this.joinMode
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
          console.log(this.ruleForm.options)
          console.log('joinMode的值为this.newFormObject.joinMode',this.newFormObject.joinMode)
        }
      })
    },
    // 减少加盟地区
    removeMutiCity(index){
      this.ruleForm.multiForm.splice(index,1)
    },
    ...mapActions(["setAccountOpendState"]),

    handleCheckbox(e) {
      if (!this.checked) {
        this.ruleForm.username = "";
        this.ruleForm.password = "";
      }
    },
    // 检测是否登录超时
    checkLogin(res) {
      if (JSON.parse(res.text).message === "用户登录超时") {
        this.$router.push("/login");
      }
    },
    submitForm(formName) {
       // 进行表单验证
       if($(".is-required").find("input").val()==""){
         $(".is-required").addClass("is-error");
         return;
       }
       this.ruleForm.multiForm.map((item,index)=>{

        //  //验证加盟时间
        //  if(!item.joinTime==''){
        //     setTimeout(()=>{
        //      $('#joinTime'+index).find('.error-list').remove()
        //      $('#joinTime'+index).removeClass('is-error')
        //     },200)
        //   }else{
        //       $('#joinTime'+index).find('.error-list').remove()
        //       $('#joinTime'+index).addClass('is-error')
        //       $('#joinTime'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入加盟时间</div>')
        //   }

        //   // 验证首次结算日期
        //  if(!item.firstDealDate==''){
        //     setTimeout(()=>{
        //       $('#firstDealDate'+index).find('.error-list').remove()
        //       $('#firstDealDate'+index).removeClass('is-error')
        //     },200)
        //   }else{
        //       $('#firstDealDate'+index).find('.error-list').remove()
        //       $('#firstDealDate'+index).addClass('is-error')
        //       $('#firstDealDate'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请选择第一次结算日期</div>')
        //   }

        //   // 验证认购车辆
        //   if(!item.subscriptionNum==''){
        //     setTimeout(()=>{
        //       $('#subscriptionNum'+index).find('.error-list').remove()
        //       $('#subscriptionNum'+index).removeClass('is-error')
        //     },200)
        //   }else{
        //       $('#subscriptionNum'+index).find('.error-list').remove()
        //       $('#subscriptionNum'+index).addClass('is-error')
        //       $('#subscriptionNum'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请选择加盟日期</div>')
        //   }
           
        //    // 验证加盟资金
        //   if(!item.subscriptionMoney==''){
        //     setTimeout(()=>{
        //       $('#subscriptionMoney'+index).find('.error-list').remove()
        //       $('#subscriptionMoney'+index).removeClass('is-error')
        //     },200)
        //   }else{
        //       $('#subscriptionMoney'+index).find('.error-list').remove()
        //       $('#subscriptionMoney'+index).addClass('is-error')
        //       $('#subscriptionMoney'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入加盟资金</div>')
        //   }

        //   // 验证授权费率
        //    if(!item.licenseFeeRate==''){
        //     setTimeout(()=>{
        //       $('#licenseFeeRate'+index).find('.error-list').remove()
        //       $('#licenseFeeRate'+index).removeClass('is-error')
        //     },200)
        //   }else{
        //       $('#licenseFeeRate'+index).find('.error-list').remove()
        //       $('#licenseFeeRate'+index).addClass('is-error')
        //       $('#licenseFeeRate'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入授权费率</div>')
        //   }

        //   // 验证后期分成比例
        //   if(!item.divisionPercent==''){
        //     setTimeout(()=>{
        //       $('#divisionPercent'+index).find('.error-list').remove()
        //       $('#divisionPercent'+index).removeClass('is-error')
        //     },200)
        //   }else{
        //       $('#divisionPercent'+index).find('.error-list').remove()
        //       $('#divisionPercent'+index).addClass('is-error')
        //       $('#divisionPercent'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入后期分成比例</div>')
        //   }

        // 验证结算周期
          // if(!item.wType==''){
          //    if(!item.circleDays){
          //       $('#circleDays'+index).find('.error-list-circle').remove()
          //       $('#circleDays'+index).find('.el-input__inner').css({
          //           borderColor:'red'
          //        })
          //       $('#circleDays'+index).append('<div class="error-list-circle" style="font-size: 12px;color: red;margin-left: 314px;width:399px;position:absolute;">请输入正整数天</div>')
          //    }
          //   setTimeout(()=>{
          //     $('#wType'+index).find('.error-list').remove()
          //     $('#wType'+index).removeClass('is-error')
          //   },200)
          // }else{
          //     $('#wType'+index).find('.error-list').remove()
          //     $('#wType'+index).addClass('is-error')
          //     $('#wType'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请选择结算周期</div>')
          // }
         
         // 验证加盟地区
          // if(!item.cityId==''){
          //   setTimeout(()=>{
          //     $('#cityId'+index).find('.error-list').remove()
          //     $('#cityId'+index).removeClass('is-error')
          //   },200)
          // }else{
          //     $('#cityId'+index).find('.error-list').remove()
          //     $('#cityId'+index).addClass('is-error')
          //     $('#cityId'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请选择加盟地区</div>')
          // }

        })
     
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.file === "" && this.radio == "1") {
            this.$message({
              message: "请上传营业执照",
              type: "warning"
            });
            return;
          }
          
          var obj = {};
          delete this.ruleForm.value

          // 映射一个新数组，存有多个加盟结算信息
          var newMultForm = this.ruleForm.multiForm.map((item)=>{

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
            if(item.dayList.length === 0){
                item.settleDays = ""
              }else if(item.dayList.length === 1){
                item.settleDays = item.dayList[0]
                // item.settleDays = item.dayList[0].slice(2,-1)
              }else{
                item.settleDays = item.dayList[0] +","+ item.dayList[1]
                // item.settleDays = item.dayList[0].slice(2,-1) +","+ item.dayList[1].slice(2,-1)
              }
           
            return Object.assign({},item,{wType:wType},{joinTime:joinTime},{firstDealDate:firstDealDate},{cityName: cityName},{cityId: cityId},{settleDays:item.settleDays})
          })

          console.log('newMultForm22', newMultForm)
         
         // 生成一个新对象，作为添加加盟商传递的参数
          obj = Object.assign(
            {},
            { unUsed:1},
            this.ruleForm,
            {cityList:JSON.stringify(newMultForm)},
            {cardType: this.ruleForm.cardType === "居民身份证" ? 0 : 1 },
            {joinTarget:this.radio}
          );
           console.log("提交表单传递的参数obj",obj)

           // 判断是否有未填写的表单项，若有则阻止添加请求
          var len1,len2,len3;
          if($('.is-error')){
             var len1 = $('.is-error').length;
          }
           if($('.error-list')){
             var len2 = $('.error-list').length;
          }
           if($('.error-list-circle')){
             var len3 = $('.3').length;
          }
         if(len1>0||len2>0||len3>0){
           return;
         }
         this.loading8 = true;
          
          // 发送添加加盟商的请求
          request
            .post(host + "beepartner/admin/cityPartner/addCityPartner")
            .withCredentials()
            .set({
              "content-type": "application/x-www-form-urlencoded"
            })
            .send(obj)
            .end((error, res) => {
                // 请求失败
              if (error) {
                console.log(error);
                this.loading8 = false;
              } else {
                // 请求成功
                console.log("添加加盟商请求成功后的返回值res",res)
                // 检测是否登录超时
                this.checkLogin(res);
                this.loading8 = false;

                var newAccount = JSON.parse(res.text).data;
                var code = JSON.parse(res.text).resultCode;
                var message = JSON.parse(res.text).message;

                // 请求成功跳转到加盟商管理页面
                if (code === 0) {
                  this.setAccountOpendState();
                  this.$router.push("/index/partnerManager");
                  this.$message({
                    type: "success",
                    message: message
                  });
                  this.$store.commit("keepParnterAccount", newAccount);
                } else {
                  // 请求失败提示错误信息
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
    }
  },
  watch: {
      "ruleForm.multiForm":{
        handler:function(n,o){
          n.map((item,index)=>{
          
            // if(!item.firstDealDate==''){
            //   setTimeout(()=>{
            //   $('#firstDealDate'+index).find('.error-list').remove()
            //     $('#firstDealDate'+index).removeClass('is-error')
            //   },200)
            // }else{
            //     $('#firstDealDate'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#firstDealDate'+index).find('.error-list').remove()
            //         $('#firstDealDate'+index).addClass('is-error')
            //         $('#firstDealDate'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请选择第一次结算日期</div>')
            //       }
            //     })
            // }
            // if(!item.subscriptionNum==''){
            //   setTimeout(()=>{
            //   $('#subscriptionNum'+index).find('.error-list').remove()
            //     $('#subscriptionNum'+index).removeClass('is-error')
            //   },200)
            // }else{
            //     $('#subscriptionNum'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#subscriptionNum'+index).find('.error-list').remove()
            //         $('#subscriptionNum'+index).addClass('is-error')
            //         $('#subscriptionNum'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入认购车辆</div>')
            //       }
            //     })
            // }
            // if(!item.joinTime==''){
            //   setTimeout(()=>{
            //   $('#joinTime'+index).find('.error-list').remove()
            //     $('#joinTime'+index).removeClass('is-error')
            //   },200)
            // }else{
            //     $('#joinTime'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#joinTime'+index).find('.error-list').remove()
            //         $('#joinTime'+index).addClass('is-error')
            //         $('#joinTime'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请选择加盟日期</div>')
            //       }
            //     })
            // }
            // if(!item.subscriptionMoney==''){
            //   setTimeout(()=>{
            //   $('#subscriptionMoney'+index).find('.error-list').remove()
            //     $('#subscriptionMoney'+index).removeClass('is-error')
            //   },200)
            // }else{
            //     $('#subscriptionMoney'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#subscriptionMoney'+index).find('.error-list').remove()
            //         $('#subscriptionMoney'+index).addClass('is-error')
            //         $('#subscriptionMoney'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入加盟资金</div>')
            //       }
            //     })
            // }
            // if(!item.licenseFeeRate==''){
            //   setTimeout(()=>{
            //   $('#licenseFeeRate'+index).find('.error-list').remove()
            //     $('#licenseFeeRate'+index).removeClass('is-error')
            //   },200)
            // }else{
            //     $('#licenseFeeRate'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#licenseFeeRate'+index).find('.error-list').remove()
            //         $('#licenseFeeRate'+index).addClass('is-error')
            //         $('#licenseFeeRate'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入授权费率</div>')
            //       }
            //     })
            // }
            // if(!item.manageFee==''){
            //   setTimeout(()=>{
            //   $('#manageFee'+index).find('.error-list').remove()
            //     $('#manageFee'+index).removeClass('is-error')
            //   },200)
            // }else{
            //     $('#manageFee'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#manageFee'+index).find('.error-list').remove()
            //         $('#manageFee'+index).addClass('is-error')
            //         $('#manageFee'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请输入运营管理费</div>')
            //       }
            //     })
            // }
            // if(!item.wType==''){
            //   setTimeout(()=>{
            //   $('#wType'+index).find('.error-list').remove()
            //     $('#wType'+index).removeClass('is-error')
            //   },200)
            // }else{
            // }
            //   if(!item.circleDays==''){
            //   setTimeout(()=>{
            //     $('#circleDays'+index).find('.error-list').remove()
            //     $('#circleDays'+index).find('.error-list-circle').remove()
            //     $('#circleDays'+index).find('.el-input__inner').css({
            //       borderColor:'#ddd'
            //     })
            //   },200)
            // }else{
            //     $('#circleDays'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#circleDays'+index).find('.error-list').remove()
            //         $('#circleDays'+index).find('.error-list-circle').remove()
            //         $('#circleDays'+index).find('.el-input__inner').css({
            //           borderColor:'red'
            //         })
            //         $('#circleDays'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 314px;width:399px;position:absolute;">请输入正整数天</div>')
            //       }else{
            //         var reg=/^[1-9]\d*$/;
            //         var res = reg.test(val)
            //         if(res){
            //           return;
            //         }else{
            //             $('#circleDays'+index).find('.error-list').remove()
            //         $('#circleDays'+index).find('.el-input__inner').css({
            //           borderColor:'red'
            //         })
            //         $('#circleDays'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 314px;width:399px;position:absolute;">请输入正整数天</div>')
            //         }
            //       }
            //     })
            // }
            // if(!item.cityId==''){
            //   setTimeout(()=>{
            //   $('#cityId'+index).find('.error-list').remove()
            //     $('#cityId'+index).removeClass('is-error')
            //   },200)
            // }else{
            //     $('#cityId'+index).find('input').blur(function(){
            //       var val = $(this).val()
            //       if(!val){
            //         $('#cityId'+index).find('.error-list').remove()
            //         $('#cityId'+index).addClass('is-error')
            //         $('#cityId'+index).append('<div class="error-list" style="font-size: 12px;color: red;margin-left: 150px;position:absolute;">请选择加盟地区</div>')
            //       }
            //     })
            // }
          })
        },
        deep:true
      }
    }
   

  //   showMsgFormChild(data) {
  //     // 子组件像父组件传值,目的是获取被选中的cityCode
  //     this.ruleForm._cityName = data;
  //     this.ruleForm.cityName = data.join();
  //   },



  //   handleChangeProvince(val) {
  //     if (this.provinceList.length > 0) {
  //       this.provinceList.map(item => {
  //         if (val === item.name) {
  //           this.ruleForm.provinceId = item.id;
  //         }
  //       });
  //       this.ruleForm.cityName = "";
  //       this.filterCityMethod();
  //     }
  //   },
  //   handleChangeCity(val) {
  //     if (this.cityList.length > 0) {
  //       this.cityList.map(item => {
  //         if (val === item.name) {
  //           this.ruleForm.cityId = item.id;
  //         }
  //       });
  //       this.ruleForm.areaName = "";
  //       this.filterAreaMethod();
  //     }
  //   },
  //   handleChangeArea(val) {
  //     if (this.areaList.length > 0) {
  //       this.areaList.map(item => {
  //         if (val === item.name) {
  //           this.ruleForm.areaId = item.id;
  //           this.ruleForm.cityId = item.areaId;
  //           request
  //             .post(host + "beepartner/admin/cityPartner/checkBeforeSelectCity")
  //             .withCredentials()
  //             .set({
  //               "content-type": "application/x-www-form-urlencoded"
  //             })
  //             .send({
  //               cityId: this.ruleForm.cityId
  //             })
  //             .end((error, res) => {
  //               if (error) {
  //                 console.log(error);
  //               } else {
  //                 // 检测是否登录超时
  //                 this.checkLogin(res);
  //                 if (JSON.parse(res.text).success === false) {
  //                   this.areaError = true;
  //                 } else {
  //                   this.areaError = false;
  //                 }
  //               }
  //             });
  //         }
  //       });
  //     }
  //   },
  //   filterProvinceMethod() {
  //     request
  //       .post(host + "beepartner/admin/cityPartner/getProvince")
  //       .withCredentials()
  //       .set({
  //         "content-type": "application/x-www-form-urlencoded"
  //       })
  //       .end((error, res) => {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           // 检测是否登录超时
  //           this.checkLogin(res);
  //           var result = JSON.parse(res.text).data;
  //           var provinceList = result.map(item => {
  //             var obj = {};
  //             obj.id = item.id;
  //             obj.name = item.name;
  //             return obj;
  //           });
  //           this.provinceList = provinceList;
  //         }
  //       });
  //   },
  //   filterCityMethod() {
  //     if (this.ruleForm.provinceId) {
  //       request
  //         .post(host + "beepartner/admin/cityPartner/getChildrenArea")
  //         .withCredentials()
  //         .set({
  //           "content-type": "application/x-www-form-urlencoded"
  //         })
  //         .send({
  //           id: this.ruleForm.provinceId,
  //           joinMode:this.radio
  //         })
  //         .end((error, res) => {
  //           if (error) {
  //             console.log(error);
  //           } else {
  //             // 检测是否登录超时
  //             this.checkLogin(res);
  //             var result = JSON.parse(res.text).data;
  //             var cityList = result.map(item => {
  //               var obj = {};
  //               obj.id = item.id;
  //               obj.name = item.name;
  //               return obj;
  //             });
  //             this.cityList = cityList;
  //           }
  //         });
  //     }
  //   },
  //   filterAreaMethod() {
  //     if (this.ruleForm.provinceId) {
  //       request
  //         .post(host + "beepartner/admin/cityPartner/getChildrenArea")
  //         .withCredentials()
  //         .set({
  //           "content-type": "application/x-www-form-urlencoded"
  //         })
  //         .send({
  //           id: this.ruleForm.cityId,
  //           joinMode:this.radio
  //         })
  //         .end((error, res) => {
  //           if (error) {
  //             console.log(error);
  //           } else {
  //             // 检测是否登录超时
  //             this.checkLogin(res);
  //             var result = JSON.parse(res.text).data;
            
  //             if (result.length === 0) {
  //               this.areaShow = false;
  //             } else {
  //               this.areaShow = true;
  //             }
  //             var areaList = result.map(item => {
  //               var obj = {};
  //               obj.id = item.id;
  //               obj.name = item.name;
  //               obj.areaId = item.code;
  //               return obj;
  //             });
  //             this.areaList = areaList;
  //           }
  //         });
  //     }
  //   },

  // // 提交表单,添加加盟商
  
  

  
  //   transformType(type) {
  //     if (type == "自然月") {
  //       return 0;
  //     } else if (type == "自然周") {
  //       return 1;
  //     } else {
  //       return 2;
  //     }
  //   }
  // },
  
};
</script>
