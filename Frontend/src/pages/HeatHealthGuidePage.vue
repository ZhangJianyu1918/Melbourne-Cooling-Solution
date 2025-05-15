<template>
    <div class="container">
        <el-button type="text" @click="$router.push('/personal-cooling-guide')"
            style="font: 1.2em sans-serif; padding-top: 30px;">
            <el-icon class="mr-1"><arrow-left /></el-icon>
            Go back to Personal Guide Page
        </el-button>
        <div class="title">
            <div style="height: 30px;"></div>
            <h1 style="font-family: Abril Fatface; font-weight: 1000; color: #19619E;">My Heat Health</h1>
            <div style="height: 10px;"></div>
            <p>Stay ahead of the heat with personalised health tips. This tool helps you track hydration, spot early
                signs
                of heat stress, and get advice to stay safe during hot weather. Fill in the form to get your advice!</p>
            <div style="height: 10px;"></div>
        </div>
        <div>
            <el-row :gutter="20" justify="start" align="top">
                <el-col :span="11" style="background-color: #f5faff; padding: 20px; border-radius: 16px; margin: auto;">
                    <el-form :model="form">
                        <!-- Age -->
                        <div style="margin-bottom: 16px;">
                            <!-- <el-form-item label="Age"> -->
                            <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px; color: #175cd3;">Age
                            </div>
                            <el-input v-model="form.age" type="number"
                                placeholder="Enter your age as a number"></el-input>
                            <!-- </el-form-item> -->
                        </div>

                        <!-- Gender -->
                        <div style="margin-bottom: 16px;">
                            <!-- <el-form-item label="Gender"> -->
                            <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px; color: #175cd3;">Gender
                            </div>
                            <el-select v-model="form.gender" placeholder="Select from the options">
                                <el-option label="Male" value="male" />
                                <el-option label="Female" value="female" />
                            </el-select>
                            <!-- </el-form-item> -->
                        </div>

                        <!-- Daily Water Intake-->
                        <div style="margin-bottom: 16px;">
                            <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px; color: #175cd3;">Daily
                                Water Intake (1 Cup approximate 260ML)</div>
                            <!-- <el-form-item label="Daily Water Intake"> -->
                            <el-select v-model="form.dailyWaterIntake" placeholder="Select from the options">
                                <el-option label="0 Cup" value="0 Cup" />
                                <el-option label="1 Cup" value="1 Cup" />
                                <el-option label="2 Cups" value="2 Cups" />
                                <el-option label="3 Cups" value="3 Cups" />
                                <el-option label="4 Cups" value="4 Cups" />
                                <el-option label="5 Cups" value="5 Cups" />
                                <el-option label="6 Cups" value="6 Cups" />
                                <el-option label="7 and more Cups" value="6 Cup" />
                            </el-select>
                            <!-- </el-form-item> -->
                        </div>

                        <!-- Recent Symptom -->
                        <div style="margin-bottom: 16px;">
                            <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px; color: #175cd3;">Daily
                                Water Intake</div>
                            <!-- <el-form-item label="Recent Symptom"> -->
                            <el-select v-model="form.recentSymptom" placeholder="Select from the options">
                                <el-option label="Nothing" value="Nothing" />
                                <el-option label="Headaches" value="headaches" />
                                <el-option label="Having a Raised Body Temperature"
                                    value="having a raised body temperature" />
                                <el-option label="Sweating Heavily" value="sweating heavily" />
                                <!--<el-option label="Headaches" value="headaches" />
                                <el-option label="Fatigue, Weakness, And Restlessness"
                                    value="fatigue, weakness, and restlessness" />
                                <el-option label="Nausea And Vomiting" value="nausea and vomiting" />
                                <el-option label="Weak, Rapid Pulse" value="weak, rapid pulse" />
                                <el-option label="Poor Coordination" value="poor coordination" />
                                <el-option label="Anxiety" value="anxiety" /> -->
                                <el-option label="Having Flushed, Hot and Unusually Dry Skin"
                                    value="having flushed, hot and unusually dry skin" />
                                <el-option label="Being Extremely Thirsty" value="being extremely thirsty" />
                                <el-option label="Delirious" value="delirious" />
                            </el-select>
                        </div>

                        <!-- </el-form-item> -->
                        <el-form-item>
                            <el-button type="primary" size="large" style="width: 100%; background-color: #175cd3"
                                @click="getPersonalHeatHealthTip()">Get Your Heat Health
                                Advice</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!-- sec -->
                <el-col :span="11"
                    style="margin-right: 30px; background-color: #f5faff; border-radius: 16px; padding: 20px; font-family: 'Arial', sans-serif; box-sizing: border-box; background-color: #f5faff; height: 400px; overflow-y: auto;">
                    <div style="color: #175cd3; margin-bottom: 16px; font-size: 16px; font-weight: 600;">Your Personal
                        Heat Health Tips</div>
                    <span v-html="result" style="font-size: 14px; color: #2c3e50; line-height: 1.5;"></span>
                </el-col>
            </el-row>

            <!-- table -->
            <el-row :gutter="20" justify="space-evenly" align="top">
                <el-col :span="22"
                    style=" background-color: white; border-radius: 16px; padding: 20px; margin-top: 20px; font-family: 'Arial', sans-serif;">
                    <food-water-percentage-chart></food-water-percentage-chart>
                </el-col>
            </el-row>
        </div>
        <div style="text-align: end;">
            <el-button type="text" @click="$router.push('/personal-cooling-guide/cooling-home')"
                style="font: 1.2em sans-serif; padding-top: 30px;">
                <el-icon class="mr-1"><arrow-right /></el-icon>
                Go to Cooling Game Page
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, h } from 'vue';
import { ElMessage } from 'element-plus'
import FoodWaterPercentageChart from '@/components/FoodWaterPercentageChart.vue';
const form = reactive({
    age: '',
    gender: '',
    dailyWaterIntake: '',
    recentSymptom: ''
})
const result = ref('<em>The insights and tips will appear here after the user submits the form.</em>')

