
We need to build the core layout components that define every editor screen: a top navigation bar and a left sidebar shell. These foundational elements will be reused and expanded throughout the subsequent chapters.

 ### Editor Navbar

 Create `components/editor/editor-navbar.tsx`.

 Requirements

 Implement a fixed-height top navigation bar.
 Divide the navbar into left, center, and right sections.
 Add a sidebar toggle button to the left section.
 Display either the `PanelLeftOpen` or `PanelLeftClose` icon based on the current sidebar state.
 Leave the right section empty for now.
 Use a dark background with a subtle bottom border.

Here's a polished rewrite:

### Project Sidebar

Create `components/editor/project-sidebar.tsx`.

Requirements

 - The sidebar should overlay the editor canvas rather than     affecting the page layout.
 - Opening the sidebar must not push or resize the main content area.
 - Animate the sidebar so it slides in from the left.
 - Accept an `isOpen` prop to control visibility.
 - Include a header with a `Projects` title and a close button.
 - Use shadcn/ui `Tabs` with;
   - My Projects
   - Shared
 - Display an empty-state placeholder in both tabs for now.
 - Add a full-width `New Project` button fixed to the bottom of the sidebar.
 - Include a `Plus` icon alongside the button label.


### Dialog Pattern

- Use the existing color tokens from `globals.css` for dialog styling.

- Support:
  - title
  - description
  - footer actions
- Do not build actual dialogs yet.

### Check when done

- new components compile without TypeScript errors
- nolint errors
- dialog pattern is ready for future use