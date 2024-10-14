const ProductMock = {
  totalPages: 1,
  totalElements: 5,
  size: 5,
  content: [
    {
      productId: '1',
      imageUrl: 'https://via.placeholder.com/90', // Placeholder, replace with actual image URL
      productUrl: 'https://www.coupang.com',
      name: '런닝머신',
      price: '240000',
      storeName: 'coupang',
    },
    {
      productId: '2',
      imageUrl: 'https://via.placeholder.com/90', // Placeholder, replace with actual image URL
      productUrl: 'https://www.coupang.com',
      name: '실내자전거',
      price: '190000',
      storeName: 'coupang',
    },
    {
      productId: '3',
      imageUrl: 'https://via.placeholder.com/90', // Placeholder, replace with actual image URL
      productUrl: 'https://www.adidas.com',
      name: '폼롤러',
      price: '5000',
      storeName: 'adidas',
    },
    {
      productId: '4',
      imageUrl: 'https://via.placeholder.com/90', // Placeholder, replace with actual image URL
      productUrl: 'https://www.adidas.com',
      name: '요가매트',
      price: '24000',
      storeName: 'adidas',
    },
    {
      productId: '5',
      imageUrl: 'https://via.placeholder.com/90', // Placeholder, replace with actual image URL
      productUrl: 'https://www.bodycrew.com',
      name: '짐볼',
      price: '9900',
      storeName: 'body crew',
    },
  ],
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: true,
  last: true,
  numberOfElements: 5,
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  empty: false,
}

export default ProductMock
