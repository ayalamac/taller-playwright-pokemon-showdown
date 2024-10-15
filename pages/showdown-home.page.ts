import { Page, Locator } from "@playwright/test";

export class ShowdownHomePage {
    readonly page: Page;
    readonly teamBuilderButton: Locator;

    private readonly SITE_URL                 = 'https://play.pokemonshowdown.com';
    private readonly TEAM_BUILDER_BUTTON_NAME = 'Teambuilder';

    constructor(page: Page) {
        this.page = page;
        this.teamBuilderButton =
            this.page.getByRole('button', { name: this.TEAM_BUILDER_BUTTON_NAME });
    }

    openWebPage = async () => {
        await this.page.goto(this.SITE_URL);
    }

    clickOnTeamBuilder = async () => {
        await this.teamBuilderButton.click();
    }
}