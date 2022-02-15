var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function notifyRandomMeme() {
    let memes = ["One more things", "Олег, где макет?", "РОКК ЕБОЛ"];
    let randomNumber = Math.floor(Math.random() * memes.length);
    figma.notify(memes[randomNumber]);
}
function createPage(name, position = undefined) {
    let page = figma.createPage();
    page.name = name;
    if (position != undefined)
        figma.root.insertChild(position, page);
}
function setPages() {
    if (figma.root.children[0].name === "Page 1")
        figma.root.children[0].name = "Drafts";
    createPage("Cover");
    createPage("Mock-up", 0);
}
function getCover() {
    return __awaiter(this, void 0, void 0, function* () {
        let componentKey = "060e8629b917c619e90c43edb721d03a0ce47543";
        let component = yield figma.importComponentByKeyAsync(componentKey);
        return component;
    });
}
function placeCover() {
    return __awaiter(this, void 0, void 0, function* () {
        let page = figma.root.findChild((n) => n.name === "Cover");
        let frame = figma.createFrame();
        frame.name = "Cover";
        page.appendChild(frame);
        let coverComponent = yield getCover();
        let cover = coverComponent.createInstance();
        frame.appendChild(cover);
        yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
        let fileName = cover.findOne((n) => n.name === "File Name");
        fileName.characters = figma.root.name;
        frame.resize(cover.width, cover.height);
        yield figma.setFileThumbnailNodeAsync(frame);
    });
}
function placeChecklist(componentKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = figma.root.findChild((n) => n.name === "Mock-up");
        let component = yield figma.importComponentByKeyAsync(componentKey);
        page.appendChild(component.createInstance());
    });
}
function setTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        setPages();
        yield placeChecklist("147a27a2fb02224fd7006caeaddc02c9153cae76");
        yield placeCover();
    });
}
setTemplate().then(() => {
    notifyRandomMeme();
    figma.closePlugin();
});
