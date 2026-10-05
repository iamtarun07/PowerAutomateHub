import type { CodeSample } from './content';
import type { FlowDiagramData } from './diagram';

export type FlowStatus = 'Production' | 'Testing' | 'Draft';
export type TestStatus = 'Pass' | 'Fail' | 'Not run';

export interface FlowStep {
  title: string;
  description: string;
}

export interface FlowComponent {
  name: string;
  /** Note slug this component links to. */
  note: string;
  purpose: string;
}

export interface LogicRule {
  name: string;
  rule: string;
  onTrue: string;
  onFalse: string;
}

export interface TestCase {
  id: string;
  scenario: string;
  input: string;
  expected: string;
  actual: string;
  status: TestStatus;
}

export interface ConfigItem {
  setting: string;
  value: string;
  notes?: string;
}

export interface Flow {
  slug: string;
  name: string;
  description: string;
  category: string;
  integrations: string[];
  status: FlowStatus;
  trigger: string;
  overview: { what: string; why: string; problem: string; automates: string };
  steps: FlowStep[];
  diagram: FlowDiagramData;
  components: FlowComponent[];
  expressions: CodeSample[];
  logic: LogicRule[];
  errorHandling: { title: string; description: string }[];
  testing: TestCase[];
  configuration: ConfigItem[];
  expectedBehavior: string[];
  notes: string[];
  /** Sections not yet documented from the real implementation. */
  placeholders?: string[];
  related: string[];
  keywords: string[];
}
