import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Book from '../Book/Book';
import UserContext from '../../hooks/Context';

const BookDisplay = React.memo((props: any) => {
  const { books: array } = props;
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  if (!user) {
    return <div>Loading user...</div>;
  }

  if (!array) {
    return <div>Loading...</div>;
  }
  const id = user?.id;
  const [showBigBook, setShowBigBook] = useState(false);
  const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });
  const [selectedBook, setSelectedBook] = useState(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const updateColumns = () => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const numColumns = Math.floor(containerWidth / 400);
    setColumns(numColumns > 0 ? numColumns : 1);
  };
  const handleBookClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, book: any) => {
    const rect = (e.target as Element).getBoundingClientRect();
    let bigBookWidth = window.innerWidth * 0.7; // This should match your BigBook width style
    let bigBookHeight = window.innerHeight * 0.9; // This should match your BigBook height style

    // Apply maxWidth and maxHeight restrictions
    bigBookWidth = Math.min(bigBookWidth, 675);
    bigBookHeight = Math.min(bigBookHeight, 1000);

    // Apply minWidth and minHeight restrictions (values are arbitrary, adjust as needed)
    bigBookWidth = Math.max(bigBookWidth, 200);
    bigBookHeight = Math.max(bigBookHeight, 200);

    let { left } = rect;
    const { bottom } = rect;

    // If BigBook would overflow the right edge, align it to the right with some padding
    if (window.innerWidth - left < bigBookWidth) {
      left = window.innerWidth - bigBookWidth - 20;
    }

    // If BigBook would overflow the bottom edge, align it to the bottom with some padding
    let top = bottom - bigBookHeight;
    if (top < 0) {
      top = 20; // minimum top position for BigBook
    }

    setBigBookPosition({ top, left });
    setSelectedBook(book);
    setShowBigBook(true);
  };

  const handleBigBookClose = () => {
    setShowBigBook(false);
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  useEffect(() => {
    if (array.length > 0) {
      setShouldDisplay(true);
    }
  }, [array]);

  const filteredArray = array.filter((book: any) => book.title && book.author);

  const createColumns = () => {
    const columnsArray: any[] = Array.from({ length: columns }, () => []);
    filteredArray.forEach((book: any, index: number) => {
      columnsArray[index % columns].push(book);
    });
    return columnsArray;
  };

  const renderedColumns = createColumns();

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '100%',
        overflowY: 'auto',
        padding: '20px',
      }}
    >
      {shouldDisplay
        && renderedColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {column.map((book: any, index: number) => (
              <Book
                book={book}
                id={id}
                key={index}
                onClick={handleBookClick}
                onClose={handleBigBookClose}
                showBigBook={showBigBook && book === selectedBook}
                bigBookPosition={bigBookPosition}
              />
            ))}
          </div>
        ))}
    </div>
  );
});

export default BookDisplay;
