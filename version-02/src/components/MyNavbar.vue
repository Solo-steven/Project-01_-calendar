<template>
     <div class="navbar navbar-expand-sm navbar-dark bg-dark">
          <a href="#" class="navbar-brand">W</a>
          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarlist">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarlist">
            <ul class="navbar-nav">
                <li class="nav-item">
                      <span type="button" class="nav-link" data-toggle="collapse"  data-target="#list" >List</span>
                </li>
                <li class="nav-item">
                    <span type="button" class="nav-link" data-toggle="modal" data-target="#addevent">Add</span>
                </li>
                <li class="nav-item">
                    <span type="button" class="nav-link" data-toggle="modal" data-target="#deleteevent">Delete</span>
                </li>
                <li class="nav-item">
                    <span type="button" class="nav-link" data-toggle="modal" data-target="#modifyevent">Modify</span>
                </li>
            </ul>   
        </div>
    </div> 
</template>

<script>
export default {
    name: 'MyNavbar',
}
</script>

<style scoped>


</style>