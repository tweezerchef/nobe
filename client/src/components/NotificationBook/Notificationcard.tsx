/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';

import {
  NotificationsItemOption, NotificationsItemMessage, NotificationsItemTitle,
  NotificationsItemContent, NotificationsItem, Wrapper, Counter, NotificationsItemAvatar,
} from './style';

interface NotificationsCardProps {
  notification: [],
  avatarSrc: string;
  title: string;
  message: string;
  variant?: string,
  onArchive?: () => void;
  onDelete?: () => void;
}

const NotificationsCard: FC<NotificationsCardProps> = ({
  notification, avatarSrc, title, message, variant = 'normal', onArchive,
  onDelete,
}) => (
  <Wrapper>
    <NotificationsItem>
      <NotificationsItemAvatar />
      <NotificationsItemContent>
        <div>
          <NotificationsItemTitle />
          <NotificationsItemMessage />
        </div>
      </NotificationsItemContent>
    </NotificationsItem>
  </Wrapper>

);
export default NotificationsCard;
