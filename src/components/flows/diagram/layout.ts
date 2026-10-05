import type { DiagramEdge, DiagramNode, FlowDiagramData } from '../../../types/diagram';

export const NODE_W = 208;
export const NODE_H = 50;
const COL_GAP = 72;
const ROW_H = 80;
const PAD = 16;
const LANE_W = 26;
/** Two routing lanes sit left of column 0 for loop-back and loop-exit edges. */
const LEFT = PAD + LANE_W * 2 + 10;

export interface Box {
  x: number;
  y: number;
  cx: number;
  cy: number;
  right: number;
  bottom: number;
}

export interface RoutedEdge {
  edge: DiagramEdge;
  path: string;
  labelX: number;
  labelY: number;
  /** Lane labels are rotated to run along the vertical lane. */
  rotated: boolean;
  anchor: 'start' | 'middle';
}

export function boxFor(node: DiagramNode): Box {
  const x = LEFT + node.col * (NODE_W + COL_GAP);
  const y = PAD + node.row * ROW_H;
  return { x, y, cx: x + NODE_W / 2, cy: y + NODE_H / 2, right: x + NODE_W, bottom: y + NODE_H };
}

export function canvasSize(d: FlowDiagramData) {
  return {
    width: LEFT + d.columns * NODE_W + (d.columns - 1) * COL_GAP + PAD,
    height: PAD * 2 + (d.rows - 1) * ROW_H + NODE_H,
  };
}

/** Orthogonal route between two boxes; lane edges go around the main column on the left. */
export function routeEdge(edge: DiagramEdge, a: Box, b: Box): RoutedEdge {
  if (edge.lane) {
    const laneX = LEFT - 12 - (edge.lane - 1) * LANE_W;
    // Leave below centre, arrive above centre, so a node with both never overlaps.
    const sy = a.cy + 8;
    const ty = b.cy - 8;
    return {
      edge,
      path: `M ${a.x} ${sy} H ${laneX} V ${ty} H ${b.x - 2}`,
      labelX: laneX - 6,
      labelY: (sy + ty) / 2,
      rotated: true,
      anchor: 'middle',
    };
  }
  if (a.cx === b.cx) {
    return { edge, path: `M ${a.cx} ${a.bottom} V ${b.y - 2}`, labelX: a.cx + 8, labelY: (a.bottom + b.y) / 2 + 4, rotated: false, anchor: 'start' };
  }
  if (a.cy === b.cy) {
    return { edge, path: `M ${a.right} ${a.cy} H ${b.x - 2}`, labelX: (a.right + b.x) / 2, labelY: a.cy - 6, rotated: false, anchor: 'middle' };
  }
  if (b.y > a.y && b.x > a.x) {
    return { edge, path: `M ${a.right} ${a.cy} H ${b.cx} V ${b.y - 2}`, labelX: (a.right + b.cx) / 2, labelY: a.cy - 6, rotated: false, anchor: 'middle' };
  }
  const midY = (a.bottom + b.y) / 2;
  return { edge, path: `M ${a.cx} ${a.bottom} V ${midY} H ${b.cx} V ${b.y - 2}`, labelX: b.cx + 8, labelY: midY - 4, rotated: false, anchor: 'start' };
}
