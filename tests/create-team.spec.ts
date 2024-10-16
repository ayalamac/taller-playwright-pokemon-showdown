import { expect, test } from '@playwright/test';

import { ShowdownHomePage } from '../pages/showdown-home.page';
import { ShowdownTeamListPage } from '../pages/showdown-team-list.page';
import { ShowdownTeamCreationPage } from '../pages/showdown-team-creation.page';
import { ShowdownPokemonConfigurationPage } from '../pages/showdown-pokemon-configuration.page';

import pokemonTeamData from './../data/pokemon-team.json';
import { Pokemon } from '../types/pokemon.type';

test('Crear un equipo de Pokemones y verificar que es válido', async ({page}) => {
  
  const REMAINING_EV_TEXT = "0";
  const {generation, name} = pokemonTeamData.format;
  const VALID_TEAM_TEXT = `Your team is valid for [${generation}] ${name}.`;
  let pokemonCounter = 1;

  test.slow();
  
  const homePage: ShowdownHomePage = new ShowdownHomePage(page);
  const teamListPage: ShowdownTeamListPage = new ShowdownTeamListPage(page);
  const teamCreationPage: ShowdownTeamCreationPage = new ShowdownTeamCreationPage(page);
  const pokemonConfigurationPage: ShowdownPokemonConfigurationPage = new ShowdownPokemonConfigurationPage(page);
  const pokemonList: Array<Pokemon> = pokemonTeamData.pokemons;

  await homePage.openWebPage(); 
  await homePage.clickOnTeamBuilder();

  await teamListPage.clickOnCreateTeam();

  await teamCreationPage.nameTeam(pokemonTeamData.name);
  await teamCreationPage.selectFormat(pokemonTeamData.format);
  await page.screenshot({ path: `evidences/evidence-create-team.png` });

  for(const pokemon of pokemonList) {
    await teamCreationPage.clickOnAddPokemon();

    await pokemonConfigurationPage.selectName(pokemon.name);
    await pokemonConfigurationPage.assignItem(pokemon.item);
    await pokemonConfigurationPage.defineAbility(pokemon.ability);
    await pokemonConfigurationPage.assignMoves(pokemon.moves);
    await pokemonConfigurationPage.setEvs(pokemon.evs);

    const remainingEvs = await pokemonConfigurationPage.getRemainingEvs();
    
    expect(remainingEvs).toBe(REMAINING_EV_TEXT);
    await page.screenshot({ path: `evidences/evidence-create-pokemon-${pokemonCounter++}-${pokemon.name.replaceAll(' ', '+')}.png` });

    await pokemonConfigurationPage.clickOnBackToTeam();
  }

  const validationResult = await teamCreationPage.getTeamValidationResult(pokemonTeamData.format);
  expect(validationResult).toBe(VALID_TEAM_TEXT);
  await page.screenshot({ path: `evidences/evidence-result-valid-team.png` });
});