
package main

import "container/heap"

func maxProfit(workers []int, tasks [][]int) int64 {
    skillToProfits := createMapSkillToProfits(tasks)
    return calculateMaxProfit(workers, skillToProfits)
}

func calculateMaxProfit(workers []int, skillToProfits map[int]*PriorityQueue) int64 {
    var maxProfit int64 = 0
    for _, skill := range workers {
        if _, contains := skillToProfits[skill]; !contains {
            continue
        }
        maxProfit += int64(heap.Pop(skillToProfits[skill]).(int))
        if skillToProfits[skill].Len() == 0 {
            delete(skillToProfits, skill)
        }
    }

    maxUnusedProfit := 0
    for skill := range skillToProfits {
        maxUnusedProfit = max(maxUnusedProfit, heap.Pop(skillToProfits[skill]).(int))
    }

    maxProfit += int64(maxUnusedProfit)
    return maxProfit
}

func createMapSkillToProfits(tasks [][]int) map[int]*PriorityQueue {
    skillToProfits := map[int]*PriorityQueue{}
    for i := range tasks {
        skill := tasks[i][0]
        profit := tasks[i][1]
        if _, contains := skillToProfits[skill]; !contains {
                skillToProfits[skill] = &PriorityQueue{}
        }
        heap.Push(skillToProfits[skill], profit)
    }

    return skillToProfits
}

type PriorityQueue []int

func (pq PriorityQueue) Len() int {
    return len(pq)
}

func (pq PriorityQueue) Less(first int, second int) bool {
    return pq[first] > pq[second]
}

func (pq PriorityQueue) Swap(first int, second int) {
    pq[first], pq[second] = pq[second], pq[first]
}

func (pq *PriorityQueue) Push(object any) {
    *pq = append(*pq, object.(int))
}

func (pq *PriorityQueue) Pop() any {
    value := (*pq)[pq.Len() - 1]
    *pq = (*pq)[0 : pq.Len() - 1]
    return value
}
