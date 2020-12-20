/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import ghColors from './colors.json';

export * from './api';
export * from './GhStore';
export { ghColors };

export const ghLangs = Object.keys(ghColors);
