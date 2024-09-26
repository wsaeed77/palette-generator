const tinycolor = require('tinycolor2');
const fs = require('fs');

/**
 * Generates a color palette based on a base color and scheme.
 * @param {string} baseColor - The base color in any valid CSS format (e.g., #FF5733, rgb(255, 87, 51)).
 * @param {number} count - Number of colors to generate in the palette.
 * @param {string} scheme - The color scheme to use (default, monochromatic, analogous, complementary, triadic, tetradic).
 * @returns {Array} - Array of colors in HEX format.
 */
function generatePalette(baseColor, count = 5, scheme = 'default') {
    const palette = [];
    const color = tinycolor(baseColor);

    switch (scheme) {
        case 'monochromatic':
            palette.push(...color.monochromatic().map(c => c.toHexString()));
            break;
        case 'analogous':
            palette.push(...color.analogous(count).map(c => c.toHexString()));
            break;
        case 'complementary':
            palette.push(color.toHexString(), color.complement().toHexString());
            break;
        case 'triadic':
            palette.push(...color.triad().map(c => c.toHexString()));
            break;
        case 'tetradic':
            palette.push(...color.tetrad().map(c => c.toHexString()));
            break;
        default:
            for (let i = 0; i < count; i++) {
                palette.push(color.spin((360 / count) * i).toHexString());
            }
    }

    return palette;
}

/**
 * Displays the color palette in the console.
 * @param {Array} palette - Array of colors in HEX format.
 */
function displayPalette(palette) {
    palette.forEach((color) => {
        console.log(`%c ${color}`, `background: ${color}; color: #fff; padding: 5px;`);
    });
}

/**
 * Saves the generated palette to a file.
 * @param {Array} palette - Array of colors in HEX format.
 * @param {string} filename - The filename to save the palette to.
 */
function savePaletteToFile(palette, filename = 'palette.json') {
    const data = JSON.stringify({ palette }, null, 2);
    fs.writeFileSync(filename, data);
    console.log(`Palette saved to ${filename}`);
}

module.exports = { generatePalette, displayPalette, savePaletteToFile };
