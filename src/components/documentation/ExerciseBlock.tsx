import type { Exercise } from '../../types/note';
import './documentation.css';

/** Practice task with numbered steps and a result the learner can check. */
export function ExerciseBlock({ exercise }: { exercise: Exercise }) {
  return (
    <div className="exercise">
      <p className="exercise__task">{exercise.task}</p>
      <ol className="exercise__steps">
        {exercise.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="exercise__expected">
        <strong>Expected result.</strong> {exercise.expected}
      </p>
    </div>
  );
}
