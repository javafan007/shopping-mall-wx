// components/goods-item/index.js
import { CART_KEY } from '../../utils/Constants.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartItems: wx.getStorageSync(CART_KEY) || []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addToCart (e) {
      const cartItem = normalizeCartItem(e.currentTarget.dataset.item);
      const cartItems = wx.getStorageSync(CART_KEY) || [];
      const found = cartItems.find(item => item.id === cartItem.id);

      if(found) {
        found.num++;
      } else {
        cartItems.push(cartItem);
      }
      wx.setStorageSync(CART_KEY, cartItems);
      this.setData({ cartItems });
    }
  },

  ready () {
    // this.setData({ cartItems:  });
  }
})

function normalizeCartItem(source) {
  const { id, headerUrl, name, subName, price } = source;
  return {
    id,
    headerUrl,
    name,
    subName,
    price,
    num: 1
  }
}
