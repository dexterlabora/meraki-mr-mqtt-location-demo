<template>
  <vuetable ref="vuetable"
    
    :fields="['clientMac', 'recentMrMac', 'recentRSSI', 'ts']"
    :api-mode="false"
    
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2'

export default {
  props:["rows", "columns"],
  components: {
    Vuetable
  },
  // data: function(){
  //   return{
  //     rowData: []
  //   }
  // },
  computed:{
    rowData: function(){

      return this.rows
    },
    // watchMe: function(){
    //   if(!this.rows){return}
    //   return JSON.toString(this.rows)
    // }
  },
  // mounted: function(){
  //   setInterval(()=> {
  //     this.$refs.vuetable.refresh()
  //     this.$refs.vuetable.setData(this.rowData)

  //     }, 1000)
  // },
  watch: {
    "rows": function(){
      //this.$refs.vuetable.setData(this.rowData)
      // this.$refs.vuetable.reload()
      let self = this
   this.$nextTick( () => {
          //self.$refs.vuetable.tableFields = self.config.table.fields
         // self.$refs.vuetable.setData([])
          self.$refs.vuetable.setData(this.rows)
    })
      console.log("setting rows")
    }
  },
  // methods:{
  //   setData: function(){
  //     this.rowData = this.rows;
  //   }
  // }
}
</script>