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
		favorites: [] as Launch[], // List of launches
	}),
	actions: {
		addFavorite(launch: Launch) {
			if (!this.favorites.some((fav) => fav.id === launch.id)) {
				this.favorites.push(launch)
			}
		},
		removeFavorite(launchId: string) {
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
