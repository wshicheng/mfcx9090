<template>
  <div class="settlementManager">
        <div style="padding: 20px; background: #fff;">
            <div class="settlementManager_head">
                <el-row class="selectPlace">
                    <div class="citys" style="margin-left: 80px;">
                    <address class="joinArea" style="margin-left: -57px;">加盟区域：</address>
                    <span @click="handleClick" myId='0' class="active">全部地区</span>
                    <span @click="handleClick" :key='item.id' :myId='item.cityId' v-for="item in cityList">{{item.cityName}}</span>
                    </div>
                </el-row>
            </div>
            <div class="settlementManager_head">
                <el-row class="selectPlace">
                    <div class="citys" style="margin-left: 67px;">
                        <address class="joinArea" style="margin-left: -57px;">结算单状态：</address>
                        <span :myStatus='0' @click="handleTypeClick">全部状态</span>
                        <span :myStatus='1' @click="handleTypeClick">待确认</span>
                        <span :myStatus='2' @click="handleTypeClick" class="active">待结算</span>
                        <span :myStatus='3' @click="handleTypeClick">已结算</span>
                    </div>
                </el-row>
            </div>
        </div>
        <div id="settlementManager_table">
        <el-row class="table">
          <el-table 
                :data="tableData"
                v-loading="loading2"
                element-loading-text="拼命加载中"
                style="width: 100% font-size:13px; color: #6c6c6c;">
            <el-table-column prop="applyTimeStr" label="结算周期" min-width="250">
            </el-table-column>
            <el-table-column prop="applyMoney" label="结算金额(￥)" min-width="200">
            </el-table-column>
            <el-table-column prop="cityName" label="加盟区域" min-width="120">
            </el-table-column>
            <el-table-column prop="applyUserName" label="结算单确认用户" min-width="100">
            </el-table-column>
            <el-table-column prop="confirmTimeStr" label="结算确认日期" min-width="140">
            </el-table-column>
            <el-table-column label="操作" prop="del">
              <template scope="scope">
                <a v-if="currentStatus != 2" href="javascript:;" prop="cityPartnerId" id='openId' @click="openEdit(scope.row, scope.$index)" style="color:#ccc; margin-right:10px; cursor:not-allowed;" title="已结算">
                  <!-- <i class="el-icon-document"></i> -->已结算
                </a>
                <a v-else href="javascript:;" prop="cityPartnerId" id='openId' @click="openEdit(scope.row, scope.$index)" style="color:#444; margin-right:10px;" title="确认结算">
                  <!-- <i class="el-icon-document"></i> -->确认结算
                </a>
                <!--dialog 弹窗开始-->
                 <el-dialog id="settle_input" title="结算确认" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
                    <el-form :model="editAccount">
                      <el-form-item label="结算周期" :label-width="formLabelWidth" style="width: 300px; ">
                        <el-input v-model="editAccount.applyTimeStr" :readonly="true" style="border:none;" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="加盟商编号" :label-width="formLabelWidth" style="width: 300px;" readonly>
                        <el-input v-model="editAccount.cityPartnerId" style="border:none;"  :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="加盟企业名称" :label-width="formLabelWidth" style="width: 300px;" readonly>
                        <el-input v-model="editAccount.companyName" style="border:none;"  :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="加盟地区" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.cityName"  style="border:none;" auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="结算单确认用户" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.applyUserName" style="border:none;"  auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="结算金额" :label-width="formLabelWidth" style="width: 300px;">
                        <el-input v-model="editAccount.applyMoney" style="border:none;"  auto-complete="off" :readonly="true"></el-input>
                      </el-form-item>
                      <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="editAccount.description" style="width: 400px;"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button class="partner_button" type="primary" 
                      v-loading.fullscreen.lock="fullscreenLoading" 
                      @click="editConfim(scope.row, scope.$index)">确定结算</el-button>
                      <el-button class="partner_button" @click="dialogVisible = false">取消</el-button>
                    </div>
                  </el-dialog> 
                <!--dialog 弹窗结束-->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
          v-show="pageShow"
          class="page"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="totalItems">
          </el-pagination>
        </el-row>
        </div>
  </div>
