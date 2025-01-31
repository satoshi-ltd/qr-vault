import { Notification as NotificationBase } from '@satoshi-ltd/nano-design';
import React, { useEffect, useState } from 'react';

import { style } from './Notification.style';
import { EVENT } from '../../App.constants';
import { eventEmitter, L10N } from '../../modules';

export const Notification = () => {
  const [value, setValue] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const listener = (data = {}) => {
      if (visible) setVisible(false);
      setTimeout(
        () => {
          setValue(data);
          setVisible(true);

          if (!data.error) setTimeout(() => setVisible(false), 5000);
        },
        visible ? 300 : 0,
      );
    };

    eventEmitter.on(EVENT.NOTIFICATION, listener);
    return () => eventEmitter.off(EVENT.NOTIFICATION, listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => setVisible(false);

  const { error, message = L10N.ERROR } = value || {};

  return (
    <NotificationBase
      caption
      error={error}
      text={message}
      visible={visible}
      onClose={handleClose}
      style={style.notification}
    />
  );
};
