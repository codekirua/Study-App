# 📚 Smart Study Notes App

A beautiful, intelligent note-taking and flashcard study application with auto-categorization, spaced repetition, and focus timer features.

![Study App Screenshot](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop)

## ✨ Features

### 🧠 Smart Notes
- **Auto-categorization** - Notes automatically organize by content (Study, Work, Research, Ideas, Personal)
- **Hashtag extraction** - Type `#tags` and they're automatically detected and organized
- **Real-time organization** - Left panel updates as you type
- **Advanced filtering** - Filter by category, tags, or search terms
- **Smart sorting** - Sort by date, title, or category

### 🎴 Anki-Style Flashcards
- **Spaced repetition algorithm** - Cards appear at optimal intervals for memory retention
- **4-button rating system** - Again, Hard, Good, Easy (just like Anki!)
- **Due card tracking** - Only study cards that need review
- **Comprehensive statistics** - Session and lifetime performance tracking
- **Per-card analytics** - Individual card performance and scheduling

### ⏰ Focus Timer
- **Pomodoro technique** - Customizable timer from 5-60 minutes
- **Visual progress** - Beautiful circular progress indicator
- **Session tracking** - Keep track of your focused work sessions

### 🎨 Beautiful Design
- **Cozy, warm UI** - Gradient backgrounds and smooth animations
- **Responsive design** - Works perfectly on desktop and mobile
- **Apple-level aesthetics** - Attention to detail and micro-interactions
- **Accessible** - High contrast and keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
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

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Usage Guide

### Creating Smart Notes
1. Click **"New Note"** in the left panel
2. Start typing your title and content
3. Watch as the app automatically:
   - Categorizes your note based on keywords
   - Extracts hashtags (type `#important` or `#exam`)
   - Organizes everything in the left panel

### Using Flashcards
1. Switch to **"Edit"** mode in the flashcard panel
2. Add question/answer pairs
3. Switch to **"Study"** mode
4. Rate your performance: Again, Hard, Good, or Easy
5. Cards will reappear at optimal intervals for learning

### Focus Sessions
1. Set your desired timer duration (5-60 minutes)
2. Click **"Start"** to begin your focus session
3. Work without distractions until the timer completes

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify/Vercel ready

## 🎯 Key Features Explained

### Auto-Categorization Keywords
- **Study**: homework, exam, test, lecture, course, education
- **Work**: project, meeting, deadline, client, business, task
- **Research**: analysis, data, findings, hypothesis, experiment
- **Ideas**: brainstorm, concept, innovation, creative, inspiration
- **Personal**: diary, journal, reflection, thoughts, feelings

### Spaced Repetition Algorithm
The flashcard system uses a modified Anki algorithm:
- **Ease Factor**: Adjusts based on your performance (1.3 - 3.0)
- **Intervals**: Increase for correct answers, reset for incorrect
- **Due Dates**: Cards only appear when they need review

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Anki's spaced repetition system
- Design influenced by modern productivity apps
- Built with love for students and lifelong learners

## 📞 Support

If you have any questions or run into issues:
- Open an issue on GitHub
- Check the documentation
- Review the code comments for implementation details

---

**Happy studying! 📚✨**