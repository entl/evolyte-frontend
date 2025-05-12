<script setup>
import { NuxtLink } from "#components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const router = useRouter();
const features = [
  {
    title: "Forecast Solar Power",
    description: "Accurate solar power generation with high precision.",
    image: "/images/forecast-solar-power.png",
    icon: "⚡️"
  },
  {
    title: "Analyze Solar Potential",
    description: "Estimate solar potential for any location in the world.",
    image: "/images/analyze-solar-potential.png",
    icon: "🌍"
  },
  {
    title: "Optimize Solar Panel Placement",
    description: "Maximize solar panel performance using AI-based analysis.",
    image: "/images/optimize-solar-panel-placement.png",
    icon: "🎯"
  },
];

const goToPlayground = () => {
  router.push('/playground');
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div class="container mx-auto">
        <div class="flex h-16 items-center justify-between px-4">
          <Logo />
          <div class="hidden md:flex space-x-8">
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors duration-200">How It Works</a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors duration-200">Case Studies</a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors duration-200">Pricing</a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors duration-200">APIs</a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors duration-200">Docs</a>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/login">
              <Button variant="ghost" class="hidden sm:flex">Log in</Button>
            </NuxtLink>
            <ColorModeButton />
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-screen pt-16 flex items-center">
      <div class="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background z-10 dark:from-background/80 dark:via-background/60 dark:to-background" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0 z-[9]" />
      <img src="/images/solar-panel-hero.jpg" alt="Solar Panels" class="absolute inset-0 w-full h-full object-cover" />
      <div class="container mx-auto relative z-20 px-4">
        <div class="max-w-3xl mx-auto text-center space-y-8">
          <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset bg-orange-500/10 text-orange-600 ring-orange-500/20 dark:bg-orange-500/20 dark:text-orange-400">
            New Features Available
          </span>
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span class="block text-gray-700 dark:text-white drop-shadow-sm">The future of solar energy</span>
            <span class="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">is here</span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300/90 max-w-2xl mx-auto drop-shadow-sm">
            Join the future of renewable energy by leveraging our smart forecasting and solar technology.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <NuxtLink to="/registration">
              <Button class="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 dark:bg-white dark:text-background dark:hover:bg-white/90 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Sign Up
              </Button>
            </NuxtLink>
            <NuxtLink to="/playground">
              <Button 
              class="w-full sm:w-auto px-8 py-6 text-lg font-medium transition-all duration-200
              bg-white/80 hover:bg-white/90 text-gray-800 border border-gray-300/50
              dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20
              backdrop-blur-sm shadow-lg hover:shadow-xl">
              Go to Playground
            </Button>
          </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div class="absolute right-0 top-0 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <Globe />
      </div>
      <div class="container mx-auto px-4">
        <div class="relative z-10 max-w-4xl">
          <h3 class="inline-flex items-center space-x-2 text-base font-semibold text-orange-500">
            <span class="h-px w-8 bg-orange-500"></span>
            <span>Features</span>
          </h3>
          <h2 class="mt-4 text-4xl font-bold bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Trusted by community
          </h2>
          <p class="mt-6 text-xl text-muted-foreground leading-relaxed">
            Designed for homeowners, small businesses, and anyone curious about solar, the platform makes clean energy decisions easier through clear, real-world insights.
          </p>
          <div class="mt-8">
            <Button class="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-6 py-3">
              View Case Studies
            </Button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          <Card v-for="(feature, index) in features" :key="index" 
                class="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-background/80 backdrop-blur-sm">
            <CardContent class="p-6">
              <div class="mb-6 text-4xl">{{ feature.icon }}</div>
              <div class="w-full aspect-video bg-cover bg-center rounded-lg overflow-hidden">
                <img :src="feature.image" :alt="feature.title" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h4 class="text-xl font-semibold mt-6 group-hover:text-primary transition-colors">
                {{ feature.title }}
              </h4>
              <p class="text-muted-foreground mt-2 leading-relaxed">
                {{ feature.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-primary/20 dark:from-orange-500/10 dark:to-primary/10" />
      <div class="container relative mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto">
          <h3 class="text-4xl font-bold">Ready to harness the power of solar energy?</h3>
          <p class="mt-4 text-xl text-muted-foreground">
            Join thousands of companies already using our platform to optimize their solar energy production.
          </p>
          <Button class="mt-8 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            Sign Up for Free
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.bg-grid-white {
  background-image: linear-gradient(to right, rgb(var(--foreground) / 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--foreground) / 0.1) 1px, transparent 1px);
}
</style>