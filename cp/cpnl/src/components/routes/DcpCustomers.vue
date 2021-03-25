<template>
    <v-container class="blue-grey lighten-5" fluid >
      <template>
        <v-data-table
          :elevation="0"
          :headers="headers"
          :items="person"
          :search="search"
          :item="item"
          sort-by="id"
          class="elevation-0 ma-2 pa-3"
        >
          <template v-slot:top>
            <v-toolbar :elevation="0" flat rounded color="transparent">
              <v-toolbar-title>Customers</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-btn color="matblue" dark class="mb-2">{{person.length}}</v-btn>

              <v-spacer></v-spacer>

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                :md="6"
                single-line
                hide-details
              ></v-text-field>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="matgreen" dark class="mb-2" v-bind="attrs" v-on="on">Add Customer</v-btn>
                </template>
                <v-card>
                  <v-card-title style="background-color:#EBEEF0">
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.phone" label="Phone Number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.gender" label="Gender"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      style="margin:10px"
                      color="matgreen"
                      dark
                      class="mb-2"
                      @click="close"
                    >Cancel</v-btn>

                    <v-btn style="margin:10px" color="matgreen" dark class="mb-2" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <!-- <template v-slot:item.avater="{ item }">
              <v-avatar style="margin:8px;border:1px solid #ECEFF1">
                <img
                  :src="item.avater"
                >
              </v-avatar>
          </template>-->
          <template v-slot:item.fullname="{ item }">
            <span>
              <v-avatar size="55" style="margin: 8px 8px 8px 0px;border:1px solid #ECEFF1">
                <img :src="item.avater" />
              </v-avatar>
              {{item.first_name}} {{item.last_name}}
            </span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              style="background-color:matblue;display:inline-block;"
              color="matblue"
              small
              class="mr-2"
              @click="editItem(item)"
            >mdi-pencil</v-icon>
            <v-icon color="matred" small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </template>
    </v-container>
