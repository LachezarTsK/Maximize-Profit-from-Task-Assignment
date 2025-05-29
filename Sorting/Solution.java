
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {

    class TaskGroup {

        int index;
        List<Integer> profits = new ArrayList<>();

        int getProfit() {
            int profit = 0;
            if (index < profits.size()) {
                profit = profits.get(index);
                ++index;
            }
            return profit;
        }
    }

    public long maxProfit(int[] workers, int[][] tasks) {
        Map<Integer, TaskGroup> skillToSortedProfits = createMapSkillToSortedProfits(tasks);
        return calculateMaxProfit(workers, skillToSortedProfits);
    }

    private long calculateMaxProfit(int[] workers, Map<Integer, TaskGroup> skillToSortedProfits) {

        long maxProfit = 0;
        for (int skill : workers) {
            if (skillToSortedProfits.containsKey(skill)) {
                maxProfit += (long) skillToSortedProfits.get(skill).getProfit();
            }
        }

        int maxUnusedProfit = 0;
        for (int skill : skillToSortedProfits.keySet()) {
            maxUnusedProfit = Math.max(maxUnusedProfit, skillToSortedProfits.get(skill).getProfit());
        }

        maxProfit += maxUnusedProfit;
        return maxProfit;
    }

    private Map<Integer, TaskGroup> createMapSkillToSortedProfits(int[][] tasks) {

        Map<Integer, TaskGroup> skillToSortedProfits = new HashMap<>();
        for (int[] task : tasks) {
            int skill = task[0];
            int profit = task[1];

            skillToSortedProfits.putIfAbsent(skill, new TaskGroup());
            skillToSortedProfits.get(skill).profits.add(profit);
        }

        for (TaskGroup taskGroup : skillToSortedProfits.values()) {
            Collections.sort(taskGroup.profits, (xProfit, yProfit) -> yProfit - xProfit);
        }

        return skillToSortedProfits;
    }
}
