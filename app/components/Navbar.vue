<template>
	<v-app-bar :elevation="8" rounded class="bg-teal">
		<template v-slot:prepend>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</template>

		<v-app-bar-title>NavBar</v-app-bar-title>

		<template v-slot:append>
			<v-btn><NuxtLink to="/" class="text-decoration-none text-white">Home</NuxtLink></v-btn>
			<v-btn>
				<NuxtLink to="/launches" class="text-decoration-none text-white">Launches</NuxtLink>
			</v-btn>
			<v-btn><NuxtLink to="/rocket" class="text-decoration-none text-white">Rockets</NuxtLink></v-btn>
			<v-btn>
				<NuxtLink to="/favorites" class="text-decoration-none text-white">Favorites</NuxtLink>
			</v-btn>

			<!-- <NuxtLink to="/launches">Launches</NuxtLink>
			<NuxtLink to="/rocket">Rockets</NuxtLink> -->
		</template>
	</v-app-bar>
</template>
