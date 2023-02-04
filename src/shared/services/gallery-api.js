import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    per_page: 12,
    key: '31955904-7341a4dddd0022ded7445126a',
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  // console.log(data);
  return data;
  // return data.hits;
};
