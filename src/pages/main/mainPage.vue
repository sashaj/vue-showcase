<script setup>
import { DocumentText } from "@vicons/ionicons5";
import { NIcon, NRow, NCol, NStatistic } from "naive-ui";
</script>

<template>
  <h1 class="text-2xl mb-8">Главная страница</h1>
  <n-row>
    <n-col :span="12">
      <n-statistic label="Статистика" :value="99">
        <template #prefix>
          <n-icon>
            <DocumentText></DocumentText>
          </n-icon>
        </template>
        <template #suffix> / 100 </template>
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic label="Активных пользователей"> 1,234,123 </n-statistic>
    </n-col>
  </n-row>
</template>
