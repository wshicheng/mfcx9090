<template>
  <div class="cityList">
      <ul>
          <li @click="sendCityToParent"  v-for="list of cityList" :cityId="list.code" v-bind:key="list.id" v-text="list.cityName"></li>
      </ul>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      cityList: [
        
      ],
      cityCodeList:[],
    };
  },
  props:["joinCity"],
  created:function(){
      this.cityList = this.joinCity
  },
  methods:{
      sendCityToParent(e){
         if(e.target.getAttribute('class')){
             e.target.setAttribute('class','')
            if(this.cityCodeList.length>0){
                var index = this.cityCodeList.indexOf(e.target.getAttribute('cityId'))
                if(index!=-1){
                    this.cityCodeList.splice(index,1)
                }
               
            }
         }else{
            
              e.target.setAttribute('class','active')
              this.cityCodeList.push(e.target.getAttribute('cityId'))
            
         }
         this.$emit('listenToChildEvetn',[...this.cityCodeList])
          
      }
  }
};
</script>
<style scoped >
    div.cityList ul{height:40px;}
    div.cityList ul li{cursor:pointer; float:left;list-style: none;width:80px;height:30px;line-height:30px;text-align:center;border:1px solid #ccc;border-radius:4px;margin-right:5px;}
    div.cityList ul li.active{color:orange;border:1px solid orange}
</style>

