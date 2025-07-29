import styles from 'src/shared/ui/Notifications/style.module.scss';
import React from 'react';
import { styled } from '@mui/material/styles';

interface ToastContentProps {
  title: string;
}

const ToastContent: React.FC<ToastContentProps> = ({ title }) => {
  return <span>{title}</span>;
};

export default ToastContent;
