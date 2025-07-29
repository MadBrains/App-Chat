import { AllCounter, EnumTabsType } from 'src/components/Chat/components/ChatList/ChatList';
import { PreviewMessage } from 'src/components/Chat/components/ChatList/components/ChatAccordionItem/ChatAccordionItem';

export const decreaseUnreadCounter = (
  previewMessage: PreviewMessage,
  setUnreadAllCounter?: (count: (prev: AllCounter) => AllCounter) => void,
  chatType?: EnumTabsType
) => {
  if (setUnreadAllCounter && chatType === EnumTabsType.groupOverview) {
    setUnreadAllCounter(prev => ({
      ...prev,
      groupCounter: prev.groupCounter - previewMessage.counter
    }));
  } else if (setUnreadAllCounter && chatType === EnumTabsType.contactsOverview) {
    setUnreadAllCounter(prev => ({
      ...prev,
      contactsCounter: prev.contactsCounter - previewMessage.counter
    }));
  }
};

export const increaseUnreadCounter = (
  previewMessage: PreviewMessage,
  setUnreadAllCounter?: (count: (prev: AllCounter) => AllCounter) => void,
  chatType?: EnumTabsType
) => {
  if (setUnreadAllCounter && chatType === EnumTabsType.groupOverview) {
    setUnreadAllCounter(prev => ({ ...prev, groupCounter: prev.groupCounter + 1 }));
  } else if (setUnreadAllCounter && chatType === EnumTabsType.contactsOverview) {
    setUnreadAllCounter(prev => ({ ...prev, contactsCounter: prev.contactsCounter + 1 }));
  }
};
