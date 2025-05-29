
import kotlin.math.max
import kotlin.collections.HashMap

class Solution {

    class TaskGroup {

        var index = 0
        val profits = ArrayList<Int>()

        fun getProfit(): Int {
            var profit = 0
            if (index < profits.size) {
                profit = profits[index]
                ++index
            }
            return profit
        }
    }

    fun maxProfit(workers: IntArray, tasks: Array<IntArray>): Long {
        val skillToSortedProfits: HashMap<Int, TaskGroup> = createMapSkillToSortedProfits(tasks)
        return calculateMaxProfit(workers, skillToSortedProfits)
    }

    private fun calculateMaxProfit(workers: IntArray, skillToSortedProfits: HashMap<Int, TaskGroup>): Long {

        var maxProfit: Long = 0
        for (skill in workers) {
            if (skillToSortedProfits.containsKey(skill)) {
                maxProfit += skillToSortedProfits[skill]!!.getProfit().toLong()
            }
        }

        var maxUnusedProfit = 0
        for ((skill, taskGroup) in skillToSortedProfits) {
            maxUnusedProfit = max(maxUnusedProfit, taskGroup.getProfit())
        }

        maxProfit += maxUnusedProfit
        return maxProfit
    }

    private fun createMapSkillToSortedProfits(tasks: Array<IntArray>): HashMap<Int, TaskGroup> {

        val skillToSortedProfits = HashMap<Int, TaskGroup>()
        for ((skill, profit) in tasks) {
            skillToSortedProfits.putIfAbsent(skill, TaskGroup())
            skillToSortedProfits[skill]!!.profits.add(profit)
        }

        for (taskGroup in skillToSortedProfits.values) {
            taskGroup.profits.sortDescending()
        }

        return skillToSortedProfits
    }
}
