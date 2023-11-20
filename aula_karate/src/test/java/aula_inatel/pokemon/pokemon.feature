Feature: Testando API Pokemon.

Background: Executa antes de cada teste
    * def url_base = 'https://pokeapi.co/api/v2/'
    * def species_endpoint = 'pokemon-species/'

Scenario: Testando retorno.
    Given url 'https://pokeapi.co/api/v2/pokemon/pikachu'
    When method get
    Then status 200

Scenario: Testando retorno people/1/ com informações inválidas
    Given url 'https://pokeapi.co/api/v2/pokemon/chocolate'
    When method get
    Then status 404

Scenario: Testando retorno pikachu e verificando o JSON.
    Given url url_base
    And path '/pokemon/pikachu'
    When method get
    Then status 200
    And match response.name == 'pikachu'
    And match response.id == 25

Scenario: Testando retorno pokemon Rede entrando em um dos elementos do array de idiomas e testando o retorno JSON
    Given url url_base
    And path '/version/1/'
    When method get
    Then status 200
    And def idioma = $.names[5].language.url
    And print idioma
    And url idioma
    When method get
    Then status 200
    And match response.name == 'es'
    And match response.id == 7

Scenario: Testando retorno da epécie aegislash e verificando o retorno.
    Given url url_base
    And path species_endpoint + 'aegislash'
    When method get
    Then status 200
    And match response.name == 'aegislash'
    And match response.id == 681

Scenario: Testando retorno da epécie aegislash e verificando os dados do array pokedex_numbers.
    Given url url_base
    And path species_endpoint + 'aegislash'
    When method get
    Then status 200
    And match response.pokedex_numbers[0].entry_number == 681
    And match response.pokedex_numbers[0].pokedex.name == 'national'
    And match response.pokedex_numbers[1].entry_number == 119
    And match response.pokedex_numbers[1].pokedex.name == 'kalos-central'
    And match response.pokedex_numbers[2].entry_number == 332
    And match response.pokedex_numbers[2].pokedex.name == 'galar'

Scenario: Testando o retorno de todos os pokemons cadastrados e verificando o número de pokemons.
    Given url url_base
    And path '/pokemon'
    When method get
    Then status 200
    And match response.count == 1292