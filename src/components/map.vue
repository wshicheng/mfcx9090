<template>
 <div class="gmap">
    <div id="map-container"></div>
    <div class="menu" v-show="false">
      <div id="myPageTop">
        <div><i class="el-icon-search"></i><input id="tipinput" type="text" placeholder="请输入您想去的地方  "></div>
      </div>
      <div class="group-button">
        <el-button type="success" @click="heatmapShow">显示热力图</el-button>
        <el-button type="danger" @click="heatmapHide">关闭热力图</el-button>
      </div>
      <div class="drivingPanel" v-show="false">
          <div id="panel" v-show="isShowDriving"> </div>
          <div id="editPath">
            <el-row>
              <el-col :span="11">
                <el-input v-model="startDriving" placeholder="请输入起点"></el-input>
              </el-col>
              <el-col :span="2">
                <span>-</span>
              </el-col>
              <el-col :span="11">
                <el-input v-model="endDriving" placeholder="请输入终点"></el-input>
              </el-col>
            </el-row>
            
          </div>
          <div class="group-button">
            <el-button type="success" @click="queryDrivingPath">查询</el-button>
            <el-button type="success" @click="isShowDriving=true">显示路线</el-button>
            <el-button type="danger" @click="isShowDriving=false">关闭路线</el-button>
          </div>
      </div>
      <div class="showCurrentCity" v-show="true">
        <el-button type="success" @click="showCurrentCity">显示当前城市</el-button>
      </div>
    </div>
 </div>
</template>
<style>
div.gmap{
    height: 800px;
    position: relative;
    left: 0px;
    top: 0px;
    padding: 20px 20px 20px 20px;
    background: #fff;
    margin-right: 20px;
    // border: 1px solid #e7ecf1;
    border: 1px solid #fff;
    border-top: none;
}

#map-container {
    width:100%;
    height:100%;
}
  div.menu{position:absolute;width:30%;left:70%;top:0;bottom:0;right:0;z-index:3000;}
  div#myPageTop{
    padding:0 15px;
    height: 50px;
    width:80%;
    box-sizing:border-box;
    margin:0 auto;
    border-radius:5px;
    background: rgba(0, 0, 0, .3)
  }
  div#myPageTop div{height:50px;padding-top: 10px;box-sizing:border-box;}
  div#myPageTop i{
      height: 32px;
      line-height: 32px;
      margin-right:-1px;
      border: 1px solid rgba(0,0,0,.5); 
      display: inline-block;
      padding: 0 10px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      width: 30px;
      overflow: hidden;
      box-sizing: border-box;
      vertical-align: middle;
      background:#fff;
      color:#000;
    }
    div#myPageTop input{line-height: 30px;
    height: 30px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-indent: 5px;
    outline: none;
    border: 1px solid rgba(0,0,0,.5);}
    div.group-button{margin-top:20px;}
    div#panel{ 
            position: relative;
            background-color: white;
            max-height: 90%;
            overflow-y: auto;
           width:90%;
           margin:0 auto;
           top:10px;}   
    div#editPath{margin-top: 10px;}
    div#editPath div.el-col-2 span{line-height: 32px}
    div.showCurrentCity{margin-top:10px;}
    div.amap-copyright{display: none!important;}
    .amap-logo img{display:none;}
