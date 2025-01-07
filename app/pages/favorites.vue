<template>
	<div>
		<v-container>
			<h1>Favorites</h1>
			<div class="d-flex justify-end align-center">
				<v-btn v-if="favoritesStore.hasFavorites" @click="clearFavorites">Clear All Favorites</v-btn>
			</div>

			<v-list lines="two" v-if="favoritesStore.hasFavorites">
				<div class="d-flex flex-wrap ga-3">
					<v-list-item v-for="launch in favoritesStore.favorites" :key="launch.id">
						<v-card variant="outlined" class="pa-md-4 d-flex flex-row">
							<v-list-item-content>
								<v-list-item-title>Mission Name: {{ launch.missionName }}</v-list-item-title>
								<v-list-item-title>Rocket Name: {{ launch.rocketName }}</v-list-item-title>
								<v-list-item-subtitle>
									Launch Date: {{ launch.launchDate }}
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-btn @click="removeFavorite(launch.id)">Remove</v-btn>
						</v-card>
					</v-list-item>
				</div>
			</v-list>
			<p v-else>No favorites added yet!</p>
		</v-container>
	</div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favoritesStore'

const favoritesStore = useFavoritesStore()

const removeFavorite = (launchId) => {
	favoritesStore.removeFavorite(launchId)
}

const clearFavorites = () => {
	favoritesStore.clearFavorites()
}
</script>
