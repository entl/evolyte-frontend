<!-- layout.vue -->
<template>
  <SidebarProvider>
    <div class="flex w-full min-h-screen">
      <AppSidebar />
      <div class="flex-1 min-w-0">
        <slot />
      </div>
    </div>
  </SidebarProvider>
</template>
