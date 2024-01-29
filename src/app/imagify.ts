function* pair(org: HTMLElement, cloned: HTMLElement): Generator<[HTMLElement, HTMLElement]> {
  function* next(node: HTMLElement): Generator<HTMLElement> {
    yield node;
    for (let i = 0, l = node.childNodes.length; i < l; ++i) {
      yield* next(node.childNodes[i] as HTMLElement);
    }
  }

  const itr = next(cloned);
  for (const orig of next(org)) {
    const cloned = itr.next().value;
    yield [orig, cloned];
  }
}

export interface ImagifyOptions {
  height?: number;
  width?: number;
  size?: number;
}

export function toSvg(node: HTMLElement, options?: ImagifyOptions) {
  let {
    width = node.offsetWidth,
    height = node.offsetHeight,
    size = 1
  } = options ?? {};
  const copy = node.cloneNode(true) as HTMLElement;
  for (const [org, cloned] of pair(node, copy)) {
    if (org instanceof Element) {
      const computed = getComputedStyle(org) as CSSStyleDeclaration & Iterable<any>;
      for (const name of computed) {
        cloned.style.setProperty(name, computed.getPropertyValue(name), computed.getPropertyPriority(name));
      }
    }
  }
  if (size !== 1) {
    width = width * size;
    height = height * size;
    copy.style.transform = `scale(${size})`;
    copy.style.transformOrigin = '0 0';
  }
  copy.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  const raw = new XMLSerializer()
    .serializeToString(copy)
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/\n/g, '%0A');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject x="0" y="0" width="100%" height="100%">${raw}</foreignObject></svg>`
  return `data:image/svg+xml;charset=utf-8,${svg}`
}
