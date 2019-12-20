<template>
  <div class="category-node-placeholder">
    <span>
      <i
        :class="[setCircleIcon, 'circle', 'icon', isSelected ?'selected':'']"
        @click="toggleFolding"
      ></i>
      <span v-if="node.count != null">
        <b
          class="node-preflabel"
          :class="isSelected ?'selected':''"
          v-if="node.count != null"
          @click="selectNode"
        >{{getI18n(node.prefLabel,"en")}}</b>
        <i>({{ node.count}})</i>
        <i v-if="isSelected" class="check teal icon"></i>
      </span>
      <span v-else>
        <i
          class="node-preflabel"
          :class="isSelected ?'selected':''"
          @click="selectTheiaVariable(node)"
        >{{getI18n(node.prefLabel,"en")}}</i>
        <i v-if="isSelected" class="check teal icon"></i>
      </span>
    </span>
    <div v-show="!isFolded" class="child-nodes-content">
      <div v-if="node.narrowers != null">
        <ul>
          <li v-for="(item,index) in node.narrowers" :key="index" class="category-node">
            <category-tree-component
              :node="item"
              v-on:select-a-theia-variable="selectTheiaVariable"
            ></category-tree-component>
          </li>
        </ul>
      </div>
      <div v-else-if="node.theiaVariables != null">
        <ul>
          <li v-for="(item,index) in node.theiaVariables" :key="index" class="variable-leaf">
            <category-tree-component
              :node="item"
              v-on:select-a-theia-variable="selectTheiaVariable"
            ></category-tree-component>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";

/**
 * @vuese
 * Component representing node of the facet category tree
 * @group Facet components
 */
export default {
  name: "category-tree-component",
  components: {
    CategoryTreeComponent: () => import("./category-tree-component.vue")
  },
  data() {
    return {
      /**
       * @vuese
       * boolean - whether the node is folded
       */
      isFolded: true
    };
  },
  props: {
    node: {
      //The node to be represented by the component instance. Can eathier represent a Theia Variable or a Theia Category
      type: Object,
      required: true
    }
  },
  computed: {
    ...Vuex.mapGetters(["getCategoryNodesSelected", "getFacetClassification"]),
    /**
     * @vuese
     * true if the node has been selected by user
     * @type Boolean
     */
    isSelected() {
      return this.getCategoryNodesSelected.some(
        elem => elem.uri === this.node.uri
      );
    },
    /**
     * @vuese
     * "plus" "minus" "outline". shape of the circle icon depending on the node state
     * @type String
     */
    setCircleIcon() {
      if (
        this.node.narrowers ||
        (this.node.theiaVariables && this.node.theiaVariables.length > 0)
      ) {
        if (this.isFolded) {
          return "plus";
        } else {
          return "minus";
        }
      } else {
        return "mini";
      }
    }
  },
  watch: {
    /**
     * @vuese
     * watch isFolded
     */
    getFacetClassification: {
      handler() {
        this.isFolded = this.node.isCategoryNodeFolded;
      },
      deep: true
    }
  },
  methods: {
    ...Vuex.mapActions(["setCategoryNodesSelected"]),
    /**
     * @vuese
     * Getter to get the value according the the internationalisation
     */
    getI18n(el, lang) {
      let tmp = el.find(element => element.lang === lang);
      return tmp.text;
    },
    /**
     * @vuese
     * Toggle folding of the node
     */
    toggleFolding() {
      this.isFolded = !this.isFolded;
    },
    /**
     * @vuese
     * Select a category node
     */
    selectNode() {
      if (!this.isSelected) {
        this.unselectParentNode(this);
      }
      this.setCategoryNodesSelected(this.node);
    },
    /**
     * @vuese
     * Select a Theia variable - in case the node represent a Theia variable
     */
    selectTheiaVariable(node) {
      if (node.prefLabel) {
        this.$emit(
          "select-a-theia-variable",
          this.getI18n(node.prefLabel, "en")
        );
      } else {
        this.$emit("select-a-theia-variable", node);
      }
    },
    unselectParentNode(categoryNodeComponent) {
      if (
        categoryNodeComponent.$parent.$options.name == "category-tree-component"
      ) {
        if (categoryNodeComponent.$parent.isSelected) {
          categoryNodeComponent.setCategoryNodesSelected(
            categoryNodeComponent.$parent.node
          );
        }
        categoryNodeComponent.unselectParentNode(categoryNodeComponent.$parent);
      }
    }
  }
};
</script>

<style>
.variable-leaf,
.category-node {
  list-style: none;
}

.child-nodes-content {
  border-left: 1px dotted #ccc;
  margin-left: 9px;
  padding-left: 10px;
}

.child-nodes-content > div > ul {
  padding-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.category-node-placeholder > span > .circle.icon {
  color: #aaa;
}

.category-node-placeholder > span > .circle.icon.selected {
  color: teal;
}

.category-node-placeholder > span > .plus.circle.icon,
.category-node-placeholder > span > .minus.circle.icon {
  cursor: pointer;
}

.node-preflabel.selected {
  color: teal;
}

.node-preflabel:hover {
  color: teal;
  cursor: pointer;
}

.category-node-placeholder > span > .circle.icon.mini {
  vertical-align: middle;
  margin-left: 1em;
  margin-right: calc(1em + 0.25rem);
}
</style>
