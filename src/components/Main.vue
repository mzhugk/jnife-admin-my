<template>
	<section>
    <h1>Welcome back! {{user}}</h1>
	</section>
</template>

<script>
	export default {
	    data(){
	        return{
	            user:sessionStorage.getItem("user"),
          }
      }
	}

</script>

