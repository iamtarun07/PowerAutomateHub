import type { EdgeTone } from '../../../types/diagram';

export const EDGE_TONES: EdgeTone[] = ['default', 'yes', 'no', 'fail', 'loop'];

export const edgeColor = (tone: EdgeTone) =>
  ({ default: 'var(--muted)', yes: 'var(--k-success)', no: 'var(--faint)', fail: 'var(--k-failure)', loop: 'var(--k-loop)' })[tone];
