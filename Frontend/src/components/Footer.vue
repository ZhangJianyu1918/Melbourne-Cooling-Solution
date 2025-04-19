<template>
  <div class="footer">
    <div class="footer-content">
      <p>Monash 2025 |
        <router-link to="/copyright">Copyright</router-link> and disclaimer
      </p>
    </div>
  </div>
</template>


<script>

</script>

<style scoped>
.footer {
  background-color: #19619E;
  color: white;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
}

.footer-content {
  font-weight: bold;
  text-align: center;
}

a {
  /* text-decoration: none; */
  /* Removes underline */
  color: inherit;
}

p {
  margin: none;
}
</style>