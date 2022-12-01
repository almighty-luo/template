<template>
    <svg fill="#000">
        <use xlink:href="#a"/>
    </svg>
</template>

<script>
const svgList = require.context('@/assets/svg', true, /\.svg$/)
svgList.keys().map(svgList)
</script>