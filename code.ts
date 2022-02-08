function notifyRandomMeme() {
  let memes = ["One more things", "Олег, где макет?", "РОКК ЕБОЛ"];

  let randomNumber = Math.floor(Math.random() * memes.length);

  figma.notify(memes[randomNumber]);
}

function createPages(pages) {
  figma.root.children[0].name = pages[0];
  for (let i = 1; i < pages.length; i++) {
    let page = figma.createPage();
    page.name = pages[i];
  }
  figma.currentPage = figma.root.findChild((n) => n.name === "Drafts");
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

async function placeChecklist(componentKey, parentNode) {
  let component = await figma.importComponentByKeyAsync(componentKey);
  parentNode.appendChild(component.createInstance());
}

async function setTemplate() {
  const pages = ["Mock-up", "Drafts", "Cover"];

  createPages(pages);
  await placeChecklist(
    "147a27a2fb02224fd7006caeaddc02c9153cae76",
    figma.root.findChild((n) => n.name === "Mock-up")
  );
  await placeCover();
}

setTemplate().then(() => {
  notifyRandomMeme();
  figma.closePlugin();
});
