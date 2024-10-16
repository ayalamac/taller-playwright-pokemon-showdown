import { Page, Locator } from '@playwright/test';
import { PokemonTeamFormat } from '../types/pokemon-team.type';

export class ShowdownTeamCreationPage {
    readonly page: Page;
    readonly teamNameInputText: Locator
    readonly formatDropdownButton: Locator;
    readonly formatInputText: Locator;
    readonly addPokemonButton: Locator;
    readonly validateButton: Locator;
    
    private readonly TEAM_NAME_INPUT_TEXT_SELECTOR = 'input.teamnameedit';
    private readonly TEAM_FORMAT_BUTTON_NAME       = 'Select a format';
    private readonly TEAM_FORMAT_SEARCH_BOX_NAME   = 'Search formats';
    private readonly ADD_POKEMON_BUTTON_NAME       = 'Add Pokémon';
    private readonly VALIDATE_BUTTON_SELECTOR      = '//button[@name="validate"]';
    
    private readonly KEYPRESS_DELAY = 25;

    constructor(page: Page) {
        this.page                 = page;
        this.teamNameInputText    = page.locator(this.TEAM_NAME_INPUT_TEXT_SELECTOR);
        this.formatDropdownButton = page.getByRole('button', { name: this.TEAM_FORMAT_BUTTON_NAME });
        this.formatInputText      = page.getByPlaceholder(this.TEAM_FORMAT_SEARCH_BOX_NAME);
        this.addPokemonButton     = page.getByRole('button', { name: this.ADD_POKEMON_BUTTON_NAME });
        this.validateButton       = page.locator(this.VALIDATE_BUTTON_SELECTOR);
    }

    nameTeam = async (teamName: string) => {
        await this.teamNameInputText.clear();
        await this.teamNameInputText.click();
        await this.teamNameInputText.fill(teamName);
    }

    selectFormat = async (format: PokemonTeamFormat) => {
        await this.formatDropdownButton.click();
        const {generation, name} = format;
        const formatName = `${generation} ${name}`;
        await this.formatInputText.pressSequentially(formatName, { delay: this.KEYPRESS_DELAY });
        const formatFullText = `button:has-text("[${generation}] ${name}")`;
        await this.page.locator(formatFullText).click();
    }

    clickOnAddPokemon = async () => {
        await this.addPokemonButton.click();
    }

    getTeamValidationResult = async (format:PokemonTeamFormat): Promise<string> => {
        const {generation, name} = format;
        const TEXT = `Your team is valid for [${generation}] ${name}.`;
        await this.validateButton.click();

        const validationResultText = await this.page.locator(`text=${TEXT}`).innerText();
        return validationResultText;
    }
}