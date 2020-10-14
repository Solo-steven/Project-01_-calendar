
import Node from './Node'

export default class ProjectInterface {
    constructor(rootTitle="New Project", rootContext="Add Your New Content") {
        this.root = new Node(rootTitle, rootContext, null);
        this.currentNode = this.root;
    }
    backToRoot() {
        this.currentNode = this.root;
    }
    backToFather() {
        if (this.currentNode.parent !== undefined)
            this.currentNode = this.currentNode.parent;
    }
    goToChild(index) {
        if (this.currentNode.child.length - 1 >= index) {
            this.currentNode = this.currentNode.child[i];
        }
    }
    changeCurrentContent(title, cotext) {
        this.currentNode.changeContent(title, cotext);
    }
    addCurrentChild(title, cotext) {
        if (this.root.search(title) === null) {
            this.currentNode.addChild(title, cotext);
            this.currentNode.resetWeight();
            this.root.resetCompletness();
            this.currentNode.resetEffectiveness();
        }
    }
    removeCurrentChild(title) {
        this.currentNode.removeChild(title);
        this.currentNode.resetWeight();
        this.root.resetCompletness();
        this.currentNode.resetEffectiveness();
    }
    completLeaf(index, spend_hour) {
        this.currentNode.child[index].completNode(spend_hour);
        this.root.resetCompletness();
        this.currentNode.resetEffectiveness();
    }

}

