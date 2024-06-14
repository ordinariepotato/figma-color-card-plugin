"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'create-color-card') {
        const selection = figma.currentPage.selection;
        if (selection.length === 0 || !('fills' in selection[0])) {
            figma.notify('Please select a colored object.');
            return;
        }
        const fills = selection[0].fills;
        if (fills.length === 0 || fills[0].type !== 'SOLID') {
            figma.notify('Selected object does not have a solid fill color.');
            return;
        }
        const color = fills[0].color;
        const r = Math.round(color.r * 255);
        const g = Math.round(color.g * 255);
        const b = Math.round(color.b * 255);
        const hex = rgbToHex(r, g, b);
        const frame = figma.createFrame();
        frame.resize(200, 120);
        frame.layoutMode = 'VERTICAL';
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'AUTO';
        frame.paddingTop = 16;
        frame.paddingBottom = 16;
        frame.paddingLeft = 16;
        frame.paddingRight = 16;
        frame.itemSpacing = 8;
        const colorRectangle = figma.createRectangle();
        colorRectangle.resize(160, 60);
        colorRectangle.fills = [{ type: 'SOLID', color: { r: color.r, g: color.g, b: color.b } }];
        frame.appendChild(colorRectangle);
        const colorName = figma.createText();
        colorName.fontName = { family: 'Inter', style: 'Bold' };
        colorName.fontSize = 16;
        colorName.characters = 'Color Name: Custom Color';
        frame.appendChild(colorName);
        const hexCode = figma.createText();
        hexCode.fontName = { family: 'Inter', style: 'Regular' };
        hexCode.fontSize = 14;
        hexCode.characters = `Hex: ${hex}`;
        frame.appendChild(hexCode);
        const rgbCode = figma.createText();
        rgbCode.fontName = { family: 'Inter', style: 'Regular' };
        rgbCode.fontSize = 14;
        rgbCode.characters = `RGB: (${r}, ${g}, ${b})`;
        frame.appendChild(rgbCode);
        figma.currentPage.appendChild(frame);
        figma.viewport.scrollAndZoomIntoView([frame]);
        figma.closePlugin();
    }
});
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}
figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
