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

  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const updateColumns = () => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const numColumns = Math.floor(containerWidth / 400);
    setColumns(numColumns > 0 ? numColumns : 1);
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

  const createColumns = () => {
    const columnsArray: any[] = Array.from({ length: columns }, () => []);
    array.forEach((book: any, index: number) => {
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
              <Book book={book} id={id} key={index} />
            ))}
          </div>
        ))}
    </div>
  );
});

export default BookDisplay;
