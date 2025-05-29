
class TaskGroup {

    index: number = 0;
    profits: number[] = new Array();

    getProfit() {
        let profit = 0;
        if (this.index < this.profits.length) {
            profit = this.profits[this.index];
            ++this.index;
        }
        return profit;
    }
}

function maxProfit(workers: number[], tasks: number[][]): number {
    const skillToSortedProfits = createMapSkillToSortedProfits(tasks);
    return calculateMaxProfit(workers, skillToSortedProfits);
};

function calculateMaxProfit(workers: number[], skillToSortedProfits: Map<number, TaskGroup>): number {

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

function createMapSkillToSortedProfits(tasks: number[][]): Map<number, TaskGroup> {

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
