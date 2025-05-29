
// const {PriorityQueue} = require('@datastructures-js/priority-queue');
/*
 PriorityQueue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

/**
 * @param {number[]} workers
 * @param {number[][]} tasks
 * @return {number}
 */
var maxProfit = function (workers, tasks) {
    // Map<number, PriorityQueue<number>> 
    const skillToProfits = createMapSkillToProfits(tasks);
    return calculateMaxProfit(workers, skillToProfits);
};

/**
 * @param {number[]} workers
 * @param {Map<number, PriorityQueue<number>> } skillToProfits
 * @return {number}
 */
function calculateMaxProfit(workers, skillToProfits) {
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

/**
 * @param {number[][]} tasks
 * @return {Map<number, PriorityQueue<number>>}
 */
function  createMapSkillToProfits(tasks) {
    const skillToProfits = new Map();
    for (let [skill, profit] of tasks) {
        if (!skillToProfits.has(skill)) {
            skillToProfits.set(skill, new PriorityQueue((xProfit, yProfit) => yProfit - xProfit));
        }

        skillToProfits.get(skill).enqueue(profit);
    }

    return skillToProfits;
}
