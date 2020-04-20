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
                    <h1 class="display-2 mb-4">Top 25 NBA Players</h1>
                    <h4 class="subheading font-weight-light">See the top 25 NBA players and edit them as you'd like</h4>
                </v-col>
                </v-row>
            </v-parallax>
        </div>
        <div>

            <!-- HEADER AND INSTRUCTIONS -->
            <h2 class="title text-center mt-10 ">GraphQL vs REST API</h2>
            <h4 class="subtitle-1 text-center font-weight-light">This application was built to demonstrate my abilite to consume and interact with both a GraphQL and REST API</h4>

            <v-row justify="center" class="mt-12 px-5">
                <v-col class="text-center" cols="12" sm="3">
                    <v-icon large color="primary">mdi-numeric-1-circle</v-icon>
                    <h5 class="mt-4">GraphQL API</h5>
                    <p class="mt-4">The first section demonstrates full CRUD operation with GraphQL</p>
                </v-col>
                <v-col class="text-center" cols="12" sm="3">
                    <v-icon large color="primary">mdi-numeric-2-circle</v-icon>
                    <h5 class="mt-4">RESTful API</h5>
                    <p class="mt-4">The second section demonstrates full CRUD operation with REST API</p>
                </v-col>
                <v-col class="text-center" cols="12" sm="3">
                    <v-icon large color="primary">mdi-numeric-3-circle</v-icon>
                    <h5 class="mt-4">View Roster</h5>
                    <p class="mt-4">View the players you added to the local store</p>
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