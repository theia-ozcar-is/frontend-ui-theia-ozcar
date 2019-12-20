<template>
  <div class="page-navigation-container" v-if="getTotalItemCount !== 0">
    <div
      v-if="getPageSize <= getTotalItemCount"
      class="item-count-container"
    >{{(activePage * getPageSize) - getPageSize + 1}} - {{(activePage * getPageSize) > getTotalItemCount ? getTotalItemCount : (activePage * getPageSize) }} of {{getTotalItemCount}} {{itemListNature}}</div>
    <div
      class="item-count-container"
      v-else
    >{{(activePage * getPageSize) - getPageSize + 1}} - {{getTotalItemCount}} of {{getTotalItemCount}} {{itemListNature}}</div>
    <div class="pagination-container" v-if="getNumberOfPage <=7 && getNumberOfPage > 1">
      <div class="ui pagination menu" v-for="(page, index) in getNumberOfPage" :key="index">
        <a
          :id="index+1"
          class="item"
          @click.prevent="selectPages(index+1, index+1)"
          :class="{'active': activeButton === index+1}"
        >{{index + 1}}</a>
      </div>
    </div>
    <div v-else-if="getNumberOfPage >7" class="pagination-container">
      <div class="ui pagination menu">
        <a
          id="1"
          class="item"
          @click.prevent="selectPages(1,1)"
          :class="{'active': activeButton == 1}"
        >1</a>
        <a
          id="2"
          class="item"
          @click.prevent="selectPages(2,pages[1])"
          :class="{'active': activeButton == 2,'disabled': disabledButton <= 2}"
        >{{pages[1]}}</a>
        <a
          id="3"
          class="item"
          @click.prevent="selectPages(3,pages[2])"
          :class="{'active': activeButton == 3}"
        >{{pages[2]}}</a>
        <a
          id="4"
          class="item"
          @click.prevent="selectPages(4,pages[3])"
          :class="{'active': activeButton == 4}"
        >{{pages[3]}}</a>
        <a
          id="5"
          class="item"
          @click.prevent="selectPages(5,pages[4])"
          :class="{'active': activeButton == 5}"
        >{{pages[4]}}</a>
        <a
          id="6"
          class="item"
          @click.prevent="selectPages(6,pages[5])"
          :class="{'active': activeButton == 2,'disabled': disabledButton >= 2}"
        >{{pages[5]}}</a>
        <a
          id="7"
          class="item"
          @click.prevent="selectPages(7,getNumberOfPage)"
          :class="{'active': activeButton == 7}"
        >{{getNumberOfPage}}</a>
      </div>
    </div>
    <div class="page-size-selector-container" v-show="getTotalItemCount > 10">
      Page size:
      <select
        name="page-length"
        id="page-length"
        class="ui dropdown"
        :value="getPageSize"
        @input="updatePageSize($event)"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="page-number-selector-container">
      Jump to page :
      <div class="ui icon input" id="page-jump-bar">
        <input
          v-model.number="jumpPage"
          type="number"
          min="1"
          :max="getNumberOfPage"
          placeholder="Page..."
          @keydown.enter="jumpToPage"
        />
        <i class="search link icon" @click="jumpToPage"></i>
      </div>
    </div>
  </div>
</template>

<style>
.page-navigation-container {
  height: 42px;
  line-height: 42px;
  margin: 5px 0px 5px 0px;
}
.item-count-container {
  margin-left: 20px;
  margin-right: 20px;
  display: inline-block;
}
.pagination-container {
  margin-right: 20px;
  display: inline-block;
}
.page-size-selector-container {
  display: inline-block;
}
.page-number-selector-container {
  display: inline-block;
}
</style>

<script>
import Vuex, { mapState, mapGetters, mapActions } from "vuex";

/**
 * Component used to navigate between metadata layout pages
 */
