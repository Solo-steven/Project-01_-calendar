<template>
    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                     <div class="modal-title">
                         New Item
                     </div>
                     <button type="button" class="close" data-dismiss="modal" >
                      <span >&times;</span>
                    </button>
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
                    <button type="button" class="btn btn-primary" data-dismiss="modal" 
                     @click="emit_addCurrentChild_signal()"  >
                       Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"ProjectAddModal",
    data: function(){
         return{
              TmpData:{
                  title:"",
                  content:"",
              }
         }
    },
    methods: {
        emit_addCurrentChild_signal(){
            this.$emit("addCurrentChild", this.TmpData);
        }
    }

}
</script>

<style scoped>
 
</style>