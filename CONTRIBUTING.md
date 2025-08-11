# Contributing to Smart Study App

Thank you for your interest in contributing to the Smart Study App! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/smart-study-app.git
   cd smart-study-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting (Prettier configuration)
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure
- Keep components focused and single-purpose
- Use React hooks for state management
- Implement proper TypeScript types
- Follow the existing file organization pattern

### CSS/Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Maintain responsive design principles
- Use consistent spacing (8px grid system)

## 🎯 Areas for Contribution

### High Priority
- [ ] Export/Import functionality for notes and flashcards
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Mobile app improvements
- [ ] Performance optimizations

### Medium Priority
- [ ] Additional study modes (multiple choice, fill-in-the-blank)
- [ ] Study statistics and analytics
- [ ] Note templates
- [ ] Collaboration features
- [ ] Cloud sync capabilities

### Low Priority
- [ ] Themes and customization
- [ ] Audio/video note support
- [ ] Advanced search features
- [ ] Plugin system
- [ ] Accessibility improvements

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use a clear, descriptive title
   - Explain what your changes do
   - Reference any related issues
   - Include screenshots for UI changes

## 🐛 Bug Reports

When reporting bugs, please include:
- **Description**: Clear description of the issue
- **Steps to reproduce**: Detailed steps to recreate the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, device information
- **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests, please provide:
- **Problem**: What problem does this solve?
- **Solution**: Describe your proposed solution
- **Alternatives**: Any alternative solutions considered
- **Use cases**: How would this feature be used?

## 🏗️ Architecture Overview

### Key Components
- **App.tsx**: Main application component
- **NotesPanel**: Left sidebar with note management
- **EditorPanel**: Center panel for note editing
- **FlashcardsCard**: Anki-style flashcard system
- **TimerCard**: Pomodoro focus timer

### State Management
- Uses React hooks (useState, useEffect)
- Local storage for persistence
- Centralized state in MainLayout component

### Smart Features
- Auto-categorization based on keyword analysis
- Hashtag extraction using regex
- Spaced repetition algorithm for flashcards

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make studying more effective and enjoyable for everyone! 🎓✨