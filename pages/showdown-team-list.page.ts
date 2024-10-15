import { Page, Locator } from '@playwright/test';

export class ShowdownTeamListPage {
    readonly page: Page;
    readonly newTeamButton: Locator;
    
    private readonly NEW_TEAM_BUTTON_SELECTOR = '//button[@value = "team" and contains(., "New Team")]';

    constructor(page: Page) {
        this.page          = page;
        this.newTeamButton = page.locator(this.NEW_TEAM_BUTTON_SELECTOR);
    }

    clickOnCreateTeam = async () => {
        await this.newTeamButton.click();
    }
}