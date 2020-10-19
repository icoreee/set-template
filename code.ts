function createPages(pages) {
  figma.root.children[0].name = pages[0];
  for (let i = 1; i < pages.length; i++) {
    let page = figma.createPage();
    page.name = pages[i];
  }
}

async function getCover() {
  let componentKey = "6d5c8f9f37f810cb772a64fef553b8898ffe4a02";
  let component = await figma.importComponentByKeyAsync(componentKey);
  return component;
}

async function placeCover() {
  let page = figma.root.findChild((n) => n.name === "0. Cover");
  figma.currentPage = page;

  let frame = figma.createFrame();
  frame.name = "Cover";
  page.appendChild(frame);

  let coverComponent = await getCover();

  let cover = coverComponent.createInstance();

  frame.appendChild(cover);

  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  let fileName = cover.children[1];

  fileName.characters = figma.root.name;

  frame.resize(cover.width, cover.height);

  const nodes = [];
  nodes.push(frame);
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
  return nodes;
}

async function placeChecklist(componentKey, parentNode) {
  let component = await figma.importComponentByKeyAsync(componentKey);
  parentNode.appendChild(component.createInstance());
}

async function setTemplate() {
  const pages = ["3. Build", "2. Create", "1. Discover", "0. Cover"];

  createPages(pages);
  // await placeChecklist(
  //   "6066d7ff57b28a5ccae801a7554954cbfa028f75",
  //   figma.root.findChild((n) => n.name === "1. Discover")
  // );
  await placeChecklist(
    "2c93758ce317da2f9bcd383f2bccdde2285168b2",
    figma.root.findChild((n) => n.name === "2. Create")
  );
  await placeChecklist(
    "e5223211efeb68ca7f3e5756d6f155dd44075f2c",
    figma.root.findChild((n) => n.name === "3. Build")
  );
  await placeCover();
}

setTemplate().then(() => figma.closePlugin());
