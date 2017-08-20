// In the pokedex variable, what I did was created the data I will be using for the table.
// In the future, I will be adding all 151 Pokemon from the first generation and soon Pokemon
// of every generation! I can see myself using a JSON potentially found on the web otherwise
// I will create my own.

// In filters, I want to capitlize the first letter of each key from data. This function would take the first
// charcter and make it uppercase. After you append it with the first of the string and return it.

// Within methods, I made a function called sortTable which takes in a parameter called column.
// This function sorts the table to see if we want it in an ascending or descending order.
// The variable ascending would only be true of the variable sortcolumn strictly equals to variable column
// Within most programming lanuages I used these days, Depending on the order of the column and the boolean
// ascending, the table will either be in ascending order or descending.

// In computed, there is a function called pokeColumn, which would return the keys of what we have in our
// data (pokemonList). As I am planning to change these in the future, I would not need to create more tables
// headers in the HTML file. This function will do it for me.
// 
// In filteredPokemon, it is used as part of the search functionality to find the matching data based on its
// name. I plan to expand this by having multiple filter which will definitely be a challenge.

Vue.component('poke-table', {
	template: '#poke-table',
	props: {
		data: Array,
		columns: Array,
		filterKey: String
	},

	data: function() {
		var sortOrders = {}
		this.columns.forEach(function(key) {
			sortOrders[key] = 1
		})
		return {
			sortKey: '',
			sortOrders: sortOrders
		}
	},

	computed: {
		filteredData: function() {
			var sortKey = this.sortKey
			var filterKey = this.filterKey && this.filterKey.toLowerCase()
			var order = this.sortOrders[sortKey] || 1
			var data = this.data

			if (filterKey) {
				data = data.filter(function(row) {
					return Object.keys(row).some(function(key) {
						return String(row[key]).toLowerCase().indexOf(filterKey) > -1
					})
				})
			}

			if (sortKey) {
				data = data.slice().sort(function(a, b) {
					a = a[sortKey]
					b = b[sortKey]
					return (a === b ? 0 : a > b ? 1 : -1) * order
				})
			}
			return data

		}
	},

	filters: {
		capitalize: function (str) {
    		return str.charAt(0).toUpperCase() + str.slice(1)
    	}
	},

	methods: {
		sortBy: function(key) {
			this.sortKey = key
			this.sortOrders[key] = this.sortOrders[key] * -1
		}
	}

})

