<template>
  <div class="footer">
    <el-row :gutter="24">
      <el-col :span="9">
        <div>
          <h3>Our Social Media</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-white hover:text-gray-300">
              <i class="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" class="text-white hover:text-gray-300">
              <i class="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" class="text-white hover:text-gray-300">
              <i class="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" class="text-white hover:text-gray-300">
              <i class="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="footer-section">
          <h3 class="text-lg font-semibold mb-4">Footer Title 1</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline">Section 1.1</a></li>
            <li><a href="#" class="hover:underline">Section 1.2</a></li>
            <li><a href="#" class="hover:underline">Section 1.3</a></li>
            <li><a href="#" class="hover:underline">Section 1.4</a></li>
          </ul>
        </div>
      </el-col>
      <!-- Footer Title 2 -->
      <el-col :span="5">
        <div class="footer-section">
          <h3 class="text-lg font-semibold mb-4">Footer Title 2</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline">Section 2.1</a></li>
            <li><a href="#" class="hover:underline">Section 2.2</a></li>
            <li><a href="#" class="hover:underline">Section 2.3</a></li>
          </ul>
        </div>
      </el-col>

      <!-- Footer Title 3 -->
      <el-col :span="5">
        <div class="footer-section">
          <h3 class="text-lg font-semibold mb-4">Footer Title 3</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline">Section 3.1</a></li>
            <li><a href="#" class="hover:underline">Section 3.2</a></li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">

      <el-col :span="5" :offset="9">
        <!-- Copyright Section -->
        <div class="text-center mt-8">
          <p>Monash 2025 | Copyright and disclaimer</p>
        </div>
      </el-col>
      <el-col :span="5" :offset="5">
        <!-- Contact Us -->
        <div class="contact-us">
          <h3>Contact Us</h3>
          <p>Feedback Form</p>
          <p>+61 123 456 789</p>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>

</script>

<style scoped>
/* Tailwind is used in the template, but here's the equivalent CSS for reference */
.footer {
  background-color: #19619E;
  color: white;
}

.footer-section a,
.contact-us {
  color: white;
  text-decoration: none;
}
</style>