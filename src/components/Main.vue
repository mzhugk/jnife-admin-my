<template>
	<section>
    <h1>Welcome back! {{user}}2</h1>
    <div id='example-3'>
      <input type="checkbox" id="jack" value="Jack1" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John2" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike3" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
    </div>
    <input
      id="d1"
      type="checkbox"
      v-model="toggle"
      true-value="yes"
      false-value="no"
    >2323
    <div>{{toggle}}</div>
	</section>
</template>

<script>
	export default {
	    data(){
	        return{
	            user:sessionStorage.getItem("user"),
              checkedNames: ['Jack1','Mike3'],
              toggle:''
          }
      }
	}

</script>

