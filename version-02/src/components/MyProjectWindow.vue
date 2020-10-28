<template>
<div>
    <div class="card my-project-window">
         <div class="card-header navbar navbar-expand-sm" id="projectwindow-navbar">
              <div class="navbar-brand">
                  {{Project.name}}
              </div>

              <div class="collapse navbar-collapse justify-content-between" >
                        <div class="p-0 m-0 mynav-title-block">
                            <div class="nav-item">
                                <div class="nav-link">
                                    {{Project.body.currentNode.title}}
                                </div>
                            </div>
                            <div class="nav-item" v-for="(child ,index ) in Project.body.currentNode.child " :key="index">
                                 <div class="nav-link">
                                     {{child.title}}
                                 </div>
                            </div>
                        </div>
                        <div class="p-0 m-0 mynav-tool-block btn-group">     
                             <button type="button" class="btn btn-info" @click="onBackToRoot">
                                 Root
                             </button>
                             <button type="button" class="btn btn-info" @click="onBackToPrevious">
                                 Previous
                             </button> 
                             <button type="button" class="btn btn-info" data-toggle="modal" data-target="#projectadd" @addCurrentChild=" onAddCurrentChild">
                                 Add
                             </button>
                             <button type="button" class="btn btn-info" data-toggle="modal" data-target="#projectchange">
                                 Change 
                              </button> 
                             <button type="button" class="btn btn-info" @click="emit_onSwitchProject_signal">
                                 Close
                             </button>   
                        </div>
              </div>
         </div>
         <div class="card-body scroll " data-target="#projectwindow-navbar">
             <div>
                  <h5>{{Project.body.currentNode.title}}</h5>
                  <p>{{Project.body.currentNode.context}} </p>
             </div>
             <div v-for="(child , index) in Project.body.currentNode.child" :key="index">
                 <h5 class="card-title" @click="onGoToChild(index)">
                     {{child.title}}
                     <span v-if="child.child.length ===0 " @click="onCompletLeaf(index)">Complet </span>
                 </h5>  
                 <p class="card-text">
                     {{child.context}}
                  </p>
                 <hr>  
             </div> 
         </div>
         <div class="card-footer">
              <span>{{"Completness : " + Project.body.currentNode.completeness}}</span>
         </div>

    </div>
     <ProjectAddModal id="projectadd"
       @addCurrentChild="onAddCurrentChild"></ProjectAddModal>
    <ProjectChangeModal id="projectchange"
       @changeCurrentCocntent="onChangeCurrentContent"></ProjectChangeModal>   

 </div>   
</template>

<script>
import ProjectAddModal from "./Project-Modal/ProjectAddModal.vue"
import ProjectChangeModal from "./Project-Modal/ProjectChangeModal.vue"


export default {
   name:"MyProjectWindow",
   props:["Project"],
   components:{
       ProjectAddModal,
       ProjectChangeModal 
   },
   data: function(){
      return {
          Tmp:{
          title:"",
          context:"",
        }
      }
   },
   created(){
     // console.log(this.Project);
   },
   methods:{
       
       emit_onSwitchProject_signal(){
          this.$emit("switchProject");
       },
       onCompletLeaf(index){
           this.Project.body.completLeaf(index,1);
       },
       /* Done */
       onBackToRoot(){
         this.Project.body.backToRoot();
       },
       /* Done -need test */
       onBackToPrevious(){
         this.Project.body.backToFather();
       },
       /* Done*/
       onGoToChild(index){
           if(this.Project.body.current.child[index].child.length !==0)
             this.Project.body.currentNode=this.Project.body.currentNode.child[index];         
       },

       /* Done -need test */
       onChangeCurrentContent(TmpData){
           console.log(TmpData);
           this.Project.body.changeCurrentContent(TmpData.title, TmpData.content);
       },
       /* Done -need test */
       onAddCurrentChild(TmpData){
           console.log("in project window", TmpData);
           console.log(this.Project.body)
           this.Project.body.addCurrentChild(TmpData.title,TmpData.content);
       },
   }
}
</script>

<style scoped>
.my-project-window{
    max-width: 700px;
    min-height: 420px;
    margin: auto;
    background: #2b4450;
    color : #dfebed;
    border-radius: 4px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, .3);
    font-family: 'Roboto', sans-serif;
}

.mynav-title-block{
    width: 150px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
}
.mynav-tool-block{
    display: flex;
    flex-direction: row;
}
.my-project-window-body{
    max-height: 400px;
}
</style>