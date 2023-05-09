/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';

import {
  NotificationsItemOption, NotificationsItemMessage, NotificationsItemTitle,
  NotificationsItemContent, NotificationsItem, Wrapper, Counter, NotificationsItemAvatar,
} from './style';

interface NotificationsCardProps {
  notification: any,

}

const NotificationsCard: FC<NotificationsCardProps> = ({ notification }) => {
  console.log(notification, 17);

  return (
    <Wrapper>
      <NotificationsItem>
        <NotificationsItemAvatar image={notification.User.picture} />
        <NotificationsItemContent>
          <div>
            <NotificationsItemTitle />
            <NotificationsItemMessage />
          </div>
        </NotificationsItemContent>
      </NotificationsItem>
    </Wrapper>
  );
};
export default NotificationsCard;
