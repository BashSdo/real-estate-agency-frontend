<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-img class="mb-5" cover height="400px" :src="background">
          <div class="hero">
            <v-row align="center" class="fill-height" justify="center">
              <v-col class="hero-text-container text-center">
                <h1 class="display-2 font-weight-bold">
                  Welcome to Realty Agency
                </h1>
                <p class="headline">Discover your perfect space</p>
              </v-col>
            </v-row>
          </div>
        </v-img>

        <v-row>
          <v-col cols="12">
            <h2 class="text-center">Featured Realities</h2>
          </v-col>
          <v-col v-for="realty in featured" :key="realty" cols="12" md="4">
            <v-card>
              <v-img cover height="300px" :src="realty.image" />
              <v-card-title>{{ realty.title }}</v-card-title>
              <v-card-subtitle>{{ realty.subtitle }}</v-card-subtitle>
              <v-card-text>{{ realty.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-footer class="text-center">
          <v-col>
            <p>Contact us: +1 (234) 567-890 | demo@demo.demo</p>
            <p>Address: 123 Main Street, City, Country</p>
          </v-col>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  const background =
    'https://images.unsplash.com/photo-1516501312919-d0cb0b7b60b8?q=80&w=2504&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const featured = [
    {
      image:
        'https://images.unsplash.com/photo-1535984983559-b98ecfe52447?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Reality 1',
      subtitle: 'Explore the possibilities',
      text: 'This is an abstract reality that offers endless possibilities and unique experiences.',
    },
    {
      image:
        'https://images.unsplash.com/photo-1655794387399-6dd29236eaa1?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Reality 2',
      subtitle: 'Discover the unknown',
      text: 'This is an abstract reality that offers endless possibilities and unique experiences.',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1680157072373-f180488fd8ae?q=80&w=2481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Reality 3',
      subtitle: 'Experience the extraordinary',
      text: 'This is an abstract reality that offers endless possibilities and unique experiences.',
    },
  ];
</script>

<style scoped>
.v-img {
  background-size: cover;
  background-position: center;
  width: 100%;
}

.hero {
  backdrop-filter: blur(4px);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}

.hero-text-container {
  margin-top: -128px;
}

.v-footer {
  margin-top: 50px;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
