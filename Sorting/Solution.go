
package main

import "slices"

type TaskGroup struct {
    index   int
    profits []int
}

func NewTaskGroup() *TaskGroup {
    taskGroup := &TaskGroup{
        index:   0,
        profits: []int{},
    }
    return taskGroup
}

func (this *TaskGroup) getProfit() int {
    profit := 0
    if this.index < len(this.profits) {
        profit = this.profits[this.index]
        this.index++
    }
    return profit
}

func maxProfit(workers []int, tasks [][]int) int64 {
    skillToSortedProfits := createMapSkillToSortedProfits(tasks)
    return calculateMaxProfit(workers, skillToSortedProfits)
}

func calculateMaxProfit(workers []int, skillToSortedProfits map[int]*TaskGroup) int64 {

    var maxProfit int64 = 0
    for _, skill := range workers {
        if _, contains := skillToSortedProfits[skill]; contains {
            maxProfit += int64(skillToSortedProfits[skill].getProfit())
        }
    }

    var maxUnusedProfit = 0
    for _, taskGroup := range skillToSortedProfits {
        maxUnusedProfit = max(maxUnusedProfit, taskGroup.getProfit())
    }

    maxProfit += int64(maxUnusedProfit)
    return maxProfit
}

func createMapSkillToSortedProfits(tasks [][]int) map[int]*TaskGroup {

    skillToSortedProfits := map[int]*TaskGroup{}
    for i := range tasks {
        skill := tasks[i][0]
        profit := tasks[i][1]

        if _, contains := skillToSortedProfits[skill]; !contains {
            skillToSortedProfits[skill] = NewTaskGroup()
        }
        skillToSortedProfits[skill].profits = append(skillToSortedProfits[skill].profits, profit)
    }

    for _, taskGroup := range skillToSortedProfits {
        slices.SortFunc(taskGroup.profits, func(xProfit int, yProfit int) int { return yProfit - xProfit })
    }

    return skillToSortedProfits
}
