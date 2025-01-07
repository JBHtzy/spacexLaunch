import { defineStore } from 'pinia'

interface Launch {
	id: string
	missionName: string
	launchDate: string
	launchSite: string
	rocketName: string
	details: string
}

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		favorites: [] as Launch[], // List of favorite launches
	}),
	actions: {
		addFavorite(launch: Launch) {
			// Annotate the parameter type
			if (!this.favorites.some((fav) => fav.id === launch.id)) {
				this.favorites.push(launch)
			}
		},
		removeFavorite(launchId: string) {
			// Annotate the parameter type
			this.favorites = this.favorites.filter((fav) => fav.id !== launchId)
		},
		clearFavorites() {
			this.favorites = []
		},
	},
	getters: {
		hasFavorites: (state) => state.favorites.length > 0,
	},
})
