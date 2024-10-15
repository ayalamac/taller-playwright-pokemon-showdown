import { Page, Locator } from '@playwright/test';

export class ShowdownTeamCreationPage {
    readonly page: Page;
    readonly teamNameInputText: Locator
    readonly formatDropdownButton: Locator;
    readonly formatInputText: Locator;
    
    private readonly TEAM_NAME_INPUT_TEXT_SELECTOR = 'input.teamnameedit';
    private readonly TEAM_FORMAT_BUTTON_NAME       = 'Select a format';
    private readonly TEAM_FORMAT_SEARCH_BOX_NAME   = 'Search formats';
    
    private readonly KEYPRESS_DELAY = 100;

    constructor(page: Page) {
        this.page                 = page;
        this.teamNameInputText    = page.locator(this.TEAM_NAME_INPUT_TEXT_SELECTOR);
        this.formatDropdownButton = page.getByRole('button', { name: this.TEAM_FORMAT_BUTTON_NAME });
        this.formatInputText      = page.getByPlaceholder(this.TEAM_FORMAT_SEARCH_BOX_NAME);
    }

    nameTeam = async (teamName: string) => {
        await this.teamNameInputText.fill(teamName);
    }

    selectFormat = async (generation: string, name: string) => {
        await this.formatDropdownButton.click();
        const formatName = `${generation} ${name}`;
        await this.formatInputText.pressSequentially(formatName, { delay: this.KEYPRESS_DELAY });
        const formatFullText = `button:has-text("[${generation}] ${name}")`;
        await this.page.locator(formatFullText).click();
    }

}