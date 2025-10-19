# Step 2 Complete: Layout Component & Dynamic Partials

## ✅ Files Created

### Core Infrastructure

#### 1. `src/core/regions/regionManager.ts`
**Region Management System:**
- Class-based singleton for managing dynamic content regions
- `registerRegion(name, widget)` - Add components to regions
- `registerMultiple(name, widgets[])` - Batch register widgets
- `getRegion(name)` - Retrieve all widgets for a region
- `unregisterWidget(name, id)` - Remove specific widget
- `clearRegion(name)` - Clear all widgets from a region
- `hasWidgets(name)` - Check if region has content
- Auto-sorting by order property
- TypeScript-safe with Widget interface

#### 2. `src/components/layout/Layout.tsx`
**Main Layout Component:**
- Accepts props: `title`, `children`, `regions`
- **Dynamic Partial Loading:**
  - Uses `import()` to load Navbar/Footer based on active theme
  - Automatically switches between `themes/default` and `themes/dark`
  - Fallback to default theme if loading fails
  - Loading skeletons while partials load
  - **Uses `useThemeSafe()` for SSR compatibility**
- **Region System Integration:**
  - Renders regions: `top`, `bottom`, `sidebar-left`, `sidebar-right`, `before-content`, `after-content`
  - Automatically adjusts grid layout based on active regions
  - Sticky sidebars for better UX
- **Responsive Design:**
  - 12-column grid system
  - Sidebars stack on mobile
  - Container-based layout

### Theme Partials

#### 3. `themes/default/partials/Navbar.tsx`
**Default Theme Navbar:**
- Clean white background with blue accents
- Theme toggle button with sun/moon icons
- Shopping cart with badge
- Sign In button
- Responsive navigation
- Theme badge showing "Default"
- Uses `useTheme()` hook for theme switching

#### 4. `themes/default/partials/Footer.tsx`
**Default Theme Footer:**
- 4-column grid layout
- Company info, Quick Links, Support, Newsletter sections
- Email subscription form
- Social proof and legal links
- Current year auto-update
- Theme badge showing "Default"

#### 5. `themes/dark/partials/Navbar.tsx`
**Dark Theme Navbar:**
- Dark gray background (gray-900)
- Purple accents instead of blue
- Different branding ("SaaS Store Dark")
- Same functionality as default
- Theme badge showing "Dark"

#### 6. `themes/dark/partials/Footer.tsx`
**Dark Theme Footer:**
- Dark theme styling (gray-900 background)
- Purple accent colors
- Darker input fields
- Same structure as default footer
- Theme badge showing "Dark"

### Test Page

#### 7. `src/app/[locale]/(unauth)/layout-test/page.tsx`
**Comprehensive Layout Demo:**
- Uses Layout component with all features
- Injects content into `sidebar-left` and `sidebar-right` regions
- Demonstrates:
  - Categories widget
  - Special offers
  - Recent views
  - Free shipping badge
  - Product grid
  - Testing checklist

---

## 🏗️ Architecture Overview

### Dynamic Partial Loading Flow

```
1. User visits page
   ↓
2. Layout component renders
   ↓
3. useEffect watches theme changes
   ↓
4. Dynamic import based on theme:
   import(`themes/${theme}/partials/Navbar`)
   ↓
5. Component loaded and stored in state
   ↓
6. Navbar/Footer rendered
   ↓
7. Theme switch → repeat from step 3
```

### Region System Flow

```
1. Page defines regions prop:
   regions={{
     'sidebar-left': <Widget />,
     'sidebar-right': <Widget />
   }}
   ↓
2. Layout component receives regions
   ↓
3. useEffect registers regions with regionManager
   ↓
4. renderRegion(name) called for each region spot
   ↓
5. regionManager.getRegion(name) retrieves widgets
   ↓
6. Widgets rendered in designated areas
```

---

## 🧪 Testing Instructions

### 1. **Start Dev Server** (if not running)
```powershell
npm run dev
```
Server should be on: **http://localhost:3001**

### 2. **Navigate to Layout Test Page**
```
http://localhost:3001/en/layout-test
```

### 3. **Test Features**

#### A. **Dynamic Partial Loading**
1. Observe the navbar and footer
2. Default theme: Blue accents, white backgrounds
3. Click theme toggle (moon icon)
4. Watch Navbar/Footer **completely change**:
   - Dark backgrounds
   - Purple accents
   - Different branding text
5. This proves partials are loaded dynamically! ✨

