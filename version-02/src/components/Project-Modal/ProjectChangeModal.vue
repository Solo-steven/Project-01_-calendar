<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                   <div class="nodal-title">Change Content </div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                      <label>Title  :  </label>
                      <input type="text" class="form-control" v-model="TmpData.title">
                  </div>
                   <div class="form-group">
                       <label>Context : </label>
                       <input type="text" class="form-control" v-model="TmpData.content">
                   </div>
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-primary" @click="emit_changeCurrentContent_signal"> Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   name : "ProjectChngeModal",
   data : function (){
       return{
           TmpData:{
               title:"",
               content:""
           }
       }
   },
   methods:{
       onCheckLegalData(){
         if(this.TmpData.title ==="" || this.TmpData.content ==="")
         {
             return true;
         }
         return false;
       },
       emit_changeCurrentContent_signal(){
           console.log(this.TmpData);
           if(!this.onCheckLegalData())
           {
                 this.$emit("changeCurrentContent",this.TmpData);
                 return;
           }
       }
   }  
}
</script>

<style scoped>
  
</style>