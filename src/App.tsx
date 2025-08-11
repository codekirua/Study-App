import React, { useEffect, useMemo, useRef, useState } from "react";
import { 
  Plus, 
  Search, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  BookOpen, 
  Edit3,
  GraduationCap,
  Sparkles
} from "lucide-react";

// Enhanced Study App with beautiful, cozy UI
export default function StudyApp() {
  useEffect(() => {
    document.title = "Study Notes - Focus & Learn";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <AppHeader />
      <MainLayout />
      <AppFooter />
    </div>
  );
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">Study Notes</h1>
              <p className="text-sm text-gray-600">Focus • Learn • Grow</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-100/50 rounded-full">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Deep Work Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function AppFooter() {
  return (
    <footer className="text-center py-6 text-gray-500 text-sm">
      Crafted for deep work and meaningful learning
    </footer>
  );
}

function MainLayout() {
  const [notes, setNotes] = useLocalState(NOTES_KEY, []);
  const [selectedId, setSelectedId] = useLocalState(SELECT_KEY, null);
  const [categories, setCategories] = useLocalState(CATEGORIES_KEY, [
    { id: 'general', name: 'General', color: 'gray' },
    { id: 'study', name: 'Study', color: 'blue' },
    { id: 'work', name: 'Work', color: 'green' },
    { id: 'personal', name: 'Personal', color: 'purple' },
    { id: 'ideas', name: 'Ideas', color: 'yellow' },
    { id: 'research', name: 'Research', color: 'red' }
  ]);
  const [allTags, setAllTags] = useLocalState(TAGS_KEY, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <NotesPanel 
            notes={notes}
            setNotes={setNotes}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            categories={categories}
            setCategories={setCategories}
            allTags={allTags}
            setAllTags={setAllTags}
          />
        </div>
        <div className="lg:col-span-6">
          <EditorPanel 
            notes={notes}
            setNotes={setNotes}
            selectedId={selectedId}
            categories={categories}
            allTags={allTags}
            setAllTags={setAllTags}
          />
        </div>
        <div className="lg:col-span-3">
          <RightRail />
        </div>
      </div>
    </div>
  );
}

// Local storage hook
function useLocalState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  
  return [state, setState];
}

const NOTES_KEY = "study.notes.v1";
const SELECT_KEY = "study.selected.v1";
const CATEGORIES_KEY = "study.categories.v1";
const TAGS_KEY = "study.tags.v1";

