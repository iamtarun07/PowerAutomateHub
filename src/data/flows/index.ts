import type { Flow } from '../../types/flow';
import { adoParentAutoClose } from './ado-parent-auto-close';
import { epicAutoCreateFeatures } from './epic-auto-create-features';
import { emailToUserStory } from './email-to-user-story';
import { assignmentNotifier } from './assignment-notifier';

/** Add a new flow by creating a data file and listing it here. */
export const flows: Flow[] = [adoParentAutoClose, epicAutoCreateFeatures, emailToUserStory, assignmentNotifier];

export const findFlow = (slug: string | undefined) => flows.find((f) => f.slug === slug);
