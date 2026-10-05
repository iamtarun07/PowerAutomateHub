export type NodeKind =
  | 'trigger'
  | 'action'
  | 'condition'
  | 'loop'
  | 'scope'
  | 'http'
  | 'ado'
  | 'data'
  | 'variable'
  | 'success'
  | 'failure'
  | 'end';

export interface DiagramNode {
  id: string;
  label: string;
  detail?: string;
  kind: NodeKind;
  /** Grid column, 0-based. */
  col: number;
  /** Grid row, 0-based. */
  row: number;
}

export type EdgeTone = 'default' | 'yes' | 'no' | 'fail' | 'loop';

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  tone?: EdgeTone;
  /**
   * Route through a vertical lane left of the main column.
   * Used for loop-back and loop-exit edges so they never cross nodes.
   */
  lane?: 1 | 2;
}

export interface FlowDiagramData {
  columns: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
