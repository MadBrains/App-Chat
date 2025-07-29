import { toast, ToastOptions } from 'react-toastify';
import React from 'react';
import ToastContent from 'src/ui/Alert/components/ToastContent';
import clsx from 'clsx';
import styles from './style.module.scss';

export const toastAlert = (title: string, isError?: boolean, options?: ToastOptions<{}>) => {
  const autoClose = options?.autoClose ?? 3000;

  return toast(<ToastContent title={title} />, {
    position: toast.POSITION.BOTTOM_LEFT,
    className: clsx(styles.toast, styles.toastSuccess, { [styles.toastError]: isError }),
    closeOnClick: true,
    autoClose: autoClose,
    ...options
  });
};
