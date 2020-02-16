// components/dropdown-list/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    list: Array,
    placeholder: String,
    valueKey: {
      type: String,
      value: 'value'
    },
    labelKey: {
      type: String,
      value: 'label'
    },
    visible: {
      type: Boolean,
      value: false
    },
    itemClass: String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeVisible () {
      this.triggerEvent('on-toggle', !this.properties.visible);
    },

    // 选择项
    selectItem (e) {
     const item = e.currentTarget.dataset.item;
     this.triggerEvent('on-change', item);
    }
  }
})
