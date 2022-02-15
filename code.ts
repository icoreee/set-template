function notifyRandomMeme() {
  let memes = ["One more things", "Олег, где макет?", "РОКК ЕБОЛ"];

  let randomNumber = Math.floor(Math.random() * memes.length);

  figma.notify(memes[randomNumber]);
}

function createPage(name, position = undefined) {
  let page = figma.createPage();
  page.name = name;

  if (position != undefined) figma.root.insertChild(position, page);
}

function setPages() {
  if (figma.root.children[0].name === "Page 1")
    figma.root.children[0].name = "Drafts";

  createPage("Cover");
  createPage("Mock-up", 0);
}

async function getCover() {
  let componentKey = "060e8629b917c619e90c43edb721d03a0ce47543";
  let component = await figma.importComponentByKeyAsync(componentKey);
  return component;
}

async function placeCover() {
  let page = figma.root.findChild((n) => n.name === "Cover");

  let frame = figma.createFrame();
  frame.name = "Cover";
  page.appendChild(frame);

  let coverComponent = await getCover();

  let cover = coverComponent.createInstance();

  frame.appendChild(cover);

  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  let fileName = cover.findOne((n) => n.name === "File Name") as TextNode;

  fileName.characters = figma.root.name;

  frame.resize(cover.width, cover.height);

  await figma.setFileThumbnailNodeAsync(frame as FrameNode);
}

async function placeChecklist(componentKey) {
  let page = figma.root.findChild((n) => n.name === "Mock-up");

  let component = await figma.importComponentByKeyAsync(componentKey);
  page.appendChild(component.createInstance());
}

async function setTemplate() {
  setPages();
  await placeChecklist("147a27a2fb02224fd7006caeaddc02c9153cae76");
  await placeCover();
}

setTemplate().then(() => {
  notifyRandomMeme();
  figma.closePlugin();
});
