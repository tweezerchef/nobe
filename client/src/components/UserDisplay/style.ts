import styled from 'styled-components';

const ProfileCard = styled.div`
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.6);
`;

const ProfileImage = styled.div`
  position: relative;
  top: -60px;
  border-radius: 1rem;
  background-image: url(https://yt3.ggpht.com/ytc/AKedOLSB-oR-xmvVSZXJ3gbK12uvv0AJUvajwxMie_R_uw=s900-c-k-c0x00ffffff-no-rj);
  width: 11rem;
  height: 11rem;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.4);
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-top: -3rem;
  margin-bottom: 1rem;
`;

const ProfileName = styled.h3`
  color: #212121;
`;

const ProfileDesc = styled.p`
  color: #666666;
  font-size: 0.9rem;
`;

const Status = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 1rem;
  margin-bottom: 1.3rem;
`;

const StatusValue = styled.span`
  color: #212121;
  font-weight: 700;
`;

const StatusText = styled.span`
  font-size: 0.8rem;
  color: #7c7c7d;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PinkButton = styled.button`
  border: none;
  padding: 0.8em 1.9em;
  border-radius: 0.35rem;
  cursor: pointer;
  font-weight: 600;
  background: #b82151;
  color: white;
`;

const GrayOutlineButton = styled.button`
  border: 1px solid;
  background: transparent;
  color: #b82151;
  border-radius: 0.35rem;
  padding: 0.8em 1.9em;
  cursor: pointer;
  font-weight: 600;
`;

export {
  GrayOutlineButton, PinkButton, Action,
  ProfileImage, StatusValue, StatusText, Status, ProfileInfo, ProfileName, ProfileCard, ProfileDesc,
};