</template>
<script>
import request from 'superagent'
import moment from 'moment'
import $ from 'jquery'
import { siblings } from '../../../../utils/index.js'
import { host } from '../../../config/index.js'
export default {
  data: function () {
    return {
      tableData: [],
      tableData2: [],
      dialogVisible: false,
      editAccount: {
        month: '',
        allianceNum: '',
        allianceArea: '',
        applyPerson: '',
        settleMoney: '',
        settleRemark: ''
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      fullscreenLoading: false,
      activeName: '待结算',
      pagetotal: '',
      cityList: [],
      timer2: null,
      loading2: false,
      totalItems: 1,
      currentPage: 1,
      pageShow: false,
      currentStatus: 2
    }
  },
  mounted: function () {
    document.title="结算管理"
    $(".sign").removeClass('is-active')
    $('.sign[name="60"]').addClass('is-active')
    this.getCityList()
    this.getDateByTabName('2')
  },
  methods: {
    handleCurrentChange(val) {
      var status;
      if (this.activeName === '待结算') {
        status = 0
      } else {
        status = 1
      }
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/withDraw/findWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'status': status,
          'cityId': this.activeName === '待结算'?$('.citys span.active').attr('myId'):$('.citys2 span.active').attr('myId'),
          'currentPage': val
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
            this.loading2 = false
          } else {
            this.checkLogin(res)
            var data = JSON.parse(res.text).data
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            var totalPage = Number(JSON.parse(res.text).totalPage)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newData = this.tableDataDel(data)
            if (status === 0) {
              this.tableData = newData
              this.loading2 = false
            } else {
              this.tableData2 = newData
              this.loading2 = false
            }
          }
        })
    },
    handleClick(e) {
      this.loading2 = true
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      e.target.setAttribute('class', 'active')
      request
        .post(host + 'beepartner/admin/withDraw/findWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'status': $('.citys span.active')[1].getAttribute('myStatus'),
          'cityId': $('.citys span.active').attr('myId')
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            var data = JSON.parse(res.text).data
            var code = JSON.parse(res.text).resultCode
            var messsage = JSON.parse(res.text).message
            if(code==-1){
                this.$message.error(message)
            }
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            var totalPage = Number(JSON.parse(res.text).totalPage)
            if (totalPage > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
            }
            var newData = this.tableDataDel(data)
            this.loading2 = false
            this.tableData = newData
          }
        })
    },
    handleTypeClick (e) {
      this.loading2 = true
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', '')
      }
      e.target.setAttribute('class', 'active')

      this.getDateByTabName(e.target.getAttribute('myStatus'))
    },
    getCityList () {
      request
        .post(host + 'beepartner/admin/city/findCity')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send()
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            this.cityList = JSON.parse(res.text).data
          }
        })
    },
    getDateByTabName (status) {
      this.currentStatus = status
      this.currentPage = 1
      this.loading2 = true
      request
        .post(host + 'beepartner/admin/withDraw/findWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'cityId': $('.citys span.active').attr('myId'),
          'status': status
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            var data = JSON.parse(res.text).data
            if (Object.prototype.toString.call(data) === '[object Array]') {
              this.totalItems = Number(JSON.parse(res.text).totalItems)
              var totalPage = Number(JSON.parse(res.text).totalPage)
              if (totalPage > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
              }
              // 关闭loading
              this.loading2 = false
              var newData = this.tableDataDel(data)
              this.tableData = newData
            }
           
          }
        })   
    },
    tableDataDel(arr) {
      var arrDeled = []
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          var obj = {}
          obj.applyTimeStr = arr[i].applyTimeStr
          obj.applyMoney = arr[i].applyMoney
          obj.cityName = arr[i].cityName
          obj.applyUserName = arr[i].applyUserName
          if (this.activeName === '待结算') {
            obj.confirmTimeStr = arr[i].confirmTimeStr
          } else {
            obj.confirmTime = arr[i].confirmTimeStr
          }
          // obj.allianceId = arr[i].applyTimeStr
          obj.cityPartnerId = arr[i].cityPartnerId
          obj.id = arr[i].id
          obj.description = arr[i].description
          obj.companyName = arr[i].companyName
          arrDeled.push(obj)
        }
         return arrDeled
      }

     
    },
    openEdit(row) {
     
      // console.log($('.citys span.active')[1].getAttribute('myStatus'))
      if ($('.citys span.active')[1].getAttribute('myStatus') != 2) {
        return
      } else {
        this.dialogVisible = true
        this.editAccount.applyTimeStr = row.applyTimeStr
        this.editAccount.cityPartnerId = row.cityPartnerId
        this.editAccount.companyName = row.companyName
        this.editAccount.cityName = row.cityName
        this.editAccount.applyUserName = row.applyUserName
        this.editAccount.applyMoney = row.applyMoney
        // this.editAccount.withdrawalCode = row.allianceId
      }

    },
    editConfim (row, index) {
      this.fullscreenLoading = true
      request
        .post(host + 'beepartner/admin/withDraw/confirmWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'applyTimeStr': row.applyTimeStr,
          'applyMoney': row.applyMoney,
          'description': this.editAccount.description,
          'cityPartnerId': row.cityPartnerId,
          'id': row.id
        })
        .end((error, res) => {
          if (error) {
            console.log('error:', error)
          } else {
            this.checkLogin(res)
            if (JSON.parse(res.text).resultCode === 1) {
              this.tableData.splice(index, 1)
              this.loading2 = false
              this.$message({
                type: 'success',
                message: '加盟商将收到你的结算信息'
              })
            } else {
              this.$message('用户名不存在')
            }
          }
          var that = this
          setTimeout(function () {
            that.fullscreenLoading = false
            that.dialogVisible = false
          }, 1000)
        })
    },
    checkLogin (res) {
      if (JSON.parse(res.text).message === '用户登录超时') {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped>

div.settlementManager_head {
    padding: 10px;
    background: #faebd7;
}

div.selectPlace address {
  font-style: normal;
  display: inline;
  font-size: 14px;
  margin-right: 2px;
}

div.selectPlace div.citys {
  display: inline-block;
}

div.selectPlace div.citys2 {
  display: inline-block;
}

div.selectPlace span {
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  padding: 5px;
  border: 1px solid transparent;
}

div.selectPlace span.active {
  border: 1px solid orange;
  border-radius: 4px;
}

div.table table {
  border-collapse: collapse;
  width: 100%;
}

div.table table thead tr th {
  font-weight: normal;
  text-align: left;
  border-bottom: 2px solid #585555;
  padding: 5px 10px;
}

div.table table tbody tr td {
  font-size: 14px;
  color: rgba(121, 121, 121, 1);
  font-family: '微软雅黑';
  border: none;
  border-bottom: 1px dotted #afa7a7;
  padding: 14px 10px;
  color: #555;
}

div.table table thead tr th span.sort {
  padding: 0 5px;
  display: inline-block;
  cursor: pointer;
}

.partner_button:nth-of-type(1) {
  background: #f87e2b;
  border: none;
  color: #fff;
  margin-left: 120px;
}

.partner_button:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

div#settlementManager_table {
    margin-top: 20px;
    padding: 20px;
    background:  #fff;
}

.partner_button:nth-of-type(2) {
  background: #fff;
  color: #444;
  border: 1px solid rgba(196,196,196,1);
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

.page {
  white-space: nowrap;
  padding: 2px 5px;
  color: #48576a;
  background: #fff;
  margin-left: -5px;
  margin-top: 10px;
  border: none;
}
</style>

