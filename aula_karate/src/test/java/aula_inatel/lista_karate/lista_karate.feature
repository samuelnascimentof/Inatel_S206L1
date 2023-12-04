Feature: Testando retornos da API de piadas do Chuck Norris

Background:
    * def url_base = 'https://api.chucknorris.io/jokes'

Scenario: Consultando a lista de categorias de piadas disponíveis e validando o tipo e o conteúdo do retorno
    Given url url_base
    And path '/categories'
    When method get
    Then status 200
    And match $ == '#[]'
    And match $ == ['animal','career','celebrity','dev','explicit','fashion','food','history','money','movie','music','political','religion','science','sport','travel']

Scenario: Consultando uma piada por categoria e validando o tipo e o conteúdo do retorno
    Given url url_base
    And path '/random'
    And param category = 'dev'
    When method get
    Then status 200
    And match $ == '#object'
    And match $ == { "categories": "#[]", "created_at": "#string", "icon_url": "#string", "id": "#string", "updated_at": "#string", "url": "#string", "value": "#string" }

Scenario: Consultando uma piada por palavra-chave e validando o tipo e o conteúdo do retorno
    Given url url_base
    And path '/search'
    And param query = 'dev'
    When method get
    Then status 200
    And match $ == '#object'
    And match $ == { "total": "#number", "result": "#[]" }

Scenario: Consultando uma categoria de piada e validando o tipo do retorno
    Given url url_base
    And path '/random'
    And param category = 'dev'
    When method get
    Then status 200
    And match $ == '#object'
    And match $ == { "categories": "#[]", "created_at": "#string", "icon_url": "#string", "id": "#string", "updated_at": "#string", "url": "#string", "value": "#string" }

Scenario: Consultando uma categoria de piada inexistente e validando o tipo do retorno
    Given url url_base
    And path '/random'
    And param category = 'inexistente'
    When method get
    Then status 404

Scenario: Consultando uma categoria de piada com valor nulo e validando o tipo do retorno
    Given url url_base
    And path '/random'
    And param category = ''
    When method get
    Then status 404
