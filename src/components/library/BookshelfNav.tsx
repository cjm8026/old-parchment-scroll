import { BookSpine } from './BookSpine';

interface Book {
  id: string;
  title: string;
  pageCount: number;
  date: string;
}

interface BookshelfNavProps {
  books: Book[];
  activeBookId: string | null;
  onSelectBook: (id: string) => void;
}

export function BookshelfNav({ books, activeBookId, onSelectBook }: BookshelfNavProps) {
  // Sort books: newer on top, older at bottom
  const sortedBooks = [...books].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <nav className="h-full overflow-y-auto py-6 px-3">
      {/* Shelf header */}
      <div className="mb-6 px-2">
        <div className="h-px bg-library-wood-light/30" />
      </div>
      
      {/* Book spines */}
      <div className="space-y-2">
        {sortedBooks.map((book) => (
          <BookSpine
            key={book.id}
            title={book.title}
            pageCount={book.pageCount}
            date={book.date}
            isActive={book.id === activeBookId}
            onClick={() => onSelectBook(book.id)}
          />
        ))}
      </div>
      
      {/* Empty state */}
      {books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-library-dust/50 text-sm">
            아직 기록된 책이 없습니다
          </p>
        </div>
      )}
      
      {/* Shelf footer decoration */}
      <div className="mt-6 px-2">
        <div className="h-px bg-library-wood-light/30" />
      </div>
    </nav>
  );
}
