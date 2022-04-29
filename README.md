Olá,

Nesse repositório está armazenado o meu projeto avaliativo de número 19, realizado durante o meu período de estudos na Trybe.

Importante: o intuito desse repositório é manter um histórico da minha evolução como Desenvolvedor Web, dessa forma, deve-se considerar que parte das soluções presentes no projeto foram realizadas durante a fase de aprendizado e podem não refletir as melhores práticas de desenvolvimento.

---

Projeto proposto pela Trybe:

---

## O que deverá ser desenvolvido

Você vai desenvolver uma lista com filtros de planetas do universo de Star Wars usando **Context API e Hooks** para controlar os estados globais.

---

# Requisitos do projeto

## Lista de requisitos

### 1 - Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos da coluna `residents`

A tabela deve ser renderizada por um componente chamado `<Table />`. Os dados recebidos da API devem ser salvos num campo chamado `data` do contexto e é daí que a tabela deve lê-los. A requisição deve ser feita num componente separado do componente da tabela.

A API a ser consultada está [nesse link](https://swapi-trybe.herokuapp.com/api/planets/). Ou seja, você deverá fazer um fetch para a URL `https://swapi-trybe.herokuapp.com/api/planets/`

A tabela deve ter uma primeira linha com os headers e as demais com as informações de cada campo.

### 2 - Filtre a tabela através de um texto, inserido num *campo de texto*, exibindo somente os planetas cujos nomes incluam o texto digitado

Ele deve atualizar a tabela com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar um botão para efetuar a filtragem. Por exemplo, se digitar "Tatoo", o planeta "Tatooine" deve ser exibido. Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação e o texto digitado deve ser salvo num campo `{ filterByName: { name } }`. Por exemplo:

```javascript
{
  filterByName: {
    name: 'Tatoo'
  }
}
```

O campo de texto deve possuir a propriedade `data-testid='name-filter'` para que a avaliação automatizada funcione.

### 3 - Crie um filtro para valores numéricos

Ele funcionará com três seletores:

  - O primeiro deve abrir um dropdown que permita a quem usa selecionar uma das seguintes colunas: `population`, `orbital_period`, `diameter`, `rotation_period` e `surface_water`. Deve ser uma tag `select` com a propriedade `data-testid='column-filter'`;
  - O segundo deve determinar se a faixa de valor será `maior que`, `menor que` ou `igual a` o numero que virá a seguir. Uma tag `select` com a propriedade `data-testid='comparison-filter'`;
  - O terceiro deve ser uma caixa de texto que só aceita números. Essa caixa deve ser uma tag `input` com a propriedade `data-testid='value-filter'`;
  - Deve haver um botão para acionar o filtro, com a propriedade `data-testid='button-filter'`.

A combinação desses três seletores deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos. Por exemplo:
  - A seleção `population | maior que | 100000` - Seleciona somente planetas com mais de 100000 habitantes.
  - A seleção `diameter | menor que | 8000` - Seleciona somente planetas com diâmetro menor que 8000.

Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação. No contexto, esses valores devem ser salvos em um outro campo `{ filterByNumericValues: [{ column, comparison, value }] }`. Por exemplo:

```javascript
{
  filterByNumericValues: [
    {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    }
  ]
}
```
### 4 - Implemente múltiplos filtros numéricos

Deverá ser possível adicionar múltiplos filtros numéricos, todos os filtros adicionados devem funcionar de forma conjunta.

Por exemplo, você pode filtrar pelos planetas que possuam _Orbital period > 400_  **e** _Diameter < 10000_.

### 5 - Não utilize filtros repetidos

Caso um filtro seja totalmente preenchido, um novo filtro de valores numéricos deve ser carregado. Este novo filtro não deve incluir quaisquer colunas que já tenham sido selecionadas em filtros de valores numéricos anteriores. Caso todas as colunas já tenham sido inclusas em filtros anteriores, não deve ser carregado um novo filtro. Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação.

Por exemplo: O primeiro filtro tem as seguintes seleções: `population | maior que | 100000`. Um segundo filtro deve aparecer após essas seleções serem todas feitas e, no primeiro dropdown deste segundo filtro, a opção `population` deve estar ausente. Se no segundo filtro fosse selecionado `diameter | menor que | 8000`, o estado ficaria assim:

```javascript
{
  filterByNumericValues: [
    {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    },
    {
      column: 'diameter',
      comparison: 'menor que',
      value: '8000',
    }
  ]
}
```

### 6 - Apague um filtro de valor numérico ao clicar no ícone de `X` de um dos filtros e apague todas filtragens numéricas simultaneamente ao clicar em outro botão de `Remover todas filtragens`

O `button` com o ícone de `x` deve existir em cada filtro de valores numéricos.

A coluna que este filtro selecionava deve passar a ficar disponível nos dropdowns dos demais filtros já presentes na tela. Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação. Cada filtro deve possuir a propriedade `data-testid='filter'`, com um `button` em seu interior com o texto `X`.

O `button` de `Remover todas filtragens` deverá possuir o `data-testid='button-remove-filters'`, e ele será responsável pela remoção de todos os filtros numéricos simultaneamente.

### 7 - Ordene as colunas de forma ascendente ou descendente

A informação acerca da ordenação das colunas deve ser armazenada em um novo campo `{ order: { column: 'population', sort: 'ASC'} }`, o campo column representa o nome da coluna a ordenar e a ordem representa a ordenação, sendo 'ASC' ascendente e 'DESC' descendente. Por padrão, a tabela começa ordenada por ordem alfabética. Por exemplo:

```javascript
{
  order: {
    column: 'population',
    sort: 'ASC',
  }
}
```

Essa ordenação deve ser feita via filtro: um dropdown selecionará a coluna a basear a ordenação e um par de radio buttons determinará se esta é ascendente ou descendente.

As colunas selecionáveis através deste dropdown são: 'population', 'orbital_period', 'diameter', 'rotation_period' e 'surface_water'.

Obs: Caso a coluna ordenada possua planetas com valores `unknown`, você deverá ordená-los de forma que valores `unknown` ficarão em último lugar na ordenação.

O dropdown deve ser um elemento `select` com a propriedade `data-testid='column-sort'`, com as opções das colunas escolhíveis em seu interior. Deve haver também, dois `inputs` de tipo `radio`, com propriedades `data-testid='column-sort-input-asc'` e `data-testid='column-sort-input-desc'`, para definir o sentido da ordenação (com `value` sendo `ASC` ou `DESC`) e um botão para submeter a ordenação, com uma tag `button` e a propriedade `data-testid='column-sort-button'`.

Adicione o atributo `data-testid` com o valor `planet-name` em todos os elementos da tabela que possuem o nome de um planeta.
