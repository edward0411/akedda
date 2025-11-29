<template>
  <div class="space-y-6">
    <!-- Título de la Página -->
    <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">Vista Principal del Dashboard</h2>

    <!-- Tarjetas de Estadísticas (Mini-Boxes tipo AdminLTE) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Tarjeta 1 -->
      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
        <p class="text-sm font-medium text-gray-500">Total de Usuarios</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-1">1,250</p>
      </div>

      <!-- Tarjeta 2 -->
      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
        <p class="text-sm font-medium text-gray-500">Ingresos Mensuales</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-1">$45,200</p>
      </div>

      <!-- Tarjeta 3 -->
      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
        <p class="text-sm font-medium text-gray-500">Nuevos Pedidos</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-1">189</p>
      </div>

      <!-- Tarjeta 4 -->
      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
        <p class="text-sm font-medium text-gray-500">Tickets Abiertos</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-1">12</p>
      </div>
    </div>

    <!-- Ejemplo de Gráfico o Tabla de Contenido -->
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <h3 class="text-xl font-semibold mb-4 text-gray-700">Resumen de Actividad</h3>
      <p class="text-gray-600">Aquí iría el contenido principal del dashboard, como gráficos, listas de tareas o estadísticas detalladas. Este contenido está anidado dentro del Layout Maestro.</p>
      <div class="h-64 bg-gray-50 border border-dashed border-gray-300 mt-4 flex items-center justify-center rounded-lg">
        [Image of Dashboard chart example]
      </div>
    </div>
  </div>
</template>

<script setup>
// No necesita lógica de autenticación o layout, solo se enfoca en los datos
</script>