<template>
	<v-container>
		<h1>Rockets</h1>
		<div class="d-flex justify-space-between align-center mb-6">
			<div class="d-flex flex-row align-center">
				<label for="sortBy">Sort by Launch date:</label>
				<button class="mx-3" variant="text" @click="sortDesc = !sortDesc">
					{{ sortDesc ? 'Descending' : 'Ascending' }}
				</button>
			</div>

			<div class="d-flex flex-row" style="width: 500px">
				<v-text-field
					v-model="search"
					label="Search"
					prepend-inner-icon="mdi-magnify"
					variant="outlined"
					hide-details
					single-line
				></v-text-field>
				<v-btn variant="tonal" @click="resetFilter">Reset Filter</v-btn>
			</div>
		</div>

		<v-data-table :items="filterRockets" height="500px">
			<thead>
				<tr>
					<th class="text-left">Rocket name</th>
					<th class="text-left" style="width: 50%">Description</th>
					<th class="text-left">First flight date</th>
					<th class="text-left">Height</th>
					<th class="text-left">Diameter</th>
					<th class="text-left">Mass</th>
					<th class="text-left">Number of stages</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="rocket in filterRockets" :key="rocket.rocket_id">
					<td>{{ rocket.rocket_name }}</td>
					<td>{{ rocket.rocket_description }}</td>
					<td>{{ rocket.rocket_firstflight_date }}</td>
					<td>{{ rocket.rocket_height }}</td>
					<td>{{ rocket.rocket_diameter }}</td>
					<td>{{ rocket.rocket_mass }}</td>
					<td>{{ rocket.rocket_stages }}</td>
				</tr>
			</tbody>
		</v-data-table>
	</v-container>
</template>

<script setup lang="ts">
const query = gql`
	query getRocket {
		rockets {
			id
			name
			description
			first_flight
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
		}
	}
`
const { data } = useAsyncQuery<{
	rockets: {
		id: number
		name: string
		description: string
		first_flight: any
		height: {
			meters: number
		}
		diameter: {
			meters: number
		}
		mass: {
			kg: number
		}
		stages: number
	}[]
}>(query)

const rockets = computed(
	() =>
		data.value?.rockets.map((rocket) => ({
			rocket_id: rocket.id,
			rocket_name: rocket.name,
			rocket_description: rocket.description || 'No details available',
			rocket_firstflight_date: rocket.first_flight,
			rocket_height: rocket.height.meters,
			rocket_diameter: rocket.diameter.meters,
			rocket_mass: rocket.mass.kg,
			rocket_stages: rocket.stages,
		})) || [],
)

const search = ref('')
const sortBy = ref<'rocket_name'>('rocket_name')
const sortDesc = ref(false)

const filterRockets = computed(() => {
	let filtered = rockets.value
	if (search.value) {
		filtered = filtered.filter((rocket) => rocket.rocket_name === search.value)
	}

	return filtered.sort((a, b) => {
		const valA = a[sortBy.value]!
		const valB = b[sortBy.value]!

		if (valA < valB) return sortDesc.value ? 1 : -1
		if (valA > valB) return sortDesc.value ? -1 : 1
		return 0
	})
})

const resetFilter = () => {
	search.value = ''
}
</script>
