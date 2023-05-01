import React, { useContext } from 'react';
import Book from '../Book/Book';
import UserContext from '../../hooks/Context';



const BookDisplay = React.memo((props: any) => {
    const { books: array, id } = props;
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    if (!user) {
        return <div>Loading user...</div>;
    }

    if (!array) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 200px)', // Adjust this value according to your header height
            overflowY: 'auto',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {array.length === 0 ? (
                    <div></div>
                ) : (
                    array.map((book: any) => (
                        <Book book={book} id={id} />
                    ))
                )}
            </div>
        </div>
    );

});
export default BookDisplay