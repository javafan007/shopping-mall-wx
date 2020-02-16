
const CDN_HOST = 'http://47.93.199.12:7001';
const API_HOST = 'http://freshcity.top';
const NAV_ITEM_LIST = [
  createTopCat('zhinan', '购物指南', '/shoppingGuide'),
  createTopCat('mendian', '门店展示', 'http://mp.weixin.qq.com/s/qzKSH0jTZnlQ_spw7Aer7w'),
  createTopCat('coupon', '领券中心', '/couponCenter'),
  createTopCat('cuxiao', '特价专场', '/promotion'),
]
const TOP_CAT_LIST = [
  createTopCat('banana', '水果', 'ead9cb98-6594-4b51-921b-5ce6971fed13'),
  createTopCat('f9f28b', '坚果', '6eb32bb4-84bf-4e47-88b6-815bebacfbe9'),
  createTopCat('gift', '礼盒', '466a515b-ff3f-4c5f-9bf2-c97b0196176b'),
  createTopCat('e0620d', '牛奶酸奶', '28eb7cff-a72c-4038-92a1-3caca2a21275'),
  createTopCat('guolan', '果篮', '38bd8378-b42a-4684-97b6-6795a51bf19f'),
  createTopCat('xianhua', '鲜花', '0acdd3ea-5fbd-45fc-9da6-87056e298520'),
  createTopCat('lingshi', '休闲食品', '440c5e15-0bae-4063-8fa7-196bad1a5099'),
  createTopCat('drink', '饮料', '28eb7cff-a72c-4038-92a1-3caca2a21275'),
];

const DICT_SORT_LIST = [
  {
    value: 1,
    text: '默认排序',
  },
  {
    value: 2,
    text: '销量由高到底',
  },
  {
    value: 3,
    text: '价格由高到低',
  },
  {
    value: 4,
    text: '价格由低到高',
  }
]

// 购物车key
const CART_KEY = 'cartItemsCheckedMap';

module.exports = {
  NAV_ITEM_LIST,
  TOP_CAT_LIST,
  CDN_HOST,
  API_HOST,
  CART_KEY,
  DICT_SORT_LIST,
}


function createTopCat(iconName, text, jumpPath) {
  return {
    icon: `${CDN_HOST}/images/h/${iconName}.png`,
    text,
    url: jumpPath,
  }
}