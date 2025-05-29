
import java.util.*
import kotlin.math.max
import kotlin.collections.HashMap

class Solution {

    fun maxProfit(workers: IntArray, tasks: Array<IntArray>): Long {
        val skillToProfits = createMapSkillToProfits(tasks)
        return calculateMaxProfit(workers, skillToProfits)
    }

    private fun calculateMaxProfit(workers: IntArray, skillToProfits: HashMap<Int, PriorityQueue<Int>>): Long {
        var maxProfit: Long = 0
        for (skill in workers) {
            if (!skillToProfits.containsKey(skill)) {
                continue
            }
            maxProfit += skillToProfits[skill]!!.poll()
            if (skillToProfits[skill]!!.isEmpty()) {
                skillToProfits.remove(skill)
            }
        }

        var maxUnusedProfit = 0
        for (skill in skillToProfits.keys) {
            maxUnusedProfit = max(maxUnusedProfit, skillToProfits[skill]!!.poll())
        }

        maxProfit += maxUnusedProfit
        return maxProfit
    }

    private fun createMapSkillToProfits(tasks: Array<IntArray>): HashMap<Int, PriorityQueue<Int>> {
        val skillToProfits = HashMap<Int, PriorityQueue<Int>>()
        for ((skill, profit) in tasks) {
            skillToProfits.putIfAbsent(skill, PriorityQueue<Int>() { xProfit, yProfit -> yProfit - xProfit })
            skillToProfits[skill]!!.add(profit)
        }

        return skillToProfits
    }
}
