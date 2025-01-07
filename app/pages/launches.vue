<template>
	<v-container>
		<h1>Launches</h1>
		<div class="d-flex justify-space-between align-center mb-6">
			<div class="d-flex flex-row align-center">
				<label for="sortBy">Sort by Launch date:</label>
				<button class="mx-3" variant="text" @click="sortDesc = !sortDesc">
					{{ sortDesc ? 'Descending' : 'Ascending' }}
				</button>
			</div>

			<div class="d-flex flex-row" style="width: 300px">
				<v-select
					label="Filter by Year:"
					v-model="selectedYear"
					:items="uniqueYears"
					variant="outlined"
				></v-select>
				<v-btn variant="tonal" @click="resetFilter">Reset Filter</v-btn>
			</div>
		</div>

		<v-data-table :items="filteredLaunches" height="500px">
			<thead>
				<tr>
					<th class="text-left">Mission name</th>
					<th class="text-left">Launch date</th>
					<th class="text-left">Launch site name</th>
					<th class="text-left">Rocket name</th>
					<th class="text-left" style="width: 50%">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in filteredLaunches" :key="launch.id">
					<td>{{ launch.missionName }}</td>
					<td>{{ launch.launchDate }}</td>
					<td>{{ launch.launchSite }}</td>
					<td>{{ launch.rocketName }}</td>
					<td>{{ launch.details }}</td>
					<td><v-btn @click="addToFavorites(launch)">Add to Favorites</v-btn></td>
				</tr>
			</tbody>
		</v-data-table>
	</v-container>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favoritesStore'

const favoritesStore = useFavoritesStore()

const addToFavorites = (launch: any) => {
	favoritesStore.addFavorite(launch)
}

const query = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_date_local
			launch_year
			launch_site {
				site_name
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`
const { data } = useAsyncQuery<{
	launches: {
		id: number
		mission_name: string
		launch_date_local: any
		launch_year: any
		launch_site: {
			site_name: string
		}
		rocket: {
			rocket_name: string
		}
		details: string
	}[]
}>(query)

const launches = computed(
	() =>
		data.value?.launches.map((launch) => ({
			id: launch.id,
			missionName: launch.mission_name,
			launchDate: launch.launch_date_local,
			launchYear: launch.launch_year,
			launchSite: launch.launch_site?.site_name || 'N/A',
			rocketName: launch.rocket.rocket_name,
			details: launch.details || 'No details available',
		})) || [],
)

// Filter
const selectedYear = ref('')
const sortBy = ref<'launchDate'>('launchDate') 
const sortDesc = ref(false)

const filteredLaunches = computed(() => {
	let filtered = launches.value
	if (selectedYear.value) {
		filtered = filtered.filter((launch) => launch.launchYear === selectedYear.value)
	}

	return filtered.sort((a, b) => {
		const valA = a[sortBy.value]!
		const valB = b[sortBy.value]!

		if (sortBy.value === 'launchDate') {
			const dateA = new Date(valA).getTime()
			const dateB = new Date(valB).getTime()
			return sortDesc.value ? dateB - dateA : dateA - dateB
		}

		if (valA < valB) return sortDesc.value ? 1 : -1
		if (valA > valB) return sortDesc.value ? -1 : 1
		return 0
	})
})

const resetFilter = () => {
	selectedYear.value = ''
}
const uniqueYears = computed(() => [...new Set(launches.value.map((launch) => launch.launchYear))])
</script>
