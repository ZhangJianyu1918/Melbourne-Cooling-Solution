<template>
    <div class="container mx-auto p-6">
      <!-- Back button and header group -->
      <div class="mb-8">
        <el-button type="text" icon="el-icon-arrow-left" @click="$router.push('/community-support')">
          Back to Community Support
        </el-button>
        <h1 class="text-2xl md:text-3xl font-bold text-red-600 mt-4 flex items-center">
          <el-avatar icon="el-icon-phone" size="small" class="mr-2 bg-red-100" />
          Emergency Contacts in Melbourne
        </h1>
        <el-divider />
      </div>
  
      <!-- Introduction card -->
      <el-card class="mb-6 intro-card" shadow="hover">
        <p class="text-gray-700">
          Below is a comprehensive list of essential emergency contacts in Melbourne.
        </p>
      </el-card>
  
      <!-- Content area using cards and collapse panels -->
      <el-collapse accordion class="custom-collapse">
        <!-- Immediate Emergencies -->
        <el-collapse-item name="1">
          <template #title>
            <div class="section-title">
              <i class="el-icon-warning"></i>
              <span class="text-xl font-semibold">Immediate Emergencies</span>
            </div>
          </template>
          <el-card class="mb-4 info-card" shadow="never">
            <p>
              <strong>Police, Fire, Ambulance:</strong> Dial
              <el-tag type="danger">000</el-tag> for immediate assistance in life-threatening or time-critical emergencies. This service is available 24/7 and is free of charge.
            </p>
          </el-card>
        </el-collapse-item>
  
        <!-- Non-Emergency Situations -->
        <el-collapse-item name="2">
          <template #title>
            <div class="section-title">
              <i class="el-icon-info"></i>
              <span class="text-xl font-semibold">Non-Emergency Situations</span>
            </div>
          </template>
          <el-card class="mb-4 info-card" shadow="never">
            <p>
              <strong>Police Assistance Line:</strong> Call
              <el-tag>131 444</el-tag> for non-urgent police matters such as reporting a crime that has already occurred, lost property, or general inquiries.
            </p>
          </el-card>
        </el-collapse-item>
  
        <!-- State Emergency Service (SES) -->
        <el-collapse-item name="3">
          <template #title>
            <div class="section-title">
              <i class="el-icon-cloudy"></i>
              <span class="text-xl font-semibold">State Emergency Service (SES)</span>
            </div>
          </template>
          <el-card class="mb-4 info-card" shadow="never">
            <p>
              <strong>Flood, Storm, and Earthquake Assistance:</strong> Contact SES at
              <el-tag>132 500</el-tag> for non-life-threatening situations related to natural disasters.
            </p>
          </el-card>
        </el-collapse-item>
  
        <!-- Crisis Support and Mental Health -->
        <el-collapse-item name="4">
          <template #title>
            <div class="section-title">
              <i class="el-icon-user"></i>
              <span class="text-xl font-semibold">Crisis Support and Mental Health</span>
            </div>
          </template>
          <el-card class="mb-4 info-card" shadow="never">
            <p>
              <strong>Lifeline:</strong> For 24/7 crisis support and suicide prevention services, call
              <el-tag>13 11 14</el-tag>.
            </p>
          </el-card>
        </el-collapse-item>
  
        <!-- Hospitals in Melbourne -->
        <el-collapse-item name="5">
          <template #title>
            <div class="section-title">
              <i class="el-icon-first-aid-kit"></i>
              <span class="text-xl font-semibold">Hospitals in Melbourne</span>
            </div>
          </template>
          <el-card class="mb-4 info-card" shadow="never">
            <el-descriptions border>
              <el-descriptions-item label="Royal Melbourne Hospital">
                <el-button type="primary" size="small" plain icon="el-icon-phone" @click="callNumber('+61 (3) 9342 7000')">
                  +61 (3) 9342 7000
                </el-button>
                <span class="ml-2 text-gray-600">Grattan St., Parkville</span>
              </el-descriptions-item>
              <el-descriptions-item label="St. Vincent's Hospital">
                <el-button type="primary" size="small" plain icon="el-icon-phone" @click="callNumber('+61 (3) 9288 2211')">
                  +61 (3) 9288 2211
                </el-button>
                <span class="ml-2 text-gray-600">Victoria Parade, Fitzroy</span>
              </el-descriptions-item>
              <el-descriptions-item label="Royal Women's Hospital">
                <el-button type="primary" size="small" plain icon="el-icon-phone" @click="callNumber('+61 (3) 8345 2000')">
                  +61 (3) 8345 2000
                </el-button>
                <span class="ml-2 text-gray-600">Grattan St & Flemington Rd, Parkville</span>
              </el-descriptions-item>
              <el-descriptions-item label="Royal Dental Hospital">
                <el-button type="primary" size="small" plain icon="el-icon-phone" @click="callNumber('(03) 9341 1000')">
                  (03) 9341 1000
                </el-button>
                <span class="ml-2 text-gray-600">720 Swanston St, Carlton</span>
              </el-descriptions-item>
              <el-descriptions-item label="The Alfred Hospital">
                <el-button type="primary" size="small" plain icon="el-icon-phone" @click="callNumber('+61 (3) 9276 2100')">
                  +61 (3) 9276 2100
                </el-button>
                <span class="ml-2 text-gray-600">Commercial Rd., Prahran</span>
              </el-descriptions-item>
              <el-descriptions-item label="Eye and Ear Hospital">
                <el-button type="primary" size="small" plain icon="el-icon-phone" @click="callNumber('+61 (3) 9929 8666')">
                  +61 (3) 9929 8666
                </el-button>
                <span class="ml-2 text-gray-600">32 Gisborne St., East Melbourne</span>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-collapse-item>
  
        <!-- Additional Resources -->
        <el-collapse-item name="6">
          <template #title>
            <div class="section-title">
              <i class="el-icon-phone"></i>
              <span class="text-xl font-semibold">Additional Resources</span>
            </div>
          </template>
          <el-card class="mb-4 info-card" shadow="never">
            <el-descriptions border>
              <el-descriptions-item label="VicEmergency Hotline">
                <el-button type="warning" size="small" plain icon="el-icon-phone" @click="callNumber('1800 226 226')">
                  1800 226 226
                </el-button>
              </el-descriptions-item>
              <el-descriptions-item label="National Security Hotline">
                <el-button type="danger" size="small" plain icon="el-icon-phone" @click="callNumber('1800 123 400')">
                  1800 123 400
                </el-button>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-collapse-item>
  
        <!-- Important Notes -->
        <el-collapse-item name="7">
          <template #title>
            <div class="section-title">
              <i class="el-icon-notebook-2"></i>
              <span class="text-xl font-semibold">Important Notes</span>
            </div>
          </template>
          <el-card class="mb-4 info-card" shadow="never">
            <p>
              <strong>Mobile Phones:</strong> Dial <el-tag>112</el-tag> — redirects to <strong>000</strong> in Australia.
            </p>
            <p>
              <strong>Hearing or Speech Impairments:</strong> Use National Relay Service by dialing <el-tag>106</el-tag>.
            </p>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </template>
  
  <script setup>
  const callNumber = (number) => {
    // window.location.href = `tel:${number}`;
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1000px;
    margin: auto;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .info-card {
    border-radius: 8px;
    background-color: #f9fafb;
  }
  
  .intro-card {
    background-color: #f0f9ff;
    border-left: 4px solid #0ea5e9;
  }
  
  /* Custom collapse panel styles */
  .custom-collapse :deep(.el-collapse-item__header) {
    background-color: #f8fafc;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  
  .custom-collapse :deep(.el-collapse-item__content) {
    padding: 10px 0;
  }
  
  /* Tag styles */
  .el-tag {
    border-radius: 16px;
    padding: 0 12px;
    margin-right: 8px;
  }
  </style>