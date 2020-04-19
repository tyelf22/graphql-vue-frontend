<template>
    <div>
        {{test}}
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            test: 'This is a test' 
        }
    },
    computed: {
        ...mapState(['playerStore'])
    },
    created() {
        console.log(this.playerStore)
    } 
    
    
}
</script>

<style scoped>

</style>