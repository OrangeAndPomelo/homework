## Vue组件通信

通信本质上是信息的同步，Vue的组件通信，就是Vue组件间的信息共享与同步。Vue的组件通信主要分为3类

1. 父子组件通信
2. 兄弟组件通信
3. 隔代组件通信

这里说明下父子，兄弟，隔代组件定义

```html
  <div class="home">
    <!--
      1. father 与 son 就是父子组件关系
      2. son 与 brother 就是兄弟组件关系
      3. father 与 grandSon 就是隔代组件关系
     -->
    <father>
      父组件
      <son>
        子组件
        <grandSon>孙组件</grandSon>
      </son>
      <brother>兄弟组件</brother>
    </father>
  </div>
```

## 通信方案

主要有以下几种

1. props / $emit
2. $children / $parent
3. ref / refs
4. provide / inject
5. eventBus($emit,$on)
6. $attrs / $listeners
7. Vuex



#### props / $emit

父组件通过props向子组件传递数据，子组件通过$emit与父组件通信。

```vue
//子组件
<template>
  <div>
    {{name}}
    <button @click="connectFather">向父组件发送数据</button>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    // 子组件通过props接收父组件数据
    props: {
      name: {
        type: String,
      },
    },
    methods: {
      connectFather() {
        // 子组件向父组件发送信息
        this.$emit('onReceiveData','the message from son')
      }
    },
  }
</script>


//父组件
<template>
  <div>
    //父组件接收来自子组件的通信
    <son name="fromFather" @onReceiveData="getData"></son>
    {{message}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    getData(data) {
      this.message = data;
    },
  },
  components: {
    son: () => import('@/views/communicate/Son.vue'),
  },
};
</script>

```



#### $children / $parent

父组件通过$children访问子组件实例,返回的是一个数组，因为可能有多个子实例，子组件通过$parent访问父组件实例,返回的是一个对象。另外需要注意的是**Vue3已经移除了$children**。$children与$parent设计的主要目的是作为访问组件的应急办法。

```vue
//子组件
<template>
  <div>
    {{ num }}
    <button @click="addNum">Add Number 5</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    addNum() {
      //子组件获取到父组件实例
      console.log(this.$parent.message); //hello
      this.num += 5;
    },
  },
};
</script>


//父组件
<template>
  <div>
    <son></son>
    <brother></brother>
    <button @click="add">FatherBtn addNum</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello'
    }
  },
  methods: {
    add() {
      //当前实例的直接子组件
      console.log(this.$children); //[VueComponent, VueComponent]
      // 父组件直接调用子组件的addNum方法
      this.$children[0].addNum();
    }
  },
  components: {
    son: () => import('@/views/communicate/Son.vue'),
    brother: () => import('@/views/communicate/Brother.vue'),
  },
};
</script>

```

#### ref / refs

在普通DOM元素上使用，引用指向DOM元素，如果在组件上，引用指向组件实例

```vue
//子组件
<template>
  <div>
    {{ num }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 5,
    };
  },
  methods: {
    addNum() {
      this.num = 10;
    }
  },
};
</script>

//子组件brother
<template>
  <div>
    brother
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brotherName: 'hfh'
      }
    },
  }
</script>

//父组件
<template>
  <div>
    <son ref="son"></son>
    <brother ref="brother"></brother>
    <button ref="btn" @click="add">My button</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello'
    }
  },
  methods: {
    add() {
      //读取子组件实例
      console.log(this.$refs.son.num); //5
      console.log(this.$refs.brother.brotherName); //hfh
      console.log(this.$refs.btn.innerHTML); //My button
      this.$refs.son.addNum();
      console.log(this.$refs.son.num); //10
    }
  },
  components: {
    son: () => import('@/views/communicate/Son.vue'),
    brother: () => import('@/views/communicate/Brother.vue'),
  },
};
</script>
```

以上三种是常用的父子组件通信方案

#### eventBus

eventBus可以处理兄弟，隔代组件的通信。它是一个事件中心(一个新的vue实例)，所有的事件数据通过他分发传递，就相当于两个组件的中介者，起到传话的作用。发送数据者可通过$emit进行分发，接收数据这通过$on接收发送者传来的数据。但是如果项目较大，通信的事件太多，就很容易找不到事件的问题，因为事件的分发都分散在各个组件里，所以维护起来比较困难。所以eventBus适用于小型项目，当需要通信得数量较小时可以考虑使用。

**事件中心**

```javascript
import Vue from 'vue';
export default new Vue();
```

**发送接收数据**

