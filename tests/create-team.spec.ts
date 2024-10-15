import { test } from '@playwright/test';

import { ShowdownHomePage } from '../pages/showdown-home.page';
import { ShowdownTeamListPage } from '../pages/showdown-team-list.page';
import { ShowdownTeamCreationPage } from '../pages/showdown-team-creation.page';

import pokemonTeamData from './../data/pokemon-team.json';

test('Crear un equipo de Pokemones y verificar que es válido', async ({page}) => {

  test.slow();

  const homePage = new ShowdownHomePage(page);
  const teamListPage = new ShowdownTeamListPage(page);
  const teamCreationPage = new ShowdownTeamCreationPage(page);

  await homePage.openWebPage(); 
  await homePage.clickOnTeamBuilder();

  await teamListPage.clickOnCreateTeam();

  await teamCreationPage.nameTeam(pokemonTeamData.name);

  const {generation, name} = pokemonTeamData.format;
  await teamCreationPage.selectFormat(generation, name);
});