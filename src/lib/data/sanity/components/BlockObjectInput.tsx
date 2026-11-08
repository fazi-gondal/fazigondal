/**
 * BlockObjectInput.tsx
 *
 * Defense-in-depth wrapper for custom PTE block objects.
 *
 * In Sanity v4, clicking an <input>/<textarea> inside the PTE object
 * popup fired a native `blur` on the PortableTextEditable element, which
 * Sanity interpreted as "user left the editor" and closed the popup.
 *
 * This component:
 *   1. Calls `e.preventDefault()` on `mousedown` for focusable targets –
 *      prevents the browser from moving focus (and triggering PTE blur).
 *   2. Immediately re-focuses the target with `requestAnimationFrame` so
 *      the user can still type normally.
 *   3. Stops propagation so the PTE root never sees the pointer event.
 *
 * In Sanity v5+ the PTE dialog already uses a proper focus-trap, so this
 * wrapper is a harmless no-op in those versions.
 */
import { useCallback } from 'react';
import { type ObjectInputProps, type ObjectSchemaType } from 'sanity';

const FOCUSABLE_SELECTOR = 'input, textarea, select, [contenteditable]';

export function BlockObjectInput(
  props: ObjectInputProps<Record<string, unknown>, ObjectSchemaType>
) {
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const focusable = target.closest<HTMLElement>(FOCUSABLE_SELECTOR);

    if (focusable) {
      // Prevent the browser from moving focus (which would blur the PTE
      // editor and close the popup), then manually restore focus.
      e.preventDefault();
      requestAnimationFrame(() => focusable.focus());
    }
  }, []);

  return (
    <div onMouseDown={handleMouseDown}>
      {props.renderDefault(props)}
    </div>
  );
}
