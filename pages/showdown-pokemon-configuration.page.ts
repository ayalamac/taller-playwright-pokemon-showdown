import { Page, Locator } from '@playwright/test';
import { EvsConfig } from '../types/pokemon.type';

export class ShowdownPokemonConfigurationPage {
    readonly page: Page;
    readonly pokemonNameInputText: Locator;
    readonly pokemonItemInputText: Locator;
    readonly pokemonAbilityInputText: Locator;
    readonly remainingEvsText: Locator;
    readonly backToTeamButton: Locator;
    
    private readonly BACK_TO_TEAM_BUTTON_SELECTOR        = 'button[name="back"]';
    private readonly POKEMON_NAME_INPUT_TEXT_SELECTOR    = 'input[name="pokemon"]';
    private readonly POKEMON_ITEM_INPUT_TEXT_SELECTOR    = 'input[name="item"]';
    private readonly POKEMON_ABILITY_INPUT_TEXT_SELECTOR = 'input[name="ability"]';
    private readonly REMAINING_EVS_TEXT_SELECTOR         = '//div[@class = "totalev"]/em';

    private readonly KEYPRESS_DELAY = 25;

    constructor(page: Page) {
        this.page                    = page;
        this.backToTeamButton        = page.locator(this.BACK_TO_TEAM_BUTTON_SELECTOR);
        this.pokemonNameInputText    = page.locator(this.POKEMON_NAME_INPUT_TEXT_SELECTOR);
        this.pokemonItemInputText    = page.locator(this.POKEMON_ITEM_INPUT_TEXT_SELECTOR);
        this.pokemonAbilityInputText = page.locator(this.POKEMON_ABILITY_INPUT_TEXT_SELECTOR);
        this.remainingEvsText        = page.locator(this.REMAINING_EVS_TEXT_SELECTOR);
    }

    selectName = async (name: string): Promise<void> => {
        await this.pokemonNameInputText.clear();
        await this.pokemonNameInputText.click();
        await this.pokemonNameInputText.pressSequentially(name, { delay: this.KEYPRESS_DELAY });
        const foundPokemonLink: Locator = this.page.locator(`a[data-entry="pokemon|${name}"]`);
        await foundPokemonLink.click();
    }

    assignItem = async (item: string): Promise<void> => {
        await this.pokemonItemInputText.clear();
        await this.pokemonItemInputText.click();
        await this.pokemonItemInputText.pressSequentially(item, { delay: this.KEYPRESS_DELAY });
        const foundPokemonItem: Locator = this.page.locator(`a[data-entry="item|${item}"]`);
        await foundPokemonItem.click();
    }

    defineAbility = async (ability: string): Promise<void> => {
        await this.pokemonAbilityInputText.clear();
        await this.pokemonAbilityInputText.click();
        await this.pokemonAbilityInputText.pressSequentially(ability, { delay: this.KEYPRESS_DELAY });
        const foundPokemonAbility: Locator = this.page.locator(`a[data-entry="ability|${ability}"]`);
        await foundPokemonAbility.click();
    }

    assignMoves = async (moves: Array<string>): Promise<void> => {
        let index = 0;
        for (const move of moves) {
            index++;
            const moveInputText = this.page.locator(`input[name="move${index}"]`);
            await moveInputText.click();
            await moveInputText.pressSequentially(move, { delay: this.KEYPRESS_DELAY });
            const foundMove: Locator = this.page.locator(`a[data-entry="move|${move}"]`);
            await foundMove.click();
        }
    }

    setEvs = async (evs: EvsConfig): Promise<void> => {
        for (const info of Object.values(evs)) {
            const {id, value} = info;
            const evInputText = this.page.locator(`input[name="stat-${id}"]`);
            await evInputText.pressSequentially(value.toString(), { delay:this.KEYPRESS_DELAY });
        }
    }

    getRemainingEvs = async (): Promise<string> => this.remainingEvsText.innerText();

    clickOnBackToTeam = async (): Promise<void> => {
        await this.backToTeamButton.click();
    }
}