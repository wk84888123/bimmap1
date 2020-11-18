<template>
  <div class="home">

    <nav>
      <v-app-bar bdense app color="black">
<!--        <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>-->
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="font-weight-light">建筑 </span>
          <span>model</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn small text color="grey">
              <span >Sign Out</span>
              <v-icon right>exit_to_app</v-icon>
          </v-btn>
      </v-app-bar>
    </nav>

    <v-navigation-drawer expand-on-hover permanent floating app v-model="drawer" color="grey darken-4">
<!--      <v-list>-->
<!--        <v-list-item>-->
<!--          <v-list-item-avatar>-->
<!--            <v-icon class="white--text">dashboard</v-icon>-->
<!--          </v-list-item-avatar>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title class="white--text">Dashboard</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list>-->

<!--      <v-card-->
<!--              class="mx-auto"-->
<!--              width="300"-->
<!--      >-->
<!--        <v-list>-->
<!--          <v-list-item>-->
<!--            <v-list-item-icon>-->
<!--              <v-icon>mdi-home</v-icon>-->
<!--            </v-list-item-icon>-->

<!--            <v-list-item-title>Home</v-list-item-title>-->
<!--          </v-list-item>-->

<!--          <v-list-group-->
<!--                  :value="true"-->
<!--                  prepend-icon="mdi-account-circle"-->
<!--          >-->
<!--            <template v-slot:activator>-->
<!--              <v-list-item-title>Users</v-list-item-title>-->
<!--            </template>-->

<!--            <v-list-group-->
<!--                    :value="true"-->
<!--                    no-action-->
<!--                    sub-group-->
<!--            >-->
<!--              <template v-slot:activator>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>Admin</v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </template>-->

<!--              <v-list-item-->
<!--                      v-for="([title, icon], i) in admins"-->
<!--                      :key="i"-->
<!--                      link-->
<!--              >-->
<!--                <v-list-item-title v-text="title"></v-list-item-title>-->

<!--                <v-list-item-icon>-->
<!--                  <v-icon v-text="icon"></v-icon>-->
<!--                </v-list-item-icon>-->
<!--              </v-list-item>-->
<!--            </v-list-group>-->

<!--            <v-list-group-->
<!--                    no-action-->
<!--                    sub-group-->
<!--            >-->
<!--              <template v-slot:activator>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>Actions</v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </template>-->

<!--              <v-list-item-->
<!--                      v-for="([title, icon], i) in cruds"-->
<!--                      :key="i"-->
<!--                      link-->
<!--              >-->
<!--                <v-list-item-title v-text="title"></v-list-item-title>-->

<!--                <v-list-item-icon>-->
<!--                  <v-icon v-text="icon"></v-icon>-->
<!--                </v-list-item-icon>-->
<!--              </v-list-item>-->
<!--            </v-list-group>-->
<!--          </v-list-group>-->
<!--        </v-list>-->
<!--      </v-card>-->


      <v-card
              class="mx-auto"
              max-width="300"
              dark
      >
        <v-toolbar
                dark
        >
          <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Topics</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-group
                  v-for="item in items"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
          >
            <template  v-slot:activator>
              <v-list-item-content  class="ma-0">
                <v-list-item-title  v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

<!--            <v-list-item-->
<!--                    v-for="child in item.items"-->
<!--                    :key="child.title"-->
<!--            >-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title v-text="child.title"></v-list-item-title>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->

              <v-list-group v-for="child in item.items" no-action sub-group :key="child.title">
                  <template v-slot:activator>
                      <v-list-item-content>
                          <v-list-item-title v-text="child.title"></v-list-item-title>
                      </v-list-item-content>
                  </template>

                  <v-list-item v-for="child1 in child.items" :key="child1.title">
                      <v-list-item-content>
                          <v-list-item-title v-text="child1.title"></v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
              </v-list-group>

          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-spacer>
        <Threejs></Threejs>
    </v-spacer>


  </div>
</template>

<script>
    import Threejs from "../components/Threejs";

export default {
  name: 'Home',
  components: {
    Threejs
  },
  methods:{
    clHover:function () {
        this.data.drawer=false;
    }
  },
  data(){
    return{
      drawer:true,
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      items: [
        {
          action: 'mdi-ticket',
          items: [
            { title: '地形' ,
              items:[
                {title:'地形影像'},
              ]},
            { title: '影像' ,
              items:[
                {title:'时态'},
                {title:'颜色设置'},
                {title:'叠加二维地图'},
              ]},
            { title: '三维切片缓存' ,
              items:[
                {title:'倾斜模型'},
                {title:'萨尔茨堡（水面特效）'},
                {title:'鸟巢（水面特效）'},
              ]},
            { title: '矢量' },
            { title: '动态图层' },
          ],
          title: '图层',
        },
        {
          action: 'mdi-earth',
          active: true,
          items: [
            { title: '在线底图' ,
              items:[
                {title:'本地图片'},
                {title:'天地图'},
                {title:'BingMap'},
              ]},
          ],
          title: '在线底图',
        },
        {
          action: 'mdi-home-variant-outline',
          items: [
            { title: '后期处理' },
            { title: '分屏' },
            { title: '地球模式' },
            { title: '位置信息' },
            { title: '场景出图' },
          ],
          title: '场景',
        },
        {
          action: 'mdi-run',
          items: [
            { title: '在线检索' },
            { title: '属性查询' },
            { title: '空间查询' },
          ],
          title: '查询',
        },
        {
          action: 'mdi-bottle-tonic-plus',
          items: [{ title: '量算' }],
          title: '量算',
        },
        {
          action: 'mdi-content-cut',
          items: [{ title: '分析设色' }],
          title: '分析',
        },
        {
          action: 'mdi-airplane',
          items: [{ title: '飞行' }],
          title: '飞行',
        },
      ],
    }
  }
}
</script>

<style>

</style>
