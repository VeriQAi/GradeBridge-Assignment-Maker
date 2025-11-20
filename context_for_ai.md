# Context for AI - GradeBridge Lite Assignment Maker

## Project Overview

**GradeBridge Lite** is a client-side web application designed for educators to create, manage, and export structured academic assignments. It generates assignment specifications, PDF templates for grading systems like Gradescope, and configuration packages for student applications.

**Key Characteristics:**
- 100% client-side application (no backend required)
- Can be deployed as static files
- Data stored in browser localStorage
- Supports mathematical formula rendering
- Professional PDF generation for academic use

## Technology Stack

### Core Framework
- **React 18.2** with **TypeScript 5.3**
- **Vite 5.1** - Build tool and development server
- **React Router DOM 6.22** - Hash-based routing

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS with custom 'academic' color palette
- **Lucide React 0.344** - Icon library
- **Google Fonts** - Inter (sans-serif), Merriweather (serif)

### Specialized Libraries
- **jsPDF 2.5.1** - Client-side PDF generation
- **JSZip 3.10.1** - ZIP file creation for exports
- **FileSaver 2.0.5** - Client-side file downloads
- **KaTeX 0.16.9** - LaTeX mathematical formula rendering
- **UUID 9.0.1** - Unique identifier generation

### Data Storage
- Browser **localStorage** - No server-side database required

## Architecture

### Directory Structure

```
project-root/
├── components/           # Reusable UI components
│   ├── Common.tsx       # Core UI primitives (Layout, Card, Button, Input, etc.)
│   ├── FormattedText.tsx # KaTeX formula renderer
│   └── Preview.tsx      # Read-only assignment display
├── pages/               # Route-level page components
│   ├── Dashboard.tsx    # Assignment list and management interface
│   └── Editor.tsx       # Assignment creation/editing form
├── services/            # Business logic layer
│   ├── storageService.ts # localStorage CRUD operations
│   └── exportService.ts  # PDF and ZIP export functionality
├── App.tsx              # Main app with routing configuration
├── index.tsx            # React root mounting point
├── types.ts             # TypeScript type definitions
└── index.html           # HTML entry point
```

### Key Components

#### Pages
- **Dashboard** (`pages/Dashboard.tsx`)
  - Lists all saved assignments
  - CRUD operations (create, edit, delete)
  - Import JSON assignments
  - Export individual assignments
  - Displays metadata: course code, due date, problem count, total points

- **Editor** (`pages/Editor.tsx`)
  - Comprehensive assignment creation/editing interface
  - Form sections: course info, preamble, problems with subsections
  - Real-time validation
  - Support for multiple submission types per subsection

- **Preview** (`components/Preview.tsx`)
  - Read-only display of complete assignment
  - Export button for PDF/ZIP generation
  - Math formula rendering

#### Services
- **storageService** (`services/storageService.ts`)
  - `saveAssignment()` - Save/update assignment in localStorage
  - `loadAssignment()` - Load single assignment by ID
  - `loadAllAssignments()` - Retrieve all assignments
  - `deleteAssignment()` - Remove assignment from storage
  - ID normalization for consistent storage keys

- **exportService** (`services/exportService.ts`)
  - `exportAssignmentToPDF()` - Generate formatted PDF template
    - Student name/ID fields on every page
    - Problem descriptions with point values
    - Proper page breaks and formatting
    - Support for multi-page image submissions
  - `exportAssignmentToZip()` - Create ZIP package with PDF + JSON
  - Gradescope-compatible formatting

### Data Model

#### Core Types (`types.ts`)

```typescript
interface Assignment {
  id: string;                    // UUID
  courseCode: string;            // e.g., "CS101"
  title: string;                 // Assignment title
  dueDate: string;               // ISO date string
  dueTime: string;               // HH:MM format
  preamble: string;              // Introductory text
  problems: Problem[];           // Array of problems
  createdAt: string;            // ISO timestamp
  updatedAt: string;            // ISO timestamp
}

interface Problem {
  id: string;                    // UUID
  title: string;                 // Problem title
  subsections: Subsection[];     // Array of subsections
}

interface Subsection {
  id: string;                    // UUID
  description: string;           // Text with optional $...$ LaTeX
  points: number;                // Point value
  submissionType: SubmissionType;
  maxImages?: number;            // For Image submission type
}

enum SubmissionType {
  Text = 'text',
  Image = 'image',
  AIReflective = 'ai_reflective',
  MatlabGrader = 'matlab_grader',
  Code = 'code',
  FileUpload = 'file_upload'
}
```

### Routing Structure

```typescript
HashRouter
├── / (Dashboard)           # Assignment list and management
├── /create (Editor)        # Create new assignment
├── /edit/:id (Editor)      # Edit existing assignment
└── /preview/:id (Preview)  # View assignment read-only
```

## Key Features

### Assignment Management
1. Create assignments with multiple problems and subsections
2. Configure submission types per subsection
3. Set point values for grading
4. Add preamble text and problem descriptions
5. Support for LaTeX math formulas (`$formula$`)

### Submission Types
- **Text**: Standard text input
- **Image**: Image upload (configurable max images)
- **AI Reflective**: AI-assisted reflection questions
- **MatlabGrader**: MATLAB code grading integration
- **Code**: Code submission
- **File Upload**: General file upload

### Export Capabilities
1. **PDF Export**: Professional templates for Gradescope
   - Student identification fields on every page
   - Problem structure with point values
   - Page breaks for logical sections
   - Multi-page support for image submissions

2. **ZIP Export**: Complete package with:
   - Generated PDF template
   - JSON specification file
   - Ready for student app integration

3. **JSON Import/Export**: Backup and restore functionality

### Mathematical Formula Support
- Uses KaTeX for rendering LaTeX formulas
- Inline formulas with `$...$` delimiter syntax
- Rendered in both editor preview and PDF exports
- Common in STEM course assignments

## Development Notes

### Build Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Production build with TypeScript compilation
- `npm run preview` - Preview production build locally

### Storage Strategy
- All data in browser localStorage
- No authentication or user management
- Each browser/device maintains separate storage
- Export/import JSON for cross-device transfer

### Design Patterns
- Component composition with Common UI primitives
- Service layer separation for business logic
- Type-safe with comprehensive TypeScript interfaces
- Functional components with React hooks

## Future Considerations

### Potential Enhancements
- Cloud sync/backup options
- Template library for common assignment types
- Collaboration features
- Enhanced PDF customization
- Rubric generation
- Student submission tracking integration

### Known Limitations
- localStorage size limits (~5-10MB typical)
- No multi-user support
- No version control for assignments
- Browser-specific data storage

## Integration Points

### For Student Apps
- JSON specification format in exports
- Submission type definitions
- Point value structure
- Due date/time information

### For Grading Systems
- PDF template format compatible with Gradescope
- Problem/subsection page structure
- Student identification fields
- Point allocation metadata
