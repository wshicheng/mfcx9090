<template>
  <div>
    <div class="incomming module">
      <el-row>
        <el-col class="incomeTitle">
          <span class="title">今日营收
            <!-- <small>每10分钟自动刷新数据</small> -->
          </span>
          <span class="detail_right" @click="$router.push({path:'/index/earningsDetail?type=0'})">&gt;&gt;</span>
        </el-col>
        <el-col>
          <incomingVueChart></incomingVueChart>
        </el-col>
      </el-row>
    </div>
    <div class="statuAndData">
      <el-row>
        <el-col class="datas">
          <div class="datas_title">
            <span class="data_display ">今日24小时数据趋势
              <small>每10分钟自动刷新数据</small>
            </span>
            <span style="display:none;" class="arrow" @click="$router.push('/index/incomingRank?type=daily')">&gt;&gt;</span>
          </div>
          <div class="selectPlace">
            <div class="citys" style="margin-left: -10px;">
              <span @click="handleClick" myId='0' class="active">全部地区</span>
              <span @click="handleClick" :key='item.id' :myId='item.cityId' v-for="item in cityList">{{item.cityName}}</span>
            </div>
          </div>
          <div class="Histogram">
            <myCanvas></myCanvas>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="hotmap">
        <div class="mapHeader">
          <div class="mapHeader_content">
            <div class="mapTitle">
              <el-row>
                <el-col :span="10">
                  <span class="motionMap">运营热力图
                    <small>每十分钟自动刷新</small>
                  </span>
                </el-col>
                <span class="arrow" style="float:right;margin-right:20px;">&gt;&gt;</span>
              </el-row>
              <div class="citySelect" style="padding-left:0;margin-top:10px;margin-bottom:0;">
                <span @click="handleClick" class="city">芜湖</span>
                <span @click="handleClick" class="city">郑州</span>
                <span @click="handleClick" class="city">南京</span>
                <span @click="handleClick" class="city active">上海</span>
              </div>
            </div>
          </div>
          <div class="mapWrap">
            <Gamp></Gamp>
          </div>
        </div>
      </div> -->
  </div>
</template>
<style scoped>
  div.module {
    padding: 20px 15px 20px 15px;
    margin-right: 20px;
    background: #fff;
    margin-bottom: 20px;
  }

  div.incomming {
    background: #fff;
    margin-right: 20px;
  }

  div.incomming div.incomeTitle {
    margin-bottom: 20px
  }

  div.incomming span.title {
    font-weight: bold
  }

  div.incomming span.title small {
    font-weight: normal;
    margin-left: 6px;
    /* color: #9e9696; */
    color: #bbb;
    font-size: 12px;
  }

  div.incomming span.detail_right {
    float: right;
    cursor: pointer;
    color:gray;font-weight:normal;
  }

  div.mounthIncoming {
    background: #fff;
    color: #fff;
  }

  div.dayIncoming {
    background: rgb(167, 234, 94);
    color: #fff;
  }

  div.statuAndData {
    padding: 20px 15px 100% 15px;
    background: #fff;
    margin-right: 20px;
    border-bottom: none;
    margin-bottom: 20px;
  }

  span.income_time {
    font-weight: bold;
  }

  span.income_detail {
    cursor: pointer;
  }

  div.status {
    background: #ffc0cb;
    padding: 0;
  }

  div.status_title,
  div.datas_title {
    background: #fff;
    line-height: 40px;
    font-weight: normal;
    color: #000
  }

  div.status_title span,
  div.datas_title span {
    margin-left: 10px;
  }

  div.datas_title span.data_display {
    font-weight: bold;
    margin-left: 0;
  }

  div.datas_title span.data_display small {
    margin-left: 5px;
    color: #bbb;
    font-weight: normal;
  }

  div.status_title span.arrow,
  div.datas_title span.arrow {
    margin: 0 10px 0 0;
    float: right;
    cursor: pointer;
    color:gray;font-weight:normal;
  }

  div.status div.list ul li {
    list-style-type: none;
    background: #a7ea5e;
    color: #fff;
    line-height: 30px;
    height: 30px;
    padding: 5px 0;
    border-bottom: 1px dashed #fff;
  }

  div.status div.list ul li:nth-last-child(1) {
    border-bottom: none
  }

  div.status div.list ul li div.el-col-12 {
    padding: 0 10px 0 0;
    text-align: right;
  }

  div.status div.list ul li div.el-col-6:nth-child(1) {
    padding-left: 10px;
  }

  div.datas {
    padding: 0
  }

  div.Histogram {
    width: 100%;
    background: #fff;
  }

  div.settlementInfo {
    background: #fff;
    line-height: 40px;
    height: 40px;
    padding: 5px 10px;
    color: #fff;
  }

  div.settlementInfo button.withdrawal {
    float: right;
    margin-right: 20px;
  }

  div.mapWrap {
    width: 100%;
    height: 500px;
  }

  div.mapHeader_content {
    padding: 20px 20px 0 20px;
    background: #fff;
    margin-right: 20px;
  }

  div.mapTitle {
    background: #fff;
    color: #444;
  }

  div.mapTitle span.motionMap {
    font-weight: bold;
  }

  div.mapTitle span.motionMap small {
    font-weight: normal;
  }

  div.selectPlace {
    margin-bottom: 10px;
    padding-left: 10px;
  }

  div.selectPlace address {
    font-style: normal;
    display: inline;
    font-size: 14px;
    margin-right: 8px;
  }

  div.selectPlace div.citys {
    display: inline-block;
    /* width: 1000px; */
    vertical-align: top;
    margin-top: -7px;
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
</style>
<script>
import $ from 'jquery'
import { host } from '../../../config/index.js'
import request from 'superagent'
import moment from 'moment'
import incomingVueChart from '../../../components/highchartsIncoming.vue'
import myCanvas from '../../../components/highChartAllData.vue'
// import Gamp from '../../../components/map.vue'
import { siblings } from '../../../../utils/index.js'
export default {
  data: function () {
    return {
      status: [
        {
          money: 99,
          countNum: 1011,
          time: '2017-01-01 10:01:01'

        },
        {
          money: 199,
          countNum: 1111,
          time: '2017-02-02 10:01:01'

        },
        {
          money: 299,
          countNum: 1211,
          time: '2017-03-03 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        }
      ],
      cityList: []
    }
  },
  components: {
    myCanvas,
    // Gamp,
    incomingVueChart
  },
  mounted() {
    $(".sign").removeClass('is-active')
    $('.sign[name="10"]').addClass('is-active')
    document.title="蜜蜂出行加盟商管理平台"
    this.getCityList()
  },
  methods: {
    handleClick(e) {
      var elems = siblings(e.target)
      for (var i = 0; i < elems.length; i++) {
        elems[i].setAttribute('class', 'city')
      }
      e.target.setAttribute('class', 'city active')
      this.$router.push({ query: {'cityId': $('.citys span.active').attr('myId')}})
    },
    getCityList() {
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
            this.cityList = JSON.parse(res.text).data
          }
        })
    }
  }
}
</script>