const open = () => {
    ElMessage('Please input all information.')
}
const openVn = () => {
    ElMessage({
        message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode'),
        ]),
    })
}

const getPersonalHeatHealthTip = () => {
    if (form.age == '' ||
        form.gender == '' ||
        form.dailyWaterIntake == '' ||
        form.recentSymptom == '') {
        open();
        return;
    }

    const age = parseInt(form.age);
    const gender = form.gender.toLowerCase();
    const dailyWaterIntakeCups = parseInt(form.dailyWaterIntake.split(' ')[0]); // Extract number from "X Cup"
    const symptom = form.recentSymptom;

    // Recommended fluid intake based on age and gender (from the table)
    let recommendedFluidIntakeL, recommendedFluidIntakeCups, recommendedTotalIntakeL;
    if (gender === 'male') {
        if (age >= 1 && age <= 3) {
            recommendedTotalIntakeL = 1.4;
            recommendedFluidIntakeL = 1.0;
            recommendedFluidIntakeCups = 4;
        } else if (age >= 4 && age <= 8) {
            recommendedTotalIntakeL = 1.6;
            recommendedFluidIntakeL = 1.2;
            recommendedFluidIntakeCups = 5;
        } else if (age >= 9 && age <= 13) {
            recommendedTotalIntakeL = 2.2;
            recommendedFluidIntakeL = 1.6;
            recommendedFluidIntakeCups = 6;
        } else if (age >= 14 && age <= 18) {
            recommendedTotalIntakeL = 2.7;
            recommendedFluidIntakeL = 1.9;
            recommendedFluidIntakeCups = 8; // About 7-8 cups, taking upper bound
        } else if (age >= 19) {
            recommendedTotalIntakeL = 3.4;
            recommendedFluidIntakeL = 2.6;
            recommendedFluidIntakeCups = 10;
        }
    } else if (gender === 'female') {
        if (age >= 1 && age <= 3) {
            recommendedTotalIntakeL = 1.4;
            recommendedFluidIntakeL = 1.0;
            recommendedFluidIntakeCups = 4;
        } else if (age >= 4 && age <= 8) {
            recommendedTotalIntakeL = 1.6;
            recommendedFluidIntakeL = 1.2;
            recommendedFluidIntakeCups = 5;
        } else if (age >= 9 && age <= 13) {
            recommendedTotalIntakeL = 1.9;
            recommendedFluidIntakeL = 1.4;
            recommendedFluidIntakeCups = 6; // About 5-6 cups, taking upper bound
        } else if (age >= 14 && age <= 18) {
            recommendedTotalIntakeL = 2.2;
            recommendedFluidIntakeL = 1.6;
            recommendedFluidIntakeCups = 6;
        } else if (age >= 19) {
            recommendedTotalIntakeL = 2.8;
            recommendedFluidIntakeL = 2.1;
            recommendedFluidIntakeCups = 8;
        }
    }

    // Base message about fluid intake
    let fluidMessage = `Heat index in Melbourne CBD is high today — aim for at least ${recommendedFluidIntakeL}L of fluid intake and ${recommendedTotalIntakeL}L total water.`;
    if (dailyWaterIntakeCups < recommendedFluidIntakeCups) {
        fluidMessage += ` You are currently drinking ${dailyWaterIntakeCups} cups, which is below the recommended ${recommendedFluidIntakeCups} cups. Increase your fluid intake!`;
    } else {
        fluidMessage += ` You are drinking ${dailyWaterIntakeCups} cups, which meets or exceeds the recommended ${recommendedFluidIntakeCups} cups. Keep it up!`;
    }

    // Symptom-based advice
    let symptomMessage = '';
    let generalTips;
    if (symptom === 'Nothing') {
        symptomMessage = 'You reported no symptoms, which is great! However, continue to monitor your health and follow these tips to stay safe in the heat: ';
    } else if (['headaches', 'having a raised body temperature', 'sweating heavily'].includes(symptom)) {
        symptomMessage = `Based on your symptom (${symptom}), you may have heat exhaustion, which is the body's response to excessive water and salt loss from sweat due to heat or exercise. We recommend: `;
        generalTips = `
        - Stop what you are doing, go to a cool, shaded place, and lie down with legs supported and slightly lifted.
        - Slowly sip plenty of water or fruit juice, avoiding caffeine and alcohol.
        - Cool down with a fan or an air-conditioner, cool water sprayed on skin, or by having a cool shower or bath.
        - Reduce body temperature by placing cool packs under the armpits, groin, or neck.
        - Use massage to ease spasms or cramps, then use ice packs.`;
    } else if (['having flushed, hot and unusually dry skin', 'being extremely thirsty', 'delirious'].includes(symptom)) {
        symptomMessage = `Based on your symptom (${symptom}), you may have heatstroke, a severe condition where body temperature exceeds 40°C due to heat or exercise. Seek immediate medical attention and: `;
        generalTips = `
        - Move to a cool area and keep still.
        - loosen clothes, sprinkle with cool water, or wrap in a damp sheet.
        - Place cool, damp cloths in armpits, on the back of neck and on forehead to cool down as quickly as possible.`;
    }

    // Combine all parts into the final result
    let additionalAdvice65Plus = '';
    if (age >= 65) {
        additionalAdvice65Plus = `
            Additional Advice For Age 65+:
            - Stay hydrated, emphasizing drinking water even without thirst.
            - Consult healthcare providers about medications affecting heat tolerance.
            - Stay connected with family for regular check-ins.`;
    }

    result.value = `${fluidMessage}\n${symptomMessage}\n${generalTips}\n${additionalAdvice65Plus}`.replace(/\n/g, '<br>');
    form.age = ''
    form.gender = ''
    form.dailyWaterIntake = ''
    form.recentSymptom = ''
}
</script>

<style scoped>
.title {
    margin-left: 60px;
    margin-right: 60px;
}
</style>