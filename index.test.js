const { generatePalette } = require('./index');

test('generatePalette creates a palette of the correct length', () => {
    const palette = generatePalette('#FF5733', 5);
    expect(palette).toHaveLength(5);
});

test('generatePalette with monochromatic scheme', () => {
    const palette = generatePalette('#FF5733', 5, 'monochromatic');
    expect(palette).toHaveLength(6); // tinycolor's monochromatic generates 6 colors by default
});
