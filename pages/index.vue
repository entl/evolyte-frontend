<script setup>
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const router = useRouter();
const features = [
  {
    title: "Forecast Solar Power",
    description: "Accurate solar power generation with high precision.",
    image: "/images/forecast-solar-power.png",
  },
  {
    title: "Analyze Solar Potential",
    description: "Estimate solar potential for any location in the world.",
    image: "/images/analyze-solar-potential.png",
  },
  {
    title: "Optimize Solar Panel Placement",
    description: "Maximize solar panel performance using AI-based analysis.",
    image: "/images/optimize-solar-panel-placement.png",
  },
];

const goToPlayground = () => {
  router.push('/playground');
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors">
    <!-- Navbar -->
    <nav class="w-full py-4 px-8 flex justify-between items-center bg-card shadow-md">
      <h1 class="text-xl font-bold">EvoLyte</h1>
      <div class="hidden md:flex space-x-6">
        <a href="#" class="text-muted-foreground hover:text-primary">How It Works</a>
        <a href="#" class="text-muted-foreground hover:text-primary">Case Studies</a>
        <a href="#" class="text-muted-foreground hover:text-primary">Pricing</a>
        <a href="#" class="text-muted-foreground hover:text-primary">APIs</a>
        <a href="#" class="text-muted-foreground hover:text-primary">Docs</a>
      </div>
      <!-- Color Mode Button -->
      <ColorModeButton></ColorModeButton>
    </nav>

    <!-- Hero Section -->
    <section class="relative w-full">
      <img src="/images/solar-panel-hero.jpg" alt="Solar Panels" class="w-full h-[500px] object-cover">
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 p-6">
        <h2 class="text-4xl font-bold text-white">The future of solar energy is here</h2>
        <p class="text-lg text-gray-300 mt-4">Join the future of renewable energy by leveraging our smart forecasting and solar technology.</p>
        <div class="mt-6 space-x-4">
          <Button class="text-white">Sign Up</Button>
          <Button @click="goToPlayground" class="bg-orange-500 text-white hover:bg-orange-600">
            Go to Playground
          </Button>
        </div>
      </div>
    </section>

    <!-- Trusted Companies -->
    <div class="container mx-auto">
      <section class="px-6 py-12">
          <div class="w-full lg:max-w-4xl text-left">
            <h3 class="text-3xl font-bold">Trusted by top companies</h3>
            <p class="mt-4 leading-relaxed">
              Our customers are leading the way in renewable energy. They trust us to provide the most accurate solar forecasts, enabling them to make data-driven decisions.
            </p>
            <div class="mt-6">
              <Button class="text-white">
                View Case Studies
              </Button>
            </div>
          </div>
      </section>

      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-16">
        <Card v-for="(feature, index) in features" :key="index">
          <CardContent class="p-6 flex flex-col items-center text-center">
            <!-- Image -->
            <div class="w-full aspect-video bg-cover bg-center rounded-lg" :style="{ backgroundImage: `url(${feature.image})` }"></div>

            <!-- Text -->
            <h4 class="text-lg font-semibold mt-4">{{ feature.title }}</h4>
            <p class="text-muted-foreground mt-2">{{ feature.description }}</p>
          </CardContent>
        </Card>
      </section>
    </div>

    <!-- Call to Action -->
    <section class="text-center py-16 bg-secondary">
      <h3 class="text-2xl font-semibold">Ready to harness the power of solar energy?</h3>
      <Button class="mt-4 text-white">Sign Up for Free</Button>
    </section>
  </div>
</template>

<style>
.transition-colors {
  transition: background-color 0.3s, color 0.3s;
}
</style>