</style>
<script>
import $ from 'jquery'
import AMap from 'AMap'
var map, auto, placeSearch, heatmap, driving, citysearch
// 输入提示
var autoOptions = {
  input: 'tipinput'
}
export default {
  data: function () {
    return {
      isShowDriving: false,
      startDriving: '',
      endDriving: '',
      city: '北京'

    }
  },
  mounted: function () {
    this.init()
    /** this.showCurrentCity() **/
  },
  methods: {
    init () {
      map = new AMap.Map('map-container', {
        zoom: 13,
        center: [116.397428, 39.90923],
        resizeEnable: true
      })
      // 安装插件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Heatmap', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Driving', 'AMap.Geolocation', 'AMap.CitySearch'], function () {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.Autocomplete())
        map.addControl(new AMap.PlaceSearch())
        map.addControl(new AMap.Driving())
        map.addControl(new AMap.Geolocation())
        map.addControl(new AMap.CitySearch())
        // 热力图数据这里我用的模拟数据（北京部分公园数据）
        var heatmapData = [
            {'lng': 116.191031, 'lat': 39.988585, 'count': 10},
            {'lng': 116.389275, 'lat': 39.925818, 'count': 11},
            {'lng': 116.287444, 'lat': 39.810742, 'count': 12},
            {'lng': 116.481707, 'lat': 39.940089, 'count': 13},
            {'lng': 116.410588, 'lat': 39.880172, 'count': 14},
            {'lng': 116.394816, 'lat': 39.91181, 'count': 15},
            {'lng': 116.416002, 'lat': 39.952917, 'count': 16},
            {'lng': 116.39671, 'lat': 39.924903, 'count': 17},
            {'lng': 116.180816, 'lat': 39.957553, 'count': 18},
            {'lng': 116.382035, 'lat': 39.874114, 'count': 19},
            {'lng': 116.316648, 'lat': 39.914529, 'count': 20},
            {'lng': 116.395803, 'lat': 39.908556, 'count': 21},
            {'lng': 116.74553, 'lat': 39.875916, 'count': 22},
            {'lng': 116.352289, 'lat': 39.916475, 'count': 23},
            {'lng': 116.441548, 'lat': 39.878262, 'count': 24},
            {'lng': 116.318947, 'lat': 39.942735, 'count': 25},
            {'lng': 116.382585, 'lat': 39.941949, 'count': 26},
            {'lng': 116.42042, 'lat': 39.884017, 'count': 27},
            {'lng': 116.31744, 'lat': 39.892561, 'count': 28},
            {'lng': 116.407059, 'lat': 39.912438, 'count': 29},
            {'lng': 116.412351, 'lat': 39.888082, 'count': 30},
            {'lng': 116.444341, 'lat': 39.915891, 'count': 31},
            {'lng': 116.335385, 'lat': 39.741756, 'count': 32},
            {'lng': 116.3926, 'lat': 40.008733, 'count': 33},
            {'lng': 116.389731, 'lat': 39.92292, 'count': 34},
            {'lng': 116.413371, 'lat': 39.874483, 'count': 35},
            {'lng': 116.199752, 'lat': 39.911717, 'count': 36},
            {'lng': 116.278472, 'lat': 40.254994, 'count': 37},
            {'lng': 116.464252, 'lat': 39.925828, 'count': 38},
            {'lng': 116.479475, 'lat': 39.937945, 'count': 39},
            {'lng': 116.415599, 'lat': 39.956902, 'count': 40},
            {'lng': 116.355675, 'lat': 39.870089, 'count': 41},
            {'lng': 116.295267, 'lat': 39.987171, 'count': 42},
            {'lng': 116.323634, 'lat': 39.911692, 'count': 43},
            {'lng': 116.692769, 'lat': 40.173307, 'count': 44},
            {'lng': 116.287888, 'lat': 39.928531, 'count': 45},
            {'lng': 116.386502, 'lat': 39.922747, 'count': 46},
            {'lng': 116.236773, 'lat': 40.218341, 'count': 47},
            {'lng': 116.490636, 'lat': 39.804253, 'count': 48},
            {'lng': 116.391095, 'lat': 39.925791, 'count': 49},
            {'lng': 116.472402, 'lat': 39.769178, 'count': 50},
            {'lng': 116.38657, 'lat': 39.956731, 'count': 51},
            {'lng': 116.427536, 'lat': 39.943671, 'count': 52},
            {'lng': 116.374547, 'lat': 39.967588, 'count': 53},
            {'lng': 116.380383, 'lat': 39.871634, 'count': 54},
            {'lng': 116.376092, 'lat': 39.965485, 'count': 55},
            {'lng': 116.352424, 'lat': 39.91811, 'count': 56},
            {'lng': 116.020157, 'lat': 40.348526, 'count': 57},
            {'lng': 116.416201, 'lat': 39.951736, 'count': 58},
            {'lng': 116.405392, 'lat': 39.908738, 'count': 59},
            {'lng': 116.49238, 'lat': 39.926248, 'count': 60},
            {'lng': 116.389282, 'lat': 39.988391, 'count': 61},
            {'lng': 116.396683, 'lat': 39.923487, 'count': 62},
            {'lng': 116.41718, 'lat': 39.905213, 'count': 63},
            {'lng': 116.321512, 'lat': 39.913192, 'count': 64},
            {'lng': 116.260028, 'lat': 40.03353, 'count': 65},
            {'lng': 116.394846, 'lat': 39.911168, 'count': 66},
            {'lng': 116.374767, 'lat': 39.96608, 'count': 67},
            {'lng': 116.6841, 'lat': 39.909762, 'count': 68},
            {'lng': 116.3838, 'lat': 39.95811, 'count': 69},
            {'lng': 116.39243, 'lat': 40.01143, 'count': 70},
            {'lng': 116.661912, 'lat': 40.121137, 'count': 71},
            {'lng': 116.333056, 'lat': 39.90123, 'count': 72},
            {'lng': 116.484839, 'lat': 39.881729, 'count': 73},
            {'lng': 116.360923, 'lat': 39.935745, 'count': 74},
            {'lng': 116.408531, 'lat': 39.953194, 'count': 75},
            {'lng': 116.417916, 'lat': 39.954029, 'count': 76},
            {'lng': 116.412215, 'lat': 39.992282, 'count': 77},
            {'lng': 116.181532, 'lat': 40.048762, 'count': 78},
            {'lng': 116.434848, 'lat': 40.070463, 'count': 79},
            {'lng': 116.385039, 'lat': 39.956937, 'count': 80},
            {'lng': 116.755067, 'lat': 39.854499, 'count': 81},
            {'lng': 116.396061, 'lat': 39.912841, 'count': 82},
            {'lng': 116.474303, 'lat': 39.971398, 'count': 83},
            {'lng': 116.376262, 'lat': 39.85811, 'count': 84},
            {'lng': 116.403783, 'lat': 39.954469, 'count': 85},
            {'lng': 116.339136, 'lat': 39.729159, 'count': 86},
            {'lng': 116.240159, 'lat': 39.947003, 'count': 87},
            {'lng': 117.107541, 'lat': 40.141457, 'count': 88},
            {'lng': 116.341813, 'lat': 40.078786, 'count': 89},
            {'lng': 116.320648, 'lat': 39.706455, 'count': 90},
            {'lng': 116.402566, 'lat': 39.960873, 'count': 91},
            {'lng': 116.849261, 'lat': 40.402999, 'count': 92},
            {'lng': 116.521064, 'lat': 39.834187, 'count': 93},
            {'lng': 116.329942, 'lat': 39.925327, 'count': 94},
            {'lng': 116.479852, 'lat': 39.974856, 'count': 95},
            {'lng': 116.399185, 'lat': 39.925736, 'count': 96},
            {'lng': 116.193166, 'lat': 39.911953, 'count': 1},
            {'lng': 116.400916, 'lat': 39.870614, 'count': 2},
            {'lng': 116.518041, 'lat': 39.956615, 'count': 3},
            {'lng': 116.388981, 'lat': 39.997716, 'count': 4},
            {'lng': 116.285852, 'lat': 39.863497, 'count': 5},
            {'lng': 116.294167, 'lat': 39.884599, 'count': 6},
            {'lng': 116.394235, 'lat': 39.996845, 'count': 7},
            {'lng': 116.32471, 'lat': 39.970486, 'count': 8},
            {'lng': 116.496828, 'lat': 39.99335, 'count': 9},
            {'lng': 116.482534, 'lat': 39.934086, 'count': 10},
            {'lng': 116.454662, 'lat': 39.974981, 'count': 11},
            {'lng': 116.387076, 'lat': 39.87631, 'count': 12},
            {'lng': 116.433341, 'lat': 39.92803, 'count': 13},
            {'lng': 116.382196, 'lat': 39.941606, 'count': 14},
            {'lng': 116.244286, 'lat': 39.82905, 'count': 15},
            {'lng': 116.566672, 'lat': 40.176097, 'count': 16},
            {'lng': 116.686862, 'lat': 39.908507, 'count': 17},
            {'lng': 117.240166, 'lat': 40.175796, 'count': 18},
            {'lng': 116.428661, 'lat': 39.866958, 'count': 19},
            {'lng': 116.443292, 'lat': 39.917447, 'count': 20},
            {'lng': 116.356538, 'lat': 39.926711, 'count': 21},
            {'lng': 116.194086, 'lat': 39.912242, 'count': 22},
            {'lng': 116.379861, 'lat': 39.971831, 'count': 23},
            {'lng': 116.377966, 'lat': 39.874647, 'count': 24},
            {'lng': 116.466778, 'lat': 39.926304, 'count': 25},
            {'lng': 116.692078, 'lat': 40.170197, 'count': 26},
            {'lng': 116.428651, 'lat': 39.94275, 'count': 27},
            {'lng': 116.322655, 'lat': 39.939517, 'count': 28},
            {'lng': 116.445601, 'lat': 39.98439, 'count': 29},
            {'lng': 116.662833, 'lat': 39.912238, 'count': 30},
            {'lng': 116.394183, 'lat': 39.925557, 'count': 31},
            {'lng': 116.312788, 'lat': 39.860017, 'count': 32},
            {'lng': 116.104708, 'lat': 40.065563, 'count': 33},
            {'lng': 116.204443, 'lat': 39.938295, 'count': 34},
            {'lng': 116.310917, 'lat': 39.89381, 'count': 35},
            {'lng': 116.265851, 'lat': 39.834247, 'count': 36},
            {'lng': 116.33501, 'lat': 39.742507, 'count': 37},
            {'lng': 116.397519, 'lat': 39.99794, 'count': 38},
            {'lng': 116.441252, 'lat': 39.915566, 'count': 39},
            {'lng': 116.441898, 'lat': 39.856454, 'count': 40},
            {'lng': 116.446552, 'lat': 39.946418, 'count': 41},
            {'lng': 116.359761, 'lat': 39.895327, 'count': 42},
            {'lng': 116.349168, 'lat': 39.893551, 'count': 43},
            {'lng': 116.476819, 'lat': 39.94388, 'count': 44},
            {'lng': 116.29912, 'lat': 39.988433, 'count': 45},
            {'lng': 116.467912, 'lat': 39.770524, 'count': 46},
            {'lng': 116.382134, 'lat': 39.862204, 'count': 47},
            {'lng': 116.483378, 'lat': 39.93431, 'count': 48},
            {'lng': 116.35395, 'lat': 39.910738, 'count': 49},
            {'lng': 116.398771, 'lat': 39.976433, 'count': 50},
            {'lng': 116.462189, 'lat': 39.925864, 'count': 51},
            {'lng': 116.378957, 'lat': 39.806676, 'count': 52},
            {'lng': 116.334199, 'lat': 39.900985, 'count': 53},
            {'lng': 116.443961, 'lat': 39.913511, 'count': 54},
            {'lng': 116.388829, 'lat': 39.95053, 'count': 55},
            {'lng': 116.319655, 'lat': 39.892339, 'count': 56},
            {'lng': 117.431959, 'lat': 40.630521, 'count': 57},
            {'lng': 117.108914, 'lat': 40.140406, 'count': 58},
            {'lng': 116.43019, 'lat': 39.880486, 'count': 59},
            {'lng': 116.250698, 'lat': 39.907186, 'count': 60},
            {'lng': 116.341065, 'lat': 39.766082, 'count': 61},
            {'lng': 116.290335, 'lat': 39.812431, 'count': 62},
            {'lng': 116.360813, 'lat': 39.936362, 'count': 63},
            {'lng': 116.400282, 'lat': 39.995027, 'count': 64},
            {'lng': 116.317257, 'lat': 39.889092, 'count': 65},
            {'lng': 116.482537, 'lat': 39.954978, 'count': 66},
            {'lng': 116.38496, 'lat': 39.954428, 'count': 67},
            {'lng': 116.391803, 'lat': 39.911587, 'count': 68},
            {'lng': 116.4266, 'lat': 39.867228, 'count': 69},
            {'lng': 116.145997, 'lat': 39.790856, 'count': 70},
            {'lng': 116.430265, 'lat': 39.867451, 'count': 71},
            {'lng': 116.315479, 'lat': 39.940668, 'count': 72},
            {'lng': 116.359393, 'lat': 39.975431, 'count': 73},
            {'lng': 116.382347, 'lat': 39.968935, 'count': 74},
            {'lng': 115.987169, 'lat': 40.454625, 'count': 75},
            {'lng': 116.489292, 'lat': 39.931242, 'count': 76},
            {'lng': 116.368238, 'lat': 39.879807, 'count': 77},
            {'lng': 116.493761, 'lat': 39.923885, 'count': 78},
            {'lng': 116.53666, 'lat': 39.8778, 'count': 79},
            {'lng': 116.501743, 'lat': 39.79602, 'count': 80},
            {'lng': 116.582818, 'lat': 39.932646, 'count': 81},
            {'lng': 116.417364, 'lat': 39.869292, 'count': 82},
            {'lng': 116.354305, 'lat': 39.872022, 'count': 83},
            {'lng': 116.375162, 'lat': 40.01344, 'count': 84},
            {'lng': 116.400523, 'lat': 39.881031, 'count': 85},
            {'lng': 116.315365, 'lat': 39.945005, 'count': 86},
            {'lng': 116.44088, 'lat': 39.810753, 'count': 87},
            {'lng': 116.679285, 'lat': 39.916527, 'count': 88},
            {'lng': 116.483694, 'lat': 39.946929, 'count': 89},
            {'lng': 116.341678, 'lat': 40.080021, 'count': 90},
            {'lng': 116.017167, 'lat': 39.889175, 'count': 91},
            {'lng': 116.454692, 'lat': 39.954167, 'count': 92},
            {'lng': 116.410129, 'lat': 40.050952, 'count': 93},
            {'lng': 116.418556, 'lat': 39.872365, 'count': 94},
            {'lng': 116.25432, 'lat': 40.142367, 'count': 95},
            {'lng': 116.658763, 'lat': 39.891072, 'count': 96},
            {'lng': 116.305312, 'lat': 39.9953, 'count': 97},
            {'lng': 116.388761, 'lat': 39.951259, 'count': 98},
            {'lng': 116.68017, 'lat': 39.873413, 'count': 99},
            {'lng': 116.090539, 'lat': 39.796301, 'count': 1},
            {'lng': 116.380305, 'lat': 39.78354, 'count': 2},
            {'lng': 116.348831, 'lat': 40.022543, 'count': 3},
            {'lng': 116.438133, 'lat': 39.960988, 'count': 4},
            {'lng': 116.199587, 'lat': 39.911, 'count': 5},
            {'lng': 116.081743, 'lat': 39.788321, 'count': 6},
            {'lng': 117.24044, 'lat': 40.1752, 'count': 7}
        ]
        // 初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
          radius: 25, // 给定半径
          opacity: [0, 0.8],
          // 颜色配置
          gradient: {
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red'
          }
        })
        // 设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: heatmapData,
          max: 100
        })
      })
      auto = new AMap.Autocomplete(autoOptions)
      // 构造地点查询类
      placeSearch = new AMap.PlaceSearch({
        map: map
      })
      // 注册监听，当选中某条记录 会触发
      AMap.event.addListener(auto, 'select', this.selectCity)
      // 构造驾车路线导航类
      driving = new AMap.Driving({
        map: map,
        panel: 'panel'
      })
    },
    heatmapShow () {
      heatmap.show()
    },
    heatmapHide () {
      heatmap.hide()
    },
    selectCity (e) {
      placeSearch.setCity(e.poi.adcode)
      // 关键字查询
      placeSearch.search(e.poi.name)
    },
    queryDrivingPath () {
      // 根据起终点名称规划驾车导航路线
      if (this.isShowDriving === '' || this.endDriving === '') {
        alert('起点或终点不能为空！')
      } else {
        driving.search([
                  {keyword: this.startDriving, city: this.city},
                  {keyword: this.endDriving, city: this.city}
        ])
        this.isShowDriving = true
        this.startDriving = ''
        this.endDriving = ''
      }
    },
    showCurrentCity () {
      // 实例化城市查询类
      citysearch = new AMap.CitySearch()
      // 自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            var cityinfo = result.city
            var citybounds = result.bounds
            console.log('您当前所在城市：' + cityinfo)
            // 地图显示当前城市
            map.setBounds(citybounds)
          }
        } else {
          console.log(result.info)
        }
      })
    }
  }
}
</script>
