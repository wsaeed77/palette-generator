#!/usr/bin/env node

const { generatePalette, displayPalette, savePaletteToFile } = require('./index');
const inquirer = require('inquirer');

async function promptUser() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'baseColor',
            message: 'Enter the base color (in HEX format):',
            default: '#FF5733'
        },
        {
            type: 'input',
            name: 'count',
            message: 'How many colors do you want in the palette?',
            default: 5
        },
        {
            type: 'list',
            name: 'scheme',
            message: 'Choose a color scheme:',
            choices: ['default', 'monochromatic', 'analogous', 'complementary', 'triadic', 'tetradic']
        },
        {
            type: 'confirm',
            name: 'save',
            message: 'Do you want to save the palette to a file?',
            default: false
        },
        {
            type: 'input',
            name: 'filename',
            message: 'Enter the filename to save the palette:',
            when: (answers) => answers.save,
            default: 'palette.json'
        }
    ]);

    const palette = generatePalette(answers.baseColor, parseInt(answers.count, 10), answers.scheme);
    displayPalette(palette);

    if (answers.save) {
        savePaletteToFile(palette, answers.filename);
    }
}

promptUser();