</template>
<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { align: "start", text: "ID", value: "id" },
      // {
      //   text: '',
      //   sortable: false,
      //   value: 'avater',
      // },
      { text: "Name", value: "fullname" },
      { text: "Email", value: "email" },
      { text: "Phone Number", value: "phone" },
      { text: "Gender", value: "gender" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    person: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      id: "",
      email: "",
      phone: "",
      gender: "",
    },
    defaultItem: {
      name: "",
      id: "",
      email: "",
      phone: "",
      gender: "",
      avater: "No Image",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Customer" : "Edit Customer";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.person = [
        {
          id: 1,
          first_name: "Rosella",
          last_name: "Sones",
          email: "rsones0@etsy.com",
          gender: "Female",
          phone: "+62-704-647-9634",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGsSURBVDjLpZIxixNRFIW/kVHQQlwEQdgUdkkgTX6BkMIi/yJY5geE/ISAZIuUSb9lgnYWNsraaOkkTSSz6MLWJhmY9+7ZIm8mCUYLvfDg8d49h3POvZEk/qdigMFgkEqqSEp6vV79b4But/shz/OXzrlkMpnU4/BeabfbzGaz2pt3NzIJAd4DAplhAm+w3W7pdDqMRqNaqcB7/3U6nTbjR095fnYfGQiQCRPogOT2yTnD4RDn3CeAqMhg8Panzs8e7AAGkpDApJLITJiJ5U3GoPMiKhUQ5HoDJMwCsLjbMUnu7ThEAHnbNQrMDBkBYCWwIHTuBIEzMC8sNO2ai7vtlQjM6XcCc4Y3lT514FnBUqHEnSJwDry30v8xyV6RBM5OWfAe7+OQegAqjPIgQEl4f1LB7qOUa2DB++E4FbIqKpJEq9VK8zyvPHz8jFedi6PED6VL4vLiNd+Tz3jvkyzL6vcAsiyr9Pt9bn8sWVyvWVxvmKdrFqtfzNM189WGZLUmSTcsv10xHo9xztV285doNptfGo2GVavVK4UF+tOJ4/h9FEUCPkrar/K/1h35Nbw8S+DdbwAAAABJRU5ErkJggg==",
        },
        {
          id: 2,
          first_name: "Tore",
          last_name: "Dulake",
          email: "tdulake1@dailymotion.com",
          gender: "Male",
          phone: "+7-845-331-8927",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMBSURBVBgZBcFLaJxVGIDh9zvn/2cmmWTSJk1oxUu1xCZoi1qvi6gggpRIdd2Niy6KVRChiCBeNiK4KOiiGxGKkNiCpKIhQrzUxiINkmJqQqdt2iQzk8xkkiZNOpfMnHM+n0dUFYBXP774VksmedQIh4AUIAAIoAIacCHMbazpb7K5fnLi9GADQFQVgMOfX5r47t1D/cbIDgWLAgCAKoBSvtdk6J8Niovb1dn/rnX+dXpwOwIAMFb2JyK7Y2YFa0RAQAN4DTin1Jqel3vbee7RiMuh3Kqhb/2ld0Z3iqry0Rdfdy4vFdYsgTeOHufst1/RdJ73Pz2FD4GGU+oNz4u9KWbKitPA+L9Ffp+YG7b5tWrHzq7uTzq7up+/OjVJ/4GnufTHGP0Hn2AuO8O+/Y+DWDxKrE160sqeNsvBPUnOTxb7zX0P7M3MTk8dWy2VuFepc/XKJNve0AyGP8dHqWyuE1khYQ0314TLi44LN6okY4tExpmx82eP16qVtof7HqPn/oco37lLJtPOru7dtLam+encGSIRYmtIJiyphCWViFEMiME80tv3dro9wy8jQ1RW83S2JSjl5vj53DeUlnOMjQwTWyE2QhwZEtaSjAwBUIWoPdPRMvj6EW4t5FiazzLwymEKuXleGzzCcqnM+OgPGBEiq6ACCorgA/gAkXMu6bwnOzvNxmqJ4lIesQYxhts3r1FYmAdAEEQhMhCAVAzeKaaytclifol6rUY+l6OytcXd9Ttcz2ZZXSmyVi4SVPEBFAgKCsTW4BqOKL94+/rI92eoONv7YE+X/LjSwq0bC8zOF6hVq/iuvXx2pQmAKgQAYGh3THM7IKoKwMCHF2vDJ59NfTmT4KkeQ1DwCl4gKCigCqowveI49QIMvHehHgEAuO0QXAja8MjfBU8QRREAgoKgBAU1gglCFElwPrgIAKBZ96V0wu764EAjraoGhQAAdLREAKhCSyyIEGIrW96FgqgqAM+c+PWEa+qbIvKkoq0AACgooCgAKAD1EMKUgaH/AfiQhzSolJNMAAAAAElFTkSuQmCC",
        },
        {
          id: 3,
          first_name: "Gerrilee",
          last_name: "Causer",
          email: "gcauser2@epa.gov",
          gender: "Female",
          phone: "+31-964-892-4110",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVDjLlZLBSyJhGMa/UxTUIWJ0ZVmlwxLLEiEhurCoKeqCOtZN7J4ZRZdd9rSG6NFbSOegDp5aqWWI3UGm6KBUxsq2LLj+CzV9jDOH8NlvJtqLjuXhBy/z8Xvel4chAMhTKGfOMeVsbqXf2wBp3s5Yf5hno8rp24YxS9PTVHq18mTAgzj3k4mCIs0cqZeLUCTHJ1q13VKRSz0v4PRNVr1KQfu9Aa31BZ2LKKg42aHfJ8ZNA9i5L9hWUZFeQ73kof3N42SPR6OyjFZ1FZ36AuQfo5CPyc7gDiRHttNYwsl+Apqmodvt4uJrCur1GmSB/GI4TAOo9JKjVasQi8VQr9ehqiqazSaqu1Fofz5C/kYow9M3gJVkp+JUJZFIIJ1Oo1gsolwu42hngcmfdfmecS4fki3TC3ieN2SPx4NAIIB4PA7lPIo70YY7YQJyhdhNS3yU3W43/H4/LBaLvnWbbbxnvGNyQz4gmb4ByWQShULBkH0+HziOg/6die+ZKOjzzQEZYXzoCYhEIsjn8z3yI0wKmf7KwWAQuVwOLpcLXq+3Rx4EyWQyaLfbcDqdCIVCQ8n/A2q1GkqlklHYMLIREA6HN/WzrVbr0LLOP1AMs7UPAa92AAAAAElFTkSuQmCC",
        },
        {
          id: 4,
          first_name: "Codee",
          last_name: "Minillo",
          email: "cminillo3@gnu.org",
          gender: "Female",
          phone: "+86-205-114-4871",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJQSURBVDjLpZM7SJUBFMd/371FVnp9VVppoaI377UwKrgVREMQ0WPIoQgKGnJxiGjJoMUSpIaguanHFkFGDUFLQ0NlpRiBg4qV1e1mJr7u/c6jIVDDx9KBw4ED58f/vAJ3539s2ULJq+9be800qWquqk/bUzePLAaIzC++VIKRjOfHqY3VBqKaWkrBPMCVxo6RnOQmQg+ZyE0gIj1LAQJ351r3ZTdTVA39G72+eEsgJnR/7fktoqqqERHh9rF7xfNmoKbUra7F3DB3HAvUDHdIrE0Uqivuxqv+roWHqKqoG+bG8PgQo9OjiAvmTiSIUmPC7iBKt+kiAFF6M73ElhdStnoDPyYzqCtqStSz7FRhc9VxDkx00nTnqIsIIsqT5mdBBKA9dTPo2HsrSI+nUVNCCwlVEBMaJaSq8jCx9dupD6c4WJNkz9YUojJ/CyKKuiKqiAkxFRqnshSsKULHOqloOEt1ZghTRURnWzj/vNlFlKK8ItSM0EPMjZ2TWSoTp2H6La/uPyJ1rpXSkTTpz19QmaNAREmW1VNeWM7AWD+Jkm3sW1HJrlgDBcWTWHYA3NDx11Tvv8gp5OP1qMVmAKEIgvIu/YaN+RUMfutnXX8PRZsascke3KbY0RTHcsPk5fVRtvVkvWRzF2YVhIKakSzdhqhR/v0TyZpDrCrI4PITgihdD/sAw6b7WFu3Gc2GLS/aGhKBu3PmwYm/q1FFRGgZ++V7Tt0NopFBXH4B/s/1R1fG+f7hPX2P2x4EC73zyxs7Mq62ys1xsznuMxEz3L3rDwilfn3qWP0kAAAAAElFTkSuQmCC",
        },
        {
          id: 5,
          first_name: "Sydney",
          last_name: "Laurentin",
          email: "slaurentin4@go.com",
          gender: "Female",
          phone: "+48-948-193-1171",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZM5aFRRGIW/+2bmZYzJTEzMuCbRGIjRiAsYEIKNIoIiWGgluCCChZ3aCyJqK6hFxMLCpbKxERE3DIpFEgtjonGJYSYzMcYsb7nvvvtbTMC9yil/OB8/nHOUiDAXOcxRcwYkAQbube5JZ9asUepXnhBOvR+OzcQWIPzNpQCYad392iQBlDirGzqvp5RSIGUzSmGCsebRnjPDMnsFSLgZkTgqTucfngLuJAEwEmB1RVi4QqwT4GRQqpr00m0s7bjgIgJYvPwjvjy5SaJqXaM/tvB23+X2dBkQKUesJtYuYgXrfyaaGWW6+IhUeglIhJkZxPjLWbzuANmVG5n40Er//a6LZYCStDU+2gPRM0RTk1SvPki6rg1Q+IX7SFKRWb6R8fdvcJWmOrOYqrrG7OwHDsl5OWrajgIWRBAsVo/gDXdhojTZ5p2E+Vu4lYpPPf2Y0Bff89fPAkQkDrBeHxJ/R+IpxEzgjfUiUkW2ZRfByFUc15CqamK+/YhHKWo/0T1Qzi1ExBpsVMLqElaPUhh4RuBXkm3ZQzByBScVoSdXUHrSTW3nIRwT259F0iKKGDHjiPlK8d1LPL+O3Npd6EIXCVcIJ5soPe2mZm2eivoGML8USbT9ZryvldG0Wz3UN+gkKpZhVI7860ssyLkE4w18e/GK2g2rSKRbiYNARNvwJyAILw5d3duBsL3fydXvO36Nt7dOMvD0ORWN67GlflmYMrr4uCAIoJ5prNwoB/jHGs8ea49OHzmexInpeXCXTx8Gp7P1tZ07zvX2/msLfwH2b631NzUvSna0rURS4XO/WDq8+3zf0P/G9AOyUDsBCTaamwAAAABJRU5ErkJggg==",
        },
        {
          id: 6,
          first_name: "Cirstoforo",
          last_name: "Juniper",
          email: "cjuniper5@histats.com",
          gender: "Male",
          phone: "+255-325-584-1089",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALCSURBVDjLlZJ7SJNRGMaF/i3on/6wUDfbvsLpUiO1tItamRUISdmFYEYaGQaikNlIvIdOp9JSI0ssXOrmdH5ONzek29AmanPenU2H5rYyNZqa5dP3CY1EQzrwcHjhPL/3Oee8TgCc/kfDjQTZJ2Uvt4vcZXS9uUFO7BiUEx6UcfugnJ1hIn1hazqO5gzm8qYAYzNRRhknBmTEHNX114TiALRC5oo23xNSPqPxnwDKyB5REAuW7ngsWtVYsigx25kAa2MwDKXekKcyUv+c3cgcaWo7CFt/Ln5YFZjruoCZNyGwyDiYrvfHdEsoFOmMwXUAyuhMqXVKdxHfTNVYNFdiTncaX98G47PmEGwt+2ElubCqw9FZwFp2AEZIgk0Zp6i7rth672N5VofvxkzYtGGwaI5gsskfo1VeMEs8YamnUihPoS3LfckBGJCy1Tb9eSxNl8M+ngz7YDQWes/B+ioYIzU+6H/GwYcSAibxntVrTClOoj6FMeEA6CtYk/PGm5g3puP9C0/01Higr9oPo5QsLX7QFbHQVbgb5ioWbKoTGJcEoTrJTeIAdDx0fzxMBmFmiA9DXQTItABoio9BncfERwkXM0pv6IuZeFkWiKRHUYgtiMDlzKP28GQu3/GIrwuY2m6xL5UiBbI7XNhNAnzpSUZLric68l1RWxmEtNpokAYReqZUELbGIUroBf9bzgLHL6iymUPtFT5ofxqFMU0i7GPpGCYvoejqNvByQtHQW4iG/mLQS6COgVB9gwYsrJkBakDqNAX7oBIEQJbMgbYkBKIrW3H2ng8Uhif4e8n1IhqwfgqlKYww6V03aKmJM7efwad3YTh8exfyVNeQo+KtmnOUvI0T/C1xolu6OMEVmjwOsrIJRAr2Il91fbUzvdP1mjfYSM/jXbeUx7rwS6NdLLyYnfbAOOefdGxK85Qe0Gd+Azr0uSlwBNX8AAAAAElFTkSuQmCC",
        },
        {
          id: 7,
          first_name: "Harlen",
          last_name: "Ragles",
          email: "hragles6@wunderground.com",
          gender: "Male",
          phone: "+86-838-602-7977",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLpZM9SJVhFMd/Vy8pV40yIRHvBY0QUcHUqAgXo7YapKGm1oJ2scGWcI2mIBojh5YIgoYkl5sNkZGUaH6QkhejED/vfd/nfDS8emloEDxwOHCe8/9xnuc5J+XuHMYqOKQdGpDO55/89w5mgpnjLpgpZjEiiqoAAREhhEAaoKmpqyx0d9xtzxOAu2Gm5WhmuCszM28TAEAUbeHue4dJQSLSPdG+Jx1VV9cRQjEBJGQjkzlGNtvD7u46a2uz5HJnMQtMT7+is/MqlZVp5ubesb6+jFlAJKJCJJTJ2WwPS0sfECmRy/WxuJhne/s3LS0XuPfyGnef93Okug6RgGoghIgKVcFdUA0AbG4WWFjIUyyu09Y2QE1NPYXCNyINNDe0MzJ+m0iKmCkiJdJmRVSFBASqAVXl/uubuAViF2IRmo6fpr3xHFulHR5+fcTQmWFUI9IhRJgJqjEhFOntvUEIEc/mH3O54xbqhppiOKsbK3Q1X2Q7LjI8OcT16j7SItFeBzFTUy/K71GSGHXjx5/vBBPEAkEDm9EW3dl+tsMuT5fypKMowixQVVXzz7cZJSkhKpw8mkNMUTcKG8vU1zbyaSXPl5XPDNZ0kxobu+PuMSLJdLlHiDhvbIpSHBNbTEliTjV0cL71Ch+X3zM5P8FgbScnKjOkDrqNnQ8qdvpyA5mJufGfsXFpddRngYMDWkdSO2qVmaJp669RX9rP/wXZZaE2eCuTIAAAAABJRU5ErkJggg==",
        },
        {
          id: 8,
          first_name: "Alric",
          last_name: "Maccaig",
          email: "amaccaig7@accuweather.com",
          gender: "Male",
          phone: "+86-555-418-4534",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKUSURBVBgZBcHda5V1AADg5/29Z/NMNzvW5qbhwmLpQkpbkqBFXvVBF0pXUXdddVMHu5Agsv6D8KbwppC6LRAqQWhdRKTmoAwvnJSOOsqmTmU7H+/H79fzZIN3tIanndDQBhAQABAAABU6PiuWfNoYnnbCzOG2yTnyIUKDLCNkZIGQETLkZMiQajoX28M/nNHQ0DY5xyBnaj85lq9we4EQyAMCObJASoyOs/VZtp5pN0A+RGiy7yjgKOU6i+e49j31GjJSQsbqLZqPEAkisgbdm1z+jr9/YX2FoU08dYRXT7L9ACCjLOmXVAUFDQEho3uTv74mZDQC43vZ+zYPTfP8+yyc4to5BhXFgLKmT0NAwNR+Xmxzb4nOAkvz/HScuXetjzTdjx2Tk3vki+cZVJQVBUGEnAxDm5iY5Zm3eOUkrZ3iwhfuXvlKs7XH6vgO0gb6JWVNnyAgw90/+PE9Lp1ifYWhjRz6yL2RUSOTB23ets/q9Xm9XYfoV5SRgiAgBFKgt8zSPPMfcuNnRf+uO1XP2HhL/eCM8dk3Ldf3pH5FUVMQRMjIEwc+4NDHbHuOhS+tXD7t4Zkj9BdcOP2N0VbP6vXf3J/YSlVTEEBITOxh+34mZtlx0NraqrLfNbalKw7+IUX12kU7Xzrm3w19dVlTEICM3gplF6TlRZ2ypzW9V+z+KcWeuTd2iUVHs3nV5tnXdbodKoICqULN2WOcPe72r59rzrxm49htqbpDlrv07VVEsX/VxJOP+e9BR3d0g/yTGS1TIwdsmWF4lJAsLt8wffi40MhlQzuE5m6P7ntBaO6WDT+hsWlGPva4653zi9ngZa3hKSdMaYuouDD5tDqSYpLqKMUoxSTFJMUoxSSlWKWUfv8fIbEaFyrl/WgAAAAASUVORK5CYII=",
        },
        {
          id: 9,
          first_name: "Sayre",
          last_name: "Hollow",
          email: "shollow8@typepad.com",
          gender: "Female",
          phone: "+84-801-223-9115",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJpSURBVDjLpZPLS5RhFMZ/7/eNM6Xf6GhYSeU0FUFGdMUWRdIiEqSgqDataldLwU3WXyC0jxYFEUFKbTIkyLCgoIhuRPcGC7LQHPPS5+f7vue0CCa70KLO8nDOj8N5nseoKv9TqV8b7oaJVGlXoVWEZlVQ4a4IfSqczO7SydnzZvYF7oZpUeGMaewomFwzmq4D9Wg8gi89IHnVVRThUO0eHfgN4PrNHs21XAoWHiQOMjwduMn8hpCqyPH2mWNhIU9DwwKSd90knwb21h/Qy2WA7Td1qgyGay5EEozjp4uUhko8vD2GKizJC4Xlgsk0EmbW8OXO4UkR8g0HdTQAUKE9yHdGmgZJivT3FKmpSWhpzbBlm7I0P8HN6wY3/gSfvKFyVWcknnaAAECENlO7GZkuoi5m++5avoMtYcoCsGXrCGoncWP3SeVWIp62sgoiNJGpRuIxXj+uBZMF84s8qqgbZXHdNSDBewplgAqxuuk03lGX30jlvOWYIPx5XzxTnx6h472gigjhjws8RWy8DtJURTHZBSsIUhU/AbxN8J+vYoJKxKewCa9n/6DXjjzApBsJkgHs1w/AbIcqdvwNfL5Iqnot8cggdobesoylS6ZehLfR5nOR2Be4qUHCXBsVuQ2gnmT4FjPvTxPOXYSp3snglSOTzrJs/TEdLhtp+KLZl6rf0T2ncS+EE7jSPXz8AXXTmFSWMLsOzzJKz69Setm3f0On9vxm5aHzZod4TlU1dRTS81YTVAQgDpd4poZe8vFOV9FZjm48rn1/zALA+7MmEk+HCK3e0+xmwFnuOkufs3RtOvGXMP1LfQPtZUr+1SCKsQAAAABJRU5ErkJggg==",
        },
        {
          id: 10,
          first_name: "Krishnah",
          last_name: "Burlingham",
          email: "kburlingham9@intel.com",
          gender: "Male",
          phone: "+994-721-988-6892",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHYSURBVDjLlVLPS1RxHJynpVu7KEn0Vt+2l6IO5qGCIsIwCPwD6hTUaSk6REoUHeoQ0qVAMrp0COpY0SUIPVRgSl7ScCUTst6zIoqg0y7lvpnPt8MWKuuu29w+hxnmx8dzzmE5+l7mxk1u/a3Dd/ejDjSsII/m3vjJ9MF0yt93ZuTkdD0CnnMO/WOnmsxsJp3yd2zfvA3mHOa+zuHTjy/zojrvHX1YqunAZE9MlpUcZAaZQBNIZUg9XdPBP5wePuEO7eyGQXg29QL3jz3y1oqwbvkhCuYEOQMp/HeJohCbICMUVwr0DvZcOnK9u7GmQNmBQLJCgORxkneqRmAs0BFmDi0bW9E72PPda/BikwWi0OEHkNR14MrewsTAZF+lAAWZEH6LUCwUkUlntrS1tiG5IYlEc6LcjYjSYuncngtdhakbM5dXlhgTNEMYLqB9q49MKgsPjTBXntVgkDNIgmI1VY2Q7QzgJ9rx++ci3ofziBYiiELQEUAyhB/D29M3Zy+uIkDIhGYvgeKvIkbHxz6Tevzq6ut+ANh9fldetMn80OzZVVdgLFjBQ0tpEz68jcB4ifx3pQeictVXIEETnBPCKMLEwBIZAPJD767V/ETGwsjzYYiC6vzEP9asLo3SGuQvAAAAAElFTkSuQmCC",
        },
        {
          id: 11,
          first_name: "Lyn",
          last_name: "Backshell",
          email: "lbackshella@hibu.com",
          gender: "Male",
          phone: "+1-713-409-7250",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFESURBVBgZBcG9S9RxAAfg565DI51uCBocpGhoqM1VaAjByXAImvoXDtr6D4JAaG2oyXtpKJGEltYcGntDErEhEI3kvDP7fb+fnqcVAAAAQAeg39XLqsVcyl62bTw8AkTE5tqb8WHOU1MzzUFej1+uR4SIzeWPOcu/TPI7JznNecZ5ngcrEa3YnJ/7fHehY6Kqqiq+eedgP7cH4zZ6dxZmnamKoiqGnpjTXcxj2tSVq/4qGkXRGOlrfDcvK7TJ0qypoiiKob5G9cWsukSHoCiqamQgiiqKoE12p2YUxVBf0aiK6ybs0qbu/HJZMTRQFEWjuOFU3aFNnn06vLCnr1EURbHq1PF+ntIKXiz/+fDTFV/90HHNTWdOTO69fU8rYH0tr7rzc2YUF8aOx3m0NYJWAPe76VmttzK1bzsbW0dAKwAAAID/tYu/URIDsoEAAAAASUVORK5CYII=",
        },
        {
          id: 12,
          first_name: "Terrill",
          last_name: "Ladson",
          email: "tladsonb@amazonaws.com",
          gender: "Male",
          phone: "+51-479-741-8758",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHESURBVDjLY/j//z8DJRjO8F3q3d9ypOF/9b7y9x7zXAXQFTpPcaiv2VX+v2Bzznv7HlsFDAM857sJFOzIuT/hRO//wMW+81E0T3JQAGls29f8377Lph6rC0DYfZZLQOfh1v9tB5v/u0x1coCJB8zzW9+xv/1/xOKw8zi9AMPBSwPX9xzu+h+/KhqsGOjcgMZddf+rt1X+t26xNCBoAMS5eUDntvx3meDYn7Qy7n7rrsb/9h22/XgDERkDbS1o2d3wv31vy//+A73/S9YXvbesNRcg2gAQLtlU8H/KoUn/e/d1/89YnnafYDSC/T8vcH/ppqL/xRsK/tdvr/0/6cCE/9MPTf3fsr35f/byjP9Zy9L/5y3PeYnTgIBJ/g1+E3wbfPu8G5IWJR7o39v3v3h1wfvIuZEHnJudGhwbHBrs6+0aiPKCe4dbQ/XGqv/Ji5KeOzY6NBDlBd8pPvtzVmb9z16Z8b9hc/3/CXv7//fv7vtfu6Hqf8r8pP9J8xP/A124D6cBbm1uDa6tLg0g54bNDD3Qs6v7f/ayjM9BUwIPWFdaNViWWzZYlJsT5wW7WtuGnGXZ/8Nnht23rLAkzgsU5UZyMQAcp633iiwCvgAAAABJRU5ErkJggg==",
        },
        {
          id: 13,
          first_name: "Josephine",
          last_name: "Loach",
          email: "jloachc@cyberchimps.com",
          gender: "Female",
          phone: "+86-707-276-8651",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIvSURBVDjLpVNNi1JRGH7OdfKaH5MTQkFhYeCiYTDaSAs3SVJQOxcFLf0TguAfCFwHQdt+gcPsIgcXxYiXXGQKxWSMFor5/XXv6X2P3stABkEHDu895zzv8z7Pe88RUkr8z9g5v6hUKq9Xq9Xz5XK5QxEU1VwsFhzfpNPpZ1sJDMO4RAmvgsFgWte9mFMSLAtKGync2wvi6OjwKa3+JKhWqw85ORQKXfP5fPjy9Tu4umVJWNIiIgmTyObz+XYLBD4Mh8NqMZ3OsKTkj8YJEVjOfJB6pGxsJWCPbrcbg8FgXdk0cXv/jqouN9W50X9VwMwmJTGIfwhLN6ofKJpqv9VqwePxKHA2myVPENwZsnsll8v91FjBuldSJTDB/sFd7O5eRqPRwGQyQa/Xw3A4RCQSEWT3CZNMp9OrjgKbQJFQZZZuGBXE43GMx2OnF7VaTUaj0V+MJ7vSIXCSzTWQCTRNQNd1+P1+dRdYwSZxuYnrHnBz7NvIjWMLctM4BnFz7UbzoG/BVm3lSgEfulwuVdkyOdmywUoFV2dl9h4T2Ao0UvC+VCphNBohEAjAc1GnGygcVf1+n+xoEEKoNcULRCBns5kCaJlMJt5sNh8Xi8WT4+N30N0CN29cx/1kCp/qn3F21sbp6TfU63X8oOH1et+SCpOUKQni/GvM5/MpOnxB88B+TByTySSoIsrlskkwF2MTiYRSIf7lORcKBbPdbqPb7d6jpFu05Y/FYi87nY78DZN2pgrwMw41AAAAAElFTkSuQmCC",
        },
        {
          id: 14,
          first_name: "Kamillah",
          last_name: "Mattys",
          email: "kmattysd@sciencedaily.com",
          gender: "Female",
          phone: "+86-228-882-6005",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALoSURBVDjLjZNrSFNhGMdHJfVl0peCKAKNoL7NopQ0CCqRQrxlUVoxK6eZk0oy03Ap5rXSYZsiedsWuYhGopgaqNNlrTR0uUtuuOl0lE6n87Kb/857aKJJ0IE/7/M+PP/feZ73nJcBgLFWCoUiuLOzs6K9vb2/ubn5l0wmm5FKpVqxWCyUiIQn/q5fDZRKJZMyCyiz02QywWq1Ym5uDgsLC7DZbFCrhyF8nu+qEuSJKviFvusAf8yter0eKysrWFpaAoEYjUZMTU3B7XZjxb0I16IWnR0vUVKUIS8seOi7CiBvJman0wnyuFwukP3IyAhmZ2dpqGNxAsv2YXiWf6CtpQ65OakiGkCZg6i2PXa7nTbMz8/TELPZDI1GA5J3u11YsGngsKvpLpyU7txO8qTfTQlmUGbB2NgYiLRaLW0iMxPQ5OQkHTuWbRRARRlNVDxNdeiAXC4Hh8MRMFgsFv5X5GwIeGZmBgaDAWw2+xsNUKlU0Ol06OnpQUNDA11M1vHxcTpP4uSaQNyoDYBOr8Xo6CgsFgvi4uKmaAAp8poIhIjkvHmysqsD8KjpEi5UHkDv4HdojBOIijk/vQFARPZpkuPgioLAqTuMhBcsZL+NhVRZjvTXEQgt24WmTwMIizg3vGEELyhFFAhZvwBvvlbQxlfKMpR1pKP+YzGSJKE4WrANp6PC6v95iNeoeYn5aVsailpTkN+SCF4TG7nNHFR25yG+LgT7cxge+kfi8/mCrq4uWGapT2kexLBxAHHVB9H4uQySvieoVxSjpreQgtyEsDsXiZIw7HuwZWl3JoNFA0pLS5l5j3M7Gt+JYfippiHRQn+cKd+DU892IqRkO67UHoOgi4cEUSj8M30cfqnMI+suE4/HY97PuledzE10yd5L0TfUjSHDFwzqlejp/wBW/lZcrT8Jvwwfu98t30MbbqNXXG5qSGLy9arLCfGq2IvR1siYcGt45FmVf/Ym196szdiRyfBbW/8bMwbKi+1SPUYAAAAASUVORK5CYII=",
        },
        {
          id: 15,
          first_name: "Glynda",
          last_name: "Lockyer",
          email: "glockyere@ucla.edu",
          gender: "Female",
          phone: "+62-810-155-1300",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALpSURBVDjLdZNrSFNhGMf/Z9uZnjldy+lKKF2ThsqULgZdLAIrKTHKMLvYhS4fgiKLoi/Rx6LID0aIaRAUpQSFEcIMiS6mhoFmN0duVpo6azd1m+852+lZSeSlF36fHv7/532e//ty5eXl7yKRSCrhqqysNGOWU1xc/EEURbMkSY7GxsaMf2sqEqaHw+HbxOHS0lJ5NgMSR6kgCqbXVCSMIbaTu5h0qEKKVcSASTJYBDiSdB0LtEDZyVYVidcRmdMNFCR8S1QR9tf8DWFc8AkKjUGQBYPgRLagE4YExthn4hbRNeMGJEwg1hGSju/Ei/EOLFdehSJsgc29DV1eKxg7IFH3nYRuNgORcFLRaowBchO18LJjGAtkw+3bCPtoUnT+COFcnRU299zdJSu1Voz/eAYuNLA/OhubNMjaZDRDzWkgwYRx3QiQcgcRTsRNxrAnPxC3d/O2+YIhDzrTEnidFnxqqr0cNUggthqNxhzbmYFZMlBgZUYwY/++kmydfgXcvR+pCUN8wjxoExfqogZ+osHpdEqWCw3LBEpBDAOMAj1kqEaK3AellK7WmwswMVgHtYbDl85PEEPsZyg4tkpBm1UTJkLZNnER/rADkXA0e2BkxA1e4qBPL0Toew043gNeG4/YQO+w6B/Mzz3+wB414CcNuD8pnIBX7MG84UewxvqgSy9CaKAKCl4E86fB9bRtlI0GCpeeetL5e0C6vo+oJ/hoCkX0csxiGXbMeY7krC1gQ7VQqmVM+FPR39wakYKB7MWn2zv+xkidc0i8m0hbb0iVld3fkavawElcMga7r0GfrEbIvQBfm1tCJRVdsfZ+b9+UFZOBSNTwPK9pOjfMaT56uMw1RxHz7SXsDS3otLnx4p4NVx72nu1zBbwzMiKxg6j2eDxv6urquJ7PQxJ7/ximnDzExVkw0NE9dr7e+eV+u6uS/szP6QacLE/9gCVr5waXLjKqVmSYIPMTr4KukYOFl9468J/zC7f3tq13JhENAAAAAElFTkSuQmCC",
        },
        {
          id: 16,
          first_name: "Janeen",
          last_name: "Canete",
          email: "jcanetef@instagram.com",
          gender: "Female",
          phone: "+51-432-318-4640",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLY/j//z8DJZhhGBlgZ2fHnZWVVdra2vpu3rx5/2tqah7m5OSYA7EEkH0XJAaSA6kBqUUxwMjIiM3Hx6dr4sSJ/1+8ePH/7t27/w8ePPi/sbHxXnV19aGbN2/+AIkdOXLkP0gNSC1ID9wAQ0NDv+Li4g9Xr159FxERsc3b2/tPamrq/0mTJv2vrKz8D2KDxEByK1aseAhSC9KD7IKupqam75MnT0739/fnsre3/7x3797/586d+3/o0KH/a9eu/Z8xx+Jf6nzD/yA1ILUgPXADdHV1M9PT099PmzatJCgoaKejo+MvNze3/4GBgWAMYifMMPrfuDnqf/gMjf8gtSA9cAM0gcDX1/d6b2/v+1WrVr1dt27d//yltv9zF1n8T19g8j9pruH/mvWh/1ednvi/ZLX/f9c+iX+a2hpacAPU1NSYgc428PLyup+SkvIlOzv7e/Zi8/8bzk37v/bsFLDGFacn/J+wp+T/wuNd/zOWuv03bWf/rdvMyIgzfpOB/gVp7tuV/79zR/b/1m1p/xs2J/5v2pr+f8ah5v8xC2z+q9Yz/MRpQPRszf8rT034v/RE7/+Fx7r+zzvaATQk6//0Q03/05Z6/FesZbguXcnAidOAwOmKfz0nSv917hf9a93N/zduvtX/aQcb/ictdvsvX8twUbKSgZ2kpKzdzPg6fqHzf/lqhjNAzWwk5wWgk1/LVTP/F61kYEEWBwAP7or0z//OfQAAAABJRU5ErkJggg==",
        },
        {
          id: 17,
          first_name: "Clemmie",
          last_name: "Dronsfield",
          email: "cdronsfieldg@abc.net.au",
          gender: "Male",
          phone: "+86-738-524-0136",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJNSURBVDjLpZNLSNVhEMV/f7UCy+iaqWkpKVFqUIlRUS3SHkSPRYugVbuCaFPrEgIxsKCFix5QtIsWraIIS5MQa6G1CTN7iKa3SAyt7P7v983M1+Kqm4oCB4bDmcXhzBkmCiEwl8pijpXTf+v0iKqWmimqgqpHxCPiZtF7h4hrO9DUufc3AVUtLdy2jxCUoEYwwUwJKgT1mApBhRf3bu75owMRj5mQnkwSVDDxmPoMisPEsWDxcq7ltXDl/JOgoqioipeTXZf2X88RcRRVH/znrtrZQePRWtQCI2M/slvv9l4AMgLn7n+gP/kddYY4RZ0iaZ3la0sWIl5wEqgpT7BxVYLLt5/nA+R4n+bEsi5+Zg1NW/botPUZnru0nNb8du70THFs3gNqyorxzmfO6H0a8w51KWS61aVQF6MuxnyMiScWx4qCKlo7d9LzbnRWIMe5GBXH/LyiTOKSSf7qtzZCtseZ4Cb6Kc1fTVXxZr7HU1zs2ITqWQCiI7s2hBAMMyMEI0xj6fEEu2uOocFQU4zA58kREgsLefbhMb1DT4k1vSTrzqOX0aukH0xUbqFkXT39Y1GqvHYfsTg0GEPjbxkcH+D9WB8TqXGGvr5nw8odrCmpI5YwHoUQqK6u3g60ACngBnCq9gxbD60/gZgipmgwPk0Ok7+omJcfu3n0+uFXpzREf3umw1crLHYOZ45YHJUFNdGWij30DHfTPtD22QkNyebQF/3vN65rypqqK6vP7RxoH3VGQ7I5vAH4b4GKxmhKLTs3ZVrxpTkMzsx/ARtuob3+yA7oAAAAAElFTkSuQmCC",
        },
        {
          id: 18,
          first_name: "Ruthy",
          last_name: "Herion",
          email: "rherionh@prweb.com",
          gender: "Female",
          phone: "+62-961-571-5463",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJfSURBVDjLpVNNiFJRFD6O4j8EMpoMTGU6LUbCMJAmmFzYQpjViIgkSNtoldDOzUCbCIJA2rlpNv4thiCY5dSmNJOiYhwRJ8nIMdT8/3nq7ZxH7/GaoE33cbjn3ne+737nnHtljDH4n6E4vZFMJg04RZB4C2cLznK0MtoLXD8JhUI/pPEyqQIEb2s0ml2n06kzGo2gVCr5/clkAo1GA/L5/KDf798Oh8MZEUQEZIlEwp3NZtlgMGAcx7HhcMja7TZrtVqs2+2y8XjMEMxisRgLBoNeAbdEJAjWa7XaXbvdDnK5HHq9HiABIBFMp1NAIDSbTcjlclCtVmGxWDwNBAJ6wi79FhJxOByrKpUKUAEFwHw+503w0+k0RKNR0Ol0YDAYqDb3RQIM8ppMJj5XCp7NZiIB+ZlMhurD+6VSCfR6Pcn3igS4cNHpo9FIBApGJwtgUnN4eAgUi75LbKPQCalsMjo5lUrx/4V9wRcwAkEOT9+gtlEaUrBARgD7nYsglylg+GlIsJy0Bvv1eh3UarUom8DSVOx3rWBZs8DKeTN8t/Gd2JfW4HGhUPhKLSuXy2LOvGz8Lt9bgwuWc2BdRhKTFZbNBhhutm+5H1xTijcxHo+7O53OQa1WA7wTUCwWoVKpgC28CiqTAs6eMYNt5RJM51M4/vYF8u/fjicT7uUfV9nv92/j+hn2WU/9ppqQClJWXT8Cz1UPT3Dw+hWcnDQ28g8/vJGdfo0+n8+AexF0tzDPdfRH6B+Pbvy84rl+E7g5B3vP9+Ddo4+yvx7Tv8bmjouhZODGdL05+Bw74gl+AetZvIbkaCwtAAAAAElFTkSuQmCC",
        },
        {
          id: 19,
          first_name: "Robina",
          last_name: "Beves",
          email: "rbevesi@desdev.cn",
          gender: "Female",
          phone: "+593-404-938-9899",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLY/j//z8DJZgsTV+9fAu+uHo8+GzvXECWAV+c3R//mTn9/ydLu4eka3ZyY/ts63T3k4Xt+4/GlqS74JONY+9Hc5tdH4wsmAmGgWv9xQKX2nMPnapOF4A1WzsEfjSzefLB0FwUHoi/szPX/05P/f0rOWk9ugHONWefzNl44X/B/L3/o7LXnn1h4fitN6i22Tx7W5tpxqYHxmnrChh+p6X+/rd10/+fsbF/f0REmiE0n7F3rDz5wb7s6Bu3gt3Vz80db69zTd1mlr11tUnGxt89Cw/8N0ha9YDhZ2LC+p8xMb9/hEdc+h4Ucu+br//JFXFNi5zKjz20KztiDzIMGFgzP+iZboQZbpSypsAgaeUjvfilqIEI9C9bf8rk3Wd8kz59sHV+BQysa8DA+vNe1+RreV94S96UiE9pff7/I1scPnlW6NWgBCLQvxKOVaeO2ZcfW2pbcogTGFgGwMD6+2/alP+rYhz+Na5O/L/lytT/F57t+t+/O+t/eL/uf/NsyR4G17oLBUD/Pgf69w3Qv6XILnqvbbT+nZre74RWlz8bL0/4v/HapP8g0LMn9X//nnSQAd8ZnKrPPJi85uJ/oH9f4opOn2rD/9uuzPmPDDZdmgoy4D+DQ8XxArvSww9sivYX4DLAMkf6e/eupP/tuxLAmtt3JiBcQEzqAypsCe7R+N+7KwVsM4gG8cFhQGwSBiruAOJPIGdD6Q6QOAAJO6JfeUJqowAAAABJRU5ErkJggg==",
        },
        {
          id: 20,
          first_name: "Geneva",
          last_name: "Cadwell",
          email: "gcadwellj@icq.com",
          gender: "Female",
          phone: "+86-818-329-8015",
          avater:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ/SURBVDjLY/j//z8DJZgsTV+9fAu+uHo8+GzvXECWAV+c3R//mTn9/ydLu4eka3ZyY/ts63T3k4Xt+4/GlqS74JONY+9Hc5tdH4wsmAmGgWv9xQKX2nMPnapOF4A1WzsEfjSzefLB0FwUHoi/szPX/05P/f0rOWk9ugHONWefzNl44X/B/L3/o7LXnn1h4fitN6i22Tx7W5tpxqYHxmnrChh+p6X+/rd10/+fsbF/f0REmiE0n7F3rDz5wb7s6Bu3gt3Vz80db69zTd1mlr11tUnGxt89Cw/8N0ha9YDhZ2LC+p8xMb9/hEdc+h4Ucu+br//JFXFNi5zKjz20KztiDzIMGFgzP+iZboQZbpSypsAgaeUjvfilqIEI9C9bV1LfvnnRaT96Ghr/zZs3739Xccn/S9aO3+cEh6nV1NTcBYm1tra+y8rKKrWzs+NG9q+EY8XR4+7RFdcmTpz4/8WLF//v3r37/+DBg//7S8v+V1dXH7p58+YPkNiRI0f+g9T4+Ph0MbjWXSgA+vc50L9vLEJq5hcXF384d/ny/4iIiG0+3t7/UlNT/0+aNOl/ZWXlfxDb29v7D0gOZAhILYNT9ZkHk9dc/A/070sjI6Oupqam7yAD/P39uezt7T/v3bv3/7lz5/4fOnTo/9q1a/+DxEByIANAahkcKo4X2JUefmBTtL9AV1c3Mz09/T3IgKCgoJ2Ojo6/3Nzc/gcGBoIxiA0SA8mBDACpRQlETSDw9fW93tvb+37VqlVv161b93/69On/CwsL/1dUVIDZIDGQHEgNSC2KAWpqasxAJxp4eXndT0lJ+ZKdnf0diH+Gh4fHAbEzkP0JJAaSA6kBqQUAGVqFjOjvxXwAAAAASUVORK5CYII=",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.person.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.person.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.person.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.person[this.editedIndex], this.editedItem);
      } else {
        this.person.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
.v-slot {
  display: inline-block;
}
table {
    border-collapse: separate !important;
    border-spacing: 0 1.3rem !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr {
    height: 110px !important;
    border-radius: .7rem;
     background: #fff !important;
         box-shadow: 0 4px 20px 0 rgba(0,0,0,.05) !important;
}
.v-data-table{
  background: #f4f4f4 !important;
}


</style>