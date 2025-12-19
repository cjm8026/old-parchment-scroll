import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LibrarySpace } from '@/components/library/LibrarySpace';
import { BookshelfNav } from '@/components/library/BookshelfNav';
import { WritingDesk } from '@/components/library/WritingDesk';
import { Parchment } from '@/components/library/Parchment';
import { MemoryEntry } from '@/components/library/MemoryEntry';
import { ChapterDivider } from '@/components/library/ChapterDivider';
import { Menu, X } from 'lucide-react';

interface Memory {
  id: string;
  content: string;
  timestamp: string;
  chapterId: string;
}

interface Chapter {
  id: string;
  title?: string;
  date: string;
}

interface Book {
  id: string;
  title: string;
  pageCount: number;
  date: string;
}

// Sample data for demo
const sampleBooks: Book[] = [
  { id: '1', title: '2024년 겨울', pageCount: 12, date: '2024-12-01' },
  { id: '2', title: '가을의 기억', pageCount: 8, date: '2024-10-15' },
  { id: '3', title: '여름 여행', pageCount: 15, date: '2024-07-20' },
];

const sampleChapters: Chapter[] = [
  { id: 'ch1', title: '첫 번째 기억', date: '12월 1일' },
  { id: 'ch2', date: '12월 5일' },
];

const sampleMemories: Memory[] = [
  { id: 'm1', content: '오늘 창밖으로 첫눈이 내렸다. 작은 눈송이들이 조용히 떨어지는 모습을 보며 오래전 어린 시절이 떠올랐다. 그때도 이렇게 창가에 앉아 눈을 바라보았던 것 같다.', timestamp: '오후 3:24', chapterId: 'ch1' },
  { id: 'm2', content: '따뜻한 차 한 잔의 온기가 손끝에 전해진다. 이런 작은 순간들이 모여 하루가 되고, 하루가 모여 삶이 된다는 것을 다시 한번 느낀다.', timestamp: '오후 4:15', chapterId: 'ch1' },
  { id: 'm3', content: '새로운 장을 시작한다. 무엇을 기록하게 될지 아직 모르지만, 이 빈 페이지가 주는 가능성이 좋다.', timestamp: '오전 10:30', chapterId: 'ch2' },
];

const Library = () => {
  const [books] = useState<Book[]>(sampleBooks);
  const [activeBookId, setActiveBookId] = useState<string>('1');
  const [chapters] = useState<Chapter[]>(sampleChapters);
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [newMemory, setNewMemory] = useState('');
  const [showCrystal, setShowCrystal] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSaveMemory = useCallback(() => {
    if (!newMemory.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString('ko-KR', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    const memory: Memory = {
      id: `m${Date.now()}`,
      content: newMemory,
      timestamp,
      chapterId: chapters[chapters.length - 1]?.id || 'ch1',
    };

    setMemories(prev => [...prev, memory]);
    setNewMemory('');
    
    // Show crystal guide briefly
    setShowCrystal(true);
    setTimeout(() => setShowCrystal(false), 2000);
  }, [newMemory, chapters]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveMemory();
    }
  };

  // Group memories by chapter
  const memoriesByChapter = chapters.map(chapter => ({
    chapter,
    memories: memories.filter(m => m.chapterId === chapter.id),
  }));

  return (
    <LibrarySpace showAmbientEffects={!isWriting}>
      <div className="min-h-screen flex">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded bg-library-wood/80 text-library-cream md:hidden"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Bookshelf Navigation - Left sidebar */}
        <motion.aside
          className={`
            fixed md:relative z-40 h-screen bg-sidebar border-r border-sidebar-border overflow-hidden
            transition-all duration-300
            ${isSidebarOpen ? 'w-24 left-0' : '-left-24 md:left-0 md:w-24'}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Shelf texture */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: `
                repeating-linear-gradient(
                  180deg,
                  hsl(28 30% 12%) 0px,
                  hsl(28 30% 12%) 80px,
                  hsl(30 25% 15%) 80px,
                  hsl(30 25% 15%) 82px
                )
              `,
            }}
          />
          
          <div className="relative z-10">
            <BookshelfNav 
              books={books}
              activeBookId={activeBookId}
              onSelectBook={(id) => {
                setActiveBookId(id);
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </motion.aside>

        {/* Main content area */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Header - subtle title */}
          <motion.header 
            className="pt-8 pb-4 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-lg font-serif text-library-cream/70 tracking-wider">
              내 기억의 도서관
            </h1>
            <p className="text-xs text-library-dust/50 mt-1 tracking-wide">
              조용히 기록된 기억들이 보관되어 있습니다
            </p>
          </motion.header>

          {/* Scrollable parchment area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-24 pb-8">
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Parchment showCrystal={showCrystal}>
                {/* Memory entries grouped by chapter */}
                {memoriesByChapter.map(({ chapter, memories: chapterMemories }, chapterIndex) => (
                  <div key={chapter.id}>
                    {chapterIndex > 0 && (
                      <ChapterDivider title={chapter.title} date={chapter.date} />
                    )}
                    
                    <div className="space-y-6">
                      {chapterMemories.map((memory, index) => (
                        <MemoryEntry
                          key={memory.id}
                          content={memory.content}
                          timestamp={memory.timestamp}
                          isFirst={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Empty state */}
                {memories.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-library-wood/50 text-sm font-serif">
                      첫 번째 기억을 기록해보세요
                    </p>
                  </div>
                )}
              </Parchment>
            </motion.div>
          </div>

          {/* Writing Desk - fixed at bottom */}
          <motion.div 
            className="px-4 md:px-12 lg:px-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="max-w-2xl mx-auto">
              <WritingDesk isActive={isWriting}>
                <div className="parchment rounded-sm p-4">
                  <textarea
                    value={newMemory}
                    onChange={(e) => setNewMemory(e.target.value)}
                    onFocus={() => setIsWriting(true)}
                    onBlur={() => setIsWriting(false)}
                    onKeyDown={handleKeyDown}
                    placeholder="기억을 기록하세요..."
                    className="w-full bg-transparent text-library-deep font-serif text-base resize-none focus:outline-none placeholder:text-library-wood/40 min-h-[60px]"
                    rows={2}
                  />
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-library-wood/10">
                    <button
                      className="text-xs text-library-wood/50 hover:text-library-wood/70 transition-colors font-serif"
                    >
                      새 장 시작
                    </button>
                    
                    <button
                      onClick={handleSaveMemory}
                      disabled={!newMemory.trim()}
                      className="px-4 py-1.5 text-sm font-serif text-library-deep/80 hover:text-library-deep disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      기록
                    </button>
                  </div>
                </div>
              </WritingDesk>
            </div>
          </motion.div>
        </main>
      </div>
    </LibrarySpace>
  );
};

export default Library;
