<template>
  <div class="category-node-placeholder">
    <span v-if="getCategoryNodeIfPresentInResultFacet !== undefined">
<!--      The node is present in the category node facet result -->
      <i
        :class="[setCircleIcon, 'circle', 'icon', isSelected ?'selected':'']"
        @click="toggleFolding"
      ></i>
<!--      The  count is present and can be printed -->
      <span v-if="getCategoryNodeIfPresentInResultFacet.count != null">
        <b
          class="node-simplifiedLabel"
          :class="isSelected ?'selected':''"
          @click="selectNode"
          :id="node.uri"
        >{{getI18n(node.simplifiedLabel,"en")}}</b>
        <i>({{ getCategoryNodeIfPresentInResultFacet.count}})</i>
        <i v-if="isSelected" class="check teal icon"></i>
      </span>
      <!--      The node is present in the category node facet result but there is no count - it is a variable node -->
      <span v-else>
        <i
          class="node-simplifiedLabel"
          :class="isSelected ?'selected':''"
          @click="selectTheiaVariable(node)"
          :id="node.uri"
        >{{getI18n(node.simplifiedLabel,"en")}}</i>
        <i v-if="isSelected" class="check teal icon"></i>
      </span>
    </span>
    <span v-else-if="test(getCategoryNodesSelected)">
      <i
          :class="[setCircleIcon, 'circle', 'icon', isSelected ?'selected':'']"
          @click="toggleFolding"
      ></i>
      <span>
        <b
            class="node-simplifiedLabel"
            :class="isSelected ?'selected':''"
            @click="selectNode"
            :id="node.uri"
        >{{getI18n(node.simplifiedLabel,"en")}}</b>
        <i>(0)</i>
        <i v-if="isSelected" class="check teal icon"></i>
      </span>
    </span>

    <span v-else class="not-in-results">
<!--      The node is not present in the category node facet result - the count is not printed-->
      <i
          :class="[setCircleIcon, 'circle', 'icon', isSelected ?'selected':'']"
          @click="toggleFolding"
      ></i>
      <span v-if="node.count != null">
        <b
            class="node-simplifiedLabel"
            :class="isSelected ?'selected':''"
            @click="selectNode"
            :id="node.uri"
        >{{getI18n(node.simplifiedLabel,"en")}}</b>
      </span>
      <span v-else>
        <i
            class="node-simplifiedLabel"
            :class="isSelected ?'selected':''"
            @click="selectTheiaVariable(node)"
            :id="node.uri"
        >{{getI18n(node.simplifiedLabel,"en")}}</i>
        <i v-if="isSelected" class="check teal icon"></i>
      </span>
    </span>
    <div v-show="!isFolded" class="child-nodes-content">
      <div v-if="node.narrowers != null">
        <ul>
          <li v-for="(item,index) in node.narrowers" :key="index" class="category-node">
            <category-tree-component
              :node="item">
            </category-tree-component>
          </li>
        </ul>
      </div>
      <div v-else-if="node.theiaVariables != null">
        <ul>
          <li v-for="(item,index) in node.theiaVariables" :key="index" class="variable-leaf">
            <category-tree-component
              :node="item">
            </category-tree-component>
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
    ...Vuex.mapGetters(["getCategoryNodesSelected", "getFacetClassification","getFilters"]),
    /**
     * Check if the category node exists a as a resulting faceted category node after a user query.
     * If it exists the method return the faceted category node (with observation count) otherwise it returns undefined
     * @returns If it exists the method return the faceted category node (with observation count) otherwise it returns undefined
     */
    getCategoryNodeIfPresentInResultFacet() {

     // let variableNode = this.getFacetClassification.theiaVariables.find(element => element.uri === this.node.uri)
      let variableNode= this.getFacetClassification.theiaVariables.find(element => {
        let elementLabelEn = element.simplifiedLabel.find(label => label.lang === "en").text
        let nodeLabelEn = this.node.simplifiedLabel.find(label => label.lang === "en").text
        return elementLabelEn === nodeLabelEn
      })
      let categoryNode = this.getFacetClassification.theiaCategoryFlat.find(element => element.uri === this.node.uri);
      if(categoryNode === undefined) {
        return variableNode
      } else {
        return categoryNode
      }
    },
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
          (this.node.narrowers && this.node.narrowers.length > 0) ||
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

    ...Vuex.mapActions(["setCategoryNodesSelected","setTheiaVariablesFilter"]),
    test(get) {
      return get.some(element => (element.uri === this.node.uri))
    },
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
      if (!this.getFilters.theiaVariables.some(elem => elem.simplifiedLabel.find(label => label.lang === "en").text === node.simplifiedLabel.find(label => label.lang === "en").text)) {
        const tmp = [...this.getFilters.theiaVariables, node]
        this.setTheiaVariablesFilter(tmp)
      }
    },
    unselectParentNode(categoryNodeComponent) {
      if (
        categoryNodeComponent.$parent.$options.name === "category-tree-component"
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

.node-simplifiedLabel.selected {
  color: teal;
}

.node-simplifiedLabel:hover {
  color: teal;
  cursor: pointer;
}

.category-node-placeholder > span > .circle.icon.mini {
  vertical-align: middle;
  margin-left: 1em;
  margin-right: calc(1em + 0.25rem);
}

.category-node-placeholder span.not-in-results span{
  color: darkgray;
  font-weight: lighter;
  font-size: small;
}
</style>
