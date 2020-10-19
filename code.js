var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function createPages(pages) {
    figma.root.children[0].name = pages[0];
    for (let i = 1; i < pages.length; i++) {
        let page = figma.createPage();
        page.name = pages[i];
    }
}
function getCover() {
    return __awaiter(this, void 0, void 0, function* () {
        let componentKey = "6d5c8f9f37f810cb772a64fef553b8898ffe4a02";
        let component = yield figma.importComponentByKeyAsync(componentKey);
        return component;
    });
}
function placeCover() {
    return __awaiter(this, void 0, void 0, function* () {
        let page = figma.root.findChild((n) => n.name === "0. Cover");
        figma.currentPage = page;
        let frame = figma.createFrame();
        frame.name = "Cover";
        page.appendChild(frame);
        let coverComponent = yield getCover();
        let cover = coverComponent.createInstance();
        frame.appendChild(cover);
        yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
        let fileName = cover.children[1];
        fileName.characters = figma.root.name;
        frame.resize(cover.width, cover.height);
        const nodes = [];
        nodes.push(frame);
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
        return nodes;
    });
}
function placeChecklist(componentKey, parentNode) {
    return __awaiter(this, void 0, void 0, function* () {
        let component = yield figma.importComponentByKeyAsync(componentKey);
        parentNode.appendChild(component.createInstance());
    });
}
function setTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const pages = ["3. Build", "2. Create", "1. Discover", "0. Cover"];
        createPages(pages);
        // await placeChecklist(
        //   "6066d7ff57b28a5ccae801a7554954cbfa028f75",
        //   figma.root.findChild((n) => n.name === "1. Discover")
        // );
        yield placeChecklist("2c93758ce317da2f9bcd383f2bccdde2285168b2", figma.root.findChild((n) => n.name === "2. Create"));
        yield placeChecklist("e5223211efeb68ca7f3e5756d6f155dd44075f2c", figma.root.findChild((n) => n.name === "3. Build"));
        yield placeCover();
    });
}
setTemplate().then(() => figma.closePlugin());
