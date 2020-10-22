export default class Node {
    constructor(title = "", context = "", father) {
        /* -- -- Data for discribe -- -- */
        this.title = title;        // --- title is key --- //
        this.context = context;

        /* -- -- Data for analysis -- -- */
        this.completeness = 0;
        this.spendHour = 0;
        this.effectiveness = 0;
        this.weigth = 0;           // --- weight in father --- //

        /* -- -- Child relate -- -- */
        this.child = [];
        this.parent = father;
    }
    /*---------------------------------------------------------------------------------------*/
    /*-------------     Dynamic Operation - Add Delet Modify Search     ---------------------*/
    /*---------------------------------------------------------------------------------------*/

    /* --  Search title from this node -- */
    search(title) {
        return this.DFS_forSearch(title);
    };

    DFS_forSearch(title) {
        if (this.title === title) {
            return this;
        }
        for (var i = 0; i < this.child.length; i++) {
            var tmp = this.child[i].DFS_forSearch(title);
            if (tmp !== null) {
                return tmp;
            }
        }
        return null;
    };

    /* -- Add child in this Node -- */
    addChild(title, context) {
        this.child.push(new Node(title, context, this));
    };

    /* -- Change this node title and context */
    changeContent(title, context) {
        this.title = title;
        this.context = context;
        console.log(this.title, this.context);
    };

    /* -- Remove Child From This Node -- */
    removeChild(title) {
        this.child = this.child.filter(index => index.title !== title);
    }


    /*-------------------------------------------------------------------------*/
    /*------------------    Data Analysis operation    ------------------------*/
    /*-------------------------------------------------------------------------*/


    /* -- when number of children change , reset weight from this node to root -- */  // --- backtrace
    resetWeight() {
        var new_child_weigth = [];
        for (var i = 0; i < this.child.length; ++i) {
            new_child_weigth[i] = this.child[i].countLeaf(0);
        }
        var sum = 0;
        for (var i = 0; i < this.child.length; ++i) {
            sum += this.child[i].countLeaf();
        }
        var new_unit = 100 / sum;
        for (var i = 0; i < this.child.length; ++i) {
            new_child_weigth[i] *= new_unit;
            this.child[i].weigth = new_child_weigth[i];
        }
        if (this.parent !== undefined && this.parent !== null) {
            this.parent.resetWeight();
        }
    }


    /* -- Return how many number of leaf this node has  -- */
    countLeaf(num = 0) {
        if (this.child.length === 0) {
            return 1 + num;
        }
        else {
            for (var i = 0; i < this.child.length; ++i) {
                num = this.child[i].countLeaf(num);
            }
        }
        return num;
    }


    resetCompletness() {

        if (this.child.length === 0) {
            return (this.weigth / 100) * this.completeness;
        }
        var new_complete = 0;
        for (var i = 0; i < this.child.length; ++i) {
            new_complete += this.child[i].resetCompletness();
        }
        this.completeness = new_complete;
        return (this.weigth / 100) * this.completeness;

    }



    /* ------ certain use for leaf node : complet a leaf ------ */
    completNode(percent, spend_hour) {
        if (this.child.length == 0 && this.completeness < 100) {
            this.completeness = percent;
            this.spendHour = spend_hour;
            return;
        }
        console.log("This Node is not leaf");

    }

    resetSpendHour() {
        for (var i = 0; i < this.child.length; ++i) {
            this.spendHour += this.child[i].spendHour;
        }
        if (this.parent !== null && this.parent !== undefined) {
            this.parent.resetSpendHour();
        }
    }

    resetEffectiveness() {

        if (this.spendHour !== 0) {
            this.effectiveness = this.completeness / this.spendHour;
        }
        if (this.parent !== null && this.parent !== undefined) {
            this.parent.resetEffectiveness();
        }
    }

}
