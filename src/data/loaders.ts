// magic lazy load data to make the build tiny
export const getFormBorders = () => import('./form-borders').then(m => m.default);
export const getFormLayouts = () => import('./form-layouts').then(m => m.default);
export const getFormSpaces = () => import('./form-spaces').then(m => m.default);
export const getFormHighlights = () => import('./form-highlight').then(m => m.default);
