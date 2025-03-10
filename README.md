# Documentation of Global Styles and Components

## Global Styles Overview

The global styles for the application are defined in an SCSS file, which includes settings for typography, layout, and specific component styling.

### Typography

- **Fonts Used:**
  - **Body:** Open Sans
  - **Headers & Tabs:** Montserrat
- **Responsive Font Sizes:** Adjusted for different screen widths.

### Layout

- **Global Styles:**
  - `box-sizing`, `margin`, and `padding` are set to `border-box` and `0`.
  - Global settings for body background and font color.
  - Responsive adjustments for various screen sizes.

### Component Styles

- **Background Class:** `.create-house-bg` applies a full-screen background image.
- **Links:** Default styles for `<a>` tags include color and hover effects.
- **Buttons and Tabs:** Inherit shared font and size settings with responsive adjustments.
- **Input Fields:** Consistent styling with responsive adjustments.
- **Error Messages:** Styled with the class `.error-message`.
- **Listing Information:** Consistent styling with the class `.listing-info`.
- **Empty State Messages:** Styled with the class `.empty-state-message`.

## Component Documentation

### HouseCard Component

- **Overview:** Displays a summary of a house listing with features for editing and deleting.
- **Props:**
  - `house` (Object, Required): Contains details like image, location, rooms, and price.
- **Methods:**
  - `handleClick()`: Emits a click event with the house ID.
- **Styles:** Responsive design with adjustments for various screen sizes.

### HouseDetailedCard Component

- **Overview:** Displays detailed information about a house listing.
- **Props:**
  - `house` (Object, Required): Contains listing details.
- **Composables:**
  - Includes `useDeleteListing` for managing deletions and `useMobileDetection` for layout adjustments.

### HouseList Component

- **Overview:** Displays a list of houses with filtering and search functionalities.
- **Computed Properties:**
  - `filteredHouses`: Computes a list based on search and filter criteria.
- **Methods:**
  - `handleFilterChange`: Updates the filter option.
  - `handleSearch`: Updates the search query.

### ListingForm Component

- **Overview:** For creating and editing real estate listings.
- **Props:**
  - `listingData` (Object, Default: {}): Existing listing data for editing.
- **Methods:**
  - `onSubmit`: Handles form submission and validation.
  - `onImageChange`: Updates the image property when a new file is selected.

### PhoneFooter Component

- **Overview:** Provides fixed navigation for mobile views.
- **Structure:** Includes links to home and about pages with dynamic icon updates based on the active route.

### SearchField Component

- **Overview:** Provides a search input field with clear and search icons.
- **Methods:**
  - `handleInput`: Emits the current search query.
  - `clearSearch`: Clears the input field and emits an empty string.

### ToggleButton Component

- **Overview:** A toggle switch for filtering options.
- **Methods:**
  - `handleChange`: Emits an event when the toggle state changes.

### FancyButton Component

- **Overview:** A versatile button that can be styled and handle click events.
- **Props:** Includes options for type, routing, and disabled state.

### DeleteConfirmationPopup Component

- **Overview:** Modal dialog for confirming deletions.
- **Props:**
  - `isVisible` (Boolean, Required): Controls visibility.

### NavBar Component

- **Overview:** Navigation bar at the top of the application with links to primary pages.

## API Functions

- `createListing`: Creates a new house listing.
- `updateListing`: Updates an existing listing.
- `uploadImage`: Uploads an image for a listing.

## Vuex Store Modules

- **Filter Module:** Manages state related to filtering and searching.
- **Navigation Module:** Tracks the previous path in the application.
