import { test } from '@playwright/test';

import { ShowdownHomePage } from '../pages/showdown-home.page';

test('Crear un equipo de Pokemones y verificar que es válido', async ({page}) => {

  test.slow();

  const homePage = new ShowdownHomePage(page);

  await homePage.openWebPage();
  await homePage.clickOnTeamBuilder();
});