export default {
  name: "page-navigation-component",
  data() {
    return {
      /**
       * @vuese
       * The page active
       */
      activePage: 1,
      /**
       * @vuese
       * The pagination button active
       */

      activeButton: 1,
      /**
       * @vuese
       * the button disabled
       * 1 = the second button
       * 2 = the second and the sixth buttons
       * 3 = the sixth button
       */
      disabledButton: 3,
      /**
       * @vuese
       * the value in the pages buttons
       */
      pages: [],
      /**
       * @vuese
       * The page to jump to using input form
       */
      jumpPage: null,
      /**
       * @vuese
       * Item list nature charactere string
       */
      itemListNature: "measurements"
    };
  },
  computed: {
    ...mapGetters([
      "getNumberOfPage",
      "getPageSize",
      "getFilters",
      "getTotalItemCount",
      "getItemListNature"
    ])
  },
  mounted() {
    this.initPages();
  },
  watch: {
    /**
     * @vuese
     * Watch getFilters -  reinit the pages and button when it changes
     */
    getFilters: {
      handler: function() {
        this.activePage = 1;
        this.activeButton = 1;
        this.pages = [null, 2, 3, 4, 5, "...", null];
        this.disabledButton = 3;
      },
      deep: true
    },
    getItemListNature() {
      this.activePage = 1;
      this.activeButton = 1;
      this.pages = [null, 2, 3, 4, 5, "...", null];
      this.disabledButton = 3;
      switch (this.getItemListNature) {
        case "observation":
          this.itemListNature = "measurements";
          break;
        case "dataset":
          this.itemListNature = "datasets";
          break;
        case "producer":
          this.itemListNature = "producers";
          break;
      }
      this.changePage({
          filters: this.getFilters,
          pageSize: 10,
          pageSelected: 1
        })
        .then(() => {
          this.setNumberOfPage();
          // .then(() => resolve());
        });
    }
  },
  methods: {
    ...mapActions(["changePageSize", "setNumberOfPage", "changePage"]),
    /**
     * @vuese
     * Initalise pages
     */
    initPages() {
      this.pages = [null, 2, 3, 4, 5, "...", null];
    },
    /**
     * @vuese
     * Method to update the numbner of item per page
     */
    updatePageSize(event) {
      /**
       * Vuex page store actions to change the page size. The query is made to the databse and the number of
       * result to be printed on one page is specified.
       * The first page with the new number of item is presented
       */
      this.changePageSize({
        filters: this.getFilters,
        pageSize: Number(event.currentTarget.value)
      });
      this.pages = [null, 2, 3, 4, 5, "...", this.getNumberOfPage];
      this.activePage = 1;
      this.activeButton = 1;
      this.disabledButton = 3;
    },

    /**
     * @vuese
     * Method to navigate between pages
     */
    selectPages(buttonId, pageNumber) {
      //get the page number using the event object of the button clicked
      // let id = Number(event.currentTarget.id);
      //let value = Number(event.currentTarget.innerHTML);
      //If the number of page is > the button layout is different than if the number of page is <=7
      if (this.getNumberOfPage > 7) {
        if (
          !(
            (buttonId === 2 && this.disabledButton <= 2) ||
            (buttonId === 6 && this.disabledButton >= 2)
          )
        ) {
          if (pageNumber - 3 > 1 && pageNumber + 3 < this.getNumberOfPage) {
            this.pages = [
              null,
              "...",
              pageNumber - 1,
              pageNumber,
              pageNumber + 1,
              "...",
              null
            ];
            this.activeButton = 4;
            this.disabledButton = 2;
          } else if (pageNumber - 3 <= 1) {
            this.pages = [null, 2, 3, 4, 5, "...", null];
            this.activeButton = buttonId;
            this.disabledButton = 3;
          } else {
            this.pages = [
              1,
              "...",
              this.getNumberOfPage - 4,
              this.getNumberOfPage - 3,
              this.getNumberOfPage - 2,
              this.getNumberOfPage - 1,
              null
            ];
            this.activeButton = buttonId;
            this.disabledButton = 1;
          }

          this.activePage = pageNumber;
          //Load the new page
          this.changePage({
            filters: this.getFilters,
            pageSize: this.getPageSize,
            pageSelected: this.activePage
          });
        }
      } else if (this.getNumberOfPage <= 7) {
        this.activeButton = buttonId;
        this.activePage = pageNumber;
        //Load the new page
        this.changePage({
          filters: this.getFilters,
          pageSize: this.getPageSize,
          pageSelected: this.activePage
        });
      }
    },
    jumpToPage() {
      //Prevent wrong page number selection
      if (this.jumpPage > this.getNumberOfPage) {
        this.jumpPage = this.getNumberOfPage;
      }
      if (this.jumpPage < 1) {
        this.jumpPage = 1;
      }

      //Calculate which button will be disabled
      if (this.getNumberOfPage > 7) {
        if (this.jumpPage < 5) {
          this.disabledButton = 3;
        } else if (this.jumpPage >= this.getNumberOfPage - 3) {
          this.disabledButton = 1;
        } else {
          this.disabledButton = 2;
        }
      }

      //Calculate which button should have been clicked
      let button = null;
      if (this.getNumberOfPage > 7) {
        if (this.jumpPage < 5) {
          button = this.jumpPage;
        } else if (this.jumpPage >= this.getNumberOfPage - 3) {
          button = 7 - (this.getNumberOfPage - this.jumpPage);
        } else {
          button = 4;
        }
      } else {
        button = this.jumpPage;
      }

      this.selectPages(button, this.jumpPage);
      this.jumpPage = null;

      // this.changePage({
      //   filters: this.getFilters,
      //   pageSize: this.getPageSize,
      //   pageSelected: this.jumpPage
      // });
    }
  }
};
</script>


