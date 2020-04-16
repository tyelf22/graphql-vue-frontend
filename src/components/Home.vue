<template>
    <div>
        <div>
            <!-- PARRALAX IMAGE -->
            <v-parallax
                dark
                height="300"
                src="../assets/basketball1.png"
            >
                <v-row
                align="center"
                justify="center"
                >
                <v-col class="text-center" cols="12">
                    <h1 class="display-2 mb-4">NBA Stat Tracker</h1>
                    <h4 class="subheading font-weight-thin ">Track your favorite players stats!</h4>
                </v-col>
                </v-row>
            </v-parallax>
        </div>
        <div>

            <!-- HEADER AND INSTRUCTIONS -->
            <h2 class="title text-center mt-10 ">The best way to track and compare stats</h2>
            <h4 class="subtitle-1 text-center font-weight-thin">Start today by following three easy steps</h4>

            <v-row justify="center" class="mt-12 px-5">
                <v-col class="text-center" cols="12" sm="3">
                    <v-icon large color="primary">mdi-numeric-1-circle</v-icon>
                    <h5 class="mt-4">Search Player</h5>
                    <p class="mt-4">Start by searching the first and last name of the player you want to add.(i.e. Lebron James)</p>
                </v-col>
                <v-col class="text-center" cols="12" sm="3">
                    <v-icon large color="primary">mdi-numeric-2-circle</v-icon>
                    <h5 class="mt-4">Add Player</h5>
                    <p class="mt-4">Once the searched player is inside the queue box, add the player to your roster.</p>
                </v-col>
                <v-col class="text-center" cols="12" sm="3">
                    <v-icon large color="primary">mdi-numeric-3-circle</v-icon>
                    <h5 class="mt-4">View Stats</h5>
                    <p class="mt-4">Each added player will have their stats displayed on the player stats page.</p>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.box {
    height: 900px;
}
</style>