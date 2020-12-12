/**
 * @author: lencx
 * @create_at: Dec 12, 2020
 */

import { ghColors } from 'github';

export const langColors = (lang: string = ''): string =>
  ((ghColors as any)[lang] || {}).color || '#333';