var pokedex = new Vue({
	el: '#pokedex',
	data: {
		ascending: false,
		sortcolumn: '',
		search: '',
		current: 0,
		hp: 0,
		atk: 0,
		def: 0,
		spatk: 0,
		spdef: 0,
		spe: 0,
		searchQuery: '',
		pokColumns: ['nDex', 'name', 'type1', 'type2', 'hp', 'atk', 'def', 'spatk', 'spdef', 'spe'],
		pokemonList: [
			{nDex: 1, name: "Bulbasaur", type1: "Grass", type2: "Poison", hp: "45", atk: "49", def: "49", spatk: "65", spdef: "65", spe: "45"},
			{nDex: 2, name: "Ivysaur", type1: "Grass", type2: "Poison", hp: "60", atk: "62", def: "63", spatk: "80", spdef: "80", spe: "60"},
			{nDex: 3, name: "Venusaur", type1: "Grass", type2: "Poison", hp: "80", atk: "82", def: "83", spatk: "100", spdef: "100", spe: "80"},
			{nDex: 4, name: "Charmander", type1: "Fire", type2: "", hp: "39", atk: "52", def: "43", spatk: "60", spdef: "50", spe: "65"},
			{nDex: 5, name: "Charmeleon", type1: "Fire", type2: "", hp: "58", atk: "64", def: "58", spatk: "80", spdef: "65", spe: "80"},
			{nDex: 6, name: "Charizard", type1: "Fire", type2: "Flying", hp: "78", atk: "84", def: "78", spatk: "109", spdef: "85", spe: "100"},
			{nDex: 7, name: "Squirtle", type1: "Water", type2: "", hp: "44", atk: "48", def: "65", spatk: "50", spdef: "64", spe: "43"},
			{nDex: 8, name: "Wartortle", type1: "Water", type2: "", hp: "59", atk: "63", def: "80", spatk: "65", spdef: "80", spe: "58"},
			{nDex: 9, name: "Blastoise", type1: "Water", type2: "", hp: "79", atk: "83", def: "100", spatk: "85", spdef: "105", spe: "78"},
			{nDex: 10, name: "Caterpie", type1: "Bug", type2: "", hp: "45", atk: "30", def: "35", spatk: "20", spdef: "20", spe: "45"},
			{nDex: 11, name: "Metapod", type1: "Bug", type2: "", hp: "50", atk: "20", def: "55", spatk: "25", spdef: "25", spe: "30"},
			{nDex: "12", name: "Butterfree", type1: "Bug", type2: "Flying", hp: "60", atk: "45", def: "50", spatk: "90", spdef: "80", spe: "70"},
			{nDex: "13", name: "Weedle", type1: "Bug", type2: "Poison", hp: "40", atk: "35", def: "30", spatk: "20", spdef: "20", spe: "50"},
			{nDex: "14", name: "Kakuna", type1: "Bug", type2: "Poison", hp: "45", atk: "25", def: "50", spatk: "25", spdef: "25", spe: "35"},
			{nDex: "15", name: "Beedrill", type1: "Bug", type2: "Poison", hp: "65", atk: "90", def: "40", spatk: "45", spdef: "80", spe: "75"},
			{nDex: "16", name: "Pidgey", type1: "Normal", type2: "Flying", hp: "40", atk: "45", def: "40", spatk: "35", spdef: "35", spe: "56"},
			{nDex: "17", name: "Pidgeotto", type1: "Normal", type2: "Flying", hp: "63", atk: "60", def: "55", spatk: "50", spdef: "50", spe: "71"},
			{nDex: "18", name: "Pidgeot", type1: "Normal", type2: "Flying", hp: "83", atk: "80", def: "75", spatk: "70", spdef: "70", spe: "101"},
			{nDex: "19", name: "Rattata", type1: "Normal", type2: "", hp: "30", atk: "56", def: "35", spatk: "25", spdef: "35", spe: "72"},
			{nDex: "20", name: "Raticate", type1: "Normal", type2: "", hp: "55", atk: "81", def: "60", spatk: "50", spdef: "70", spe: "97"},
			{nDex: "21", name: "Spearow", type1: "Normal", type2: "Flying", hp: "40", atk: "60", def: "30", spatk: "31", spdef: "31", spe: "70"},
			{nDex: "22", name: "Fearow", type1: "Normal", type2: "Flying", hp: "65", atk: "90", def: "65", spatk: "61", spdef: "61", spe: "100"},
			{nDex: "23", name: "Ekans", type1: "Poison", type2: "", hp: "35", atk: "60", def: "44", spatk: "40", spdef: "54", spe: "55"},
			{nDex: "24", name: "Arbok", type1: "Poison", type2: "", hp: "60", atk: "95", def: "69", spatk: "65", spdef: "79", spe: "80"},
			{nDex: "25", name: "Pikachu", type1: "Electric", type2: "", hp: "35", atk: "55", def: "40", spatk: "50", spdef: "50", spe: "90"},
			{nDex: "26", name: "Raichu", type1: "Electric", type2: "", hp: "60", atk: "90", def: "55", spatk: "90", spdef: "80", spe: "110"},
			{nDex: "27", name: "Sandshrew", type1: "Ground", type2: "", hp: "50", atk: "75", def: "85", spatk: "20", spdef: "30", spe: "40"},
			{nDex: "28", name: "Sandslash", type1: "Ground", type2: "", hp: "75", atk: "100", def: "110", spatk: "45", spdef: "55", spe: "65"},
			{nDex: "29", name: "Nidorana F", type1: "Poison", type2: "", hp: "55", atk: "47", def: "52", spatk: "40", spdef: "40", spe: "41"},
			{nDex: "30", name: "Nidorina", type1: "Poison", type2: "", hp: "70", atk: "62", def: "67", spatk: "55", spdef: "55", spe: "56"},
			{nDex: "31", name: "Nidoqueen", type1: "Poison", type2: "Ground", hp: "90", atk: "92", def: "87", spatk: "75", spdef: "85", spe: "76"},
			{nDex: "32", name: "Nidorana M", type1: "Poison", type2: "", hp: "46", atk: "57", def: "40", spatk: "40", spdef: "40", spe: "50"},
			{nDex: "33", name: "Nidorino", type1: "Poison", type2: "", hp: "61", atk: "72", def: "57", spatk: "55", spdef: "55", spe: "65"},
			{nDex: "34", name: "Nidoking", type1: "Poison", type2: "Ground", hp: "81", atk: "102", def: "77", spatk: "85", spdef: "75", spe: "85"},
			{nDex: "35", name: "Clefairy", type1: "Fairy", type2: "", hp: "70", atk: "45", def: "48", spatk: "60", spdef: "65", spe: "35"},
			{nDex: "36", name: "Clefable", type1: "Fairy", type2: "", hp: "95", atk: "70", def: "73", spatk: "95", spdef: "90", spe: "60"},
			{nDex: "37", name: "Vulpix", type1: "Fire", type2: "", hp: "38", atk: "41", def: "40", spatk: "50", spdef: "65", spe: "65"},
			{nDex: "38", name: "Ninetales", type1: "Fire", type2: "", hp: "73", atk: "76", def: "75", spatk: "81", spdef: "100", spe: "100"},
			{nDex: "39", name: "Jigglypuff", type1: "Normal", type2: "Fairy", hp: "115", atk: "45", def: "20", spatk: "45", spdef: "25", spe: "20"},
			{nDex: "40", name: "Wigglytuff", type1: "Normal", type2: "Fairy", hp: "140", atk: "70", def: "45", spatk: "85", spdef: "50", spe: "45"},
			{nDex: "41", name: "Zubat", type1: "Poison", type2: "Flying", hp: "40", atk: "45", def: "35", spatk: "30", spdef: "40", spe: "55"},
			{nDex: "42", name: "Golbat", type1: "Poison", type2: "Flying", hp: "75", atk: "80", def: "70", spatk: "65", spdef: "75", spe: "90"},
			{nDex: "43", name: "Oddish", type1: "Grass", type2: "Poison", hp: "45", atk: "50", def: "55", spatk: "75", spdef: "65", spe: "30"},
			{nDex: "44", name: "Gloom", type1: "Grass", type2: "Poison", hp: "60", atk: "65", def: "70", spatk: "85", spdef: "75", spe: "40"},
			{nDex: "45", name: "Vileplume", type1: "Grass", type2: "Poison", hp: "75", atk: "80", def: "85", spatk: "110", spdef: "90", spe: "50"},
			{nDex: "46", name: "Paras", type1: "Bug", type2: "Grass", hp: "35", atk: "70", def: "55", spatk: "45", spdef: "55", spe: "25"},
			{nDex: "47", name: "Parasect", type1: "Bug", type2: "Grass", hp: "60", atk: "95", def: "80", spatk: "60", spdef: "80", spe: "30"},
			{nDex: "48", name: "Venonat", type1: "Bug", type2: "Poison", hp: "60", atk: "55", def: "50", spatk: "40", spdef: "55", spe: "45"},
			{nDex: "49", name: "Venomoth", type1: "Bug", type2: "Poison", hp: "70", atk: "65", def: "60", spatk: "90", spdef: "75", spe: "90"},
			{nDex: "50", name: "Diglett", type1: "Ground", type2: "", hp: "10", atk: "55", def: "25", spatk: "35", spdef: "45", spe: "95"},
			{nDex: "51", name: "Dugtrio", type1: "Ground", type2: "", hp: "35", atk: "100", def: "50", spatk: "50", spdef: "70", spe: "120"},
			{nDex: "52", name: "Meowth", type1: "Normal", type2: "", hp: "40", atk: "45", def: "35", spatk: "40", spdef: "40", spe: "90"},
			{nDex: "53", name: "Persian", type1: "Normal", type2: "", hp: "65", atk: "70", def: "60", spatk: "65", spdef: "65", spe: "115"},
			{nDex: "54", name: "Psyduck", type1: "Water", type2: "", hp: "50", atk: "52", def: "48", spatk: "65", spdef: "50", spe: "55"},
			{nDex: "55", name: "Golduck", type1: "Water", type2: "", hp: "80", atk: "82", def: "78", spatk: "95", spdef: "80", spe: "85"},
			{nDex: "56", name: "Mankey", type1: "Fighting", type2: "", hp: "40", atk: "80", def: "35", spatk: "35", spdef: "45", spe: "70"},
			{nDex: "57", name: "Primeape", type1: "Fighting", type2: "", hp: "65", atk: "105", def: "60", spatk: "60", spdef: "70", spe: "95"},
			{nDex: "58", name: "Growlithe", type1: "Fire", type2: "", hp: "55", atk: "70", def: "45", spatk: "70", spdef: "50", spe: "60"},
			{nDex: "59", name: "Arcanine", type1: "Fire", type2: "", hp: "90", atk: "110", def: "80", spatk: "100", spdef: "80", spe: "95"},
			{nDex: "60", name: "Poliwag", type1: "Water", type2: "", hp: "40", atk: "50", def: "40", spatk: "40", spdef: "40", spe: "90"},
			{nDex: "61", name: "Poliwhirl", type1: "Water", type2: "", hp: "65", atk: "65", def: "65", spatk: "50", spdef: "50", spe: "90"},
			{nDex: "62", name: "Poliwrath", type1: "Water", type2: "Fighting", hp: "90", atk: "95", def: "95", spatk: "70", spdef: "90", spe: "70"},
			{nDex: "63", name: "Abra", type1: "Psychic", type2: "", hp: "25", atk: "20", def: "15", spatk: "105", spdef: "55", spe: "90"},
			{nDex: "64", name: "Kadabra", type1: "Psychic", type2: "", hp: "40", atk: "35", def: "30", spatk: "120", spdef: "70", spe: "105"},
			{nDex: "65", name: "Alakazam", type1: "Psychic", type2: "", hp: "55", atk: "50", def: "45", spatk: "135", spdef: "95", spe: "120"},
			{nDex: "66", name: "Machop", type1: "Fighting", type2: "", hp: "70", atk: "80", def: "50", spatk: "35", spdef: "35", spe: "35"},
			{nDex: "67", name: "Machoke", type1: "Fighting", type2: "", hp: "80", atk: "100", def: "70", spatk: "50", spdef: "60", spe: "45"},
			{nDex: "68", name: "Machamp", type1: "Fighting", type2: "", hp: "90", atk: "130", def: "80", spatk: "65", spdef: "85", spe: "55"},
			{nDex: "69", name: "Bellsprout", type1: "Grass", type2: "Poison", hp: "50", atk: "75", def: "35", spatk: "70", spdef: "30", spe: "40"},
			{nDex: "70", name: "Weepinbell", type1: "Grass", type2: "Poison", hp: "65", atk: "90", def: "50", spatk: "85", spdef: "45", spe: "55"},
			{nDex: "71", name: "Victreebel", type1: "Grass", type2: "Poison", hp: "80", atk: "105", def: "65", spatk: "100", spdef: "70", spe: "70"},
			{nDex: "72", name: "Tentacool", type1: "Water", type2: "Poison", hp: "40", atk: "40", def: "35", spatk: "50", spdef: "100", spe: "70"},
			{nDex: "73", name: "Tentacruel", type1: "Water", type2: "Poison", hp: "80", atk: "70", def: "65", spatk: "80", spdef: "120", spe: "100"},
			{nDex: "74", name: "Geodude", type1: "Rock", type2: "Ground", hp: "40", atk: "80", def: "100", spatk: "30", spdef: "30", spe: "20"},
			{nDex: "75", name: "Graveler", type1: "Rock", type2: "Ground", hp: "55", atk: "95", def: "115", spatk: "45", spdef: "45", spe: "35"},
			{nDex: "76", name: "Golem", type1: "Rock", type2: "Ground", hp: "80", atk: "120", def: "130", spatk: "55", spdef: "65", spe: "45"},
			{nDex: "77", name: "Ponyta", type1: "Fire", type2: "", hp: "50", atk: "85", def: "55", spatk: "65", spdef: "65", spe: "90"},
			{nDex: "78", name: "Rapidash", type1: "Fire", type2: "", hp: "65", atk: "100", def: "70", spatk: "80", spdef: "80", spe: "105"},
			{nDex: "79", name: "Slowpoke", type1: "Water", type2: "Psychic", hp: "90", atk: "65", def: "65", spatk: "40", spdef: "40", spe: "15"},
			{nDex: "80", name: "Slowbro", type1: "Water", type2: "Psychic", hp: "95", atk: "75", def: "110", spatk: "100", spdef: "80", spe: "30"},
			{nDex: "81", name: "Magnemite", type1: "Electric", type2: "Steel", hp: "25", atk: "35", def: "70", spatk: "95", spdef: "55", spe: "45"},
			{nDex: "82", name: "Magneton", type1: "Electric", type2: "Steel", hp: "50", atk: "60", def: "95", spatk: "120", spdef: "70", spe: "70"},
			{nDex: "83", name: "Farfetch'd", type1: "Normal", type2: "Flying", hp: "52", atk: "90", def: "55", spatk: "58", spdef: "62", spe: "60"},
			{nDex: "84", name: "Doduo", type1: "Normal", type2: "Flying", hp: "35", atk: "85", def: "45", spatk: "35", spdef: "35", spe: "75"},
			{nDex: "85", name: "Dodrio", type1: "Normal", type2: "Flying", hp: "60", atk: "110", def: "70", spatk: "60", spdef: "60", spe: "110"},
			{nDex: "86", name: "Seel", type1: "Water", type2: "", hp: "65", atk: "45", def: "55", spatk: "45", spdef: "70", spe: "45"},
			{nDex: "87", name: "Dewgong", type1: "Water", type2: "Ice", hp: "90", atk: "70", def: "80", spatk: "70", spdef: "95", spe: "70"},
			{nDex: "88", name: "Grimer", type1: "Poison", type2: "", hp: "80", atk: "80", def: "50", spatk: "40", spdef: "50", spe: "25"},
			{nDex: "89", name: "Muk", type1: "Poison", type2: "", hp: "105", atk: "105", def: "75", spatk: "65", spdef: "100", spe: "50"},
			{nDex: "90", name: "Shellder", type1: "Water", type2: "", hp: "30", atk: "65", def: "100", spatk: "45", spdef: "25", spe: "40"},
			{nDex: "91", name: "Cloyster", type1: "Water", type2: "Ice", hp: "50", atk: "95", def: "180", spatk: "85", spdef: "45", spe: "70"},
			{nDex: "92", name: "Gastly", type1: "Ghost", type2: "Poison", hp: "30", atk: "35", def: "30", spatk: "100", spdef: "35", spe: "80"},
			{nDex: "93", name: "Haunter", type1: "Ghost", type2: "Poison", hp: "45", atk: "50", def: "45", spatk: "115", spdef: "55", spe: "95"},
			{nDex: "94", name: "Gengar", type1: "Ghost", type2: "Poison", hp: "60", atk: "65", def: "60", spatk: "130", spdef: "75", spe: "110"},
			{nDex: "95", name: "Onix", type1: "Rock", type2: "Ground", hp: "35", atk: "45", def: "160", spatk: "30", spdef: "45", spe: "70"},
			{nDex: "96", name: "Drowzee", type1: "Psychic", type2: "", hp: "60", atk: "48", def: "45", spatk: "43", spdef: "90", spe: "42"},
			{nDex: "97", name: "Hypno", type1: "Psychic", type2: "", hp: "85", atk: "73", def: "70", spatk: "73", spdef: "115", spe: "67"},
			{nDex: "98", name: "Krabby", type1: "Water", type2: "", hp: "30", atk: "105", def: "90", spatk: "25", spdef: "25", spe: "50"},
			{nDex: "99", name: "Kingler", type1: "Water", type2: "", hp: "55", atk: "130", def: "115", spatk: "50", spdef: "50", spe: "75"},
			{nDex: "100", name: "Voltorb", type1: "Electric", type2: "", hp: "40", atk: "30", def: "50", spatk: "55", spdef: "55", spe: "100"},
			{nDex: "101", name: "Electrode", type1: "Electric", type2: "", hp: "60", atk: "50", def: "70", spatk: "80", spdef: "80", spe: "150"},
			{nDex: "102", name: "Exeggcute", type1: "Grass", type2: "Psychic", hp: "60", atk: "40", def: "80", spatk: "60", spdef: "45", spe: "40"},
			{nDex: "103", name: "Exeggutor", type1: "Grass", type2: "Psychic", hp: "95", atk: "95", def: "85", spatk: "125", spdef: "75", spe: "55"},
			{nDex: "104", name: "Cubone", type1: "Ground", type2: "", hp: "50", atk: "50", def: "95", spatk: "40", spdef: "50", spe: "35"},
			{nDex: "105", name: "Marowak", type1: "Ground", type2: "", hp: "60", atk: "80", def: "110", spatk: "50", spdef: "80", spe: "45"},
			{nDex: "106", name: "Hitmonlee", type1: "Fighting", type2: "", hp: "50", atk: "120", def: "53", spatk: "35", spdef: "110", spe: "87"},
			{nDex: "107", name: "Hitmonchan", type1: "Fighting", type2: "", hp: "50", atk: "105", def: "79", spatk: "35", spdef: "110", spe: "76"},
			{nDex: "108", name: "Lickitung", type1: "Normal", type2: "", hp: "90", atk: "55", def: "75", spatk: "60", spdef: "75", spe: "30"},
			{nDex: "109", name: "Koffing", type1: "Poison", type2: "", hp: "40", atk: "65", def: "95", spatk: "60", spdef: "45", spe: "35"},
			{nDex: "110", name: "Weezing", type1: "Poison", type2: "", hp: "65", atk: "90", def: "120", spatk: "85", spdef: "70", spe: "60"},
			{nDex: "111", name: "Rhyhorn", type1: "Ground", type2: "Rock", hp: "80", atk: "85", def: "95", spatk: "30", spdef: "30", spe: "25"},
			{nDex: "112", name: "Rhydon", type1: "Ground", type2: "Rock", hp: "105", atk: "130", def: "120", spatk: "45", spdef: "45", spe: "40"},
			{nDex: "113", name: "Chansey", type1: "Normal", type2: "", hp: "250", atk: "5", def: "5", spatk: "35", spdef: "105", spe: "50"},
			{nDex: "114", name: "Tangela", type1: "Grass", type2: "", hp: "65", atk: "55", def: "115", spatk: "100", spdef: "40", spe: "60"},
			{nDex: "115", name: "Kangaskhan", type1: "Normal", type2: "", hp: "105", atk: "95", def: "80", spatk: "40", spdef: "80", spe: "90"},
			{nDex: "116", name: "Horsea", type1: "Water", type2: "", hp: "30", atk: "40", def: "70", spatk: "70", spdef: "25", spe: "60"},
			{nDex: "117", name: "Seadra", type1: "Water", type2: "", hp: "55", atk: "65", def: "95", spatk: "95", spdef: "45", spe: "85"},
			{nDex: "118", name: "Goldeen", type1: "Water", type2: "", hp: "45", atk: "67", def: "60", spatk: "35", spdef: "50", spe: "63"},
			{nDex: "119", name: "Seaking", type1: "Water", type2: "", hp: "80", atk: "92", def: "65", spatk: "65", spdef: "80", spe: "68"},
			{nDex: "120", name: "Staryu", type1: "Water", type2: "", hp: "30", atk: "45", def: "55", spatk: "70", spdef: "55", spe: "85"},
			{nDex: "121", name: "Starmie", type1: "Water", type2: "Psychic", hp: "60", atk: "75", def: "85", spatk: "100", spdef: "85", spe: "115"},
			{nDex: "122", name: "Mr. Mime", type1: "Psychic", type2: "Fairy", hp: "40", atk: "45", def: "65", spatk: "100", spdef: "120", spe: "90"},
			{nDex: "123", name: "Scyther", type1: "Bug", type2: "Flying", hp: "70", atk: "110", def: "80", spatk: "55", spdef: "80", spe: "105"},
			{nDex: "124", name: "Jynx", type1: "Ice", type2: "Psychic", hp: "65", atk: "50", def: "35", spatk: "115", spdef: "95", spe: "95"},
			{nDex: "125", name: "Electabuzz", type1: "Electric", type2: "Electric", hp: "65", atk: "83", def: "57", spatk: "95", spdef: "85", spe: "105"},
			{nDex: "126", name: "Magmar", type1: "Fire", type2: "", hp: "65", atk: "95", def: "57", spatk: "100", spdef: "85", spe: "93"},
			{nDex: "127", name: "Pinsir", type1: "Bug", type2: "", hp: "65", atk: "125", def: "100", spatk: "55", spdef: "70", spe: "85"},
			{nDex: "128", name: "Tauros", type1: "Normal", type2: "", hp: "75", atk: "100", def: "95", spatk: "40", spdef: "70", spe: "110"},
			{nDex: "129", name: "Magikarp", type1: "Water", type2: "", hp: "20", atk: "10", def: "55", spatk: "15", spdef: "20", spe: "80"},
			{nDex: "130", name: "Gyarados", type1: "Water", type2: "Flying", hp: "95", atk: "125", def: "79", spatk: "60", spdef: "100", spe: "81"},
			{nDex: "131", name: "Lapras", type1: "Water", type2: "Ice", hp: "130", atk: "85", def: "80", spatk: "85", spdef: "95", spe: "60"},
			{nDex: "132", name: "Ditto", type1: "Normal", type2: "", hp: "48", atk: "48", def: "48", spatk: "48", spdef: "48", spe: "48"},
			{nDex: "133", name: "Eevee", type1: "Normal", type2: "", hp: "55", atk: "55", def: "50", spatk: "45", spdef: "65", spe: "55"},
			{nDex: "134", name: "Vaporeon", type1: "Water", type2: "", hp: "130", atk: "65", def: "60", spatk: "110", spdef: "95", spe: "65"},
			{nDex: "135", name: "Jolteon", type1: "Electric", type2: "", hp: "65", atk: "65", def: "60", spatk: "110", spdef: "95", spe: "130"},
			{nDex: "136", name: "Flareon", type1: "Fire", type2: "", hp: "65", atk: "130", def: "60", spatk: "95", spdef: "110", spe: "65"},
			{nDex: "137", name: "Porygon", type1: "Normal", type2: "", hp: "65", atk: "60", def: "70", spatk: "85", spdef: "75", spe: "40"},
			{nDex: "138", name: "Omanyte", type1: "Rock", type2: "Water", hp: "35", atk: "40", def: "100", spatk: "90", spdef: "55", spe: "35"},
			{nDex: "139", name: "Omastar", type1: "Rock", type2: "Water", hp: "70", atk: "60", def: "125", spatk: "115", spdef: "70", spe: "55"},
			{nDex: "140", name: "Kabuto", type1: "Rock", type2: "Water", hp: "30", atk: "80", def: "90", spatk: "55", spdef: "45", spe: "55"},
			{nDex: "141", name: "Kabutops", type1: "Rock", type2: "Water", hp: "60", atk: "115", def: "105", spatk: "65", spdef: "70", spe: "80"},
			{nDex: "142", name: "Aerodactyl", type1: "Rock", type2: "Flying", hp: "80", atk: "105", def: "65", spatk: "60", spdef: "75", spe: "130"},
			{nDex: "143", name: "Snorlax", type1: "Normal", type2: "Normal", hp: "160", atk: "110", def: "65", spatk: "65", spdef: "110", spe: "30"},
			{nDex: "144", name: "Articuno", type1: "Ice", type2: "Flying", hp: "90", atk: "85", def: "100", spatk: "95", spdef: "125", spe: "85"},
			{nDex: "145", name: "Zapdos", type1: "Electric", type2: "Flying", hp: "90", atk: "90", def: "85", spatk: "125", spdef: "90", spe: "100"},
			{nDex: "146", name: "Moltres", type1: "Fire", type2: "Flying", hp: "90", atk: "100", def: "90", spatk: "125", spdef: "85", spe: "90"},
			{nDex: "147", name: "Dratini", type1: "Dragon", type2: "", hp: "41", atk: "64", def: "45", spatk: "50", spdef: "50", spe: "50"},
			{nDex: "148", name: "Dragonair", type1: "Dragon", type2: "", hp: "61", atk: "84", def: "65", spatk: "70", spdef: "70", spe: "70"},
			{nDex: "149", name: "Dragonite", type1: "Dragon", type2: "Flying", hp: "91", atk: "134", def: "95", spatk: "100", spdef: "100", spe: "80"},
			{nDex: "150", name: "Mewtwo", type1: "Psychic", type2: "", hp: "106", atk: "110", def: "90", spatk: "154", spdef: "90", spe: "130"},
			{nDex: "151", name: "Mew", type1: "Psychic", type2: "", hp: "100", atk: "100", def: "100", spatk: "100", spdef: "100", spe: "100"}
		]
	},

	filters: {
		capitalize: function (str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		}
	},

	methods: {
		"chartMe": function (hp, atk, def, spe, spdef, spatk) {
			this.hp = hp
			this.atk = atk
			this.def = def
			this.spatk = spatk
			this.spdef = spdef
			this.spe = spe

			document.getElementById("asdfg").classList.add("is-active");

			var ctx = document.getElementById("myChart").getContext('2d');
			ctx.canvas.width = 100;
			ctx.canvas.height = 100;

			var myRadarChart = new Chart(ctx, {
			    type: 'radar',
			    data: {
			    	labels: ["Hit Point", "Attack", "Defense", "Speed", "Special Defense", "Special Attack"],
			    	datasets: [{
			    		label: 'Stats',
						data: [ this.hp, this.atk, this.def, this.spatk, this.spdef, this.spe],
						backgroundColor: [
					    	'rgba(255, 99, 132, 0.2)'
					    ],
					    borderColor: [
					    	'rgba(255, 99, 132, 1)'
					    ],
					    borderWidth: 2
			    	}]
			    },
			    options: {
				scale: {
		              ticks: {
		                beginAtZero: true
		              }
		            }
			    }
			});
		},

		"unChartMe": function() {
			document.getElementById("asdfg").classList.remove("is-active");
		},

		// Currently not working; need to fix
		"addData": function(something) {
			myRadarChart.data.datasets[0].data[3] = something.value;
			myRadarChart.update();
		},

		"sortTable": function(column) {
			this.ascending = (this.sortcolumn === column) ? !this.ascending : true
			this.sortcolumn = column;
			var ascending = this.ascending;

			this.pokemonList.sort(function(a, b) {
				if (a[column] > b[column]) {
					return ascending ? 1 : -1;
				} else if (a[column] < b[column]) {
					return ascending ? -1 : 1;
				}
			})
		},

		"calcHP": function(base, level, iv, ev) {
			var hp = Math.floor( ( ( 2 * base + iv + Math.floor(ev/4) ) * level )/100 ) + level + 10;
			return hp
		},

		// Need to rewrite it where the nature is a modifier of 1.1, 1.0 or 0.9
		calcStat: function(base, level, iv, ev) {
			var nature = 1;
			return Math.floor( ( ( Math.floor( ( 2 * base + iv + Math.floor(ev/4) ) * level )/100 ) + 5 ) * nature )
		}

	},

	computed: {
		"pokeColumn": function pokeColumn() {
			if (this.pokemonList.length == 0) {
				return [];
			}
		return Object.keys(this.pokemonList[0])
		},

		"filteredPokemon": function() {
			return this.pokemonList.filter(pokemon => { 
				return (pokemon.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 || pokemon.type1.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 || pokemon.type2.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 || pokemon.nDex.toString().indexOf(this.search.toString()) >= 0); 
			});
		}
	}
})