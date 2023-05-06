/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';

import {
  NotificationsItemOption, NotificationsItemMessage, NotificationsItemTitle,
  NotificationsItemContent, NotificationsItem, Wrapper, Counter, NotificationsItemAvatar,
} from './style';

interface NotificationsCardProps {
  notifications: [],
  avatarSrc: string;
  title: string;
  message: string;
  variant?: string,
  onArchive?: () => void;
  onDelete?: () => void;
}

const NotificationsCard: FC<NotificationsCardProps> = ({
  notifications, avatarSrc, title, message, variant = 'normal', onArchive,
  onDelete,
}) => (
  <Wrapper>
    <NotificationsItem>
      <NotificationsItemAvatar>{}</NotificationsItemAvatar>
      <NotificationsItemContent>
        <div>
          <NotificationsItemTitle>{}</NotificationsItemTitle>
          <NotificationsItemMessage>{}</NotificationsItemMessage>
        </div>
      </NotificationsItemContent>
    </NotificationsItem>
  </Wrapper>

);
export default NotificationsCard;
