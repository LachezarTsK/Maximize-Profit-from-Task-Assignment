
class TaskGroup {

    index = 0;
    profits = new Array();

    getProfit() {
        let profit = 0;
        if (this.index < this.profits.length) {
            profit = this.profits[this.index];
            ++this.index;
        }
        return profit;
    }
}

/**
 * @param {number[]} workers
 * @param {number[][]} tasks
 * @return {number}
 */
var maxProfit = function (workers, tasks) {
    const skillToSortedProfits = createMapSkillToSortedProfits(tasks);
    return calculateMaxProfit(workers, skillToSortedProfits);
};

/**
 * @param {number[]} workers
 * @param {Map<number, TaskGroup>} skillToSortedProfits
 * @return {number}
 */
function calculateMaxProfit(workers, skillToSortedProfits) {

    let maxProfit = 0;
    for (let skill of workers) {
        if (skillToSortedProfits.has(skill)) {
            maxProfit += skillToSortedProfits.get(skill).getProfit();
        }
    }

    let maxUnusedProfit = 0;
    for (let skill of skillToSortedProfits.keys()) {
        maxUnusedProfit = Math.max(maxUnusedProfit, skillToSortedProfits.get(skill).getProfit());
    }

    maxProfit += maxUnusedProfit;
    return maxProfit;
}

/**
 * @param {number[][]} tasks
 * @return {Map<number, TaskGroup>}
 */
function createMapSkillToSortedProfits(tasks) {

    const skillToSortedProfits = new Map();
    for (let [skill, profit] of tasks) {
        if (!skillToSortedProfits.has(skill)) {
            skillToSortedProfits.set(skill, new TaskGroup());
        }
        skillToSortedProfits.get(skill).profits.push(profit);
    }

    for (let taskGroup of skillToSortedProfits.values()) {
        taskGroup.profits.sort((xProfit, yProfit) => yProfit - xProfit);
    }

    return skillToSortedProfits;
}
