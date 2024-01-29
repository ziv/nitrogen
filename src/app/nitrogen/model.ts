export default class Model {
  // code
  theme = 'github';
  language = 'javascript';

  // workspace
  backgroundColor = '#FFFFFF';
  transparent = false;

  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  // workspace, window
  borderColor = 'grey';
  borderWidth = 1;
  tl = 5;
  tr = 5;
  br = 5;
  bl = 5;

  // workspace, window, header
  displayHeader = true;
  headerHeight = 1.5; // todo em, convert to pixels?
  displayIcons = true;
  displayTitle = false;
  title = '';
  titleSize = .8 // todo em, convert to pixels?
  titleColor = 'grey';

  // workspace, window, code
  top = 10;
  bottom = 10;
  left = 10;
  right = 10;

  // workspace, export
  sizing = 2;
  render = 'png';
  preview: HTMLImageElement | null = null;
}
