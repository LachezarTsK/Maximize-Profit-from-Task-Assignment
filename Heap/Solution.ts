
// const {PriorityQueue} = require('@datastructures-js/priority-queue');
/*
 PriorityQueue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

function maxProfit(workers: number[], tasks: number[][]): number {
    const skillToProfits: Map<number, PriorityQueue<number>> = createMapSkillToProfits(tasks);
    return calculateMaxProfit(workers, skillToProfits);
};

function calculateMaxProfit(workers: number[], skillToProfits: Map<number, PriorityQueue<number>>): number {
    let maxProfit = 0;
    for (let skill of workers) {
        if (!skillToProfits.has(skill)) {
            continue;
        }
        maxProfit += skillToProfits.get(skill).dequeue();
        if (skillToProfits.get(skill).isEmpty()) {
            skillToProfits.delete(skill);
        }
    }

    let maxUnusedProfit = 0;
    for (let skill of skillToProfits.keys()) {
        maxUnusedProfit = Math.max(maxUnusedProfit, skillToProfits.get(skill).dequeue());
    }

    maxProfit += maxUnusedProfit;
    return maxProfit;
}


function createMapSkillToProfits(tasks: number[][]): Map<number, PriorityQueue<number>> {
    const skillToProfits = new Map();
    for (let [skill, profit] of tasks) {
        if (!skillToProfits.has(skill)) {
            skillToProfits.set(skill, new PriorityQueue<number>((xProfit, yProfit) => yProfit - xProfit));
        }

        skillToProfits.get(skill).enqueue(profit);
    }

    return skillToProfits;
}