```javascript
//父组件
<template>
  <div>
    <son>
      <grandSon></grandSon>
    </son>
  </div>
</template>

<script>
import eventBus from './eventBus.js';
export default {
  data() {
    return {
      num1: 1,
      num2: 2,
    };
  },
  mounted () {
    // 接收到来自隔代组件的计算通知并进行计算
    eventBus.$on('countData',() => {
      let total = this.num1 + this.num2;
      console.log(total); //3
      eventBus.$emit('result',total);
    });
  },
  components: {
    son: () => import('@/views/communicate/Son.vue'),
    grandSon: () => import('@/views/communicate/GrandSon.vue'),
  },
};
</script>


//隔代组件
<template>
  <div>
    <button @click="countData">计算并发送数据</button>
    计算结果为：{{result}}
  </div>
</template>

<script>
import eventBus from './eventBus.js';
export default {
  data() {
    return {
      result: ''
    }
  },
  methods: {
    countData() {
      eventBus.$emit('countData');
    },
  },
  mounted () {
    // 获取到计算结果并渲染到组件
    eventBus.$on('result',(res)=> {
      this.result = res; //3
    });
  },
};
</script>
```



#### provide / inject

![Provide/inject scheme](https://v3.cn.vuejs.org/images/components_provide.png)

provide/inject 用于处理**隔代组件**之间的通信，适合处理这种嵌套的组件关系。provide翻译就是提供，父组件provide变量，子组件或者子组件下的子组件...通过inject注入变量达到通信的效果，有一点需要注意的是，**provide绑定并不是响应式的，但是如果提供的是一个可监听的响应式对象，那么这个对象的属性依然是可监听的**，下面的例子详细的证明这点

```vue
//父组件
<template>
  <div>
    <son>
      <grandSon></grandSon>
    </son>
  </div>
</template>

<script>
import eventBus from './eventBus.js';
export default {
  provide() {
    return {
      // 非响应式变量
      name: 'father name is oyc',
      // 响应式对象
      father: this.fatherObj,
    };
  },
  data() {
    return {
      message: 'hello',
      fatherObj: {
        name: 'oyc',
      },
    };
  },
  mounted () {
    eventBus.$on('changeData',()=> {
      console.log('接收到消息');
      // 尝试修改非响应式变量
      this.name = 'oyq';

      // 尝试修改响应式变量
      this.fatherObj.name = 'oyq';
    });
  },
  components: {
    son: () => import('@/views/communicate/Son.vue'),
    brother: () => import('@/views/communicate/Brother.vue'),
    grandSon: () => import('@/views/communicate/GrandSon.vue'),
  },
};
</script>


//孙组件
<template>
  <div>
    <button @click="getData">获取隔代父级的数据</button>
    <button @click="getData1">测试是否更新数据</button>
  </div>
</template>

<script>
import eventBus from './eventBus.js';
export default {
  inject: ['name','father'],
  methods: {
    getData() {
      console.log(this.name); //father name is oyc
      console.log(this.father.name); //oyc

      //修改provide提供的变量数据
      eventBus.$emit('changeData');
    },
    getData1() {
      // 这条数据没变，证明provide绑定的变量并非是响应式的
      console.log(this.name); //father name is oyc

      // 这里改变了是因为provide绑定了一个响应式的对象，所以这里也跟着改变了
      console.log(this.father.name); //oyq
    },
  },
};
</script>
```

#### $attrs / $listeners

$attrs / $listeners也是用来处理隔代组件还有嵌套组件的问题。

**`$attrs`**：接收除了props声明外的所有绑定属性（class、style除外）

**`$listeners`**：包含了父作用域中所有带有.native事件修饰符的事件监听器。

需要注意的是,vue3已经移除了$listeners。

```vue
//父组件
<template>
  <!-- name 和 age 作为props 不会传入过去，这里会传入data,还有监听器updateInfo -->
  <son class="son" name="oyc" age="18" :data="objData"  @updateInfo="updateInfo" />
</template>
<script>
import son from './Son.vue';
export default {
  name: 'father',
  components: { son },
  // inherited: true,
  data() {
    return {
      objData: {
        num: 1
      }
    };
  },
  methods: {
    updateInfo() {
      console.log('update info');
    },
  },
};
</script>

//son.vue，子组件
<template>
  <!-- 通过 $listeners 将Son,以及father作用域中的事件，传入 grandSon 组件，使其可以获取到 father 中的事件 -->
  <grandSon :height="height" :weight="weight" @addInfo="addInfo"  v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import grandSon from '@/views/communicate/GrandSon.vue';
export default {
  components: { grandSon },
  props: ['name','age'],
  data() {
    return {
      height: '180cm',
      weight: '70kg',
    };
  },

  methods: {
    addInfo() {
      console.log('add info');
    },
  },
};
</script>

//孙组件 grandSon.vue
<template>
  <div>grandSon</div>
</template>

<script>
export default {
  data() {
    return {
      result: '',
    };
  },
  created() {
    console.log(this.$attrs); //height: '180cm', weight: '70kg', data:{num:1}
    console.log(this.$listeners); // addInfo: f,updateInfo: f
  },
};
</script>
```

#### Vuex

vuex是专门为vue开发的一个集中式状态管理工具，能够统一管理vue中的各种数据以及事件，并进行分发，这里不做细讲，后面会作为一个专题一块复习。