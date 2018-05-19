<template>
    <div>
        <p>{{value}}</p>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                // localValue: this.value,
            }
        },
        props: ['value'],
    }
</script>