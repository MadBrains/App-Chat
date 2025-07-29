export const RU_PHONE_PATTERN = /^((\+7|7|8)+([0-9]){10})$/;
export const ALL_PHONE_PATTERN = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;

export const RU_PHONE_MASK = '+7-999-999-99-99';
export const HIDE_PHONE_MASK = '+7-999-***-**-99'

export const emailPattern = {
  value:
    /^[%&‘*+—/?^`{|}~!=$_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
  message: 'Введите корректный почтовый адрес'
};

export const imagePattern = {
  value: /.*\.(jpe?g|bmp|png|svg|webp)$/gim,
  message: 'Неккоректный формат изображения'
};

export const phonePattern = {
  value: ALL_PHONE_PATTERN,
  message: 'Неверный формат номера'
};