#### B. **Region System**
1. Notice **left sidebar** with:
   - Categories list
   - Special offer widget
2. Notice **right sidebar** with:
   - Recent views
   - Free shipping badge
3. These are injected via the `regions` prop
4. Resize window → sidebars stack on mobile ✓

#### C. **Theme Persistence**
1. Switch to dark theme
2. Refresh page (F5)
3. Theme persists ✓
4. Navbar/Footer remain in dark variant ✓

#### D. **Layout Responsiveness**
1. Open DevTools (F12)
2. Toggle device toolbar
3. Switch between mobile/tablet/desktop
4. Watch layout adapt:
   - Mobile: Single column, sidebars stack
   - Desktop: 3-column grid with sticky sidebars

---

## 🎨 Visual Differences Between Themes

### Default Theme
- **Colors:** Blue accents (#3B82F6)
- **Navbar:** White background, blue buttons
- **Footer:** Gray-50 background
- **Branding:** "SaaS Store"
- **Badges:** Blue

### Dark Theme
- **Colors:** Purple accents (#9333EA)
- **Navbar:** Gray-900 background, purple buttons
- **Footer:** Gray-900 background
- **Branding:** "SaaS Store Dark"
- **Badges:** Purple

---

## 🔧 Technical Implementation Details

### Dynamic Import Strategy
```typescript
const navbarModule = await import(`../../../themes/${theme}/partials/Navbar`);
setNavbar(() => navbarModule.default);
```
- Uses template literals for dynamic paths
- Stores component in state for re-rendering
- Try-catch with fallback to default theme
- Loading skeletons prevent layout shift

### Region Manager Singleton
```typescript
export const regionManager = new RegionManager();
```
- Single instance shared across app
- Allows any component to register widgets
- Automatic order sorting
- Collision detection (same ID replaces)

### Grid Layout Logic
```typescript
className={
  regionManager.hasWidgets('sidebar-left') || 
  regionManager.hasWidgets('sidebar-right')
    ? 'lg:col-span-6'   // 6 columns if sidebars exist
    : 'lg:col-span-12'  // Full width if no sidebars
}
```
- Automatically adjusts main content width
- Checks for active regions
- Responsive breakpoints

---

## 📸 Expected Result

You should see:

1. **Navbar** at top:
   - Logo, navigation links
   - Theme toggle button
   - Cart and Sign In buttons
   - Theme badge below navbar

2. **Main Content** with 3 columns:
   - **Left Sidebar:** Categories + Special offer
   - **Center:** Main content with product grid
   - **Right Sidebar:** Recent views + Free shipping

3. **Footer** at bottom:
   - 4-column layout
   - Newsletter subscription
   - Legal links
   - Theme badge

4. **Theme Toggle:**
   - Instant switch between themes
   - Complete visual transformation
   - Smooth transitions

---

## 🐛 Troubleshooting

### Partials not loading?
- Check console for import errors
- Verify theme folder structure matches exactly
- Make sure files are named `Navbar.tsx` and `Footer.tsx`

### Regions not showing?
- Verify `regionManager` is imported
- Check that regions prop is passed to Layout
- Use DevTools to inspect `data-region` attributes

### Layout broken?
- Clear Next.js cache: Delete `.next` folder and restart
- Check Tailwind classes are compiling
- Verify all imports are correct

### Theme not switching?
- Ensure ThemeProvider wraps the app in root layout
- Check browser console for errors
- Verify `useTheme()` hook is available

---

## 💡 Key Concepts Learned

### 1. **Dynamic Imports in React**
```typescript
const module = await import(`path/${variable}/file`);
```
- Load components at runtime
- Reduce initial bundle size
- Enable theme switching

### 2. **Component State Management**
```typescript
const [Navbar, setNavbar] = useState<React.ComponentType | null>(null);
```
- Store components in state
- Re-render when component changes
- TypeScript typing for components

### 3. **Region Pattern**
- Separation of concerns
- Reusable layout structure
- Flexible content injection

### 4. **Singleton Pattern**
- Single source of truth
- Shared state across components
- Global access without prop drilling

---

## ✨ Next Steps

You now have a fully functional:
- ✅ Theme system with localStorage persistence
- ✅ Dynamic partial loading (Navbar/Footer)
- ✅ Region management for flexible layouts
- ✅ Responsive, TypeScript-safe architecture

**Ready for Step 3?**
We can add:
- View engine abstraction
- Theme configuration files
- Custom theme creation tools
- Admin panel for theme management

Let me know when you're ready to continue! 🚀
