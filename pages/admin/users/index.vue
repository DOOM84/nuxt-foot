<template>
  <div>
    <v-col>
      <v-row>
        <crumbs :items="items" />
        <v-spacer></v-spacer>
        <v-btn to="/admin/users/create" color="success">Добавить пользователя</v-btn>
      </v-row>
    </v-col>
    <no-ssr>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          {{item.status ? 'Активный' : 'Заблокирован'}}
        </template>
        <template v-slot:item.avatar="{ item }">
          <v-avatar>
            <img :src="item.avatar" alt="avatar">
          </v-avatar>
          <v-icon
            small
            color="warning"
            class="mr-2"
            @click="delAvatar(item.id)"
          >
            close
          </v-icon>
        </template>
        <template v-slot:item.is_admin="{ item }">
          {{item.is_admin ? 'Да' : 'Нет'}}
        </template>
        <template v-slot:item.is_admin="{ item }">
          {{item.is_admin ? 'Да' : 'Нет'}}
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            color="info"
            class="mr-2"
            @click="editItem(item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            color="info"
            @click="deleteItem(item.id)"
          >
            delete
          </v-icon>
        </template>
      </v-data-table>
    </no-ssr>
  </div>
</template>

<script>
    import Crumbs from '@/components/crumbs'
export default {
    layout: 'admin',
    components: { Crumbs },
    data () {
        return {
            items: [
                {
                    text: 'Панель управления',
                    disabled: false,
                    to: "/admin",
                },
                {
                    text: 'Пользователи',
                    disabled: true,
                    to: '/admin/users',
                }
            ],
            users: '',
            headers: [
                {
                    text: 'Имя',
                    //align: 'left',
                    //sortable: false,
                    value: 'name',
                },
                { text: 'Аватар', value: 'avatar' },
                { text: 'Email', value: 'email' },
                { text: 'Активен', value: 'status' },
                { text: 'Администратор', value: 'is_admin' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
        }
    },

    async asyncData({store}) {
        try {
            const {users} = await store.dispatch('adminUser/index');
            return {
                users
            }
        } catch (error) {
            if (error.response.status === 401) {
                return $nuxt.$router.replace('/login');
            }
        }
    },
    methods: {
        editItem(user){this.$router.push({name: 'admin-users-edit', params: { 'user' : user}})},

        async deleteItem(id){
            if (confirm('Are You Sure?')){
                const {success} = await this.$store.dispatch('adminUser/delete', id);
                this.users.splice(this.users.findIndex(item => item.id === id), 1);
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: success,
                    color: 'success'
                });
            }
        },

        async delAvatar(id){
            if (confirm('Вы уверены, что хотите удалить аватар этого пользователя?')){
                const {avatar, success} = await this.$store.dispatch('adminUser/deleteAvatar', id);
                this.users[this.users.findIndex(item => item.id === id)].avatar = avatar;
                this.$store.commit('auth/SET_SNACKBAR', {
                    show: true,
                    text: success,
                    color: 'success'
                });
            }
        }
    }
}
</script>