function NoteItem({ note, isSelected, onSelect, onDelete, onUpdateMetadata, categories, getCategoryColor }) {
  return (
    <div
      key={note.id}
      data-note-id={note.id}
      onClick={() => onSelect(note.id)}
      className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
        isSelected
          ? "bg-orange-100 shadow-lg ring-2 ring-orange-200"
          : "bg-gray-50 hover:bg-white hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {note.title || "Untitled"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(note.updated).toLocaleDateString()}
          </p>
          {note.body && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {note.body.slice(0, 80)}...
            </p>
          )}
          {note.category && note.category !== 'general' && (
            <div className="flex items-center gap-1 mt-2">
              <div className={`w-2 h-2 rounded-full bg-${getCategoryColor(note.category)}-400`}></div>
              <span className="text-xs text-gray-500 capitalize">{note.category}</span>
            </div>
          )}
          {note.tags && note.tags.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {note.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="text-xs text-gray-400">+{note.tags.length - 3}</span>
              )}
            </div>
          )}
          {isSelected && (
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-orange-600 font-medium">Currently editing</span>
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Delete this note?")) onDelete(note.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 rounded-lg transition-all duration-200 text-gray-400 hover:text-red-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function NotesPanel({ 
  notes, 
  setNotes, 
  selectedId, 
  setSelectedId, 
  categories, 
  setCategories, 
  allTags, 
  setAllTags 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('updated'); // updated, created, title, category
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // Auto-categorize notes based on content
  const autoCategorizeNote = (title, body) => {
    const content = (title + ' ' + body).toLowerCase();
    
    // Define keywords for each category
    const categoryKeywords = {
      study: ['study', 'learn', 'exam', 'test', 'homework', 'assignment', 'lecture', 'course', 'class', 'education', 'school', 'university'],
      work: ['work', 'project', 'meeting', 'deadline', 'client', 'business', 'office', 'team', 'manager', 'task', 'job'],
      research: ['research', 'analysis', 'data', 'findings', 'hypothesis', 'experiment', 'study', 'investigation', 'survey'],
      ideas: ['idea', 'brainstorm', 'concept', 'innovation', 'creative', 'inspiration', 'thought', 'possibility'],
      personal: ['personal', 'diary', 'journal', 'reflection', 'thoughts', 'feelings', 'life', 'family', 'friends']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        return category;
      }
    }
    return 'general';
  };

  // Extract tags from content
  const extractTags = (title, body) => {
    const content = title + ' ' + body;
    const tagMatches = content.match(/#[\w]+/g) || [];
    return tagMatches.map(tag => tag.substring(1).toLowerCase());
  };

  // Update tags list when notes change
  useEffect(() => {
    const allNoteTags = notes.flatMap(note => note.tags || []);
    const uniqueTags = [...new Set(allNoteTags)];
    setAllTags(uniqueTags);
  }, [notes, setAllTags]);

  const filteredNotes = useMemo(() => {
    let filtered = notes;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((note) =>
        (note.title + "\n" + note.body + "\n" + (note.tags || []).join(' ')).toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }
    
    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(note => note.tags && note.tags.includes(selectedTag));
    }
    
    // Sort notes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || 'Untitled').localeCompare(b.title || 'Untitled');
        case 'created':
          return b.created - a.created;
        case 'category':
          return (a.category || 'general').localeCompare(b.category || 'general');
        case 'updated':
        default:
          return b.updated - a.updated;
      }
    });
    
    return filtered;
  }, [searchQuery, notes, selectedCategory, selectedTag, sortBy]);

  // Group notes by category for display
  const groupedNotes = useMemo(() => {
    const groups = {};
    filteredNotes.forEach(note => {
      const category = note.category || 'general';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(note);
    });
    return groups;
  }, [filteredNotes]);

  function createNote() {
    const id = crypto.randomUUID();
    const now = Date.now();
    const note = {
      id,
      title: "",
      body: "",
      created: now,
      updated: now,
      category: 'general',
      tags: []
    };
    setNotes([note, ...notes]);
    setSelectedId(id);
  }

  function deleteNote(id) {
    const index = notes.findIndex((n) => n.id === id);
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    
    if (selectedId === id) {
      const nextNote = remaining[index] || remaining[index - 1] || remaining[0];
      setSelectedId(nextNote?.id || null);
    }
  }

  function selectNote(id) {
    setSelectedId(id);
    // Add a subtle visual feedback
    const noteElement = document.querySelector(`[data-note-id="${id}"]`);
    if (noteElement) {
      noteElement.style.transform = 'scale(0.98)';
      setTimeout(() => {
        noteElement.style.transform = '';
      }, 150);
    }
  }

  function updateNoteMetadata(noteId, updates) {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, ...updates, updated: Date.now() }
        : note
    ));
  }

  function addCategory(name, color) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const newCategory = { id, name, color };
    setCategories([...categories, newCategory]);
    return id;
  }

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'gray';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'General';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-orange-500" />
          Smart Notes
        </h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {filteredNotes.length}
          </div>
          <button
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Manage Categories"
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-sm"></div>
            </div>
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <button
          onClick={createNote}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, tags..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-1.5 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-orange-200"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            {allTags.length > 0 && (
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="text-xs px-3 py-1.5 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-orange-200"
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>#{tag}</option>
                ))}
              </select>
            )}
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs px-3 py-1.5 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-orange-200"
            >
              <option value="updated">Latest</option>
              <option value="created">Newest</option>
              <option value="title">A-Z</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Manager */}
      {showCategoryManager && (
        <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
          <h4 className="font-medium text-gray-900 mb-3">Manage Categories</h4>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full bg-${cat.color}-400`}></div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>{searchQuery ? "No matching notes" : "No notes yet"}</p>
            <p className="text-sm mt-1">Create your first note to get started</p>
          </div>
        ) : (
          Object.entries(groupedNotes).map(([categoryId, categoryNotes]) => (
            <div key={categoryId} className="space-y-2">
              {selectedCategory === 'all' && (
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className={`w-2 h-2 rounded-full bg-${getCategoryColor(categoryId)}-400`}></div>
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {getCategoryName(categoryId)} ({categoryNotes.length})
                  </span>
                </div>
              )}
              {categoryNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isSelected={selectedId === note.id}
                  onSelect={selectNote}
                  onDelete={deleteNote}
                  onUpdateMetadata={updateNoteMetadata}
                  categories={categories}
                  getCategoryColor={getCategoryColor}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EditorPanel({ 
  notes, 
  setNotes, 
  selectedId, 
  categories, 
  allTags, 
  setAllTags 
}) {
  const activeNote = notes.find((n) => n.id === selectedId);
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-categorize and extract tags when content changes
  const autoCategorizeNote = (title, body) => {
    const content = (title + ' ' + body).toLowerCase();
    
    const categoryKeywords = {
      study: ['study', 'learn', 'exam', 'test', 'homework', 'assignment', 'lecture', 'course', 'class', 'education', 'school', 'university'],
      work: ['work', 'project', 'meeting', 'deadline', 'client', 'business', 'office', 'team', 'manager', 'task', 'job'],
      research: ['research', 'analysis', 'data', 'findings', 'hypothesis', 'experiment', 'study', 'investigation', 'survey'],
      ideas: ['idea', 'brainstorm', 'concept', 'innovation', 'creative', 'inspiration', 'thought', 'possibility'],
      personal: ['personal', 'diary', 'journal', 'reflection', 'thoughts', 'feelings', 'life', 'family', 'friends']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        return category;
      }
    }
    return 'general';
  };

  const extractTags = (title, body) => {
    const content = title + ' ' + body;
    const tagMatches = content.match(/#[\w]+/g) || [];
    return tagMatches.map(tag => tag.substring(1).toLowerCase());
  };

  // Update global tags when notes change
  useEffect(() => {
    const allNoteTags = notes.flatMap(note => note.tags || []);
    const uniqueTags = [...new Set(allNoteTags)];
    setAllTags(uniqueTags);
  }, [notes, setAllTags]);

  function updateNote(updates) {
    if (!activeNote) return;
    setIsSaving(true);
    
    // Auto-categorize and extract tags if title or body changed
    let autoUpdates = {};
    if (updates.title !== undefined || updates.body !== undefined) {
      const newTitle = updates.title !== undefined ? updates.title : activeNote.title;
      const newBody = updates.body !== undefined ? updates.body : activeNote.body;
      
      // Always auto-categorize to keep it smart
      autoUpdates.category = autoCategorizeNote(newTitle, newBody);
      
      // Extract tags from content
      const extractedTags = extractTags(newTitle, newBody);
      const existingTags = activeNote.tags || [];
      const allTags = [...new Set([...existingTags, ...extractedTags])];
      autoUpdates.tags = allTags;
    }
    
    const updatedNotes = notes.map((n) => 
      n.id === activeNote.id 
        ? { ...n, ...updates, ...autoUpdates, updated: Date.now() }
        : n
    );
    
    setNotes(updatedNotes);
    setLastSaved(Date.now());
    setTimeout(() => setIsSaving(false), 300);
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'General';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 min-h-[600px]">
      {activeNote ? (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {isSaving ? "Saving..." : "Auto-saved"}
              </span>
              {activeNote.category && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">in</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {getCategoryName(activeNote.category)}
                  </span>
                </div>
              )}
            </div>
            {lastSaved && (
              <span className="text-xs text-gray-500">
                Last saved: {new Date(lastSaved).toLocaleTimeString()}
              </span>
            )}
          </div>
          <input
            value={activeNote.title}
            onChange={(e) => updateNote({ title: e.target.value })}
            placeholder="Start typing your note title... (it will auto-categorize!)"
            className="text-2xl font-bold text-gray-900 bg-transparent border-0 focus:ring-0 p-0 mb-4 placeholder:text-gray-400"
          />
          <div className="text-sm text-gray-500 mb-6 flex items-center gap-4">
            <span>Created {new Date(activeNote.created).toLocaleDateString()}</span>
            <span>•</span>
            <span>Updated {new Date(activeNote.updated).toLocaleDateString()}</span>
            {activeNote.tags && activeNote.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-1">
                  {activeNote.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <textarea
            value={activeNote.body}
            onChange={(e) => updateNote({ body: e.target.value })}
            placeholder="Start writing... Try typing about 'homework', 'meeting', or 'research' and watch it auto-categorize! Use #hashtags too!"
            className="flex-1 bg-transparent border-0 focus:ring-0 p-0 resize-none text-gray-700 leading-relaxed placeholder:text-gray-400 min-h-[400px]"
          />
          <div className="mt-4 text-xs text-gray-400 border-t pt-4">
            💡 <strong>Smart features active:</strong> Auto-categorizing based on keywords • Extracting #hashtags • Organizing in left panel
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-center">
          <div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select a note to start writing
            </h3>
            <p className="text-gray-500">
              Choose an existing note or create a new one to begin
            </p>
            <div className="mt-4 text-sm text-gray-400">
              💡 Tip: Click on any note in the list to open it for editing
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RightRail() {
  return (
    <div className="space-y-6">
      <TimerCard />
      <FlashcardsCard />
    </div>
  );
}

const TIMER_KEY = "study.timer.v1";

function TimerCard() {
  const [config, setConfig] = useLocalState(TIMER_KEY, { minutes: 25 });
  const [secondsLeft, setSecondsLeft] = useState(config.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(config.minutes * 60);
  }, [config.minutes]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          // Could add notification here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const progress = ((config.minutes * 60 - secondsLeft) / (config.minutes * 60)) * 100;

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(config.minutes * 60);
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          Focus Timer
        </h3>
        <div className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          Up to 60min
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="w-full h-full bg-gray-100 rounded-full"></div>
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-full transition-all duration-1000 ease-out"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${progress > 0 ? Math.min(100, 50 + (progress / 100) * 50) : 50}% 0%, ${progress > 25 ? '100%' : '50%'} ${progress > 25 ? Math.min(100, (progress - 25) * 4) : 0}%, ${progress > 50 ? '100%' : '50%'} ${progress > 50 ? '100%' : '0%'}, ${progress > 75 ? Math.max(0, 100 - ((progress - 75) * 4)) : 50}% ${progress > 75 ? '100%' : '0%'}, 50% ${progress > 75 ? '100%' : '0%'}, 50% 50%)`
            }}
          ></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-mono font-bold text-gray-900">
              {minutes}:{seconds}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={5}
            max={60}
            value={config.minutes}
            onChange={(e) => setConfig({ minutes: Number(e.target.value) })}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none slider"
            style={{
              background: `linear-gradient(to right, #fb923c 0%, #fb923c ${((config.minutes - 5) / 55) * 100}%, #e5e7eb ${((config.minutes - 5) / 55) * 100}%, #e5e7eb 100%)`
            }}
          />
          <span className="text-sm font-medium text-gray-600 min-w-[50px]">
            {config.minutes}min
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
            isRunning
              ? "bg-gray-600 hover:bg-gray-700 text-white"
              : "bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white"
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

