<script setup lang="ts">
import { Calendar, ChevronUp, ChevronDown, Home, Inbox, Search, Settings, User } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUserStore } from "~/storages/userStorage"


const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)


const isDropdownOpen = ref(false)

// Menu topGroup.
const topGroup = [
  {
    title: "Overview",
    url: "#",
    icon: "lucide:home",
  },
  {
    title: "Analyse",
    url: "#",
    icon: "lucide:inbox",
  },
  {
    title: "Performance",
    url: "#",
    icon: "lucide:calendar",
  },
  {
    title: "Report",
    url: "#",
    icon: "lucide:search",
  },
  {
    title: "System",
    url: "#",
    icon: "lucide:settings",
  },
  {
    title: "My Site",
    url: "#",
    icon: "lucide:home",
  }
];

const bottomGroup = [
  {
    title: "Report",
    url: "#",
    icon: "lucide:home",
  },
  {
    title: "Settings",
    url: "#",
    icon: "lucide:settings",
  }
];
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <Logo class="mt-1 pt-4 ml-2"/>
    </SidebarHeader>
    <SidebarContent class="mt-2 justify-between">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in topGroup" :key="item.title">
              <SidebarMenuButton asChild class="h-12">
                <a :href="item.url">
                  <Icon :name="item.icon" class="h-5 w-5" />
                  <span>{{item.title}}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in bottomGroup" :key="item.title">
              <SidebarMenuButton asChild class="h-12">
                <a :href="item.url">
                  <Icon :name="item.icon" class="h-5 w-5" />
                  <span>{{item.title}}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild class="h-12 justify-start">
                <ColorModeButton :button-text="'Switch Color Mode'"/>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu v-model:open="isDropdownOpen">
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton class="h-12">
                  <div class="mr-2 h-8 w-8 rounded-full bg-gray-700"></div>
                  <User2 /> {{currentUser?.full_name ?? "User"}} 
                  <component :is="isDropdownOpen ? ChevronUp : ChevronDown" class="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                class="w-[--reka-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
  </Sidebar>
</template>