<template>
	<v-app>
		<Navbar />
		<v-main>
			<slot />
		</v-main>
	</v-app>
	<Footer />
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