const CARDS_KEY = "study.cards.v1";

function FlashcardsCard() {
  const [cards, setCards] = useLocalState(CARDS_KEY, []);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [mode, setMode] = useState("edit");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [studyStats, setStudyStats] = useLocalState("study.flashcard-stats.v1", {
    cardsStudied: 0,
    correctAnswers: 0,
    streak: 0,
    longestStreak: 0
  });
  const [sessionStats, setSessionStats] = useState({
    studied: 0,
    correct: 0,
    startTime: Date.now()
  });

  // Calculate next review date based on Anki algorithm
  function calculateNextReview(ease, interval, grade) {
    let newInterval;
    let newEase = ease;
    
    if (grade < 3) { // Again or Hard
      newInterval = 1; // Review again tomorrow
      newEase = Math.max(1.3, ease - 0.2);
    } else if (grade === 3) { // Good
      newInterval = Math.max(1, Math.round(interval * ease));
      newEase = ease;
    } else { // Easy
      newInterval = Math.max(1, Math.round(interval * ease * 1.3));
      newEase = ease + 0.15;
    }
    
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);
    
    return { 
      interval: newInterval, 
      ease: Math.min(3.0, newEase),
      nextReview: nextReview.getTime()
    };
  }

  // Get cards that are due for review
  const dueCards = useMemo(() => {
    const now = Date.now();
    return cards.filter(card => !card.nextReview || card.nextReview <= now);
  }, [cards]);

  // Get current card from due cards
  const currentCard = dueCards[currentIndex] || cards[currentIndex];
  const isDue = dueCards.length > 0;
  
  function addCard() {
    if (!front.trim() || !back.trim()) return;
    const card = { 
      id: crypto.randomUUID(), 
      front: front.trim(), 
      back: back.trim(),
      ease: 2.5,
      interval: 1,
      reviews: 0,
      created: Date.now(),
      lastReviewed: null,
      nextReview: Date.now(), // Due immediately
      correctStreak: 0,
      totalCorrect: 0,
      totalReviews: 0
    };
    setCards([card, ...cards]);
    setFront("");
    setBack("");
  }

  function removeCard(id) {
    setCards(cards.filter((c) => c.id !== id));
    if (currentIndex >= dueCards.length - 1) {
      setCurrentIndex(Math.max(0, dueCards.length - 2));
    }
  }

  function reviewCard(grade) {
    if (!currentCard) return;
    
    const { interval, ease, nextReview } = calculateNextReview(
      currentCard.ease, 
      currentCard.interval, 
      grade
    );
    
    const isCorrect = grade >= 3;
    const newCorrectStreak = isCorrect ? (currentCard.correctStreak || 0) + 1 : 0;
    
    setCards(cards.map((c, i) => 
      c.id === currentCard.id
        ? { 
            ...c, 
            ease,
            interval,
            nextReview,
            reviews: c.reviews + 1,
            lastReviewed: Date.now(),
            correctStreak: newCorrectStreak,
            totalCorrect: (c.totalCorrect || 0) + (isCorrect ? 1 : 0),
            totalReviews: (c.totalReviews || 0) + 1
          }
        : c
    ));
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      studied: prev.studied + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));
    
    // Update global stats
    setStudyStats(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        cardsStudied: prev.cardsStudied + 1,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        streak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak)
      };
    });
    
    setShowBack(false);
    
    // Move to next due card or cycle through all cards
    if (isDue && dueCards.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % dueCards.length);
    } else if (cards.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  }

  // Reset session stats when switching to study mode
  useEffect(() => {
    if (mode === "study") {
      setSessionStats({
        studied: 0,
        correct: 0,
        startTime: Date.now()
      });
      setCurrentIndex(0);
      setShowBack(false);
    }
  }, [mode]);

  const sessionAccuracy = sessionStats.studied > 0 ? Math.round((sessionStats.correct / sessionStats.studied) * 100) : 0;
  const overallAccuracy = studyStats.cardsStudied > 0 ? Math.round((studyStats.correctAnswers / studyStats.cardsStudied) * 100) : 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-orange-500" />
          Smart Cards
        </h3>
        <div className="flex items-center gap-3">
          {dueCards.length > 0 && (
            <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
              {dueCards.length} due
            </div>
          )}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setMode("edit")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "edit" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMode("study")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "study" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Study
            </button>
            <button
              onClick={() => setMode("stats")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "stats" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Stats
            </button>
          </div>
        </div>
      </div>

      {mode === "edit" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Question or term..."
              className="px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
            />
            <input
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Answer or definition..."
              className="px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
            />
            <button
              onClick={addCard}
              disabled={!front.trim() || !back.trim()}
              className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-4 py-3 rounded-2xl font-medium transition-all duration-200 disabled:cursor-not-allowed"
            >
              Add Card
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {cards.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <GraduationCap className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No cards yet. Add some terms to study!</p>
              </div>
            ) : (
              cards.map((card) => (
                <div key={card.id} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm mb-1">{card.front}</div>
                      <div className="text-gray-600 text-sm">{card.back}</div>
                    </div>
                    <button
                      onClick={() => removeCard(card.id)}
                      className="p-1 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Reviews: {card.totalReviews || 0}</span>
                    <span>Accuracy: {card.totalReviews > 0 ? Math.round(((card.totalCorrect || 0) / card.totalReviews) * 100) : 0}%</span>
                    <span>Streak: {card.correctStreak || 0}</span>
                    {card.nextReview && card.nextReview > Date.now() && (
                      <span className="text-green-600">Due: {new Date(card.nextReview).toLocaleDateString()}</span>
                    )}
                    {card.nextReview && card.nextReview <= Date.now() && (
                      <span className="text-red-600 font-medium">Due now!</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : mode === "study" ? (
        <div className="space-y-6">
          {cards.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <GraduationCap className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>Add some cards first!</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  {isDue ? `Due Card ${currentIndex + 1} of ${dueCards.length}` : `Card ${currentIndex + 1} of ${cards.length}`}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-600">✓ {sessionStats.correct}</span>
                  <span className="text-gray-500">📚 {sessionStats.studied}</span>
                  <span className="text-orange-600">🔥 {studyStats.streak}</span>
                </div>
              </div>
              
              <div 
                onClick={() => setShowBack(!showBack)}
                className={`border-2 border-dashed rounded-3xl p-8 cursor-pointer transition-all duration-200 min-h-[150px] flex items-center justify-center ${
                  showBack 
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300" 
                    : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900 mb-2">
                    {showBack ? currentCard?.back : currentCard?.front}
                  </div>
                  <div className="text-sm text-gray-500">
                    {showBack ? "How well did you know this?" : "Tap to reveal answer"}
                  </div>
                  {currentCard && (
                    <div className="text-xs text-gray-400 mt-2">
                      Ease: {currentCard.ease?.toFixed(1)} • Interval: {currentCard.interval}d • Reviews: {currentCard.totalReviews || 0}
                    </div>
                  )}
                </div>
              </div>

              {showBack && (
                <div className="space-y-3">
                  <div className="text-center text-sm text-gray-600 mb-3">
                    Rate your performance:
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => reviewCard(1)}
                      className="px-3 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-sm font-medium transition-colors"
                    >
                      <div className="font-semibold">Again</div>
                      <div className="text-xs opacity-75">&lt;1min</div>
                    </button>
                    <button
                      onClick={() => reviewCard(2)}
                      className="px-3 py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl text-sm font-medium transition-colors"
                    >
                      <div className="font-semibold">Hard</div>
                      <div className="text-xs opacity-75">1d</div>
                    </button>
                    <button
                      onClick={() => reviewCard(3)}
                      className="px-3 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl text-sm font-medium transition-colors"
                    >
                      <div className="font-semibold">Good</div>
                      <div className="text-xs opacity-75">{currentCard?.interval || 1}d</div>
                    </button>
                    <button
                      onClick={() => reviewCard(4)}
                      className="px-3 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl text-sm font-medium transition-colors"
                    >
                      <div className="font-semibold">Easy</div>
                      <div className="text-xs opacity-75">{Math.round((currentCard?.interval || 1) * 1.3)}d</div>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        // Stats mode
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Study Statistics</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-blue-600">{cards.length}</div>
              <div className="text-sm text-blue-700">Total Cards</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-red-600">{dueCards.length}</div>
              <div className="text-sm text-red-700">Due Today</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-green-600">{overallAccuracy}%</div>
              <div className="text-sm text-green-700">Overall Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-orange-600">{studyStats.longestStreak}</div>
              <div className="text-sm text-orange-700">Best Streak</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-2xl">
            <h5 className="font-medium text-gray-900 mb-3">This Session</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-900">{sessionStats.studied}</div>
                <div className="text-xs text-gray-600">Studied</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-600">{sessionStats.correct}</div>
                <div className="text-xs text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-600">{sessionAccuracy}%</div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-2xl">
            <h5 className="font-medium text-gray-900 mb-3">All Time</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-900">{studyStats.cardsStudied}</div>
                <div className="text-xs text-gray-600">Total Reviews</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-600">{studyStats.correctAnswers}</div>
                <div className="text-xs text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-orange-600">{studyStats.streak}</div>
                <div className="text-xs text-gray-600">Current Streak</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}