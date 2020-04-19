import axios from 'axios'

const url = 'https://te-restapi.herokuapp.com/players/'
const editUrl = "https://te-restapi.herokuapp.com/player/"

class PlayerService {
    // Get Players 
    static getPlayers() {
       return axios.get(url)
       .then(response => {
        const data = response.data
        return data
       }) 

    }

    // Create Players
    static createPlayer(firstname, lastname, team, height, weight, age) {
        return axios.post(editUrl, {
            firstname,
            lastname,
            team,
            height,
            weight,
            age
        })
    }

    // Delete Players
    static deletePlayer(id) {
        return axios.delete(`${editUrl}${id}`)
    }

    // Edit Player 
    static updatePlayer(id, firstname, lastname, team, height, weight, age) {
        return axios.put(`${editUrl}${id}`, {
            firstname,
            lastname,
            team,
            height,
            weight,
            age
        })
    }

    // Get Player 
    static getPlayer(id) {
        return axios.get(`${editUrl}${id}`)
        .then(response => {
            const data = response.data
            return data
        })
    }
}

export default PlayerService