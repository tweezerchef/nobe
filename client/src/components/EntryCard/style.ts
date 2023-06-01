import styled from 'styled-components';

export const StyledEntryCard = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 50px;
  margin: -20px auto 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-size: cover;
  background-image: url('https://nobe.s3.us-east-2.amazonaws.com/DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png');
  background-repeat: no-repeat;

  h2 {
    font-weight: 500;
    margin-bottom: 50px;
  }

  span {
    display: block;
    margin-top: 40px;
    color: #888888;
    font-size: 14px;
  }

  a {
    margin-left: 4px;
    color: #2f8bfd;
  }
`;
